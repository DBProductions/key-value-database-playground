import * as fs from 'fs';
import { createClient, defineScript } from 'redis';

const redisPassword = 'data_store_password';

(async () => {
    const countAllEntries = fs.readFileSync('../lua_scripts/count_all_entries.lua');
    const getAllEntries = fs.readFileSync('../lua_scripts/get_all_entries.lua');
    const client = createClient({
        password: redisPassword,
        scripts: {
            countAll: defineScript({
                NUMBER_OF_KEYS: 0,
                SCRIPT: countAllEntries,
                transformArguments(key) {
                    return [key];
                }
            }),
            getAll: defineScript({
                NUMBER_OF_KEYS: 0,
                SCRIPT: getAllEntries,
                transformArguments(key) {
                    return [key];
                }
            })
        }
    });

    await client.connect();

    const amount = await client.countAll('user:*');
    console.log(amount);

    const entries = await client.getAll('user:*');
    console.log(entries);

    await client.disconnect();
})();
