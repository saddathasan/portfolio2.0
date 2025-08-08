import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

// Types
type SudokuGrid = (number | null)[][];
type Difficulty = "easy" | "medium" | "hard";

interface SudokuGameProps {
	className?: string;
	children: React.ReactNode;
}

interface SudokuBoardProps {
	className?: string;
	grid: SudokuGrid;
	initialGrid: SudokuGrid;
	selectedCell: [number, number] | null;
	onCellSelect: (row: number, col: number) => void;
	conflicts: Set<string>;
}

interface SudokuCellProps {
	className?: string;
	value: number | null;
	isInitial: boolean;
	isSelected: boolean;
	isConflict: boolean;
	onSelect: () => void;
	row: number;
	col: number;
}

interface SudokuControlsProps {
	className?: string;
	difficulty: Difficulty;
	onDifficultyChange: (difficulty: Difficulty) => void;
	onNewGame: () => void;
	onSolve: () => void;
	onClear: () => void;
	onHint: () => void;
	canUndo: boolean;
	onUndo: () => void;
}

interface SudokuStatsProps {
	className?: string;
	time: number;
	mistakes: number;
	progress: number;
	isComplete: boolean;
}

interface SudokuNumberPadProps {
	className?: string;
	onNumberSelect: (num: number | null) => void;
	selectedNumber: number | null;
}

// Sudoku Logic Utilities
class SudokuSolver {
	static isValid(
		grid: SudokuGrid,
		row: number,
		col: number,
		num: number,
	): boolean {
		// Check row
		for (let x = 0; x < 9; x++) {
			if (x !== col && grid[row][x] === num) return false;
		}

		// Check column
		for (let x = 0; x < 9; x++) {
			if (x !== row && grid[x][col] === num) return false;
		}

		// Check 3x3 box
		const startRow = Math.floor(row / 3) * 3;
		const startCol = Math.floor(col / 3) * 3;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const currentRow = startRow + i;
				const currentCol = startCol + j;
				if (
					(currentRow !== row || currentCol !== col) &&
					grid[currentRow][currentCol] === num
				) {
					return false;
				}
			}
		}

		return true;
	}

	static solve(grid: SudokuGrid): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (grid[row][col] === null) {
					for (let num = 1; num <= 9; num++) {
						if (this.isValid(grid, row, col, num)) {
							grid[row][col] = num;
							if (this.solve(grid)) return true;
							grid[row][col] = null;
						}
					}
					return false;
				}
			}
		}
		return true;
	}

	static generatePuzzle(difficulty: Difficulty): {
		puzzle: SudokuGrid;
		solution: SudokuGrid;
	} {
		// Create empty grid
		const grid: SudokuGrid = Array(9)
			.fill(null)
			.map(() => Array(9).fill(null));

		// Fill diagonal 3x3 boxes first
		for (let box = 0; box < 3; box++) {
			const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
				() => Math.random() - 0.5,
			);
			let numIndex = 0;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					grid[box * 3 + i][box * 3 + j] = nums[numIndex++];
				}
			}
		}

		// Solve the rest
		this.solve(grid);

		// Create solution copy
		const solution = grid.map((row) => [...row]);

		// Remove numbers based on difficulty
		const cellsToRemove = {
			easy: 40,
			medium: 50,
			hard: 60,
		}[difficulty];

		const positions = [];
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				positions.push([i, j]);
			}
		}

		// Shuffle positions
		for (let i = positions.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[positions[i], positions[j]] = [positions[j], positions[i]];
		}

		// Remove cells
		for (let i = 0; i < cellsToRemove; i++) {
			const [row, col] = positions[i];
			grid[row][col] = null;
		}

		return { puzzle: grid, solution };
	}

	static findConflicts(grid: SudokuGrid): Set<string> {
		const conflicts = new Set<string>();

		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				const value = grid[row][col];
				if (value !== null && !this.isValid(grid, row, col, value)) {
					conflicts.add(`${row}-${col}`);
				}
			}
		}

		return conflicts;
	}

	static isComplete(grid: SudokuGrid): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (grid[row][col] === null) return false;
			}
		}
		return this.findConflicts(grid).size === 0;
	}

	static getProgress(grid: SudokuGrid): number {
		let filled = 0;
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (grid[row][col] !== null) filled++;
			}
		}
		return (filled / 81) * 100;
	}
}

// Root Sudoku Game Component
function SudokuGame({ className, children, ...props }: SudokuGameProps) {
	return (
		<div
			className={cn(
				"relative w-full max-w-4xl mx-auto p-6 space-y-6",
				"bg-gradient-to-br from-background/50 to-background/80",
				"backdrop-blur-sm border border-border/20 rounded-2xl",
				"shadow-2xl shadow-primary/10",
				className,
			)}
			{...props}>
			{children}
		</div>
	);
}

// Sudoku Board Component
function SudokuBoard({
	className,
	grid,
	initialGrid,
	selectedCell,
	onCellSelect,
	conflicts,
	...props
}: SudokuBoardProps) {
	return (
		<motion.div
			className={cn(
				"grid grid-cols-9 gap-1 p-4 bg-gradient-to-br from-muted/30 to-muted/50",
				"border-2 border-primary/20 rounded-xl shadow-inner",
				className,
			)}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			{...props}>
			{grid.map((row, rowIndex) =>
				row.map((cell, colIndex) => {
					const isInitial = initialGrid[rowIndex][colIndex] !== null;
					const isSelected =
						selectedCell?.[0] === rowIndex &&
						selectedCell?.[1] === colIndex;
					const isConflict = conflicts.has(`${rowIndex}-${colIndex}`);

					return (
						<SudokuCell
							key={`${rowIndex}-${colIndex}`}
							value={cell}
							isInitial={isInitial}
							isSelected={isSelected}
							isConflict={isConflict}
							onSelect={() => onCellSelect(rowIndex, colIndex)}
							row={rowIndex}
							col={colIndex}
						/>
					);
				}),
			)}
		</motion.div>
	);
}

