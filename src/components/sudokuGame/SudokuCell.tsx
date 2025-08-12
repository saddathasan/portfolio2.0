import React from 'react';
import { motion } from 'framer-motion';
import type { SudokuCellProps } from './types';

// Color constants for easy manipulation
const CELL_COLORS = {
	// Modern amber and gray color scheme
	userInput: 'bg-primary/10 text-black hover:bg-primary/20 dark:bg-primary/20 dark:text-black',
	prefilled: 'bg-muted/30 text-foreground/80 hover:bg-muted/40',
	hint: 'bg-primary/20 text-black hover:bg-primary/30 dark:bg-primary/30 dark:text-black',
	empty: 'bg-card/60 text-muted-foreground hover:bg-card/80 dark:bg-gray-800/50',
	selected: 'ring-2 ring-primary/60 bg-primary/10 text-foreground shadow-lg',
	conflict: 'bg-destructive/10 text-destructive ring-2 ring-destructive/50',
	highlighted: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700/30 dark:text-gray-300',
	rowColumnHighlighted: 'bg-gray-50 text-foreground hover:bg-gray-100 dark:bg-gray-800/20',
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
				aspect-square h-12 w-12 md:h-14 md:w-14 rounded-md
				border border-border/40 ring-1 ring-border/20
				flex items-center justify-center text-lg md:text-xl
				font-medium ${isInitial ? 'font-semibold' : ''}
				transition-all duration-200 ease-out
				hover:shadow-md active:scale-[0.98]
				focus:outline-none focus:ring-2 focus:ring-primary/50
				backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm
				${getCellColor()}
				${className}
			`}
			aria-selected={isSelected}
			onClick={onSelect}
			whileHover={{ scale: isSelected ? 1.03 : 1.02 }}
			whileTap={{ scale: 0.97 }}
		>
			{value || ''}
		</motion.button>
	);
};