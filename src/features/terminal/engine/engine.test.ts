import { describe, expect, it, vi } from "vitest";
import { initialFileSystem, resolvePath } from "../lib/terminal";
import { commands, findCommand } from "./registry";
import type { CommandContext } from "./types";

function makeCtx(overrides: Partial<CommandContext> = {}): CommandContext {
	return {
		input: "",
		args: [],
		argStr: "",
		currentPath: [],
		fileSystem: initialFileSystem,
		commands,
		history: [],
		setPath: vi.fn(),
		clear: vi.fn(),
		navigate: vi.fn(),
		openUrl: vi.fn(),
		...overrides,
	};
}

describe("registry", () => {
	it("resolves commands by name and alias", () => {
		expect(findCommand("gui")?.name).toBe("gui");
		expect(findCommand("simple")?.name).toBe("gui"); // alias
		expect(findCommand("cv")?.name).toBe("resume"); // alias
		expect(findCommand("posts")?.name).toBe("blog"); // alias
		expect(findCommand("nope")).toBeUndefined();
	});

	it("hides easter eggs from the autocomplete name list but keeps them runnable", () => {
		expect(findCommand("sudo")).toBeDefined();
		expect(findCommand("sudo")?.hidden).toBe(true);
	});
});

describe("resolvePath", () => {
	it("resolves root, directories, and parent traversal", () => {
		expect(resolvePath([], "/", initialFileSystem).node).toBe(initialFileSystem);
		expect(resolvePath([], "projects", initialFileSystem).node?.type).toBe("directory");
		expect(resolvePath(["projects"], "..", initialFileSystem).newPath).toEqual([]);
		expect(resolvePath([], "does-not-exist", initialFileSystem).node).toBeNull();
	});
});

describe("command run()", () => {
	it("echo returns its argument string", () => {
		expect(findCommand("echo")!.run(makeCtx({ argStr: "hello world" }))).toBe("hello world");
	});

	it("pwd reflects the current path", () => {
		expect(findCommand("pwd")!.run(makeCtx({ currentPath: ["projects"] }))).toBe("/projects");
	});

	it("ls at root lists known files", () => {
		const out = findCommand("ls")!.run(makeCtx()) as string;
		expect(out).toContain("about.md");
		expect(out).toContain("projects/");
	});

	it("clear triggers ctx.clear and prints nothing", () => {
		const ctx = makeCtx();
		const out = findCommand("clear")!.run(ctx);
		expect(ctx.clear).toHaveBeenCalledOnce();
		expect(out).toBeUndefined();
	});

	it("gui navigates to the visual site", () => {
		const ctx = makeCtx();
		findCommand("gui")!.run(ctx);
		expect(ctx.navigate).toHaveBeenCalledWith("/home");
	});

	it("git profile opens the git profile route", () => {
		const ctx = makeCtx({ args: ["profile"], argStr: "profile" });
		findCommand("git")!.run(ctx);
		expect(ctx.navigate).toHaveBeenCalledWith("/git-profile");
	});

	it("resume opens the PDF in a new tab", () => {
		const ctx = makeCtx();
		findCommand("resume")!.run(ctx);
		expect(ctx.openUrl).toHaveBeenCalledWith("/resume.pdf");
	});

	it("help lists grouped commands", () => {
		const out = findCommand("help")!.run(makeCtx()) as string;
		expect(out).toContain("NAVIGATION");
		expect(out).toContain("help");
	});
});

describe("blog (terminal)", () => {
	it("mounts posts as FS nodes under /blog with category subdirs", () => {
		const blog = resolvePath([], "/blog", initialFileSystem).node;
		expect(blog?.type).toBe("directory");
		expect(blog?.listing?.displayType).toBe("blog-listing");
		expect((blog?.listing?.rows.length ?? 0)).toBeGreaterThan(0);
		// hello-world lives in the general category
		const general = resolvePath([], "/blog/general", initialFileSystem).node;
		expect(general?.children?.["hello-world.md"]?.type).toBe("file");
	});

	it("`blog` cds to /blog and returns the listing table", () => {
		const ctx = makeCtx();
		const out = findCommand("blog")!.run(ctx) as { displayType: string };
		expect(ctx.setPath).toHaveBeenCalledWith(["blog"]);
		expect(out.displayType).toBe("blog-listing");
	});

	it("`cat <slug>` resolves with .md optional and yields a blog-post", () => {
		const ctx = makeCtx({
			args: ["hello-world"],
			argStr: "hello-world",
			currentPath: ["blog", "general"],
		});
		const out = findCommand("cat")!.run(ctx) as { displayType: string; slug: string };
		expect(out.displayType).toBe("blog-post");
		expect(out.slug).toBe("hello-world");
	});

	it("`open <slug>` navigates to the GUI article", () => {
		const ctx = makeCtx({ args: ["hello-world"], argStr: "hello-world" });
		findCommand("open")!.run(ctx);
		expect(ctx.navigate).toHaveBeenCalledWith("/blog/general/hello-world");
	});
});
