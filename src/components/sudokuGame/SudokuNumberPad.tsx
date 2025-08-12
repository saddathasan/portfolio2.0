import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { SudokuNumberPadProps } from './types';

export const SudokuNumberPad: React.FC<SudokuNumberPadProps> = ({
	className = '',
	onNumberSelect,
	selectedNumber,
}) => {
	return (
		<motion.div
			className={`
				flex flex-col items-center gap-4 p-4 bg-card border border-border 
				rounded-lg shadow-lg
				${className}
			`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.3 }}
		>
			{/* Numbers 1-9 in 3x3 grid */}
			<div className="grid grid-cols-3 gap-2">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
					<motion.div
						key={num}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Button
							variant={selectedNumber === num ? "default" : "outline"}
							size="lg"
							onClick={() => onNumberSelect(num)}
							className="w-16 h-16 text-2xl font-bold hover:text-primary"
						>
							{num}
						</Button>
					</motion.div>
				))}
			</div>

			{/* Erase button */}
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<Button
					variant={selectedNumber === null ? "destructive" : "outline"}
					size="lg"
					onClick={() => onNumberSelect(null)}
					className="w-16 h-16 text-lg font-bold hover:text-primary"
				>
					✕
				</Button>
			</motion.div>
		</motion.div>
	);
};