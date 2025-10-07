import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  wins: number;
  onClick: () => void;
}

export function GameCard({ title, description, icon: Icon, wins, onClick }: GameCardProps) {
  return (
    <Card 
      className="cursor-pointer hover-elevate active-elevate-2 transition-all overflow-visible"
      onClick={onClick}
      data-testid={`card-game-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="p-3 rounded-md bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {wins > 0 && (
            <Badge variant="secondary" className="text-xs font-mono" data-testid={`badge-wins-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {wins} {wins === 1 ? 'win' : 'wins'}
            </Badge>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
