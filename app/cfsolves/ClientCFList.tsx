"use client";

import { useState, useMemo } from "react";

type Submission = {
	sub_id: number;
	name: string;
	id: string;
	contestId?: number;
	index?: string;
	verdict: string;
	language: string;
	time: string;
};

function getFileName(language: string, id: string) {
	if (language === "Python") return `${id}.py`;
	if (language === "C++") return `${id}.cpp`;
	return "";
}

export default function ClientCFList({ subs }: { subs: Submission[] }) {
	const [page, setPage] = useState(1);
	const pageSize = 14;
	const totalPages = Math.max(1, Math.ceil(subs.length / pageSize));

	const pageItems = useMemo(
		() => subs.slice((page - 1) * pageSize, Math.min(page * pageSize, subs.length)),
		[subs, page]
	);

	return (
		<div className="cfList">
			{pageItems.map((s) => {
				const problemUrl =
					s.contestId && s.index
						? `https://codeforces.com/contest/${s.contestId}/problem/${s.index}`
						: "#";
				const file = getFileName(s.language, s.id);
				const solUrl = file
					? `https://github.com/mi-shraban/cf_solves/blob/main/${file}`
					: "";

				return (
					<div key={s.sub_id} className="cfItem">
						<div className="cfTitle">
							Problem:{" "}
							<a
								className="ab_link"
								target="_blank"
								rel="noopener noreferrer"
								href={problemUrl}
							>
								[{s.name}]
							</a>
						</div>
						<div className="cfMeta">
							Language used: <b>{s.language}</b>
						</div>
						<div className="cfMeta">
							Submitted on: <b>{s.time}</b>
						</div>
						{solUrl && (
							<div style={{ marginTop: 8 }}>
								<a className="btn" href={solUrl} target="_blank" rel="noopener noreferrer">
									View my Solution
								</a>
							</div>
						)}
					</div>
				);
			})}

			<div className="cfPager">
				{page > 1 && (
					<>
						<button className="cfBtn" onClick={() => setPage(1)}>First</button>
						<button className="cfBtn" onClick={() => setPage((p) => Math.max(1, p - 1))}>«</button>
					</>
				)}

				{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
					let start = Math.max(1, page - 3);
					let end = Math.min(totalPages, start + 4);
					if (end - start < 4) start = Math.max(1, end - 4);
					const n = start + i;
					if (n > end) return null;
					return (
						<button
							key={n}
							className={`cfBtn ${n === page ? "active" : ""}`}
							onClick={() => setPage(n)}
						>
							{n}
						</button>
					);
				})}

				{page < totalPages && (
					<>
						<button className="cfBtn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
							»
						</button>
						<button className="cfBtn" onClick={() => setPage(totalPages)}>
							Last
						</button>
					</>
				)}
			</div>
		</div>
	);
}