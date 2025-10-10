import { useState } from "react";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProfileSelector, Profile } from "@/components/ProfileSelector";
import { GameHub } from "@/components/GameHub";
import { NumberGuessing } from "@/components/games/NumberGuessing";
import { Blackjack } from "@/components/games/Blackjack";
import { TicTacToe } from "@/components/games/TicTacToe";
import { SpinWheel } from "@/components/games/SpinWheel";
import { ShadowBoxing } from "@/components/games/ShadowBoxing";
import { ScoreDashboard } from "@/components/ScoreDashboard";

type View = "profile-select" | "hub" | "scores" | string;

function GameApp() {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [currentView, setCurrentView] = useState<View>("profile-select");

  const { data: profiles = [], refetch } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  const createProfileMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest("POST", "/api/profiles", { name });
      return await res.json();
    },
    onSuccess: async (newProfile: Profile) => {
      await refetch();
      setCurrentProfile(newProfile);
      setCurrentView("hub");
    },
  });

  const updateScoreMutation = useMutation({
    mutationFn: async ({ profileId, gameKey }: { profileId: string; gameKey: string }) => {
      const res = await apiRequest("PUT", `/api/profiles/${profileId}/scores`, { gameKey });
      return await res.json();
    },
    onSuccess: async (updatedProfile: Profile) => {
      await refetch();
      setCurrentProfile(updatedProfile);
    },
    onError: (error) => {
      console.error("Failed to update score:", error);
    },
  });

  const handleSelectProfile = (profile: Profile) => {
    setCurrentProfile(profile);
    setCurrentView("hub");
  };

  const handleCreateProfile = (name: string) => {
    createProfileMutation.mutate(name);
  };

  // Map view IDs to score storage keys
  const gameKeyMap: Record<string, string> = {
    "number-guessing": "NumberGuessing",
    "blackjack": "Blackjack",
    "tictactoe-pvp": "TicTacToe",
    "tictactoe-bot": "TicTacToe",
    "spin-wheel": "SpinTheWheel",
    "shadow-boxing": "ShadowBoxing",
  };

  const handleGameWin = (gameKey: string) => {
    if (!currentProfile) return;
    const storageKey = gameKeyMap[gameKey];
    if (!storageKey) {
      console.error(`Invalid game key: ${gameKey}`);
      return;
    }
    updateScoreMutation.mutate({ profileId: currentProfile.id, gameKey: storageKey });
  };

  const handleBackToHub = () => setCurrentView("hub");
  const handleChangeProfile = () => {
    setCurrentProfile(null);
    setCurrentView("profile-select");
  };

  return (
    <>
      {currentView === "profile-select" && (
        <ProfileSelector
          profiles={profiles}
          onSelectProfile={handleSelectProfile}
          onCreateProfile={handleCreateProfile}
        />
      )}

      {currentView === "hub" && currentProfile && (
        <GameHub
          profile={currentProfile}
          onSelectGame={setCurrentView}
          onViewScores={() => setCurrentView("scores")}
          onChangeProfile={handleChangeProfile}
        />
      )}

      {currentView === "scores" && (
        <ScoreDashboard
          profiles={profiles}
          onBack={handleBackToHub}
        />
      )}

      {currentView === "number-guessing" && (
        <NumberGuessing
          onWin={() => handleGameWin("number-guessing")}
          onBack={handleBackToHub}
        />
      )}

      {currentView === "blackjack" && (
        <Blackjack
          onWin={() => handleGameWin("blackjack")}
          onBack={handleBackToHub}
        />
      )}

      {currentView === "tictactoe-pvp" && (
        <TicTacToe
          vsBot={false}
          onWin={() => handleGameWin("tictactoe-pvp")}
          onBack={handleBackToHub}
        />
      )}

      {currentView === "tictactoe-bot" && (
        <TicTacToe
          vsBot={true}
          onWin={() => handleGameWin("tictactoe-bot")}
          onBack={handleBackToHub}
        />
      )}

      {currentView === "spin-wheel" && (
        <SpinWheel
          onWin={() => handleGameWin("spin-wheel")}
          onBack={handleBackToHub}
        />
      )}

      {currentView === "shadow-boxing" && (
        <ShadowBoxing
          onWin={() => handleGameWin("shadow-boxing")}
          onBack={handleBackToHub}
        />
      )}

<<<<<<< HEAD
      <Toaster />
    </>
=======
     </>
>>>>>>> cf185d37 (Updated client build, fixed UI and Tailwind config)
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
<<<<<<< HEAD
        <TooltipProvider>
          <GameApp />
        </TooltipProvider>
=======
          <GameApp />
>>>>>>> cf185d37 (Updated client build, fixed UI and Tailwind config)
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
