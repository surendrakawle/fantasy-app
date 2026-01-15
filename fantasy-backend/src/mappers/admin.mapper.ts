export const mapMatch = (match: any) => ({
    id: match._id,
    teamA: match.teamA,
    teamB: match.teamB,
    sport: match.sport,
    startTime: match.startTime
  });
  
  export const mapContest = (contest: any) => ({
    id: contest._id,
    entryFee: contest.entryFee,
    prizePool: contest.prizePool,
    maxParticipants: contest.maxParticipants,
    lockTime: contest.lockTime,
    status: contest.status
  });
  
  export const mapPrediction = (prediction: any) => ({
    id: prediction._id,
    question: prediction.question,
    options: prediction.options,
    points: prediction.points,
    order: prediction.order
  });
  