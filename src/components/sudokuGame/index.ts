// Import all components
import { SudokuGame } from './SudokuGame';
import { SudokuBoard } from './SudokuBoard';
import { SudokuCell } from './SudokuCell';
import { SudokuControls } from './SudokuControls';
import { SudokuStats } from './SudokuStats';
import { SudokuNumberPad } from './SudokuNumberPad';
import { SudokuSolver } from './SudokuSolver';

// Export individual components
export { SudokuGame, SudokuBoard, SudokuCell, SudokuControls, SudokuStats, SudokuNumberPad, SudokuSolver };

// Export types
export type {
	SudokuGrid,
	Difficulty,
	SudokuGameProps,
	SudokuBoardProps,
	SudokuCellProps,
	SudokuControlsProps,
	SudokuStatsProps,
	SudokuNumberPadProps,
} from './types';

// Create compound component pattern
const CompoundSudokuGame = Object.assign(SudokuGame, {
	Board: SudokuBoard,
	Cell: SudokuCell,
	Controls: SudokuControls,
	Stats: SudokuStats,
	NumberPad: SudokuNumberPad,
	Solver: SudokuSolver,
});

export default CompoundSudokuGame;