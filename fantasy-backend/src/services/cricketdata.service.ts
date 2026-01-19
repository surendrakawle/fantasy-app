import axios from "axios";
import { ApiIngest } from "../models/ApiIngest.model";
import { env } from "../config/env";

const BASE_URL = "https://api.cricketdata.org/v1"; // example

export class CricketDataService {

  /* ---------- GENERIC FETCH + STORE ---------- */
  static async fetchAndStore(endpoint: string) {
    const requestAt = new Date();

    try {
      const res = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          apikey: env.CRICKETDATA_API_KEY
        },
        timeout: 10000
      });

      // 🔥 Store full raw response
      await ApiIngest.create({
        apiName: "cricketdata",
        endpoint,
        requestAt,
        response: res.data,
        success: true
      });

      return res.data;

    } catch (e: any) {

      // ❌ Store failure also
      await ApiIngest.create({
        apiName: "cricketdata",
        endpoint,
        requestAt,
        response: {},
        success: false,
        error: e.message
      });

      throw e;
    }
  }

  /* ---------- SPECIFIC USE CASES ---------- */

  // Upcoming matches
  static async syncUpcomingMatches() {
    return this.fetchAndStore("/matches/upcoming");
  }

  // Live matches
  static async syncLiveMatches() {
    return this.fetchAndStore("/matches/live");
  }

  // Players list
  static async syncPlayers() {
    return this.fetchAndStore("/players");
  }

  // Match details
  static async syncMatchDetails(matchId: string) {
    return this.fetchAndStore(`/match/${matchId}`);
  }
}
