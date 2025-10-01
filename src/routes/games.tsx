import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageLayout, Section, SudokuGame } from "../components";
import { useSudoku } from "../hooks";

export const Route = createFileRoute("/games")({
	component: GamesPage,
});

function GamesPage() {
	const sudoku = useSudoku();

	return (
		<PageLayout>
			<Section className="space-y-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-4">
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-6xl mb-2">
						🧩
					</motion.div>
					<Section.Header
						size="xl"
						centered
						className="mb-2">
						Sudoku Game
					</Section.Header>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Challenge yourself with this classic number puzzle! Use
						keyboard navigation (arrow keys, 1-9, delete) or click
						to play.
					</motion.p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.8 }}>
					<SudokuGame>
						{/* Game Stats */}
						<SudokuGame.Stats
							time={sudoku.time}
							mistakes={sudoku.mistakes}
							progress={sudoku.progress}
							isComplete={sudoku.isComplete}
						/>

						{/* Game Controls */}
						<SudokuGame.Controls
							difficulty={sudoku.difficulty}
							onDifficultyChange={sudoku.setDifficulty}
							onNewGame={sudoku.startNewGame}
							onSolve={sudoku.solvePuzzle}
							onClear={sudoku.clearUserEntries}
							onHint={sudoku.getHint}
							canUndo={sudoku.canUndo}
							onUndo={sudoku.undo}
						/>

						<div className="grid lg:grid-cols-3 gap-6 items-start">
							{/* Game Board */}
							<div className="lg:col-span-2">
								<SudokuGame.Board
				grid={sudoku.grid}
				initialGrid={sudoku.initialGrid}
				selectedCell={sudoku.selectedCell}
				onCellSelect={sudoku.selectCell}
				conflicts={sudoku.conflicts}
				hintCells={sudoku.hintCells}
				highlightedValue={sudoku.highlightedValue}
			/>
							</div>

							{/* Number Pad */}
							<div className="lg:col-span-1">
								<SudokuGame.NumberPad
									onNumberSelect={(num) => {
										sudoku.selectNumber(num);
										// Auto-fill selected cell if one is selected
										if (
											sudoku.selectedCell &&
											num !== null
										) {
											const [row, col] =
												sudoku.selectedCell;
											sudoku.setCellValue(row, col, num);
										} else if (
											sudoku.selectedCell &&
											num === null
										) {
											const [row, col] =
												sudoku.selectedCell;
											sudoku.setCellValue(row, col, null);
										}
									}}
									selectedNumber={sudoku.selectedNumber}
								/>
							</div>
						</div>
					</SudokuGame>
				</motion.div>

				{/* Game Instructions */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.6 }}
					className="mt-8 p-6 bg-muted/20 rounded-lg border border-border/20">
					<h3 className="text-lg font-semibold mb-3 text-primary">
						How to Play
					</h3>
					<div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
						<div>
							<h4 className="font-medium text-foreground mb-2">
								🎯 Objective
							</h4>
							<p>
								Fill the 9×9 grid so that each row, column, and
								3×3 box contains all digits from 1 to 9.
							</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">
								⌨️ Controls
							</h4>
							<p>
								Click cells or use arrow keys to navigate. Press
								1-9 to enter numbers, Delete/Backspace to clear.
							</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">
								💡 Features
							</h4>
							<p>
								Get hints, undo moves, track your time and
								mistakes. Choose from Easy, Medium, or Hard
								difficulty.
							</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">
								🏆 Tips
							</h4>
							<p>
								Start with easier cells, look for patterns, and
								use the process of elimination to solve complex
								puzzles.
							</p>
						</div>
					</div>
				</motion.div>
			</Section>
		</PageLayout>
	);
}
