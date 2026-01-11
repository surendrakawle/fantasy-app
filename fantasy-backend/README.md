const socket = io("http://localhost:4000");

socket.emit("join-contest", contestId);

socket.on("leaderboard-update", (data) => {
  console.log("Live leaderboard:", data);
});

await updateLeaderboard(contestId, userId, totalPoints);

pm2 start dist/workers/result.worker.js --name result-worker
pm2 start dist/workers/fraud.worker.js --name fraud-worker
pm2 save 


Match ends
   ↓
Add job → result-queue
   ↓
Worker calculates result
   ↓
Update leaderboard + wallet



Result calculated
   ↓
Add job → wallet-queue
   ↓
Worker credits wallets



🧠 SUMMARY TABLE (VERY IMPORTANT)

| Event              | Add Job From | Queue Name           |
| ------------------ | ------------ | -------------------- |
| Match completed    | Cron / Admin | `result-queue`       |
| Result calculated  | Worker       | `wallet-queue`       |
| Withdraw requested | API          | `fraud-queue`        |
| Score updated      | Worker       | `leaderboard-queue`  |
| Winner declared    | Worker       | `notification-queue` |


✅ BEST PRACTICE (FOLLOW THIS)

✔ API = add job only
✔ Worker = do heavy logic
✔ Cron = trigger automation
✔ One job = one responsibility
✔ Idempotent jobs (safe retry)

Below is the COMPLETE, END-TO-END implementation for ALL of the following in your fantasy backend using BullMQ + Redis + TypeScript:

✅ Wallet Queue
✅ Notification Queue
✅ Cron Jobs (automation)
✅ Idempotency & Retry-safe Jobs

This is production-grade, copy-paste ready, and matches everything you’ve already built.

🧱 OVERALL ARCHITECTURE (IMPORTANT)

API (Express)
   ├── Adds Jobs (FAST)
   ↓
BullMQ Queues
   ↓
Workers (Heavy Logic)
   ├── Wallet credit
   ├── Result calculation
   ├── Fraud check
   ├── Notifications



🧾 SERVICES SUMMARY

| Service      | Responsibility            |
| ------------ | ------------------------- |
| googleAuth   | Google token verification |
| wallet       | Wallet debit              |
| leaderboard  | Redis ranking             |
| fraudScore   | Fraud detection           |
| ai           | AI prompts                |
| result       | Result calculation        |
| notification | Push/SMS                  |
| withdraw     | TDS calculation           |
| cache        | Redis cache               |
| queue        | Job abstraction           |


🧾 UTILS SUMMARY (WHAT EACH DOES)
| File        | Purpose                 |
| ----------- | ----------------------- |
| ApiError    | Central error handling  |
| ApiResponse | Standard API format     |
| catchAsync  | Cleaner controllers     |
| jwt         | Token helpers           |
| objectId    | ID validation           |
| pagination  | List APIs               |
| date        | FY & time helpers       |
| logger      | Lightweight logs        |
| sanitize    | Input safety            |
| idempotency | Duplicate prevention    |
| constants   | Shared enums            |
| response    | Success response helper |

