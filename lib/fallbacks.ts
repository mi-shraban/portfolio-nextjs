import fs from "fs";
import path from "path";

const fallbackPath = path.join(process.cwd(), "data", "fallbacks.json");

// Read current fallback values
export function getFallbacks() {
	try {
		const data = fs.readFileSync(fallbackPath, "utf8");
		return JSON.parse(data);
	} catch {
		return { FALLBACK_CF: 290, FALLBACK_LC: 198 }; // default
	}
}

// Update fallback values and persist them
export function updateFallbacks(newData: Record<string, number>) {
	const current = getFallbacks();
	const updated = { ...current, ...newData };
	fs.writeFileSync(fallbackPath, JSON.stringify(updated, null, 2));
	return updated;
}
