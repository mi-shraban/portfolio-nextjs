import type { NextRequest } from 'next/server'

export const runtime = 'edge'

// Configuration
const RATE_LIMIT_WINDOW = 60000
const MAX_REQUESTS_PER_WINDOW = 10
const ALLOWED_HANDLES = ['xordan.-']
const MIN_COUNT = 1
const MAX_COUNT = 1000
const MIN_FROM = 1
const CACHE_DURATION = 600

// Cache configuration
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes in milliseconds (minimum fresh cache)
const CACHE_STALE_WHILE_REVALIDATE = 50 * 60 * 1000 // 50 minutes (total: 60 min lifetime)

// In-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// In-memory cache store
interface CacheEntry {
	data: any
	timestamp: number
	etag: string
}
const responseCache = new Map<string, CacheEntry>()

// Generate cache key from request parameters
function generateCacheKey(handle: string, from: number, count: number): string {
	return `cf:${handle}:${from}:${count}`
}

// Generate ETag for cache validation
function generateETag(data: any): string {
	// Simple hash function for ETag generation
	const str = JSON.stringify(data)
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = ((hash << 5) - hash) + char
		hash = hash & hash // Convert to 32-bit integer
	}
	return `"${Math.abs(hash).toString(36)}"`
}

// Check if cached data is still fresh
function isCacheFresh(entry: CacheEntry): boolean {
	const age = Date.now() - entry.timestamp
	return age < CACHE_TTL
}

// Check if cached data is stale but can be served while revalidating
function isStaleButRevalidatable(entry: CacheEntry): boolean {
	const age = Date.now() - entry.timestamp
	return age < (CACHE_TTL + CACHE_STALE_WHILE_REVALIDATE)
}

// Get cached response if available and valid
function getCachedResponse(cacheKey: string): { hit: 'fresh' | 'stale' | 'miss', entry?: CacheEntry } {
	const entry = responseCache.get(cacheKey)
	
	if (!entry) {
		return { hit: 'miss' }
	}
	if (isCacheFresh(entry)) {
		return { hit: 'fresh', entry }
	}
	if (isStaleButRevalidatable(entry)) {
		return { hit: 'stale', entry }
	}
	// delete expired cache
	responseCache.delete(cacheKey)
	return { hit: 'miss' }
}


// Store response in cache
function setCachedResponse(cacheKey: string, data: any): void {
	const entry: CacheEntry = {
		data,
		timestamp: Date.now(),
		etag: generateETag(data)
	}
	
	responseCache.set(cacheKey, entry)
	
	// Optional: Implement cache size limit
	if (responseCache.size > 100) {
		// Remove oldest entry
		const firstKey = responseCache.keys().next().value
		if (firstKey) {
			responseCache.delete(firstKey)
		}
	}
}

// Clean up expired cache entries periodically
function cleanupExpiredCache(): void {
	const now = Date.now()
	for (const [key, entry] of responseCache.entries()) {
		const age = now - entry.timestamp
		if (age > (CACHE_TTL + CACHE_STALE_WHILE_REVALIDATE)) {
			responseCache.delete(key)
		}
	}
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
	setInterval(cleanupExpiredCache, 5 * 60 * 1000)
}

function checkRateLimit(identifier: string): {
	allowed: boolean;
	remaining: number
} {
	const now = Date.now()
	const record = rateLimitStore.get(identifier)
	
	// clean up expired entries
	if (record && now > record.resetTime){
		rateLimitStore.delete(identifier)
	}
	
	const current = rateLimitStore.get(identifier)
	
	if (!current) {
		// First request in window
		rateLimitStore.set(identifier, {
			count: 1,
			resetTime: now + RATE_LIMIT_WINDOW
		})
		return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 }
	}
	// count check
	if (current.count >= MAX_REQUESTS_PER_WINDOW) {
		return {allowed: false, remaining: 0}
	}
	// increment count
	current.count++
	return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - current.count }
}

