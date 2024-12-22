import pkg from 'redis';
const { redis, createClient } = pkg;
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

const redisPassword = 'data_store_password';
const queueName = 'tasks';

(async () => {
    const client = createClient({password: redisPassword});

    await client.connect();

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

        await Promise.all([
            client.hSet(`user:${id}:personal`, user),
            client.hSet(`user:${id}:address`, address),
            client.hSet(`user:${id}:images`, images)
        ]);

        console.log(await client.hGetAll(`user:${id}:personal`));
    }

    await client.disconnect();
})();
