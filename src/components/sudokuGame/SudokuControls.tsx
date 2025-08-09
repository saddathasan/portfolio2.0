import React from 'react';
import { motion } from 'framer-motion';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { SudokuControlsProps } from './types';

export const SudokuControls: React.FC<SudokuControlsProps> = ({
	className = '',
	difficulty,
	onDifficultyChange,
	onNewGame,
	onSolve,
	onClear,
	onHint,
	canUndo,
	onUndo,
}) => {
	return (
		<motion.div
			className={`
				flex flex-wrap gap-4 p-4 bg-card border border-border 
				rounded-lg shadow-lg
				${className}
			`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			{/* Difficulty Selector */}
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium text-foreground">
					Difficulty:
				</span>
				<Select value={difficulty} onValueChange={onDifficultyChange}>
					<SelectTrigger className="w-32">
						<SelectValue placeholder="Select difficulty" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="easy">Easy</SelectItem>
						<SelectItem value="medium">Medium</SelectItem>
						<SelectItem value="hard">Hard</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Action Buttons */}
			<div className="flex gap-2">
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						variant="default"
						size="default"
						onClick={onNewGame}
					>
						New Game
					</Button>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						variant="outline"
						size="default"
						onClick={onSolve}
					>
						Solve
					</Button>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						variant="secondary"
						size="default"
						onClick={onClear}
					>
						Clear
					</Button>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						variant="default"
						size="default"
						onClick={onHint}
						className="bg-yellow-600 hover:bg-yellow-700 text-white"
					>
						Hint
					</Button>
				</motion.div>

				<motion.div
					whileHover={canUndo ? { scale: 1.05 } : {}}
					whileTap={canUndo ? { scale: 0.95 } : {}}
				>
					<Button
						variant="outline"
						size="default"
						onClick={onUndo}
						disabled={!canUndo}
					>
						Undo
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
};