// Sudoku Cell Component
function SudokuCell({
	className,
	value,
	isInitial,
	isSelected,
	isConflict,
	onSelect,
	row,
	col,
	...props
}: SudokuCellProps) {
	const getBorderClasses = () => {
		let classes = "border ";

		// Thick borders for 3x3 box separation
		if (row % 3 === 0) classes += "border-t-2 ";
		if (row % 3 === 2) classes += "border-b-2 ";
		if (col % 3 === 0) classes += "border-l-2 ";
		if (col % 3 === 2) classes += "border-r-2 ";

		return classes;
	};

	return (
		<motion.button
			className={cn(
				"aspect-square flex items-center justify-center text-lg font-semibold",
				"transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
				getBorderClasses(),
				isInitial
					? "bg-muted/50 text-foreground cursor-default border-border/30"
					: "bg-background hover:bg-muted/30 cursor-pointer border-border/20",
				isSelected && "ring-2 ring-primary bg-primary/10",
				isConflict &&
					"bg-destructive/20 text-destructive border-destructive/50",
				className,
			)}
			onClick={onSelect}
			whileHover={!isInitial ? { scale: 1.05 } : {}}
			whileTap={!isInitial ? { scale: 0.95 } : {}}
			{...props}>
			{value || ""}
		</motion.button>
	);
}

// Sudoku Controls Component
function SudokuControls({
	className,
	difficulty,
	onDifficultyChange,
	onNewGame,
	onSolve,
	onClear,
	onHint,
	canUndo,
	onUndo,
	...props
}: SudokuControlsProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap gap-4 items-center justify-between p-4",
				"bg-gradient-to-r from-muted/20 to-muted/30 rounded-lg border border-border/20",
				className,
			)}
			{...props}>
			<div className="flex gap-2 items-center">
				<span className="text-sm font-medium text-muted-foreground">
					Difficulty:
				</span>
				{(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
					<Button
						key={diff}
						variant={difficulty === diff ? "default" : "outline"}
						size="sm"
						onClick={() => onDifficultyChange(diff)}
						className="capitalize">
						{diff}
					</Button>
				))}
			</div>

			<div className="flex gap-2">
				<Button
					onClick={onNewGame}
					variant="default"
					size="sm">
					New Game
				</Button>
				<Button
					onClick={onHint}
					variant="outline"
					size="sm">
					Hint
				</Button>
				<Button
					onClick={onUndo}
					variant="outline"
					size="sm"
					disabled={!canUndo}>
					Undo
				</Button>
				<Button
					onClick={onClear}
					variant="outline"
					size="sm">
					Clear
				</Button>
				<Button
					onClick={onSolve}
					variant="secondary"
					size="sm">
					Solve
				</Button>
			</div>
		</div>
	);
}

// Sudoku Stats Component
function SudokuStats({
	className,
	time,
	mistakes,
	progress,
	isComplete,
	...props
}: SudokuStatsProps) {
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div
			className={cn(
				"grid grid-cols-3 gap-4 p-4",
				"bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border/20",
				className,
			)}
			{...props}>
			<div className="text-center">
				<div className="text-2xl font-bold text-primary">
					{formatTime(time)}
				</div>
				<div className="text-sm text-muted-foreground">Time</div>
			</div>

			<div className="text-center">
				<div className="text-2xl font-bold text-accent">{mistakes}</div>
				<div className="text-sm text-muted-foreground">Mistakes</div>
			</div>

			<div className="text-center">
				<div className="text-2xl font-bold text-emerald-500">
					{Math.round(progress)}%
				</div>
				<div className="text-sm text-muted-foreground">Progress</div>
			</div>

			{isComplete && (
				<motion.div
					className="col-span-3 text-center py-2"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}>
					<div className="text-lg font-bold text-gradient-primary">
						🎉 Congratulations! 🎉
					</div>
					<div className="text-sm text-muted-foreground">
						Puzzle completed!
					</div>
				</motion.div>
			)}
		</div>
	);
}

// Number Pad Component
function SudokuNumberPad({
	className,
	onNumberSelect,
	selectedNumber,
	...props
}: SudokuNumberPadProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-5 gap-2 p-4",
				"bg-gradient-to-br from-muted/20 to-muted/30 rounded-lg border border-border/20",
				className,
			)}
			{...props}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
				<Button
					key={num}
					variant={selectedNumber === num ? "default" : "outline"}
					size="sm"
					onClick={() => onNumberSelect(num)}
					className="aspect-square">
					{num}
				</Button>
			))}
			<Button
				variant={selectedNumber === null ? "default" : "outline"}
				size="sm"
				onClick={() => onNumberSelect(null)}
				className="col-span-1">
				Erase
			</Button>
		</div>
	);
}

// Compound component assignments
SudokuGame.Board = SudokuBoard;
SudokuGame.Cell = SudokuCell;
SudokuGame.Controls = SudokuControls;
SudokuGame.Stats = SudokuStats;
SudokuGame.NumberPad = SudokuNumberPad;

export { SudokuGame, SudokuSolver };
export type { Difficulty, SudokuGrid };
