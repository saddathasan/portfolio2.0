import { WorkRow } from "../primitives/WorkRow";
import { certificates } from "@/data/certificates";

// Content only — reuses WorkRow (title + issuer + date, links to credential).
export function CertificatesSection() {
	return (
		<ul>
			{certificates.map((c) => (
				<li key={c.name}>
					<WorkRow
						title={c.name}
						note={c.issuer}
						meta={c.issuingDate}
						href={
							c.credentialUrl && c.credentialUrl !== "N/A"
								? c.credentialUrl
								: undefined
						}
					/>
				</li>
			))}
		</ul>
	);
}
