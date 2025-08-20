import { MAX_ATTEMPTS, WORD_LENGTH } from "./constants";
import type { GameGrid, CellState, GameState } from "./types";

export const createEmptyGrid = (): GameGrid =>
  Array(MAX_ATTEMPTS)
    .fill(null)
    .map(() =>
      Array(WORD_LENGTH)
        .fill(null)
        .map(() => ({ value: "", status: "default" as const }))
    );

export const createEmptyCell = (): CellState => ({
  value: "",
  status: "default",
});

export const isGameActive = (
  gameOver: boolean,
  currentAttempt: number
): boolean => !gameOver && currentAttempt < MAX_ATTEMPTS;

export const canAddCharacter = (
  currentPosition: number,
  gameState: GameState
): boolean =>
  currentPosition < WORD_LENGTH &&
  gameState.currentAttempt < MAX_ATTEMPTS &&
  !gameState.gameOver;

export const canSubmitWord = (
  currentPosition: number,
  randomWord: string
): boolean => currentPosition === WORD_LENGTH && !!randomWord;
