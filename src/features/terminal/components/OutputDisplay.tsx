import type { Project } from "@/shared/types";
import type { AboutInfo } from "@/data/about";
import type { Experience, SkillCategory } from "@/data/experience";
import type { ContactInfo } from "@/data/contact";
import type {
	BlogListingPayload,
	BlogPostPayload,
} from "@/features/blog/lib/terminal-fs";
import { terminalMdxComponents } from "@/features/blog/components/terminal-mdx-components";

/* ───────────────────────────────────────────────────────────────────────────
   Terminal output — restrained, near-monochrome presentation.

   Hierarchy comes from brightness + spacing + alignment, not color: headings
   gray-100, body gray-300/400, labels/meta gray-500, hairline rules gray-800.
   No gradient cards, no emoji, no boxed JSON. Plain prose for prose; a light
   hairline table only where data is genuinely tabular (skills). (clig.dev:
   "keep the output clean, predictable, boring, and fast".)
   ─────────────────────────────────────────────────────────────────────────── */

type AnyRec = Record<string, unknown>;
const isObj = (v: unknown): v is AnyRec =>
	typeof v === "object" && v !== null && !Array.isArray(v);

const skillNames = (skills: SkillCategory["skills"]): string =>
	(skills as Array<string | { name: string }>)
		.map((s) => (typeof s === "string" ? s : s.name))
		.join("  ·  ");

// ── shared bits ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
	return (
		<div className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
			{children}
		</div>
	);
}

function Link({ href }: { href: string }) {
	return (
		<a
			href={href}
			target={href.startsWith("http") ? "_blank" : undefined}
			rel={href.startsWith("http") ? "noreferrer" : undefined}
			className="text-gray-200 underline decoration-gray-700 underline-offset-2 transition-colors hover:text-gray-100 hover:decoration-gray-400 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
		>
			{href.replace(/^https?:\/\//, "")}
		</a>
	);
}

// label + value rows with an aligned label column
function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="grid grid-cols-[5rem_1fr] gap-x-3">
			<span className="text-gray-500">{label}</span>
			<span className="text-gray-300">{children}</span>
		</div>
	);
}

// ── views ────────────────────────────────────────────────────────────────────

