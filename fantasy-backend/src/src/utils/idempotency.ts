//Prevent duplicate operations (critical for wallet & queues)
export function getIdempotencyKey(prefix: string, id: string) {
    return `${prefix}:${id}`;
  }
  