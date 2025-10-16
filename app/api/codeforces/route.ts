import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const handle = searchParams.get('handle') || 'xordan.-'
  const from = searchParams.get('from') || '1'
  const count = searchParams.get('count') || '3000'

  const apiUrl = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=${from}&count=${count}`

  try {
    const res = await fetch(apiUrl, { headers: { 'User-Agent': 'portfolio-next/1.0 (+github.com/mi-shraban)' } })
    if (!res.ok) {
      return new Response(JSON.stringify({ status: 'ERROR', comment: `HTTP ${res.status}` }), {
        status: res.status,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
      })
    }
    const json = await res.json()
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        // cache for 10 minutes at the edge and browsers
        'cache-control': 'public, s-maxage=600, max-age=300, stale-while-revalidate=600'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ status: 'ERROR', comment: e?.message || 'Fetch failed' }), {
      status: 500,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
    })
  }
}

