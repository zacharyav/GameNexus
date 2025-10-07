import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowUp, ArrowDown, Trophy } from "lucide-react";

interface NumberGuessingProps {
  onWin: () => void;
  onBack: () => void;
}

export function NumberGuessing({ onWin, onBack }: NumberGuessingProps) {
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("Please enter a number between 1 and 100");
      return;
    }

    setAttempts(attempts + 1);

    if (num === target) {
      setMessage(`Correct! You won in ${attempts + 1} attempts!`);
      setWon(true);
      onWin();
    } else if (num < target) {
      setMessage("Too low! Try a higher number.");
    } else {
      setMessage("Too high! Try a lower number.");
    }
    setGuess("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Number Guessing</CardTitle>
          <CardDescription>Guess the number between 1 and 100</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Attempts: {attempts}</div>
          </div>

          {message && (
            <Alert className={won ? "border-chart-2" : ""}>
              <div className="flex items-center gap-2">
                {!won && message.includes("low") && <ArrowUp className="h-4 w-4" />}
                {!won && message.includes("high") && <ArrowDown className="h-4 w-4" />}
                {won && <Trophy className="h-4 w-4 text-chart-2" />}
                <AlertDescription>{message}</AlertDescription>
              </div>
            </Alert>
          )}

          {!won && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter your guess"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                  min="1"
                  max="100"
                  data-testid="input-guess"
                />
                <Button onClick={handleGuess} data-testid="button-submit-guess">
                  Guess
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onBack} className="flex-1" data-testid="button-back">
              Back to Hub
            </Button>
            {won && (
              <Button onClick={() => window.location.reload()} className="flex-1" data-testid="button-play-again">
                Play Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
