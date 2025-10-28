import { headers } from "next/headers";
import ClientCFList from "./ClientCFList";

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

const handle = "xordan.-";
const pageSize = 14;

function getLanguage(lang?: string) {
	const lower = (lang || "").toLowerCase();
	if (lower.includes("py")) return "Python";
	if (lower.includes("c++")) return "C++";
	if (lower.includes("javascript")) return "JavaScript";
	return lang || "Unknown";
}

function getFileName(language: string, id: string) {
	if (language === "Python") return `${id}.py`;
	if (language === "C++") return `${id}.cpp`;
	return "";
}

async function getSubmissions(): Promise<Submission[]> {
	const h = headers();
	const host = h.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
	const baseUrl = `${protocol}://${host}`;

	const res = await fetch(
		`${baseUrl}/api/codeforces?handle=${handle}&from=1&count=100`,
		{ next: { revalidate: 600 } }
	);

	if (!res.ok) throw new Error("Failed to fetch submissions");
	const data = await res.json();

	const seen = new Set<string>();
	const processed: Submission[] = [];

	for (const sub of data.result as any[]) {
		const verdict = sub.verdict || "UNKNOWN";
		if (verdict !== "OK") continue;
		const problem = sub.problem || {};
		const name: string = problem.name || "Unknown Problem";
		const key = `${problem.contestId || "N/A"}${problem.index || "?"}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const language = getLanguage(sub.programmingLanguage);
		processed.push({
			sub_id: sub.id,
			name,
			id: key,
			contestId: problem.contestId,
			index: problem.index,
			verdict,
			language,
			time: new Date(sub.creationTimeSeconds * 1000).toLocaleString(),
		});
	}

	return processed;
}

export default async function CFPage() {
	const subs = await getSubmissions();

	const langCount: Record<string, number> = {};
	subs.forEach((s) => {
		langCount[s.language] = (langCount[s.language] || 0) + 1;
	});

	const sortedLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
	const topLangs = sortedLangs.slice(0, 2).map(([k]) => k).join(", ");

	return (
		<div className="cfWrap">
			<h2 className="cfHeader">
				Codeforces Submissions of{" "}
				<a
					className="ab_link"
					href={`https://codeforces.com/profile/${handle}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					[{handle}]
				</a>
			</h2>
			<div className="cfStats">
				<div>
					<div
						style={{
							color: "var(--primary)",
							fontWeight: 700,
							fontSize: 22,
							textAlign: "center",
						}}
					>
						{subs.length}
					</div>
					<div className="muted">Problems Solved</div>
				</div>
				<div>
					<div
						style={{
							color: "var(--primary)",
							fontWeight: 700,
							fontSize: 22,
							textAlign: "center",
						}}
					>
						{topLangs || "N/A"}
					</div>
					<div className="muted">Most Used Languages</div>
				</div>
				<div>
					<div
						style={{
							color: "var(--primary)",
							fontWeight: 700,
							fontSize: 22,
							textAlign: "center",
						}}
					>
						{Object.keys(langCount).length}
					</div>
					<div className="muted">Languages Used</div>
				</div>
			</div>

			{/* Client pagination (hydrated on client) */}
			<ClientCFList subs={subs} />
		</div>
	);
}