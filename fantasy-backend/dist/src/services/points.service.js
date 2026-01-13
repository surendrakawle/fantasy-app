"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsService = void 0;
class PointsService {
    static calculate(stats) {
        let points = 0;
        /* -------------------- BATTING -------------------- */
        points += stats.runs; // +1 per run
        points += stats.fours * 1; // +1 per four
        points += stats.sixes * 2; // +2 per six
        if (stats.runs >= 30)
            points += 4;
        if (stats.runs >= 50)
            points += 8;
        if (stats.runs >= 100)
            points += 16;
        if (stats.runs === 0 && stats.isOut) {
            points -= 2; // duck penalty
        }
        /* -------------------- BOWLING -------------------- */
        points += stats.wickets * 25;
        if (stats.wickets >= 4)
            points += 8;
        if (stats.wickets >= 5)
            points += 16;
        points += stats.maidens * 12;
        /* -------------------- FIELDING -------------------- */
        points += stats.catches * 8;
        if (stats.catches >= 3) {
            points += 4; // bonus
        }
        points += stats.runOuts * 12;
        points += stats.stumpings * 12;
        return points;
    }
}
exports.PointsService = PointsService;
