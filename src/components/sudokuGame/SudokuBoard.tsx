import React from 'react';
import { motion } from 'framer-motion';
import { SudokuCell } from './SudokuCell';
import type { SudokuBoardProps } from './types';

export const SudokuBoard: React.FC<SudokuBoardProps> = ({
	className = '',
	grid,
	initialGrid,
	selectedCell,
	onCellSelect,
	conflicts,
	hintCells,
}) => {
	return (
		<motion.div
			className={`
				grid grid-cols-9 gap-1 p-3 bg-background border-2 border-border 
				rounded-lg shadow-md max-w-lg mx-auto
				${className}
			`}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			{grid.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<SudokuCell
						key={`${rowIndex}-${colIndex}`}
						value={cell}
						isInitial={initialGrid[rowIndex][colIndex] !== null}
						isSelected={
							selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
						}
						isConflict={conflicts.has(`${rowIndex}-${colIndex}`)}
						isHint={hintCells.has(`${rowIndex}-${colIndex}`)}
						onSelect={() => onCellSelect(rowIndex, colIndex)}
					/>
				)),
			)}
		</motion.div>
	);
};