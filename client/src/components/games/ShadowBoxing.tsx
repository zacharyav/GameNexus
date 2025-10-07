import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Trophy, X } from "lucide-react";

interface ShadowBoxingProps {
  onWin: () => void;
  onBack: () => void;
}

const moves = ["Up", "Down", "Left", "Right"];
const moveIcons = {
  Up: ArrowUp,
  Down: ArrowDown,
  Left: ArrowLeft,
  Right: ArrowRight,
};

export function ShadowBoxing({ onWin, onBack }: ShadowBoxingProps) {
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentMove, setOpponentMove] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [lastPlayerMove, setLastPlayerMove] = useState<string | null>(null);

  const makeMove = (playerMove: string) => {
    if (gameOver || waitingForResponse) return;

    const oppMove = moves[Math.floor(Math.random() * 4)];
    setOpponentMove(oppMove);
    setLastPlayerMove(playerMove);

    if (playerMove === oppMove) {
      const newScore = opponentScore + 1;
      setOpponentScore(newScore);
      if (newScore === 3) {
        setGameOver(true);
      }
    } else {
      setWaitingForResponse(true);
    }
  };

  const respondToOpponent = (responseMove: string) => {
    if (!opponentMove) return;

    setWaitingForResponse(false);
    
    if (responseMove === opponentMove) {
      const newScore = playerScore + 1;
      setPlayerScore(newScore);
      if (newScore === 3) {
        setGameOver(true);
        onWin();
      }
    }
    
    setOpponentMove(null);
    setLastPlayerMove(null);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setOpponentScore(0);
    setOpponentMove(null);
    setGameOver(false);
    setWaitingForResponse(false);
    setLastPlayerMove(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Shadow Boxing</CardTitle>
          <CardDescription>Match your opponent's moves to score points. First to 3 wins!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Your Score</div>
              <div className="text-4xl font-mono font-bold text-chart-2" data-testid="text-player-score">
                {playerScore}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Opponent Score</div>
              <div className="text-4xl font-mono font-bold text-destructive" data-testid="text-opponent-score">
                {opponentScore}
              </div>
            </div>
          </div>

          {gameOver && (
            <Alert className={playerScore === 3 ? "border-chart-2" : "border-destructive"}>
              <div className="flex items-center gap-2">
                {playerScore === 3 ? (
                  <Trophy className="h-4 w-4 text-chart-2" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
                <AlertDescription>
                  {playerScore === 3 ? "You win the round!" : "You lose the round!"}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {opponentMove && (
            <Alert>
              <AlertDescription className="flex items-center gap-2">
                <span>Opponent played:</span>
                <strong>{opponentMove}</strong>
                {moveIcons[opponentMove as keyof typeof moveIcons] && 
                  (() => {
                    const Icon = moveIcons[opponentMove as keyof typeof moveIcons];
                    return <Icon className="h-4 w-4" />;
                  })()
                }
              </AlertDescription>
            </Alert>
          )}

          {!gameOver && (
            <div className="space-y-4">
              <div className="text-sm font-medium text-center">
                {waitingForResponse ? "Match the opponent's move!" : "Choose your move:"}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {moves.map((move) => {
                  const Icon = moveIcons[move as keyof typeof moveIcons];
                  return (
                    <Button
                      key={move}
                      onClick={() => waitingForResponse ? respondToOpponent(move) : makeMove(move)}
                      variant={lastPlayerMove === move && !waitingForResponse ? "default" : "outline"}
                      className="h-16 hover-elevate"
                      data-testid={`button-move-${move.toLowerCase()}`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {move}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-4">
            {gameOver && (
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
