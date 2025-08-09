import React from 'react';
import { motion } from 'framer-motion';
import type { SudokuCellProps } from './types';

// Color constants for easy manipulation
const CELL_COLORS = {
	userInput: 'bg-green-300 text-green-800 hover:bg-green-400', // Light green for user input
	prefilled: 'bg-slate-400 text-slate-700 hover:bg-slate-400', // Lighter shade for prefilled
	hint: 'bg-yellow-300 text-yellow-800 hover:bg-yellow-400', // Light yellow for hints
	empty: 'bg-muted/40 text-muted-foreground hover:bg-muted/50', // Empty cells
	selected: 'bg-primary text-primary-foreground shadow-md scale-105', // Selected state
	conflict: 'bg-destructive/20 text-destructive border-destructive/50', // Conflict state
	highlighted: 'bg-teal-200 text-teal-800 hover:bg-teal-300', // Teal highlighting for same values
	rowColumnHighlighted: 'bg-gray-500 text-purple-800 hover:bg-gray-600', // Light blue for row/column highlighting
} as const;

export const SudokuCell: React.FC<SudokuCellProps> = ({
	className = '',
	value,
	isInitial,
	isSelected,
	isConflict,
	isHint = false,
	isHighlighted = false,
	isRowHighlighted = false,
	isColumnHighlighted = false,
	isGridHighlighted = false,
	onSelect,
}) => {
	// Determine cell background color based on state
	const getCellColor = () => {
		if (isConflict) return CELL_COLORS.conflict;
		if (isSelected) return CELL_COLORS.selected;
		if (isHighlighted) return CELL_COLORS.highlighted;
		if (isRowHighlighted || isColumnHighlighted || isGridHighlighted) return CELL_COLORS.rowColumnHighlighted;
		if (isHint) return CELL_COLORS.hint;
		if (isInitial) return CELL_COLORS.prefilled;
		if (!isInitial && value) return CELL_COLORS.userInput;
		return CELL_COLORS.empty;
	};

	return (
		<motion.button
			type="button"
			className={`
				w-12 h-12 rounded-md border border-border/50
				flex items-center justify-center text-lg font-medium
				transition-all duration-200 
				focus:outline-none focus:ring-2 focus:ring-primary/50
				${isInitial ? 'font-bold border-border' : ''}
				${getCellColor()}
				${className}
			`}
			onClick={onSelect}
			whileHover={{ scale: isSelected ? 1.05 : 1.03 }}
			whileTap={{ scale: 0.95 }}
		>
			{value || ''}
		</motion.button>
	);
};