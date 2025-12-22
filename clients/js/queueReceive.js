import pkg from 'redis';
const { createClient } = pkg;

const redisPassword = 'data_store_password';
const queueName = 'tasks';

(async () => {
  const client = createClient({password: redisPassword});
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  setInterval(async () => {
    const blPopPromise = client.blPop(
        `queues:${queueName}`,
        0
    );
    const task = await blPopPromise;
    console.log(task.element);
  }, 100);
})();
