import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

export const getRedisClient = (): RedisClientType => {
  if (!client) {
    client = createClient({
      url: "redis://localhost:6379",
    });

    client.connect();
  }

  return client;
};
