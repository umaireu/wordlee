import { useCallback, useEffect, useState } from "react";
import { RandomWord } from "../../../services";
import { isChar, logDetails } from "../../../utlis";
import type { GameGrid, GameState } from "../types";
import {
  canAddCharacter,
  canSubmitWord,
  createEmptyCell,
  createEmptyGrid,
  isGameActive,
} from "../utils";
import { MAX_ATTEMPTS, WORD_LENGTH } from "../constants";

export const useGuessWord = () => {
  const [randomWord, setRandomWord] = useState("");
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(),
    currentAttempt: 0,
    currentPosition: 0,
    gameOver: false,
    gameWon: false,
  });

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const word = await RandomWord();
        setRandomWord(word[0]);
      } catch (error) {
        logDetails(error);
      }
    };

    fetchRandomWord();
  }, []);

  const validateWord = useCallback(
    (targetWord: string, grid: GameGrid, attemptIndex: number) => {
      const newGrid = [...grid];
      const targetWordArray = targetWord.toUpperCase().split("");

      // Count letter frequencies in target word
      const targetLetterCount: Record<string, number> = {};
      targetWordArray.forEach((letter) => {
        targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1;
      });

      // First pass: mark correct positions
      const remainingLetterCount = { ...targetLetterCount };
      newGrid[attemptIndex].forEach((cell, index) => {
        if (cell.value === targetWordArray[index]) {
          cell.status = "correct";
          remainingLetterCount[cell.value]--;
        } else {
          cell.status = "default";
        }
      });

      // Second pass: mark present and absent letters
      newGrid[attemptIndex].forEach((cell) => {
        if (cell.status === "default") {
          if (remainingLetterCount[cell.value] > 0) {
            cell.status = "present";
            remainingLetterCount[cell.value]--;
          } else {
            cell.status = "absent";
          }
        }
      });
      return newGrid;
    },
    []
  );

  const updateCell = useCallback((row: number, col: number, value: string) => {
    setGameState((prev) => {
      const newGrid = [...prev.grid];
      newGrid[row][col] = { value: value.toUpperCase(), status: "default" };
      return { ...prev, grid: newGrid };
    });
  }, []);

  const clearCell = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      const newGrid = [...prev.grid];
      newGrid[row][col] = createEmptyCell();
      return { ...prev, grid: newGrid };
    });
  }, []);

  const moveToNextAttempt = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentAttempt: prev.currentAttempt + 1,
      currentPosition: 0,
    }));
  }, []);

  const endGame = useCallback((won: boolean) => {
    setGameState((prev) => ({
      ...prev,
      gameOver: true,
      gameWon: won,
    }));
  }, []);

  const handleInputChange = useCallback(
    (value: string, rowIndex: number, cellIndex: number) => {
      if (rowIndex === gameState.currentAttempt && !gameState.gameOver) {
        if (value && isChar(value)) {
          updateCell(gameState.currentAttempt, cellIndex, value);
          setGameState((prev) => ({
            ...prev,
            currentPosition: Math.min(cellIndex + 1, WORD_LENGTH),
          }));
        } else {
          clearCell(gameState.currentAttempt, cellIndex);
          setGameState((prev) => ({
            ...prev,
            currentPosition: cellIndex,
          }));
        }
      }
    },
    [gameState.currentAttempt, gameState.gameOver, updateCell, clearCell]
  );

  const handleCharInput = useCallback(
    (value: string) => {
      if (canAddCharacter(gameState.currentPosition, gameState)) {
        updateCell(gameState.currentAttempt, gameState.currentPosition, value);
        setGameState((prev) => ({
          ...prev,
          currentPosition: prev.currentPosition + 1,
        }));
      }
    },
    [gameState, updateCell]
  );

  const handleBackspace = useCallback(() => {
    if (!isGameActive(gameState.gameOver, gameState.currentAttempt)) return;

    const { currentAttempt, currentPosition, grid } = gameState;

    if (currentPosition > 0) {
      // Check if current position has a character
      if (
        currentPosition < WORD_LENGTH &&
        grid[currentAttempt][currentPosition].value
      ) {
        // Clear current position first
        clearCell(currentAttempt, currentPosition);
      } else {
        // Clear previous position and move cursor back
        clearCell(currentAttempt, currentPosition - 1);
        setGameState((prev) => ({
          ...prev,
          currentPosition: prev.currentPosition - 1,
        }));
      }
    } else if (currentPosition === 0 && grid[currentAttempt][0].value) {
      // Special case: at position 0 but there's a character to delete
      clearCell(currentAttempt, 0);
    }
  }, [gameState, clearCell]);

  const handleSubmit = useCallback(() => {
    if (!canSubmitWord(gameState.currentPosition, randomWord)) return;

    const currentWord = gameState.grid[gameState.currentAttempt]
      .map((cell) => cell.value)
      .join("");

    const newGrid = validateWord(
      randomWord,
      gameState.grid,
      gameState.currentAttempt
    );

    setGameState((prev) => ({ ...prev, grid: newGrid }));

    const targetWordUpper = randomWord.toUpperCase().trim();
    const currentWordTrimmed = currentWord.trim();
    if (currentWordTrimmed === targetWordUpper) {
      endGame(true);
    } else if (gameState.currentAttempt + 1 >= MAX_ATTEMPTS) {
      endGame(false);
    } else {
      moveToNextAttempt();
    }
  }, [gameState, randomWord, validateWord, endGame, moveToNextAttempt]);

  const getCellClassName = useCallback(
    (rowIndex: number, cellIndex: number) => {
      const cell = gameState.grid[rowIndex][cellIndex];
      switch (cell.status) {
        case "correct":
          return "bg-green-500 text-white";
        case "present":
          return "bg-orange-500 text-white";
        case "absent":
          return "bg-gray-500 text-white";
        default:
          return "";
      }
    },
    [gameState.grid]
  );

  const getMaskedWord = useCallback(() => {
    if (!randomWord) return "";

    const word = randomWord.toUpperCase();
    if (word.length <= 2) return word;

    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    const maskedMiddle = "*".repeat(word.length - 2);

    return `${firstChar}${maskedMiddle}${lastChar}`;
  }, [randomWord]);

  const resetGame = useCallback(async () => {
    setGameState({
      grid: createEmptyGrid(),
      currentAttempt: 0,
      currentPosition: 0,
      gameOver: false,
      gameWon: false,
    });

    try {
      const word = await RandomWord();
      setRandomWord(word[0]);
    } catch (error) {
      logDetails(error);
    }
  }, []);

  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameActive(gameState.gameOver, gameState.currentAttempt)) return;

      const key = event.key.toLowerCase();

      if (key === "enter") {
        handleSubmit();
      } else if (key === "backspace") {
        handleBackspace();
      } else if (isChar(key) && gameState.currentPosition < WORD_LENGTH) {
        handleCharInput(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gameState, handleCharInput, handleBackspace, handleSubmit]);

  return {
    randomWord,
    grid: gameState.grid,
    currentAttempt: gameState.currentAttempt,
    currentPosition: gameState.currentPosition,
    gameOver: gameState.gameOver,
    gameWon: gameState.gameWon,
    getCellClassName,
    handleInputChange,
    handleCharInput,
    handleBackspace,
    handleSubmit,
    resetGame,
    reload,
    getMaskedWord,
  };
};
