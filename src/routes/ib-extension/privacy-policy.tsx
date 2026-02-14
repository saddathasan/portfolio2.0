import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ib-extension/privacy-policy")({
	component: PrivacyPolicy,
});

function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto space-y-8">
				{/* Header */}
				<div className="border-b pb-6">
					<h1 className="text-4xl font-extrabold tracking-tight scroll-m-20">
						Privacy Policy
					</h1>
					<p className="mt-2 text-muted-foreground">
						Effective Date: February 14, 2026
					</p>
				</div>

				{/* Introduction */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						Introduction
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						The <strong>IB Attendance Tracker</strong> is an internal productivity tool
						developed by 'saddat hasan' for <strong>InfinitiBit</strong> ("the
						Company") for its employees. This tool is designed to
						simplify daily attendance tracking within the company's
						ecosystem. We respect your privacy and are committed to
						protecting the limited data we collect. This Privacy
						Policy explains our data practices in compliance with
						the Chrome Web Store Developer Program Policies.
					</p>
				</section>

				{/* 1. Information We Collect */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						1. Information We Collect
					</h2>
					<p className="leading-7">
						We collect the minimum amount of data necessary to
						provide the attendance tracking service:
					</p>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>
							<strong>Authentication Data:</strong> We access the{" "}
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
								access_token
							</code>{" "}
							session cookie from{" "}
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
								ai-hrms.infinitibit.com
							</code>{" "}
							to verify your identity and authorize your
							attendance actions.
						</li>
						<li>
							<strong>Network Information:</strong> We collect
							your public IP address via{" "}
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
								api.ipify.org
							</code>{" "}
							solely for verifying your network location, as
							required by <strong>InfinitiBit</strong>'s
							attendance policy.
						</li>
						<li>
							<strong>Attendance Activity:</strong> We collect
							timestamps when you manually trigger actions such as
							"Start Day", "Break", "Resume Work", and "End Day".
						</li>
					</ul>
				</section>

				{/* 2. How We Use Your Information */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						2. How We Use Your Information
					</h2>
					<p className="leading-7">
						Your information is used strictly for the following
						purposes:
					</p>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>
							<strong>Service Functionality:</strong> To record
							your work hours and break times accurately in{" "}
							<strong>InfinitiBit</strong>'s centralized AI-HRMS
							system.
						</li>
						<li>
							<strong>Synchronization:</strong> To ensure your
							local extension state (timers, status) matches your
							official attendance record.
						</li>
						<li>
							<strong>Compliance:</strong> Verifying logging
							locations via IP address tagging on attendance
							records.
						</li>
					</ul>
				</section>

				{/* 3. Data Storage and Security */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						3. Data Storage and Security
					</h2>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>
							<strong>Local Storage:</strong> We use your
							browser's local storage (
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
								chrome.storage.local
							</code>
							) to cache your current status, user profile (name,
							job title), and daily activity timestamps. This data
							resides on your device to ensure the extension
							functions across browser restarts.
						</li>
						<li>
							<strong>External Storage:</strong> All permanent
							confirmed attendance records are transmitted
							securely via HTTPS to <strong>InfinitiBit</strong>'s
							servers (
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
								ai-hrms.infinitibit.com
							</code>
							). The extension itself does not maintain a separate
							database of your history.
						</li>
					</ul>
				</section>

				{/* 4. Third-Party Sharing */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						4. Third-Party Sharing
					</h2>
					<p className="leading-7">
						We do not sell, trade, or rent your personal
						identification information to others. Data is shared
						only with:
					</p>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>
							<strong>InfinitiBit (Your Employer):</strong>{" "}
							Attendance data and IP addresses are sent to the
							company's HRMS system as the primary function of
							this tool.
						</li>
						<li>
							<strong>Ipify:</strong> Your IP address is processed
							by{" "}
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
								ipify.org
							</code>{" "}
							strictly for retrieval purposes.
						</li>
					</ul>
				</section>

				{/* 5. User Control */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						5. User Control
					</h2>
					<p className="leading-7">
						You certify your attendance actions manually. You can
						clear the extension's local cache at any time by
						uninstalling the extension or clearing your browser's
						extension data, though this does not affect records
						already submitted to the HRMS system.
					</p>
				</section>

				{/* 6. Contact us */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight scroll-m-20 border-b pb-2">
						6. Contact us
					</h2>
					<p className="leading-7">
						If you have questions about this Privacy Policy or the
						data practices of this extension, please contact{" "}
						<strong>InfinitiBit</strong>'s HR department or the
						developer team at:
					</p>
					<div className="mt-4 rounded-md bg-muted p-4">
						<p>
							<strong>Developer:</strong> Saddat Hasan.
						</p>
						<p>
							<strong>Email:</strong>{" "}
							<a
								href="mailto:saddathasan94@gmail.com"
								className="text-primary hover:underline">
								saddathasan94@gmail.com
							</a>
						</p>
					</div>
				</section>

				<div className="pt-8 text-center text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} Saddat Hasan. All rights
					reserved.
				</div>
			</div>
		</div>
	);
}
