import { useState, useEffect, useCallback, useRef } from 'react';
import { SudokuSolver, type SudokuGrid, type Difficulty } from '@/components/SudokuGame';

interface GameState {
	grid: SudokuGrid;
	initialGrid: SudokuGrid;
	solution: SudokuGrid;
	selectedCell: [number, number] | null;
	selectedNumber: number | null;
	difficulty: Difficulty;
	time: number;
	mistakes: number;
	conflicts: Set<string>;
	isComplete: boolean;
	history: SudokuGrid[];
	historyIndex: number;
}

interface UseSudokuReturn {
	// Game state
	grid: SudokuGrid;
	initialGrid: SudokuGrid;
	selectedCell: [number, number] | null;
	selectedNumber: number | null;
	difficulty: Difficulty;
	time: number;
	mistakes: number;
	conflicts: Set<string>;
	isComplete: boolean;
	progress: number;
	canUndo: boolean;
	
	// Actions
	selectCell: (row: number, col: number) => void;
	selectNumber: (num: number | null) => void;
	setCellValue: (row: number, col: number, value: number | null) => void;
	setDifficulty: (difficulty: Difficulty) => void;
	startNewGame: () => void;
	solvePuzzle: () => void;
	clearUserEntries: () => void;
	getHint: () => void;
	undo: () => void;
	resetGame: () => void;
}

