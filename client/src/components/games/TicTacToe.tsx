import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy } from "lucide-react";

interface TicTacToeProps {
  vsBot: boolean;
  onWin: () => void;
  onBack: () => void;
}

type Cell = "X" | "O" | null;

const checkWinner = (board: Cell[]): Cell | "draw" | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) return "draw";
  return null;
};

export function TicTacToe({ vsBot, onWin, onBack }: TicTacToeProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Cell | "draw" | null>(null);

  const makeMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === "X") onWin();
      return;
    }

    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);

    if (vsBot && nextPlayer === "O") {
      setTimeout(() => botMove(newBoard), 500);
    }
  };

  const botMove = (currentBoard: Cell[]) => {
    const emptyIndices = currentBoard
      .map((cell, i) => (cell === null ? i : null))
      .filter(i => i !== null) as number[];

    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...currentBoard];
    newBoard[randomIndex] = "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setCurrentPlayer("X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Tic-Tac-Toe</CardTitle>
          <CardDescription>{vsBot ? "Player vs Bot" : "Player vs Player"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              {winner ? (
                winner === "draw" ? "It's a draw!" : `${winner} wins!`
              ) : (
                `Current Player: ${currentPlayer}`
              )}
            </div>
          </div>

          {winner && winner !== "draw" && (
            <Alert className={winner === "X" ? "border-chart-2" : ""}>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <AlertDescription>{winner === "X" ? "You win!" : "Bot wins!"}</AlertDescription>
              </div>
            </Alert>
          )}

          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {board.map((cell, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 text-3xl font-bold hover-elevate"
                onClick={() => makeMove(index)}
                disabled={!!cell || !!winner}
                data-testid={`button-cell-${index}`}
              >
                {cell}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            {winner && (
              <Button onClick={resetGame} className="w-full" data-testid="button-play-again">
                Play Again
              </Button>
            )}
            <Button variant="outline" onClick={onBack} className="w-full" data-testid="button-back">
              Back to Hub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
