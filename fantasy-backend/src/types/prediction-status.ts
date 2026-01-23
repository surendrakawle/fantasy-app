export type UserPredictionStatus =
  | "PLACED"        // user submitted prediction
  | "WON"           // correct prediction
  | "LOST"          // wrong prediction
  | "REFUNDED";     // contest cancelled / refund
