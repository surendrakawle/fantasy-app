export const POINTS = {
    BATSMAN: {
      RUN: 1,
      FOUR: 1,
      SIX: 2,
      FIFTY: 8,
      HUNDRED: 16,
      DUCK: -2
    },
  
    BOWLER: {
      WICKET: 25,
      MAIDEN: 12,
      FOUR_WICKET: 8,
      FIVE_WICKET: 16
    },
  
    FIELDING: {
      CATCH: 8,
      STUMPING: 12,
      RUN_OUT: 12
    },
  
    ECONOMY: [
      { max: 5, points: 12 },
      { max: 6, points: 8 },
      { max: 7, points: 4 },
      { max: 10, points: -4 },
      { min: 10, points: -8 }
    ]
  };
  