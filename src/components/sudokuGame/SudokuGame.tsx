import React from 'react';
import type { SudokuGameProps } from './types';

// Main SudokuGame component using compound component pattern
export const SudokuGame: React.FC<SudokuGameProps> = ({
	className = '',
	children,
}) => {
	return (
		<div
			className={`
				max-w-4xl mx-auto p-6 space-y-6
				${className}
			`}
		>
			{children}
		</div>
	);
};