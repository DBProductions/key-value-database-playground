import { RedisClient } from 'bun';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

const queueName = 'tasks';
const redisPassword = 'data_store_password';

// Creating a custom client
const client = new RedisClient(`redis://:${redisPassword}@localhost:6379`);

client.onconnect = () => {
	console.log('✅ Connected to Redis server');
};

client.onclose = err => {
	console.error('Disconnected from Redis server ', err);
};

// create some user
for(let i = 0; i < 10; i++) {
    const id = uuid();
    const user = {
        'name': faker.person.firstName(),
        'surname': faker.person.lastName()
    }
    const address = {
        'city': faker.location.city()
    }
    const images = {
        'profile': faker.image.avatar()
    }
    client.hset(`user:${id}:personal`, user);
    client.hset(`user:${id}:address`, address);
    client.hset(`user:${id}:images`, images);
}
console.log(`👤 Created user`);

// send to queue
const user = {
  id: faker.string.uuid(),
  name: faker.person.fullName()
};
await client.rpush(`queues:${queueName}`, JSON.stringify(user));
console.log(`Send to queue`);

// receive from queue
const taskFromQueue = await client.blpop(`queues:${queueName}`, 0);
console.log(`Received from queue the following task ${taskFromQueue[1]}`);