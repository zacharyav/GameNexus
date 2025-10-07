import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy, X } from "lucide-react";

interface BlackjackProps {
  onWin: () => void;
  onBack: () => void;
}

const drawCard = () => Math.floor(Math.random() * 11) + 1;

export function Blackjack({ onWin, onBack }: BlackjackProps) {
  const [playerTotal, setPlayerTotal] = useState(() => drawCard() + drawCard());
  const [dealerTotal, setDealerTotal] = useState(() => drawCard() + drawCard());
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [playerStood, setPlayerStood] = useState(false);

  const handleHit = () => {
    const newTotal = playerTotal + drawCard();
    setPlayerTotal(newTotal);
    if (newTotal > 21) {
      setResult("Busted! Dealer wins.");
      setGameOver(true);
    }
  };

  const handleStand = () => {
    setPlayerStood(true);
    let currentDealerTotal = dealerTotal;
    
    while (currentDealerTotal < 17) {
      currentDealerTotal += drawCard();
    }
    
    setDealerTotal(currentDealerTotal);
    
    if (currentDealerTotal > 21 || playerTotal > currentDealerTotal) {
      setResult("You win!");
      onWin();
    } else if (currentDealerTotal > playerTotal) {
      setResult("Dealer wins!");
    } else {
      setResult("It's a tie!");
    }
    setGameOver(true);
  };

  const resetGame = () => {
    setPlayerTotal(drawCard() + drawCard());
    setDealerTotal(drawCard() + drawCard());
    setGameOver(false);
    setResult("");
    setPlayerStood(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Blackjack</CardTitle>
          <CardDescription>Get as close to 21 as possible without going over</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Your Hand</div>
              <div className="text-4xl font-mono font-bold" data-testid="text-player-total">{playerTotal}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Dealer's Hand</div>
              <div className="text-4xl font-mono font-bold" data-testid="text-dealer-total">
                {playerStood ? dealerTotal : "?"}
              </div>
            </div>
          </div>

          {result && (
            <Alert className={result.includes("win") && !result.includes("Dealer") ? "border-chart-2" : ""}>
              <div className="flex items-center gap-2">
                {result.includes("win") && !result.includes("Dealer") ? (
                  <Trophy className="h-4 w-4 text-chart-2" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <AlertDescription>{result}</AlertDescription>
              </div>
            </Alert>
          )}

          <div className="space-y-3">
            {!gameOver ? (
              <div className="flex gap-2">
                <Button onClick={handleHit} className="flex-1" data-testid="button-hit">
                  Hit
                </Button>
                <Button onClick={handleStand} variant="secondary" className="flex-1" data-testid="button-stand">
                  Stand
                </Button>
              </div>
            ) : (
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
