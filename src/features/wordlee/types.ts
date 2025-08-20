export interface CellState {
  value: string;
  status: "correct" | "present" | "default" | "absent";
}

export type GameGrid = CellState[][];
export interface GameState {
  grid: GameGrid;
  currentAttempt: number;
  currentPosition: number;
  gameOver: boolean;
  gameWon: boolean;
}