export function useSudoku(): UseSudokuReturn {
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	
	const [gameState, setGameState] = useState<GameState>(() => {
		const { puzzle, solution } = SudokuSolver.generatePuzzle('medium');
		return {
			grid: puzzle.map(row => [...row]),
			initialGrid: puzzle.map(row => [...row]),
			solution,
			selectedCell: null,
			selectedNumber: null,
			difficulty: 'medium',
			time: 0,
			mistakes: 0,
			conflicts: new Set(),
			isComplete: false,
			history: [puzzle.map(row => [...row])],
			historyIndex: 0,
		};
	});

	// Timer effect
	useEffect(() => {
		if (!gameState.isComplete) {
			timerRef.current = setInterval(() => {
				setGameState(prev => ({ ...prev, time: prev.time + 1 }));
			}, 1000);
		} else {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [gameState.isComplete]);

	// Update conflicts and completion status when grid changes
	useEffect(() => {
		const conflicts = SudokuSolver.findConflicts(gameState.grid);
		const isComplete = SudokuSolver.isComplete(gameState.grid);
		
		setGameState(prev => ({
			...prev,
			conflicts,
			isComplete,
		}));
	}, [gameState.grid]);

	const addToHistory = useCallback((newGrid: SudokuGrid) => {
		setGameState(prev => {
			const newHistory = prev.history.slice(0, prev.historyIndex + 1);
			newHistory.push(newGrid.map(row => [...row]));
			
			// Limit history to last 50 moves
			if (newHistory.length > 50) {
				newHistory.shift();
			}
			
			return {
				...prev,
				history: newHistory,
				historyIndex: newHistory.length - 1,
			};
		});
	}, []);

	const selectCell = useCallback((row: number, col: number) => {
		setGameState(prev => ({
			...prev,
			selectedCell: [row, col],
		}));
	}, []);

	const selectNumber = useCallback((num: number | null) => {
		setGameState(prev => ({
			...prev,
			selectedNumber: num,
		}));
	}, []);

	const setCellValue = useCallback((row: number, col: number, value: number | null) => {
		// Don't allow changes to initial cells
		if (gameState.initialGrid[row][col] !== null) return;
		
		const newGrid = gameState.grid.map(r => [...r]);
		const oldValue = newGrid[row][col];
		newGrid[row][col] = value;
		
		// Check if this creates a conflict (mistake)
		let newMistakes = gameState.mistakes;
		if (value !== null && gameState.solution[row][col] !== value) {
			newMistakes++;
		}
		
		setGameState(prev => ({
			...prev,
			grid: newGrid,
			mistakes: newMistakes,
		}));
		
		// Add to history only if value actually changed
		if (oldValue !== value) {
			addToHistory(newGrid);
		}
	}, [gameState.grid, gameState.initialGrid, gameState.solution, gameState.mistakes, addToHistory]);

	const setDifficulty = useCallback((difficulty: Difficulty) => {
		setGameState(prev => ({ ...prev, difficulty }));
	}, []);

	const startNewGame = useCallback(() => {
		const { puzzle, solution } = SudokuSolver.generatePuzzle(gameState.difficulty);
		
		setGameState(prev => ({
			...prev,
			grid: puzzle.map(row => [...row]),
			initialGrid: puzzle.map(row => [...row]),
			solution,
			selectedCell: null,
			selectedNumber: null,
			time: 0,
			mistakes: 0,
			conflicts: new Set(),
			isComplete: false,
			history: [puzzle.map(row => [...row])],
			historyIndex: 0,
		}));
	}, [gameState.difficulty]);

	const solvePuzzle = useCallback(() => {
		const solvedGrid = gameState.solution.map(row => [...row]);
		
		setGameState(prev => ({
			...prev,
			grid: solvedGrid,
			isComplete: true,
		}));
		
		addToHistory(solvedGrid);
	}, [gameState.solution, addToHistory]);

	const clearUserEntries = useCallback(() => {
		const clearedGrid = gameState.initialGrid.map(row => [...row]);
		
		setGameState(prev => ({
			...prev,
			grid: clearedGrid,
			mistakes: 0,
		}));
		
		addToHistory(clearedGrid);
	}, [gameState.initialGrid, addToHistory]);

	const getHint = useCallback(() => {
		if (gameState.selectedCell) {
			const [row, col] = gameState.selectedCell;
			
			// Only give hint for empty cells that aren't initial
			if (gameState.grid[row][col] === null && gameState.initialGrid[row][col] === null) {
				const hintValue = gameState.solution[row][col];
				setCellValue(row, col, hintValue);
			}
		} else {
			// Find first empty cell and give hint
			for (let row = 0; row < 9; row++) {
				for (let col = 0; col < 9; col++) {
					if (gameState.grid[row][col] === null && gameState.initialGrid[row][col] === null) {
						const hintValue = gameState.solution[row][col];
						setCellValue(row, col, hintValue);
						return;
					}
				}
			}
		}
	}, [gameState.selectedCell, gameState.grid, gameState.initialGrid, gameState.solution, setCellValue]);

	const undo = useCallback(() => {
		if (gameState.historyIndex > 0) {
			const previousGrid = gameState.history[gameState.historyIndex - 1];
			
			setGameState(prev => ({
				...prev,
				grid: previousGrid.map(row => [...row]),
				historyIndex: prev.historyIndex - 1,
				mistakes: Math.max(0, prev.mistakes - 1), // Approximate mistake reduction
			}));
		}
	}, [gameState.historyIndex, gameState.history]);

	const resetGame = useCallback(() => {
		setGameState(prev => ({
			...prev,
			grid: prev.initialGrid.map(row => [...row]),
			selectedCell: null,
			selectedNumber: null,
			time: 0,
			mistakes: 0,
			conflicts: new Set(),
			isComplete: false,
			history: [prev.initialGrid.map(row => [...row])],
			historyIndex: 0,
		}));
	}, []);

	// Handle keyboard input
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (!gameState.selectedCell) return;
			
			const [row, col] = gameState.selectedCell;
			
			// Number keys 1-9
			if (event.key >= '1' && event.key <= '9') {
				const num = parseInt(event.key);
				setCellValue(row, col, num);
			}
			
			// Delete/Backspace to clear cell
			if (event.key === 'Delete' || event.key === 'Backspace') {
				setCellValue(row, col, null);
			}
			
			// Arrow keys for navigation
			if (event.key.startsWith('Arrow')) {
				event.preventDefault();
				let newRow = row;
				let newCol = col;
				
				switch (event.key) {
					case 'ArrowUp':
						newRow = Math.max(0, row - 1);
						break;
					case 'ArrowDown':
						newRow = Math.min(8, row + 1);
						break;
					case 'ArrowLeft':
						newCol = Math.max(0, col - 1);
						break;
					case 'ArrowRight':
						newCol = Math.min(8, col + 1);
						break;
				}
				
				selectCell(newRow, newCol);
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [gameState.selectedCell, setCellValue, selectCell]);

	const progress = SudokuSolver.getProgress(gameState.grid);
	const canUndo = gameState.historyIndex > 0;

	return {
		// State
		grid: gameState.grid,
		initialGrid: gameState.initialGrid,
		selectedCell: gameState.selectedCell,
		selectedNumber: gameState.selectedNumber,
		difficulty: gameState.difficulty,
		time: gameState.time,
		mistakes: gameState.mistakes,
		conflicts: gameState.conflicts,
		isComplete: gameState.isComplete,
		progress,
		canUndo,
		
		// Actions
		selectCell,
		selectNumber,
		setCellValue,
		setDifficulty,
		startNewGame,
		solvePuzzle,
		clearUserEntries,
		getHint,
		undo,
		resetGame,
	};
}