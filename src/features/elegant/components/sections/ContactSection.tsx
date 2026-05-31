const EMAIL = "saddathasan94@gmail.com";

const elsewhere = [
	{ label: "GitHub", href: "https://github.com/saddathasan" },
	{ label: "LinkedIn", href: "https://linkedin.com/in/saddathasan" },
	{ label: "X", href: "https://x.com/ekjongoru" },
	{ label: "Résumé", href: "/resume.pdf" },
];

// Content only — Section shell applied by the registry.
export function ContactSection() {
	return (
		<>
			<p className="max-w-[40ch] text-[1.05rem] leading-[1.7] text-ink-soft">
				Open to new opportunities and collaborations. The fastest way to reach
				me is email.
			</p>

			<a
				href={`mailto:${EMAIL}`}
				className="gui-link mt-7 inline-block font-display text-[clamp(1.4rem,4vw,2rem)] font-medium tracking-[-0.01em] text-ink"
			>
				{EMAIL}
			</a>

			<div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
				{elsewhere.map((e) => (
					<a
						key={e.label}
						href={e.href}
						target={e.href.startsWith("http") ? "_blank" : undefined}
						rel={e.href.startsWith("http") ? "noreferrer" : undefined}
						className="gui-link text-ink"
					>
						{e.label}
					</a>
				))}
			</div>
		</>
	);
}
