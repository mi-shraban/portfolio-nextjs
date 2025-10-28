import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";

export const runtime = "nodejs"; // we need filesystem access for caching

const CACHE_PATH = path.join(process.cwd(), "data", "cf_cache.json");
const CF_HANDLE = "xordan.-";
const API_BASE = "https://codeforces.com/api/user.status";

async function readCache() {
	try {
		const data = await fs.readFile(CACHE_PATH, "utf8");
		return JSON.parse(data);
	} catch {
		return { status: "OK", result: [] };
	}
}

async function writeCache(json: any) {
	await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
	await fs.writeFile(CACHE_PATH, JSON.stringify(json, null, 2), "utf8");
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const handle = searchParams.get("handle") || CF_HANDLE;
	const from = Number(searchParams.get("from") || 1);
	const count = Number(searchParams.get("count") || 100);

	// Read existing cache
	const cache = await readCache();
	const cachedResults = cache.result || [];
	const lastCachedId = cachedResults[0]?.id;

	const apiUrl = `${API_BASE}?handle=${encodeURIComponent(handle)}&from=${from}&count=${count}`;

	try {
		const res = await fetch(apiUrl, {
			headers: { "User-Agent": "cf-cache-next/1.0 (+github.com/mi-shraban)" },
			next: { revalidate: 600 }, // Revalidate every 10 minutes
		});

		if (!res.ok) {
			console.warn("CF API failed, serving cached data...");
			return new Response(JSON.stringify(cache), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		}

		const json = await res.json();
		if (json.status !== "OK") throw new Error(json.comment || "CF API error");

		// Only append new submissions
		let newSubs = json.result;
		if (lastCachedId) {
			const index = newSubs.findIndex((s: any) => s.id === lastCachedId);
			if (index !== -1) newSubs = newSubs.slice(0, index);
		}

		const merged = [...newSubs, ...cachedResults];
		const mergedUnique = merged.filter(
			(v, i, a) => a.findIndex((t) => t.id === v.id) === i
		);

		await writeCache({ status: "OK", result: mergedUnique });

		return new Response(
			JSON.stringify({ status: "OK", result: mergedUnique }),
			{
				status: 200,
				headers: {
					"content-type": "application/json",
					"cache-control": "public, s-maxage=600, stale-while-revalidate=600",
				},
			}
		);
	} catch (e: any) {
		console.error("CF API fetch failed:", e.message);
		// fallback to cached data
		return new Response(JSON.stringify(cache), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	}
}
