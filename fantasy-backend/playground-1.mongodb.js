// ===============================
// USE ICT DATABASE
// ===============================
use("fantasy_ict");

// ===============================
// USERS
// ===============================
db.users.drop();
db.users.insertOne({
  name: "ICT Test User",
  email: "ictuser@gmail.com",
  phone: null,
  authProvider: "google",
  googleId: "google-oauth-id-123",
  profilePic: "",
  kycStatus: "PENDING",
  isBlocked: false,
  createdAt: new Date()
});

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ googleId: 1 });

// ===============================
// WALLETS
// ===============================
db.wallets.drop();
db.wallets.insertOne({
  userId: db.users.findOne()._id,
  balance: 1000,
  bonusBalance: 0,
  updatedAt: new Date()
});

db.wallets.createIndex({ userId: 1 }, { unique: true });

// ===============================
// TRANSACTIONS
// ===============================
db.transactions.drop();
db.transactions.insertOne({
  userId: db.users.findOne()._id,
  type: "DEPOSIT", // DEPOSIT | ENTRY_FEE | WIN | WITHDRAW | REFUND
  amount: 1000,
  status: "SUCCESS",
  referenceId: "ict_txn_001",
  createdAt: new Date()
});

db.transactions.createIndex({ userId: 1 });
db.transactions.createIndex({ createdAt: -1 });

// ===============================
// MATCHES
// ===============================
db.matches.drop();
db.matches.insertOne({
  sport: "CRICKET",
  teamA: "India",
  teamB: "Australia",
  startTime: new Date(Date.now() + 3600000),
  status: "UPCOMING", // UPCOMING | LIVE | COMPLETED
  createdAt: new Date()
});

db.matches.createIndex({ status: 1 });

// ===============================
// CONTESTS
// ===============================
db.contests.drop();
db.contests.insertOne({
  matchId: db.matches.findOne()._id,
  entryFee: 50,
  prizePool: 5000,
  maxParticipants: 100,
  joinedCount: 0,
  status: "OPEN", // OPEN | LOCKED | COMPLETED
  createdAt: new Date()
});

db.contests.createIndex({ matchId: 1 });

// ===============================
// PREDICTIONS (QUESTIONS)
// ===============================
db.predictions.drop();
db.predictions.insertMany([
  {
    matchId: db.matches.findOne()._id,
    contestId: db.contests.findOne()._id,
    question: "Who will win the toss?",
    options: ["India", "Australia"],
    correctAnswer: null,
    points: 10
  },
  {
    matchId: db.matches.findOne()._id,
    contestId: db.contests.findOne()._id,
    question: "Who will win the match?",
    options: ["India", "Australia"],
    correctAnswer: null,
    points: 20
  }
]);

db.predictions.createIndex({ contestId: 1 });

// ===============================
// CONTEST PARTICIPANTS
// ===============================
db.contest_participants.drop();
db.contest_participants.insertOne({
  contestId: db.contests.findOne()._id,
  userId: db.users.findOne()._id,
  joinedAt: new Date()
});

db.contest_participants.createIndex(
  { contestId: 1, userId: 1 },
  { unique: true }
);

// ===============================
// USER PREDICTIONS (ANSWERS)
// ===============================
db.user_predictions.drop();
db.user_predictions.insertOne({
  userId: db.users.findOne()._id,
  contestId: db.contests.findOne()._id,
  predictionId: db.predictions.findOne()._id,
  selectedAnswer: "India",
  isCorrect: null,
  pointsEarned: 0
});

db.user_predictions.createIndex({ userId: 1 });
db.user_predictions.createIndex({ contestId: 1 });

// ===============================
// RESULTS & RANKINGS
// ===============================
db.results.drop();
db.results.insertOne({
  contestId: db.contests.findOne()._id,
  userId: db.users.findOne()._id,
  totalPoints: 0,
  rank: null,
  winningAmount: 0,
  credited: false
});

db.results.createIndex({ contestId: 1 });

// ===============================
// KYC (OPTIONAL - INDIA READY)
// ===============================
db.kyc.drop();
db.kyc.insertOne({
  userId: db.users.findOne()._id,
  pan: "ABCDE1234F",
  verified: false,
  createdAt: new Date()
});

db.kyc.createIndex({ userId: 1 }, { unique: true });

// ===============================
// DONE
// ===============================
print("✅ Fantasy ICT database setup completed successfully");
