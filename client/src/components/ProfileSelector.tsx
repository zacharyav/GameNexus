import { useState } from "react";
import { User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface Profile {
  id: string;
  name: string;
  scores: Record<string, number>;
}

interface ProfileSelectorProps {
  profiles: Profile[];
  onSelectProfile: (profile: Profile) => void;
  onCreateProfile: (name: string) => void;
}

export function ProfileSelector({ profiles, onSelectProfile, onCreateProfile }: ProfileSelectorProps) {
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      onCreateProfile(newProfileName.trim());
      setNewProfileName("");
      setShowNewProfile(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-display tracking-tight">Game Hub</CardTitle>
          <CardDescription className="text-lg">Select your profile to start playing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            {profiles.map((profile) => (
              <Button
                key={profile.id}
                variant="outline"
                className="h-auto p-4 justify-start hover-elevate"
                onClick={() => onSelectProfile(profile)}
                data-testid={`button-select-profile-${profile.id}`}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1">
                  <div className="font-semibold">{profile.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {Object.values(profile.scores).reduce((a, b) => a + b, 0)} total wins
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {showNewProfile ? (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Profile Name</Label>
                <Input
                  id="profile-name"
                  placeholder="Enter your name"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateProfile()}
                  data-testid="input-profile-name"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateProfile} className="flex-1" data-testid="button-create-profile">
                  Create Profile
                </Button>
                <Button variant="outline" onClick={() => setShowNewProfile(false)} data-testid="button-cancel">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full hover-elevate"
              onClick={() => setShowNewProfile(true)}
              data-testid="button-new-profile"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Profile
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
