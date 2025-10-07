import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SpinWheelProps {
  onWin: () => void;
  onBack: () => void;
}

export function SpinWheel({ onWin, onBack }: SpinWheelProps) {
  const [namesInput, setNamesInput] = useState("");
  const [winner, setWinner] = useState("");
  const [names, setNames] = useState<string[]>([]);

  const handleSpin = () => {
    const nameList = namesInput
      .split(",")
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (nameList.length === 0) {
      alert("Please enter at least one name!");
      return;
    }

    setNames(nameList);
    const randomIndex = Math.floor(Math.random() * nameList.length);
    setWinner(nameList[randomIndex]);
    onWin();
  };

  const reset = () => {
    setWinner("");
    setNames([]);
    setNamesInput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Spin the Wheel</CardTitle>
          <CardDescription>Enter names separated by commas and spin to pick a winner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!winner ? (
            <>
              <div className="space-y-2">
                <Input
                  placeholder="Alice, Bob, Charlie, David..."
                  value={namesInput}
                  onChange={(e) => setNamesInput(e.target.value)}
                  data-testid="input-names"
                />
                <p className="text-xs text-muted-foreground">
                  Separate names with commas
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSpin} className="flex-1" data-testid="button-spin">
                  Spin!
                </Button>
                <Button variant="outline" onClick={onBack} data-testid="button-back">
                  Back
                </Button>
              </div>
            </>
          ) : (
            <>
              <Alert className="border-chart-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-chart-2" />
                  <AlertDescription className="text-lg font-semibold">
                    Winner: {winner}
                  </AlertDescription>
                </div>
              </Alert>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">All Participants:</div>
                <div className="flex flex-wrap gap-2">
                  {names.map((name, i) => (
                    <Badge key={i} variant="secondary" data-testid={`badge-participant-${i}`}>
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={reset} className="flex-1" data-testid="button-spin-again">
                  Spin Again
                </Button>
                <Button variant="outline" onClick={onBack} data-testid="button-back">
                  Back to Hub
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
