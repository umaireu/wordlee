import { Alert, Input } from "../../components";
import { useGuessWord } from "./hooks/use-wordlee";

export const Wordlee = () => {
  const {
    grid,
    gameOver,
    gameWon,
    reload,
    getCellClassName,
    handleInputChange,
    getMaskedWord,
  } = useGuessWord();

  return (
    <div className="flex flex-col justify-center gap-4 mx-auto max-w-[500px] mt-4">
      <div className="flex flex-col items-center">
        {/* Masked Word Display */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <p className="text-gray-400 text-sm mb-2">Target Word:</p>
          <p className="text-white text-2xl font-bold tracking-wider font-mono">
            {getMaskedWord()}
          </p>
        </div>

        <div className="grid grid-rows-5 gap-2 mb-4">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((cell, cellIndex) => {
                return (
                  <Input
                    key={cellIndex}
                    value={cell.value}
                    onChange={(e) =>
                      handleInputChange(e.target.value, rowIndex, cellIndex)
                    }
                    className={`w-12 h-12 text-center font-bold ${getCellClassName(
                      rowIndex,
                      cellIndex
                    )}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <Alert
              title={gameWon ? "You Won" : "You Lost"}
              message={""}
              onClick={reload}
              type={gameWon ? "success" : "error"}
              className="!max-w-[250px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