function AboutView({ data }: { data: AboutInfo }) {
	return (
		<div className="mb-4 max-w-2xl">
			<div className="text-gray-100">{data.name}</div>
			<div className="text-sm text-gray-500">
				{data.title} · {data.location} · {data.experience}
			</div>

			<div className="mt-4 space-y-2 text-gray-300">
				{data.bio.map((p) => (
					<p key={p.slice(0, 20)}>{p}</p>
				))}
			</div>

			<div className="mt-5">
				<SectionLabel>what i do</SectionLabel>
				<ul className="space-y-1 text-gray-400">
					{data.whatIDo.map((item) => (
						<li key={item} className="flex gap-2">
							<span className="text-gray-600">·</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function ProjectView({ data }: { data: Project }) {
	return (
		<div className="mb-4 max-w-2xl">
			<div className="text-gray-100">{data.title}</div>
			<p className="mt-1 text-gray-300">{data.description}</p>
			<div className="mt-3 space-y-1">
				<Field label="stack">{data.technologies.join("  ·  ")}</Field>
				{data.impact ? <Field label="impact">{data.impact}</Field> : null}
				{data.liveUrl ? (
					<Field label="live">
						<Link href={data.liveUrl} />
					</Field>
				) : null}
				{data.sourceUrl ? (
					<Field label="code">
						<Link href={data.sourceUrl} />
					</Field>
				) : null}
			</div>
		</div>
	);
}

function SkillsView({ data }: { data: SkillCategory[] }) {
	return (
		<div className="mb-4 max-w-2xl">
			<SectionLabel>skills</SectionLabel>
			<div className="border-y border-dashed border-gray-700">
				{data.map((cat) => (
					<div
						key={cat.title}
						className="grid grid-cols-[6rem_1fr] gap-x-3 border-b border-dashed border-gray-800 py-1.5 last:border-b-0 sm:grid-cols-[8rem_1fr]"
					>
						<span className="text-gray-500">{cat.title.toLowerCase()}</span>
						<span className="text-gray-300">{skillNames(cat.skills)}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function ExperienceView({ data }: { data: Experience[] }) {
	return (
		<div className="mb-4 max-w-2xl">
			<SectionLabel>experience</SectionLabel>
			<div className="space-y-5">
				{data.map((exp) => (
					<div key={exp.id}>
						<div className="flex items-baseline justify-between gap-4">
							<span className="text-gray-100">{exp.company}</span>
							{exp.period && exp.period !== "—" ? (
								<span className="shrink-0 text-sm text-gray-500">{exp.period}</span>
							) : null}
						</div>
						<div className="text-sm text-gray-500">
							{exp.role}
							{exp.type ? ` · ${exp.type}` : ""}
						</div>
						{exp.achievements?.length ? (
							<ul className="mt-2 space-y-1 text-gray-400">
								{exp.achievements.map((a) => (
									<li key={a.slice(0, 24)} className="flex gap-2">
										<span className="text-gray-600">·</span>
										<span>{a}</span>
									</li>
								))}
							</ul>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}

function ContactView({ data }: { data: ContactInfo[] }) {
	return (
		<div className="mb-4 max-w-2xl">
			<SectionLabel>contact</SectionLabel>
			<div className="space-y-1">
				{data.map((c) => (
					<Field key={c.title} label={c.title.toLowerCase()}>
						{c.link ? <Link href={c.link} /> : c.content}
					</Field>
				))}
			</div>
		</div>
	);
}

// `ls /blog` (and category dirs): an aligned, dashed TUI table.
function BlogListingView({ data }: { data: BlogListingPayload }) {
	const cols = "grid grid-cols-[6rem_6rem_4rem_1fr] gap-x-3";
	return (
		<div className="mb-4 max-w-2xl">
			<SectionLabel>{data.heading}</SectionLabel>
			{data.rows.length === 0 ? (
				<div className="text-gray-500">no posts here yet</div>
			) : (
				<>
					<div className="border-y border-dashed border-gray-700">
						<div className={`${cols} py-1.5 text-xs uppercase tracking-[0.14em] text-gray-500`}>
							<span>date</span>
							<span>category</span>
							<span>read</span>
							<span>slug · title</span>
						</div>
						{data.rows.map((r) => (
							<div
								key={r.slug}
								className={`${cols} border-t border-dashed border-gray-800 py-1.5`}
							>
								<span className="tabular-nums text-gray-500">{r.date}</span>
								<span className="text-gray-400">{r.category}</span>
								<span className="tabular-nums text-gray-500">{r.read}</span>
								<span className="min-w-0">
									{/* The slug is what you `cat` — show it brightly, title dim. */}
									<span className="text-gray-100">{r.slug}</span>
									<span className="text-gray-500"> · {r.title}</span>
								</span>
							</div>
						))}
					</div>
					<div className="mt-2 text-xs text-gray-600">
						{data.rows.length} {data.rows.length === 1 ? "post" : "posts"} · type{" "}
						<span className="text-gray-400">cat {data.rows[0].slug}</span> to read
						(or <span className="text-gray-400">open {data.rows[0].slug}</span> for
						the GUI)
					</div>
				</>
			)}
		</div>
	);
}

// `cat <slug>`: the post, fully rendered in terminal style (same compiled MDX
// body as the GUI, different component map).
function BlogPostView({ data }: { data: BlogPostPayload }) {
	const { Body } = data;
	return (
		<div className="mb-4 max-w-2xl">
			<div className="text-gray-100">{data.title}</div>
			<div className="text-sm text-gray-500">
				{data.date} · {data.category} · {data.read}
				{data.updated ? ` · updated ${data.updated}` : ""}
			</div>

			<div className="mt-4 border-t border-dashed border-gray-800 pt-4">
				<Body components={terminalMdxComponents} />
			</div>

			{data.tags.length > 0 ? (
				<div className="mt-5 text-xs text-gray-600">
					{data.tags.map((t) => `#${t}`).join("  ")}
				</div>
			) : null}
			<div className="mt-3 border-t border-dashed border-gray-800 pt-3 text-xs text-gray-600">
				open ↗ read in the GUI — type: open {data.slug}
			</div>
		</div>
	);
}

// minimal, un-boxed fallback for anything unrecognised
function Generic({ data }: { data: unknown }) {
	return (
		<pre className="mb-4 max-w-2xl overflow-x-auto whitespace-pre-wrap text-gray-400">
			{JSON.stringify(data, null, 2)}
		</pre>
	);
}

// ── dispatcher ───────────────────────────────────────────────────────────────

interface OutputDisplayProps {
	content: unknown;
}

export function OutputDisplay({ content }: OutputDisplayProps) {
	if (content === null || content === undefined || content === "") return null;

	if (typeof content === "string") {
		return <div className="mb-2 whitespace-pre-wrap text-gray-300">{content}</div>;
	}

	if (Array.isArray(content)) {
		if (content.length === 0) return null;
		const first = content[0];
		if (isObj(first) && Array.isArray(first.skills)) {
			return <SkillsView data={content as SkillCategory[]} />;
		}
		if (isObj(first) && "company" in first && "role" in first) {
			return <ExperienceView data={content as Experience[]} />;
		}
		if (isObj(first) && "content" in first && "title" in first) {
			return <ContactView data={content as ContactInfo[]} />;
		}
		return <Generic data={content} />;
	}

	if (isObj(content)) {
		if (content.displayType === "about") {
			return <AboutView data={content as unknown as AboutInfo} />;
		}
		if (content.displayType === "project") {
			return <ProjectView data={content as unknown as Project} />;
		}
		if (content.displayType === "blog-listing") {
			return <BlogListingView data={content as unknown as BlogListingPayload} />;
		}
		if (content.displayType === "blog-post") {
			return <BlogPostView data={content as unknown as BlogPostPayload} />;
		}
		return <Generic data={content} />;
	}

	return null;
}
