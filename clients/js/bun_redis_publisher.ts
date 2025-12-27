import { RedisClient } from 'bun';
import { faker } from '@faker-js/faker';

const redisPassword = 'data_store_password';
const publishMessageTo = 'queue-job';
let unreceivedMsg = "";

const opts = {
  autoReconnect: true,
};
const writer = new RedisClient(`redis://:${redisPassword}@localhost:6379`, opts);
await writer.connect();

let data = '';
while (true) {
  if (unreceivedMsg != "") {
    console.log('unreceived message first', unreceivedMsg)
    data = unreceivedMsg;
    unreceivedMsg = '';
  } else {
    data = JSON.stringify({ id: faker.string.uuid(), name: faker.person.fullName()});
  }
  const reply = await writer.publish(publishMessageTo, data);
  console.log(`${reply} received the message`);
  if (reply === 0) {
    unreceivedMsg = data;
  }
}
