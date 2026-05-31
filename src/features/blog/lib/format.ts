// "2026-05-31" → "May 31, 2026". Parsed as UTC to avoid TZ off-by-one.
export const formatDate = (iso: string): string => {
	const d = new Date(`${iso}T00:00:00Z`);
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
};

// Short numeric form for tight columns, e.g. "2026-05-31".
export const isoDay = (iso: string): string => iso.slice(0, 10);
