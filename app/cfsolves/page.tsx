"use client"
import { useEffect, useMemo, useState } from 'react'

import type {Metadata} from "next";
export const metadata: Metadata = {
	title: 'Md. Monowarul Islam Shraban - Codeforces Solves',
	description: "All the programming problems solved by Monowarul Islam on Codeforces",
	metadataBase: new URL('https://monowarulislam.vercel.app/cfsolves'),
	openGraph: {
		title: 'Monowarul Islam Shraban',
		description: 'All the programming problems solved by Monowarul Islam on Codeforces',
		type: 'webpage',
		url: 'https://monowarulislam.vercel.app/cfsolves'
	}
};

type Submission = {
	sub_id: number
	name: string
	id: string
	contestId?: number
	index?: string
	verdict: string
	language: string
	time: string
}

const handle = 'xordan.-'
const pageSize = 14

function getLanguage(lang?: string) {
	const lower = (lang || '').toLowerCase()
	if (lower.includes('py')) return 'Python'
	if (lower.includes('c++')) return 'C++'
	if (lower.includes('javascript')) return 'JavaScript'
	return lang || 'Unknown'
}

function getFileName(language: string, id: string) {
	if (language === 'Python') return `${id}.py`
	if (language === 'C++') return `${id}.cpp`
	return ''
}

export default function CFPage() {
	const [subs, setSubs] = useState<Submission[]>([])
	const [langCount, setLangCount] = useState<Record<string, number>>({})
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const totalPages = Math.max(1, Math.ceil(subs.length / pageSize))
	const pageItems = useMemo(
		() => subs.slice((page - 1) * pageSize, Math.min(page * pageSize, subs.length)),
		[subs, page]
	)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)
			try {
				const res = await fetch(`/api/codeforces?handle=${handle}&from=1&count=3000`)
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				const data = await res.json()
				if (data.status !== 'OK') throw new Error(data.comment || 'API error')

                const seen = new Set<string>()
                const lc: Record<string, number> = {}
                const processed: Submission[] = []
                for (const sub of data.result as any[]) {
                    const verdict = sub.verdict || 'UNKNOWN'
                    if (verdict !== 'OK') continue
                    const problem = sub.problem || {}
                    const name: string = problem.name || 'Unknown Problem'
                    const key = `${problem.contestId || 'N/A'}${problem.index || '?'}`
                    if (seen.has(key)) continue
                    seen.add(key)
                    const language = getLanguage(sub.programmingLanguage)
                    lc[language] = (lc[language] || 0) + 1
                    processed.push({
                        sub_id: sub.id,
                        name,
                        id: key,
                        contestId: problem.contestId,
                        index: problem.index,
                        verdict,
                        language,
                        time: new Date(sub.creationTimeSeconds * 1000).toLocaleString()
                    })
                }
				setSubs(processed)
				setLangCount(lc)
				setPage(1)
			} catch (e: any) {
				setError(e.message || 'Failed to fetch submissions')
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	if (loading) return <div className="cfWrap">Fetching submissions...</div>
	if (error) return <div className="cfWrap">Error: {error}</div>

	const sortedLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1])
	const topLangs = sortedLangs.slice(0, 2).map(([k]) => k).join(', ')

	return (
		<div className="cfWrap">
			<h2 className="cfHeader">Codeforces Submissions of <a className="ab_link" href={`https://codeforces.com/profile/${handle}`} target="_blank" rel="noopener noreferrer">[{handle}]</a></h2>
			<div className="cfStats">
				<div><div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 22, textAlign: "center" }}>{subs.length}</div><div className="muted">Problems Solved</div></div>
				<div><div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 22, textAlign: "center" }}>{topLangs || 'N/A'}</div><div className="muted">Most Used Languages</div></div>
				<div><div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 22, textAlign: "center"}}>{Object.keys(langCount).length}</div><div className="muted">Languages Used</div></div>
			</div>
			<div className="cfList">
				{pageItems.map(s => {
					const problemUrl = (s.contestId && s.index) ? `https://codeforces.com/contest/${s.contestId}/problem/${s.index}` : '#'
					const file = getFileName(s.language, s.id)
					const solUrl = file ? `https://github.com/mi-shraban/cf_solves/blob/main/${file}` : ''
					return (
						<div key={s.sub_id} className="cfItem">
						<div className="cfTitle">Problem: <a className="ab_link" target="_blank" rel="noopener noreferrer" href={problemUrl}>[{s.name}]</a></div>
							<div className="cfMeta">Language used: <b>{s.language}</b></div>
							<div className="cfMeta">Submitted on: <b>{s.time}</b></div>
							{solUrl && <div style={{ marginTop: 8 }}><a className="btn" href={solUrl} target="_blank" rel="noopener noreferrer">View my Solution</a></div>}
						</div>
					)
				})}
			</div>
			<div className="cfPager">
				{page > 1 && <button className="cfBtn" onClick={() => setPage(1)}>First</button>}
				{page > 1 && <button className="cfBtn" onClick={() => setPage(p => Math.max(1, p - 1))}>«</button>}
				{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
					// windowed buttons around current page
					let start = Math.max(1, page - 3)
					let end = Math.min(totalPages, start + 4)
					if (end - start < 4) start = Math.max(1, end - 4)
					const n = start + i
					if (n > end) return null
					return (
						<button key={n} className={`cfBtn ${n === page ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
					)
				})}
				{page < totalPages && <button className="cfBtn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>»</button>}
				{page < totalPages && <button className="cfBtn" onClick={() => setPage(totalPages)}>Last</button>}
			</div>
		</div>
	)
}