"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from "next/image";

type Submission = {
	titleSlug: string
	title: string
	difficulty: string
	language: string
	timestamp: string
}

const handle = 'xordan77'
const pageSize = 20

function getLanguage(lang?: string) {
	const lower = (lang || '').toLowerCase()
	if (lower.includes('py'))
		return 'Python'
	if (lower.includes('c++'))
		return 'C++'
	if (lower.includes('javascript'))
		return 'JavaScript'
	return lang || 'Unknown'
}

function getFileName(titleSlug: string) {
	return `${titleSlug}/${titleSlug}.py`
}

function getLanguageIcon(language: string): string | null {
	if (language === 'Python')
		return '/icons/python.png'
	if (language === 'C++')
		return '/icons/cpp.png'
	return null
}

function getDifficultyColor(difficulty: string): string {
	switch(difficulty.toLowerCase()) {
		case 'easy':
			return '#00b894';
		case 'medium':
			return '#ffa500';
		case 'hard':
			return '#ff4444';
		default:
			return 'var(--text)';
	}
}

export default function LCPage() {
	const [subs, setSubs] = useState<Submission[]>([])
	const [diffCount, setDiffCount] = useState<Record<string, number>>({})
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
				const res = await fetch(`/api/leetcode?handle=${handle}`)
				
				if (!res.ok)
					throw new Error(`HTTP ${res.status}`)
				
				const data = await res.json()
				
				if (data.status === 'ERROR')
					throw new Error(data.comment || 'API error')
				
				const submissions = data.data?.recentAcSubmissionList || []
				const stats = data.data?.matchedUser?.submitStats?.acSubmissionNum || []
				
				// Get difficulty counts
				const dc: Record<string, number> = {}
				stats.forEach((stat: any) => {
					if (stat.difficulty !== 'All') {
						dc[stat.difficulty] = stat.count
					}
				})
				setDiffCount(dc)
				
				// Remove duplicates by titleSlug (keep only first occurrence)
				const seen = new Set<string>()
				const processed: Submission[] = []
				
				for (const sub of submissions) {
					if (!seen.has(sub.titleSlug)) {
						seen.add(sub.titleSlug)
						processed.push({
							titleSlug: sub.titleSlug,
							title: sub.title,
							difficulty: 'Easy', // Default, we don't have difficulty info from this endpoint
							language: 'Python',
							timestamp: new Date(parseInt(sub.timestamp) * 1000).toLocaleString()
						})
					}
				}
				
				setSubs(processed)
				setPage(1)
			} catch (e: any) {
				setError(e.message || 'Failed to fetch submissions')
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])
	
	// scrolls to top, everytime page changes
	useEffect(() => {
		window.scrollTo({ top: 435, behavior: 'smooth' })
	}, [page])

	if (loading)
  		return (
			<div className="cfsolves-page">
				<div className="cfWrap">
					<div className="cfSpinner"></div>
				</div>
			</div>
		);
	
	if (error)
		return (
			<div className="cfsolves-page">
				<div className="cfWrap">
					Error: {error}
				</div>
			</div>
		)
	
	const front = '>';
	const back = '<';

	return (
		<>
			<div className="cfSolves-page">
				<h2 className="cfHeader">LeetCode Submissions of <a className="as_link"
																	  href={`https://leetcode.com/u/${handle}`}
																	  target="_blank"
																	  rel="noopener noreferrer">[{handle}]</a></h2>
				<div className="cfStats" style={{columnGap: '10px', alignItems: 'center'}}>
					<div>
						<div style={{color: 'var(--primary)', fontWeight: 700, fontSize: 22, textAlign: "center"}}>
							{subs.length}
						</div>
						<div className="muted" style={{textAlign: "center"}}>
							Problems Solved
						</div>
					</div>
					<div>
						<div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
							{Object.entries(diffCount).map(([diff, count]) => (
								<div key={diff} style={{textAlign: 'center'}}>
									<div style={{color: getDifficultyColor(diff), fontWeight: 700, fontSize: 18}}>
										{count}
									</div>
									<div className="muted" style={{fontSize: 14}}>
										{diff}
									</div>
								</div>
							))}
						</div>
						<div className="muted" style={{textAlign: "center", marginTop: 5}}>
							By Difficulty
						</div>
					</div>
				</div>
				<div className="cfList">
				{pageItems.map((s, idx) => {
						const problemUrl = `https://leetcode.com/problems/${s.titleSlug}/`
						const file = getFileName(s.titleSlug)
						const solUrl = `https://github.com/mi-shraban/leetcode_solves/blob/main/${file}`
						const langIcon = getLanguageIcon(s.language)
						return (
							<div key={`${s.titleSlug}-${idx}`} className="cfItem">
								<div className="cfTitle">Problem: <a className="ab_link" target="_blank"
																	 rel="noopener noreferrer" href={problemUrl}>
									[{s.title}]</a>
								</div>
								<div className="cfMeta">
									Language used: <b>{s.language}</b>
								</div>
								<div className="cfMeta">
									Submitted on: <b>{s.timestamp}</b>
								</div>
								{
									solUrl &&
									<div style={{marginTop: 8}}>
										<a className="btn" href={solUrl} target="_blank"
																		  rel="noopener noreferrer">View my Solution
										</a>
									</div>
								}
								{langIcon && (
									<div className="cfIcon">
										<Image
											src={langIcon}
											alt={s.language}
											width={128}
											height={128}
											style={{ objectFit: 'contain' }}
										/>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
			<div className="cfPager">
				{page > 1 && <button className="cfBtn" onClick={() => setPage(1)}>First</button>}
				{page > 1 && <button className="cfBtn" onClick={() => setPage(p => Math.max(1, p - 1))}>{back}</button>}
				{Array.from({length: Math.min(3, totalPages)}, (_, i) => {
					// windowed buttons around current page
					let start = Math.max(1, page - 1)
					let end = Math.min(totalPages, start + 3)
					if (end - start < 3)
						start = Math.max(1, end - 3)
					const n = start + i
					if (n > end)
						return null
					return (
						<button key={n}
								className={`cfBtn ${n === page ? 'active' : ''}`}
								onClick={() => setPage(n)}
						>
							{n}
						</button>
					)
				})}
				{
					page < totalPages &&
					<button className="cfBtn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
						{front}
					</button>
				}
				{
					page < totalPages &&
					<button className="cfBtn" onClick={() => setPage(totalPages)}>
						Last
					</button>
				}
			</div>
		</>
	)
}