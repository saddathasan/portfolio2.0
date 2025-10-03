import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

interface ResumeDownloadButtonProps {
	className?: string;
	variant?: "default" | "compact";
	children?: React.ReactNode;
}

export function ResumeDownloadButton({
	className,
	variant = "default",
	children,
}: ResumeDownloadButtonProps) {
	const handleDownload = () => {
		window.open("/resume.pdf", "_blank", "noopener,noreferrer");
	};

	return (
		<button
			onClick={handleDownload}
			className={cn(
				// Base styles
				"group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 ease-out overflow-hidden",
				// Background solid color
				"bg-primary",
				// Text colors
				"text-primary-foreground",
				// Border and shadow
				"border border-primary/20 shadow-lg shadow-primary/25",
				// Hover effects
				"hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] hover:-translate-y-0.5",
				// Focus styles
				"focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
				// Active state
				"active:scale-[0.98] active:translate-y-0",
				// Responsive sizing
				variant === "compact" && "px-6 py-3 text-sm gap-2",
				className,
			)}
			aria-label="Download resume PDF"
			role="button"
			type="button">
			{/* Animated background overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

			{/* Content */}
			<div className="relative flex items-center gap-3">
				<Download
					className={cn(
						"transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12",
						variant === "compact" ? "h-4 w-4" : "h-5 w-5",
					)}
				/>
				<span className="font-medium">
					{children || "Download Resume"}
				</span>
			</div>

			{/* Pulse effect on hover */}
			<div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
		</button>
	);
}
