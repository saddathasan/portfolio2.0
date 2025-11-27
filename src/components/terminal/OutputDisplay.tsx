import type { Project } from "@/types";
import { JsonViewer } from "./JsonViewer";

interface OutputDisplayProps {
	content: unknown;
}

export function OutputDisplay({ content }: OutputDisplayProps) {
	if (!content) return null;

	if (typeof content === "string") {
		return <div className="whitespace-pre-wrap mb-2 text-gray-300">{content}</div>;
	}


	if (Array.isArray(content)) {
		// Use JsonViewer for arrays of objects (like skills.json, contact.txt)
		return (
			<div className="mb-4 max-w-4xl">
				<div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg overflow-hidden">
					<div className="bg-gray-800/70 px-4 py-2 border-b border-cyan-500/30 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-cyan-400">📄</span>
							<span className="text-cyan-400 font-mono text-sm font-bold">JSON Array</span>
						</div>
						<span className="text-gray-500 text-xs">{content.length} items</span>
					</div>
					<div className="p-4 bg-black/20">
						<pre className="text-sm md:text-base font-mono overflow-x-auto">
							<JsonViewer data={content} />
						</pre>
					</div>
				</div>
			</div>
		);
	}

	if (typeof content === "object") {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data = content as any;
		// Custom rendering based on displayType
		if (data.displayType === "about") {
			return (
				<div className="mb-4 max-w-4xl">
					{/* Header Card */}
					<div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-400 p-4 mb-4 rounded">
						<h2 className="text-2xl font-bold text-cyan-400 mb-1">👤 {data.name}</h2>
						<p className="text-blue-300 text-lg">{data.title}</p>
						<p className="text-gray-400 flex items-center gap-2 mt-1">
							<span>📍</span> {data.location} <span className="text-gray-600">•</span> {data.experience}
						</p>
					</div>

					{/* Bio Section */}
					<div className="mb-4 p-4 bg-gray-900/30 rounded border border-gray-800">
						<h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
							<span>📝</span> About Me
						</h3>
						<div className="space-y-2 text-gray-300 leading-relaxed">
							{data.bio.map((line: string, i: number) => (
								<p key={i} className="pl-4 border-l-2 border-gray-700">{line}</p>
							))}
						</div>
					</div>

					{/* What I Do Section */}
					<div className="p-4 bg-gray-900/30 rounded border border-gray-800">
						<h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
							<span>💼</span> What I Do
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{data.whatIDo.map((item: string, i: number) => (
								<div key={i} className="flex items-start gap-2 text-gray-300">
									<span className="text-green-400 mt-0.5">▸</span>
									<span>{item}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			);
		}

		if (data.displayType === "project") {
			const project = data as Project;
			return (
				<div className="mb-4 max-w-4xl">
					<div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-lg overflow-hidden">
						{/* Header */}
						<div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 border-b border-gray-700">
							<h3 className="text-xl font-bold text-cyan-400 mb-1">🚀 {project.title}</h3>
							<p className="text-gray-300 leading-relaxed">{project.description}</p>
						</div>

						{/* Body */}
						<div className="p-4 space-y-4">
							{/* Tech Stack */}
							<div>
								<div className="flex items-center gap-2 mb-2">
									<span className="text-yellow-400">⚡</span>
									<span className="text-yellow-400 font-bold text-sm">Tech Stack</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{project.technologies.map(tech => (
										<span 
											key={tech} 
											className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm text-cyan-300 hover:bg-cyan-500/20 transition-colors"
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Impact */}
							<div className="bg-green-500/10 border-l-4 border-green-500 p-3 rounded">
								<div className="flex items-center gap-2 mb-1">
									<span>📊</span>
									<span className="text-green-400 font-bold text-sm">Impact</span>
								</div>
								<p className="text-gray-300">{project.impact}</p>
							</div>

							{/* Links */}
							<div className="flex flex-wrap gap-3 pt-2">
								{project.liveUrl && (
									<a 
										href={project.liveUrl} 
										target="_blank" 
										rel="noreferrer" 
										className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 hover:bg-blue-500/30 transition-colors"
									>
										<span>🌐</span>
										<span>Live Demo</span>
									</a>
								)}
								{project.sourceUrl && (
									<a 
										href={project.sourceUrl} 
										target="_blank" 
										rel="noreferrer" 
										className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 transition-colors"
									>
										<span>💻</span>
										<span>Source Code</span>
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			);
		}

		// Default object rendering (for JSON files, contact info, etc.)
		return (
			<div className="mb-4 max-w-4xl">
				<div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg overflow-hidden">
					<div className="bg-gray-800/70 px-4 py-2 border-b border-cyan-500/30 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-cyan-400">📄</span>
							<span className="text-cyan-400 font-mono text-sm font-bold">JSON Data</span>
						</div>
						<span className="text-gray-500 text-xs">Formatted Output</span>
					</div>
					<div className="p-4 bg-black/20">
						<pre className="text-sm md:text-base font-mono overflow-x-auto">
							<JsonViewer data={content} />
						</pre>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
