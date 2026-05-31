/// <reference types="vite/client" />

// MDX files compile to a React component (the post body) as the default export.
declare module "*.mdx" {
	import type { ComponentType } from "react";
	const MDXComponent: ComponentType<{
		components?: Record<string, ComponentType<unknown>>;
	}>;
	export default MDXComponent;
}
