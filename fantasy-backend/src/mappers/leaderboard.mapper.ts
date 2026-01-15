export const mapLeaderboard = (raw: string[]) => {
    const result = [];
  
    for (let i = 0; i < raw.length; i += 2) {
      result.push({
        userId: raw[i],
        score: Number(raw[i + 1])
      });
    }
  
    return result;
  };
  