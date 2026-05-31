import { Link } from "@tanstack/react-router";
import { Reveal } from "../primitives/Reveal";
import { profile } from "@/data/site";

// Opening statement — the only section without a numbered eyebrow. Identity,
// a strong one-line value statement, an availability marker. Lots of air above.
export function HeroSection() {
	return (
		<header className="pt-[16vh] pb-20 md:pb-28">
			{profile.available ? (
				<Reveal delay={0}>
					<div className="flex items-center gap-2.5 text-[0.8rem] text-ink-muted">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-soft" />
						{profile.availabilityNote}
					</div>
				</Reveal>
			) : null}

			<Reveal delay={0.08}>
				<h1 className="mt-6 font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
					I build scalable web &amp; DevOps systems —{" "}
					<span className="font-serif italic font-normal text-ink-soft">
						clean, considered, resilient.
					</span>
				</h1>
			</Reveal>

			<Reveal delay={0.16}>
				<p className="mt-7 max-w-[46ch] text-[1.05rem] leading-[1.7] text-ink-soft">
					I&apos;m <span className="text-ink">{profile.name}</span>, a{" "}
					{profile.title.toLowerCase()} in {profile.location}. Currently at
					InfinitiBit GmbH, building AI-powered products with React, FastAPI
					&amp; PostgreSQL.
				</p>
			</Reveal>

			<Reveal delay={0.24}>
				<div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
					<a href="#contact" className="gui-link text-ink">
						Get in touch
					</a>
					<a href="#work" className="gui-link text-ink-muted">
						Selected work ↓
					</a>
					<Link to="/" className="gui-link text-ink-muted">
						terminal ↗
					</Link>
				</div>
			</Reveal>
		</header>
	);
}
