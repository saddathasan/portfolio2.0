// Types
export type SudokuGrid = (number | null)[][];
export type Difficulty = "easy" | "medium" | "hard";

export interface SudokuGameProps {
	className?: string;
	children: React.ReactNode;
}

export interface SudokuBoardProps {
	className?: string;
	grid: SudokuGrid;
	initialGrid: SudokuGrid;
	selectedCell: [number, number] | null;
	onCellSelect: (row: number, col: number) => void;
	conflicts: Set<string>;
	hintCells: Set<string>;
}

export interface SudokuCellProps {
	className?: string;
	value: number | null;
	isInitial: boolean;
	isSelected: boolean;
	isConflict: boolean;
	isHint?: boolean;
	onSelect: () => void;
}

export interface SudokuControlsProps {
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

export interface SudokuStatsProps {
	className?: string;
	time: number;
	mistakes: number;
	progress: number;
	isComplete: boolean;
}

export interface SudokuNumberPadProps {
	className?: string;
	onNumberSelect: (num: number | null) => void;
	selectedNumber: number | null;
}