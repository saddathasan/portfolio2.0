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
				relative grid grid-cols-9 gap-[2px]
				p-3 sm:p-4
				bg-card
				border border-border/60 rounded-2xl shadow-xl
				backdrop-blur supports-[backdrop-filter]:backdrop-blur-md
				max-w-[min(90vw,560px)] mx-auto select-none
				${className}
			`}
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4 }}
		>
			{grid.map((row, rowIndex) =>
				row.map((cell, colIndex) => {
					// Add thick borders to separate 3x3 grids
					const borderClasses = [];
					
					// Right border for columns 2 and 5 (after 3rd and 6th columns)
					if (colIndex === 2 || colIndex === 5) {
						borderClasses.push('border-r-2 border-border/80');
					}
					
					// Bottom border for rows 2 and 5 (after 3rd and 6th rows)
					if (rowIndex === 2 || rowIndex === 5) {
						borderClasses.push('border-b-2 border-border/80');
					}
					
					// Calculate if this cell is in the same 3x3 grid as the selected cell
					const isInSameGrid = selectedCell !== null &&
						Math.floor(selectedCell[0] / 3) === Math.floor(rowIndex / 3) &&
						Math.floor(selectedCell[1] / 3) === Math.floor(colIndex / 3) &&
						!(selectedCell[0] === rowIndex && selectedCell[1] === colIndex);
					
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
								isGridHighlighted={isInSameGrid}
								onSelect={() => onCellSelect(rowIndex, colIndex)}
							/>
						</div>
					);
				})
			)}
		</motion.div>
	);
};