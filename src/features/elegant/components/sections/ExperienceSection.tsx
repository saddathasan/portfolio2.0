import {
	experience,
	companyPeriod,
	formatPeriod,
	type Company,
} from "@/data/site";

// One company: name + span, the promotion ladder (each role + its dates), an
// optional note, then the highlights from the most senior role. When a company
// has a single role, the role is shown inline (no redundant second date line).
function CompanyItem({ company }: { company: Company }) {
	const span = companyPeriod(company);
	const senior = company.roles[company.roles.length - 1];
	const highlights = senior.highlights ?? [];
	const multiRole = company.roles.length > 1;

	return (
		<div className="border-t border-line py-6">
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="font-display text-[1.08rem] font-medium text-ink">
					{company.company}
				</h3>
				{span ? (
					<span className="shrink-0 text-[0.82rem] tabular-nums text-ink-muted">
						{span}
					</span>
				) : null}
			</div>

			{company.formerName ? (
				<p className="mt-0.5 text-[0.8rem] text-ink-muted">
					formerly {company.formerName}
				</p>
			) : null}

			{multiRole ? (
				<ol className="mt-3 space-y-1.5">
					{company.roles.map((role) => {
						const period = formatPeriod(role.start, role.end);
						return (
							<li
								key={role.title}
								className="flex items-baseline justify-between gap-4 text-[0.95rem]"
							>
								<span className="text-ink-soft">{role.title}</span>
								{period ? (
									<span className="shrink-0 tabular-nums text-ink-muted">
										{period}
									</span>
								) : null}
							</li>
						);
					})}
				</ol>
			) : (
				<p className="mt-1 text-[0.95rem] text-ink-soft">
					{senior.title}
					{senior.type ? (
						<span className="text-ink-muted"> · {senior.type}</span>
					) : null}
				</p>
			)}

			{company.note ? (
				<p className="mt-2 text-[0.85rem] italic text-ink-muted">
					{company.note}
				</p>
			) : null}

			{highlights.length ? (
				<ul className="mt-4 space-y-2 border-l border-line pl-4">
					{highlights.map((h) => (
						<li
							key={h.slice(0, 32)}
							className="text-[0.92rem] leading-[1.6] text-ink-soft"
						>
							{h}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

// Content only — Section shell applied by the registry.
export function ExperienceSection() {
	return (
		<div>
			{experience.map((company) => (
				<CompanyItem key={company.id} company={company} />
			))}
		</div>
	);
}
