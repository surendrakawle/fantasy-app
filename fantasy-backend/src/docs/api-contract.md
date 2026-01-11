## AUTH
POST /auth/google-login
Body:
{
  "token": string
}

Response:
{
  "token": string
}

---

## USER
GET /user/me
Headers:
Authorization: Bearer <JWT>

---

## CONTEST
GET /contests

POST /contests/:id/join

---

## WALLET
GET /wallet/balance
GET /wallet/transactions

---

## PREDICTION
POST /predictions/submit
Body:
{
  contestId,
  predictionId,
  selectedAnswer
}
