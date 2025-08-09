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
	highlightedValue,
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
				style={{
					gap: '2px'
				}}
		>
			{grid.map((row, rowIndex) =>
				row.map((cell, colIndex) => {
					// Add thick borders to separate 3x3 grids
					const borderClasses = [];
					
					// Right border for columns 2 and 5 (after 3rd and 6th columns)
					if (colIndex === 2 || colIndex === 5) {
						borderClasses.push('border-r-2 border-r-border');
					}
					
					// Bottom border for rows 2 and 5 (after 3rd and 6th rows)
					if (rowIndex === 2 || rowIndex === 5) {
						borderClasses.push('border-b-2 border-b-border');
					}
					
					return (
						<div
							key={`${rowIndex}-${colIndex}`}
							className={borderClasses.join(' ')}
						>
							<SudokuCell
								value={cell}
								isInitial={initialGrid[rowIndex][colIndex] !== null}
								isSelected={
									selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
								}
								isConflict={conflicts.has(`${rowIndex}-${colIndex}`)}
								isHint={hintCells.has(`${rowIndex}-${colIndex}`)}
								isHighlighted={
									highlightedValue !== null && 
									cell === highlightedValue &&
									!(selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex)
								}
								isRowHighlighted={
									selectedCell !== null &&
									selectedCell[0] === rowIndex &&
									!(selectedCell[0] === rowIndex && selectedCell[1] === colIndex)
								}
								isColumnHighlighted={
									selectedCell !== null &&
									selectedCell[1] === colIndex &&
									!(selectedCell[0] === rowIndex && selectedCell[1] === colIndex)
								}
								onSelect={() => onCellSelect(rowIndex, colIndex)}
							/>
						</div>
					);
				})
			)}
		</motion.div>
	);
};