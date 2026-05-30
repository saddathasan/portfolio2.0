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
		expect(ctx.navigate).toHaveBeenCalledWith("/about");
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
