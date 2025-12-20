import { createClient, commandOptions } from 'redis';
import { faker } from '@faker-js/faker';

const redisPassword = 'data_store_password';
const queueName = 'tasks';

(async () => {
  const client = createClient({password: redisPassword});
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  setInterval(async () => {
    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName()
    };      
    const rPushPromise = client.rPush(
        commandOptions({ isolated: true }),
        `queues:${queueName}`,
        JSON.stringify(user)
    );
    const task = await rPushPromise;
    console.log(`${task} tasks in queue`);
  }, 100);
})();
