import { updateFallbacks } from "@/lib/fallbacks";

export async function POST(req: Request) {
	  try {
		  const body = await req.json();
		  const updated = updateFallbacks(body);
		  return Response.json({ success: true, updated });
	  } catch (error) {
		  return Response.json({ success: false, error: String(error) }, { status: 500 });
	  }
}
