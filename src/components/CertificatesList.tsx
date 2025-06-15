import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";

interface Certificate {
	name: string;
	issuer: string;
	issuingDate: string;
	credentialId: string;
	credentialUrl: string;
}

interface CertificatesListProps {
	certificates: Certificate[];
	className?: string;
}

interface CertificateItemProps {
	certificate: Certificate;
}

// Individual Certificate Item Component
function CertificateItem({ certificate }: CertificateItemProps) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.3,
						ease: "easeOut",
					},
				},
			}}
			whileHover={{ y: -2 }}
			className="group relative bg-gradient-to-r from-orange-50/80 to-orange-100/60 dark:from-orange-950/30 dark:to-orange-900/20 border border-vibrant-orange/20 rounded-xl p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-orange-200/30 dark:hover:shadow-orange-900/20">
			{/* Certificate Icon */}
			<div className="absolute top-4 right-4">
				<div className="w-10 h-10 bg-gradient-to-br from-vibrant-orange to-orange-600 rounded-full flex items-center justify-center shadow-lg">
					<Award className="w-5 h-5 text-white" />
				</div>
			</div>

			{/* Content */}
			<div className="pr-16">
				{/* Certificate Name */}
				<h3 className="text-lg font-bold text-foreground mb-2 transition-colors duration-150 group-hover:text-vibrant-orange">
					{certificate.name}
				</h3>

				{/* Issuer and Date */}
				<div className="flex items-center gap-4 mb-3">
					<div className="flex items-center gap-2 text-sm text-foreground/70">
						<span className="font-semibold text-vibrant-orange dark:text-orange-400">
							{certificate.issuer}
						</span>
					</div>
					<div className="flex items-center gap-1 text-xs">
						<Calendar className="w-3 h-3 text-vibrant-orange/70" />
						<Badge
							variant="outline"
							className="border-vibrant-orange/30 text-vibrant-orange/80 text-xs">
							{certificate.issuingDate}
						</Badge>
					</div>
				</div>

				{/* Credential ID (if available) */}
				{certificate.credentialId &&
					certificate.credentialId !== "N/A" && (
						<div className="mb-4">
							<span className="text-xs text-foreground/60">
								Credential ID:{" "}
							</span>
							<code className="text-xs bg-muted/50 px-2 py-1 rounded border font-mono">
								{certificate.credentialId}
							</code>
						</div>
					)}

				{/* View Certificate Button */}
				<Button
					variant="outline"
					size="sm"
					className="mt-2 border-vibrant-orange/30 text-vibrant-orange hover:bg-vibrant-orange hover:text-white transition-colors duration-150"
					asChild>
					<a
						href={certificate.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2">
						<ExternalLink className="w-3 h-3" />
						View Certificate
					</a>
				</Button>
			</div>

			{/* Decorative line */}
			<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-vibrant-orange to-orange-600 rounded-l-xl opacity-60 transition-opacity duration-150 group-hover:opacity-100"></div>
		</motion.div>
	);
}

// Main Certificates List Component
export function CertificatesList({
	certificates,
	className,
}: CertificatesListProps) {
	return (
		<motion.div
			className={cn("space-y-4", className)}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "0px 0px -50px 0px" }}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.05,
					},
				},
			}}>
			{certificates.map((certificate, index) => (
				<CertificateItem
					key={`${certificate.name}-${index}`}
					certificate={certificate}
				/>
			))}
		</motion.div>
	);
}
