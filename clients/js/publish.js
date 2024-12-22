import { createClient } from 'redis';
import { faker } from '@faker-js/faker';

const redisPassword = 'data_store_password';
const publishMessageTo = 'queue-job';
let unreceivedMsg = false;

(async () => {
  const publisher = createClient({password: redisPassword});
  publisher.on('error', (err) => console.log('Redis Client Error', err));
  
  await publisher.connect();

  let data;
  while (true) {
    try {
      if (unreceivedMsg) {
        console.log('unreceived message first', unreceivedMsg)
        data = unreceivedMsg;
        unreceivedMsg = false;
      } else {
        data = { id: faker.string.uuid(), name: faker.person.fullName()};
      }
      const reply = await publisher.publish(publishMessageTo, JSON.stringify(data));
      console.log(`${reply} received the message`);
      if (reply === 0) {
        unreceivedMsg = data;
      }
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.log("Error getting the data", e);
    }
  }
})();
