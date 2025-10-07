import { Dices, Spade, Grid3x3, Disc, Swords, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCard } from "./GameCard";
import { Profile } from "./ProfileSelector";

interface GameHubProps {
  profile: Profile;
  onSelectGame: (game: string) => void;
  onViewScores: () => void;
  onChangeProfile: () => void;
}

export function GameHub({ profile, onSelectGame, onViewScores, onChangeProfile }: GameHubProps) {
  const games = [
    {
      id: "number-guessing",
      title: "Number Guessing",
      description: "Guess the number between 1-100",
      icon: Dices,
      scoreKey: "NumberGuessing",
    },
    {
      id: "blackjack",
      title: "Blackjack",
      description: "Get as close to 21 as possible",
      icon: Spade,
      scoreKey: "Blackjack",
    },
    {
      id: "tictactoe-pvp",
      title: "Tic-Tac-Toe (PvP)",
      description: "Play against a friend",
      icon: Grid3x3,
      scoreKey: "TicTacToe",
    },
    {
      id: "tictactoe-bot",
      title: "Tic-Tac-Toe (vs Bot)",
      description: "Play against the computer",
      icon: Grid3x3,
      scoreKey: "TicTacToe",
    },
    {
      id: "spin-wheel",
      title: "Spin the Wheel",
      description: "Random name picker",
      icon: Disc,
      scoreKey: "SpinTheWheel",
    },
    {
      id: "shadow-boxing",
      title: "Shadow Boxing",
      description: "Match opponent's moves",
      icon: Swords,
      scoreKey: "ShadowBoxing",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Game Hub</h1>
            <p className="text-muted-foreground">Playing as: <span className="font-semibold text-foreground">{profile.name}</span></p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onViewScores} data-testid="button-view-scores">
              <Trophy className="h-4 w-4 mr-2" />
              Scores
            </Button>
            <Button variant="outline" onClick={onChangeProfile} data-testid="button-change-profile">
              Change Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map(game => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              wins={profile.scores[game.scoreKey] || 0}
              onClick={() => onSelectGame(game.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
