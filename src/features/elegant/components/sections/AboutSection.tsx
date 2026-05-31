import { profile } from "@/data/site";

// Content only — Section shell applied by the registry.
export function AboutSection() {
	return (
		<div className="max-w-[54ch] space-y-5 text-[1.02rem] leading-[1.75] text-ink-soft">
			{profile.bio.map((paragraph) => (
				<p key={paragraph.slice(0, 24)}>{paragraph}</p>
			))}
		</div>
	);
}