// Get client identifier for rate limiting
function getClientIdentifier(req: NextRequest): string {
	// Try multiple headers for IP detection (Vercel/Cloudflare compatible)
	const forwarded = req.headers.get('x-forwarded-for')
	const realIp = req.headers.get('x-real-ip')
	const cfConnectingIp = req.headers.get('cf-connecting-ip')
	
	const ip = cfConnectingIp || forwarded?.split(',')[0] || realIp || 'unknown'
	return ip.trim()
}

// Validate and sanitize input parameters
function validateParams(searchParams: URLSearchParams): {
	valid: boolean
	handle?: string
	from?: number
	count?: number
	error?: string
} {
	const handle = searchParams.get('handle')?.trim() || 'xordan.-'
	
	// Validate handle against whitelist
	if (!ALLOWED_HANDLES.includes(handle)) {
		return {
			valid: false,
			error: 'Invalid handle. Only authorized handles are allowed.'
		}
	}

	// Validate and sanitize 'from' parameter
	const fromParam = searchParams.get('from')
	let from = MIN_FROM
	if (fromParam) {
		const parsed = parseInt(fromParam, 10)
		if (isNaN(parsed) || parsed < MIN_FROM) {
			return {
				valid: false,
				error: `Invalid 'from' parameter. Must be >= ${MIN_FROM}.`
			}
		}
		from = parsed
	}

	// Validate and sanitize 'count' parameter
	const countParam = searchParams.get('count')
	let count = MAX_COUNT
	if (countParam) {
		const parsed = parseInt(countParam, 10)
		if (isNaN(parsed) || parsed < MIN_COUNT || parsed > MAX_COUNT) {
			return {
				valid: false,
				error: `Invalid 'count' parameter. Must be between ${MIN_COUNT} and ${MAX_COUNT}.`
			}
		}
		count = parsed
	}

	return { valid: true, handle, from, count }
}

// Create error response with consistent format
function createErrorResponse(message: string, status: number, remaining?: number): Response {
	const headers: HeadersInit = {
		'content-type': 'application/json',
		'cache-control': 'no-store, no-cache, must-revalidate',
		'x-content-type-options': 'nosniff'
	}
	if (remaining !== undefined) {
		headers['x-ratelimit-remaining'] = remaining.toString()
	}
	return new Response(
		JSON.stringify({
			status: 'ERROR',
			comment: message
		}),
		{ status, headers }
	)
}

// Create successful response with caching headers
function createSuccessResponse(
	data: any,
	remaining: number,
	cacheStatus: 'HIT' | 'MISS' | 'STALE',
	etag?: string
): Response {
	const age = cacheStatus === 'HIT' || cacheStatus === 'STALE' ?
		Math.floor(CACHE_TTL / 1000) : 0

	const headers: HeadersInit = {
		'content-type': 'application/json',
		'cache-control': `public, s-maxage=${CACHE_DURATION}, max-age=${CACHE_DURATION / 2}, stale-while-revalidate=${CACHE_DURATION}`,
		'x-content-type-options': 'nosniff',
		'x-ratelimit-remaining': remaining.toString(),
		'x-ratelimit-limit': MAX_REQUESTS_PER_WINDOW.toString(),
		'x-cache-status': cacheStatus,
		'age': age.toString()
	}

	if (etag) {
		headers['etag'] = etag
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers
	})
}

