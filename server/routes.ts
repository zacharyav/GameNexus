import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all profiles
  app.get("/api/profiles", async (req, res) => {
    try {
      const profiles = await storage.getAllProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  });

  // Create a new profile
  app.post("/api/profiles", async (req, res) => {
    try {
      const validated = insertProfileSchema.parse(req.body);
      if (!validated.name || validated.name.trim().length === 0) {
        return res.status(400).json({ error: "Profile name is required" });
      }
      const profile = await storage.createProfile(validated);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  // Update profile scores
  app.put("/api/profiles/:id/scores", async (req, res) => {
    try {
      const { id } = req.params;
      const { gameKey } = req.body;
      
      if (!gameKey || typeof gameKey !== 'string' || gameKey.trim().length === 0) {
        return res.status(400).json({ error: "Game key is required" });
      }

      // Validate game key
      const validGameKeys = ['NumberGuessing', 'Blackjack', 'TicTacToe', 'SpinTheWheel', 'ShadowBoxing'];
      if (!validGameKeys.includes(gameKey)) {
        return res.status(400).json({ error: "Invalid game key" });
      }
      
      const profile = await storage.getProfile(id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const currentScores = profile.scores as Record<string, number>;
      const currentScore = currentScores[gameKey] || 0;
      const updatedScores = {
        ...currentScores,
        [gameKey]: currentScore + 1,
      };

      const updated = await storage.updateProfile(id, { scores: updatedScores });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Failed to update scores" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
