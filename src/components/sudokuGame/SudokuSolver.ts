import type { SudokuGrid, Difficulty } from './types';

// Sudoku Logic Utilities
export class SudokuSolver {
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