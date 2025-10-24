import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useMemo, useState } from "react";

type Props = {
	html?: string;
	css?: string;
	js?: string;
	height?: number;
};

export function CodePreview({
	html = "",
	css = "",
	js = "",
	height = 400,
}: Props) {
	const [copiedTab, setCopiedTab] = useState<string | null>(null);
	const [isDark, setIsDark] = useState(false);

	// Detect theme from document
	useEffect(() => {
		const checkTheme = () => {
			setIsDark(document.documentElement.classList.contains("dark"));
		};
		checkTheme();

		// Watch for theme changes
		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const srcDoc = useMemo(() => {
		return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>${css}</style>
</head>
<body>
${html}
<script type="module">${js}</script>
</body>
</html>`;
	}, [html, css, js]);

	const handleCopy = async (text: string, tab: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedTab(tab);
			setTimeout(() => setCopiedTab(null), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<Tabs
			defaultValue="preview"
			className="w-full">
			<TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="html">HTML</TabsTrigger>
				{css && <TabsTrigger value="css">CSS</TabsTrigger>}
				{js && <TabsTrigger value="js">JavaScript</TabsTrigger>}
			</TabsList>

			<TabsContent
				value="preview"
				className="mt-4">
				<div className="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
					<iframe
						title="Code Preview"
						className="w-full bg-white dark:bg-slate-50"
						style={{ height: `${height}px` }}
						srcDoc={srcDoc}
						sandbox="allow-scripts"
					/>
				</div>
			</TabsContent>

			<TabsContent
				value="html"
				className="mt-4">
				<div className="relative">
					<Button
						size="sm"
						variant="ghost"
						className="absolute right-2 top-2 z-10"
						onClick={() => handleCopy(html, "html")}
						aria-label="Copy HTML code">
						{copiedTab === "html" ? (
							<Check className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</Button>
					<div className="rounded-lg border border-border overflow-hidden max-h-[500px] overflow-y-auto">
						<Highlight
							theme={isDark ? themes.vsDark : themes.github}
							code={html}
							language="markup">
							{({
								className,
								style,
								tokens,
								getLineProps,
								getTokenProps,
							}) => (
								<pre
									className={className}
									style={{
										...style,
										margin: 0,
										padding: "1rem",
										fontSize: "0.875rem",
									}}>
									{tokens.map((line, i) => (
										<div
											key={i}
											{...getLineProps({ line })}>
											<span className="inline-block w-8 text-right mr-4 opacity-50">
												{i + 1}
											</span>
											{line.map((token, key) => (
												<span
													key={key}
													{...getTokenProps({
														token,
													})}
												/>
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					</div>
				</div>
			</TabsContent>

			{css && (
				<TabsContent
					value="css"
					className="mt-4">
					<div className="relative">
						<Button
							size="sm"
							variant="ghost"
							className="absolute right-2 top-2 z-10"
							onClick={() => handleCopy(css, "css")}
							aria-label="Copy CSS code">
							{copiedTab === "css" ? (
								<Check className="h-4 w-4" />
							) : (
								<Copy className="h-4 w-4" />
							)}
						</Button>
						<div className="rounded-lg border border-border overflow-hidden max-h-[500px] overflow-y-auto">
							<Highlight
								theme={isDark ? themes.vsDark : themes.github}
								code={css}
								language="css">
								{({
									className,
									style,
									tokens,
									getLineProps,
									getTokenProps,
								}) => (
									<pre
										className={className}
										style={{
											...style,
											margin: 0,
											padding: "1rem",
											fontSize: "0.875rem",
										}}>
										{tokens.map((line, i) => (
											<div
												key={i}
												{...getLineProps({ line })}>
												<span className="inline-block w-8 text-right mr-4 opacity-50">
													{i + 1}
												</span>
												{line.map((token, key) => (
													<span
														key={key}
														{...getTokenProps({
															token,
														})}
													/>
												))}
											</div>
										))}
									</pre>
								)}
							</Highlight>
						</div>
					</div>
				</TabsContent>
			)}

			{js && (
				<TabsContent
					value="js"
					className="mt-4">
					<div className="relative">
						<Button
							size="sm"
							variant="ghost"
							className="absolute right-2 top-2 z-10"
							onClick={() => handleCopy(js, "js")}
							aria-label="Copy JavaScript code">
							{copiedTab === "js" ? (
								<Check className="h-4 w-4" />
							) : (
								<Copy className="h-4 w-4" />
							)}
						</Button>
						<div className="rounded-lg border border-border overflow-hidden max-h-[500px] overflow-y-auto">
							<Highlight
								theme={isDark ? themes.vsDark : themes.github}
								code={js}
								language="javascript">
								{({
									className,
									style,
									tokens,
									getLineProps,
									getTokenProps,
								}) => (
									<pre
										className={className}
										style={{
											...style,
											margin: 0,
											padding: "1rem",
											fontSize: "0.875rem",
										}}>
										{tokens.map((line, i) => (
											<div
												key={i}
												{...getLineProps({ line })}>
												<span className="inline-block w-8 text-right mr-4 opacity-50">
													{i + 1}
												</span>
												{line.map((token, key) => (
													<span
														key={key}
														{...getTokenProps({
															token,
														})}
													/>
												))}
											</div>
										))}
									</pre>
								)}
							</Highlight>
						</div>
					</div>
				</TabsContent>
			)}
		</Tabs>
	);
}
