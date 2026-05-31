import "../elegant.css";
import { homeSections } from "../sections.config";
import { Section } from "./primitives/Section";
import { TopBar } from "./TopBar";
import { HeroSection } from "./sections/HeroSection";

// The elegant GUI home: a single quiet scroll, wrapped in `.gui-root .gui-dark`
// (the warm dark token scope, see elegant.css), isolated from the terminal's
// global `.dark` theme. Section order/numbering/nav are all driven by
// sections.config.tsx — reorder that array and everything below follows.
export function GuiHome() {
	return (
		<div id="top" className="gui-root gui-dark">
			<TopBar />
			<div className="mx-auto max-w-[44rem] px-6">
				<HeroSection />
				{homeSections.map((s, i) => (
					<Section
						key={s.id}
						id={s.id}
						index={String(i + 1).padStart(2, "0")}
						title={s.title}
					>
						<s.Component />
					</Section>
				))}
			</div>
			<footer className="border-t border-line">
				<div className="mx-auto flex max-w-[44rem] flex-wrap items-center justify-between gap-2 px-6 py-8 text-[0.8rem] text-ink-muted">
					<span>© 2026 Saddat Hasan</span>
					<span>Built with React &amp; TanStack Router</span>
				</div>
			</footer>
		</div>
	);
}
