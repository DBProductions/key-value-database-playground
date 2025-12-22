import { Queue } from 'bullmq';
import { faker } from '@faker-js/faker';

const redisPassword = 'data_store_password';
const myQueue = new Queue('bullmq-jobs', {
  connection: {
    password: redisPassword,
  },
});

async function addJobs() {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName()
  };  
  await myQueue.add('newUser', user);
  await myQueue.add('newUse', user);
}

(async () => {
    setInterval(async () => {
        await addJobs();
    }, 100);
})();