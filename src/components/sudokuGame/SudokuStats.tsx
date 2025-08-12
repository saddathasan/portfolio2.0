import React from 'react';
import { motion } from 'framer-motion';
import type { SudokuStatsProps } from './types';

export const SudokuStats: React.FC<SudokuStatsProps> = ({
	className = '',
	time,
	mistakes,
	progress,
	isComplete,
}) => {
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<motion.div
			className={`
				grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card border border-border 
				rounded-lg shadow-lg
				${className}
			`}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1 }}
		>
			{/* Time */}
			<div className="text-center">
				<div className="text-2xl font-bold text-primary dark:text-primary">
					{formatTime(time)}
				</div>
				<div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
			</div>

			{/* Mistakes */}
			<div className="text-center">
				<div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
					{mistakes}
				</div>
				<div className="text-sm text-gray-600 dark:text-gray-400">Mistakes</div>
			</div>

			{/* Progress */}
			<div className="text-center">
				<div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
					{Math.round(progress)}%
				</div>
				<div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
			</div>

			{/* Status */}
			<div className="text-center">
				<div
					className={`
						text-2xl font-bold
						${isComplete
						? 'text-gray-800 dark:text-gray-200'
						: 'text-gray-600 dark:text-gray-400'
					}
					`}
				>
					{isComplete ? '🎉' : '🎯'}
				</div>
				<div className="text-sm text-gray-600 dark:text-gray-400">
					{isComplete ? 'Complete!' : 'In Progress'}
				</div>
			</div>
		</motion.div>
	);
};