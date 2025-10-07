import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Profile } from "./ProfileSelector";

interface ScoreDashboardProps {
  profiles: Profile[];
  onBack: () => void;
}

const gameNames: Record<string, string> = {
  NumberGuessing: "Number Guessing",
  Blackjack: "Blackjack",
  TicTacToe: "Tic-Tac-Toe",
  SpinTheWheel: "Spin the Wheel",
  ShadowBoxing: "Shadow Boxing",
};

export function ScoreDashboard({ profiles, onBack }: ScoreDashboardProps) {
  const allGames = Array.from(
    new Set(profiles.flatMap(p => Object.keys(p.scores)))
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Score Dashboard</CardTitle>
          <CardDescription>View scores across all profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Player</th>
                  {allGames.map(game => (
                    <th key={game} className="text-center py-3 px-4 font-semibold">
                      {gameNames[game] || game}
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map(profile => (
                  <tr key={profile.id} className="border-b" data-testid={`row-profile-${profile.id}`}>
                    <td className="py-3 px-4 font-medium">{profile.name}</td>
                    {allGames.map(game => (
                      <td key={game} className="text-center py-3 px-4">
                        {profile.scores[game] ? (
                          <Badge variant="secondary" className="font-mono">
                            {profile.scores[game]}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                    <td className="text-center py-3 px-4">
                      <Badge className="font-mono" data-testid={`badge-total-${profile.id}`}>
                        {Object.values(profile.scores).reduce((a, b) => a + b, 0)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button variant="outline" onClick={onBack} className="w-full" data-testid="button-back">
            Back to Hub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