// Fetch fresh data from Codeforces API
async function fetchFromCodeforces(handle: string, from: number, count: number): Promise<any> {
	const apiUrl = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=${from}&count=${count}`

	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

	const res = await fetch(apiUrl, {
		headers: {
			'User-Agent': 'portfolio-next/1.0 (+github.com/mi-shraban)',
			'Accept': 'application/json'
		},
		signal: controller.signal
	})

	clearTimeout(timeoutId)

	// Handle non-OK responses
	if (!res.ok) {
		const errorMessage = res.status === 404
			? 'User not found'
			: 'Failed to fetch data from Codeforces'
		
		throw new Error(errorMessage)
	}

	// Parse and validate response
	const json = await res.json()

	// Validate response structure
	if (!json || typeof json !== 'object') {
		throw new Error('Invalid response format')
	}

	return json
}

// Main GET handler
export async function GET(req: NextRequest) {
	// Get client identifier for rate limiting
	const clientId = getClientIdentifier(req)

	// Parse and validate parameters first (before rate limit check for cache hits)
	const { searchParams } = new URL(req.url)
	const validation = validateParams(searchParams)

	if (!validation.valid) {
		return createErrorResponse(validation.error || 'Invalid parameters', 400)
	}

	const { handle, from, count } = validation

	// Generate cache key
	const cacheKey = generateCacheKey(handle!, from!, count!)

	// Check if client sent If-None-Match header for conditional requests
	const clientETag = req.headers.get('if-none-match')

	// Check cache first
	const cacheResult = getCachedResponse(cacheKey)

	// If we have a fresh cache hit, return immediately (no rate limit check needed)
	if (cacheResult.hit === 'fresh' && cacheResult.entry) {
		// Check ETag for 304 Not Modified
		if (clientETag && clientETag === cacheResult.entry.etag) {
			return new Response(null, {
				status: 304,
				headers: {
					'etag': cacheResult.entry.etag,
					'cache-control': `public, max-age=${CACHE_DURATION}`,
					'x-cache-status': 'HIT'
				}
			})
		}

		// Return cached data
		return createSuccessResponse(
			cacheResult.entry.data,
			MAX_REQUESTS_PER_WINDOW, // Don't count against rate limit for cache hits
			'HIT',
			cacheResult.entry.etag
		)
	}

	// For cache misses or stale cache, check rate limit
	const { allowed, remaining } = checkRateLimit(clientId)
	if (!allowed) {
		// If we have stale cache, return it with 429 warning header
		if (cacheResult.hit === 'stale' && cacheResult.entry) {
			const headers: HeadersInit = {
				'content-type': 'application/json',
				'x-cache-status': 'STALE',
				'x-ratelimit-remaining': '0',
				'x-ratelimit-limit': MAX_REQUESTS_PER_WINDOW.toString(),
				'warning': '110 - "Response is stale"',
				'cache-control': `public, max-age=${CACHE_DURATION}`
			}

			if (cacheResult.entry.etag) {
				headers['etag'] = cacheResult.entry.etag
			}

			return new Response(JSON.stringify(cacheResult.entry.data), {
				status: 200,
				headers
			})
		}

		return createErrorResponse(
			'Rate limit exceeded. Please try again later.',
			429,
			remaining
		)
	}

	// If we have stale cache, return it immediately and revalidate in background
	if (cacheResult.hit === 'stale' && cacheResult.entry) {
		// Return stale data immediately
		const staleResponse = createSuccessResponse(
			cacheResult.entry.data,
			remaining,
			'STALE',
			cacheResult.entry.etag
		)

		// Revalidate in background (fire and forget)
		// Note: In Edge runtime, this may not complete, but that's okay
		fetchFromCodeforces(handle!, from!, count!)
			.then(freshData => {
				setCachedResponse(cacheKey, freshData)
			})
			.catch(err => {
				console.error('Background revalidation failed:', err.message)
			})

		return staleResponse
	}

	// Cache miss - fetch fresh data
	try {
		const freshData = await fetchFromCodeforces(handle!, from!, count!)

		// Store in cache
		setCachedResponse(cacheKey, freshData)

		// Return fresh data
		const entry = responseCache.get(cacheKey)
		return createSuccessResponse(
			freshData,
			remaining,
			'MISS',
			entry?.etag
		)
	} catch (e: any) {
		// Log error server-side (visible in deployment logs)
		console.error('Codeforces API error:', e.message)

		// Return generic error to client (don't expose internal details)
		let errorMessage = 'Failed to fetch data'
		if (e.name === 'AbortError') {
			errorMessage = 'Request timeout'
		}

		return createErrorResponse(errorMessage, 500, remaining)
	}
}

// Explicitly deny other HTTP methods
export async function POST() {
	return createErrorResponse('Method not allowed', 405)
}

export async function PUT() {
	return createErrorResponse('Method not allowed', 405)
}

export async function DELETE() {
	return createErrorResponse('Method not allowed', 405)
}

export async function PATCH() {
	return createErrorResponse('Method not allowed', 405)
}