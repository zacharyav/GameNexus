import { type Profile, type InsertProfile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Profile operations
  getAllProfiles(): Promise<Profile[]>;
  getProfile(id: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, profile: Partial<Profile>): Promise<Profile | undefined>;
}

export class MemStorage implements IStorage {
  private profiles: Map<string, Profile>;

  constructor() {
    this.profiles = new Map();
  }

  async getAllProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfile(id: string): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = randomUUID();
    const profile: Profile = {
      id,
      name: insertProfile.name,
      scores: insertProfile.scores || {},
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;

    // Deep merge for scores to prevent overwriting
    const updatedProfile = {
      ...profile,
      ...updates,
      scores: updates.scores !== undefined ? updates.scores : profile.scores,
    };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }
}

export const storage = new MemStorage();
