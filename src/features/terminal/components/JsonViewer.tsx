interface JsonViewerProps {
	data: unknown;
	indentLevel?: number;
}

export function JsonViewer({ data, indentLevel = 0 }: JsonViewerProps) {
	const indent = "  ".repeat(indentLevel);

	if (data === null) {
		return <span className="text-purple-400">null</span>;
	}

	if (typeof data === "boolean") {
		return <span className="text-purple-400">{String(data)}</span>;
	}

	if (typeof data === "number") {
		return <span className="text-blue-400">{data}</span>;
	}

	if (typeof data === "string") {
		return <span className="text-green-400">"{data}"</span>;
	}

	if (Array.isArray(data)) {
		if (data.length === 0) {
			return <span className="text-gray-400">[]</span>;
		}

		return (
			<>
				<span className="text-gray-400">[</span>
				{data.map((item, index) => (
					<div key={index} className="pl-4">
						<JsonViewer data={item} indentLevel={indentLevel + 1} />
						{index < data.length - 1 && <span className="text-gray-400">,</span>}
					</div>
				))}
				<div className={indent}>
					<span className="text-gray-400">]</span>
				</div>
			</>
		);
	}

	if (typeof data === "object") {
		const entries = Object.entries(data);

		if (entries.length === 0) {
			return <span className="text-gray-400">{"{}"}</span>;
		}

		return (
			<>
				<span className="text-gray-400">{"{"}</span>
				{entries.map(([key, value], index) => (
					<div key={key} className="pl-4">
						<span className="text-cyan-300">"{key}"</span>
						<span className="text-gray-400">: </span>
						<JsonViewer data={value} indentLevel={indentLevel + 1} />
						{index < entries.length - 1 && <span className="text-gray-400">,</span>}
					</div>
				))}
				<div className={indent}>
					<span className="text-gray-400">{"}"}</span>
				</div>
			</>
		);
	}

	return <span className="text-gray-400">{String(data)}</span>;
}
