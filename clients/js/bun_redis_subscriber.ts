import { RedisClient } from 'bun';

const redisPassword = 'data_store_password';

const opts = {
  autoReconnect: true,
};
const listener = new RedisClient(`redis://:${redisPassword}@localhost:6379`, opts);
await listener.connect();

await listener.subscribe('queue-job', (message, channel) => {
  console.log(message);
});