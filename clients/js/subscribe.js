import { createClient } from 'redis';

const redisPassword = 'data_store_password';

(async () => {
  const client = createClient({password: redisPassword});
  const subscriber = client.duplicate();
  subscriber.on('error', (err) => console.log('Redis Client Error', err));

  await subscriber.connect();
  await subscriber.subscribe('queue-job', (message) => {
    console.log(message); // 'message'
  });  
})();