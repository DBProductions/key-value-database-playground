# Key-Value Database Playground

This repository provides you with the possibility to experiment with different key value databases. They offer different data structures, publish/subscribe channels and Lua script support.  
They are potential good candidates to be used as cache layer solution.  
Tested with Docker version 27.3.1 and you need `docker compose` Docker Compose version v2.29.7.  

### [Redis](https://github.com/redis/redis)
The classic in-memory data structure store—used worldwide as a cache, message broker, and more.

    docker compose -f docker-compose-redis.yml up

### [Dragonfly](https://github.com/dragonflydb/dragonfly)
A modern, drop-in replacement for Redis and Memcached—built for speed and scale.
⚠️ Dragonfly forbids accessing undeclared keys from scripts, it's configured inside the script source code.

    docker compose -f docker-compose-dragonfly.yml up

### [Valkey](https://github.com/valkey-io/valkey)
A community-driven fork of Redis, optimized for distributed caching and real-time workloads—with flexible architecture and plugin support.

    docker compose -f docker-compose-valkey.yml up

### [KeyDB](https://github.com/Snapchat/KeyDB)
A multithreaded, high-throughput fork of Redis—fully compatible but faster, with active-active replication and cloud-native features.

    docker compose -f docker-compose-keydb.yml up

## 📊 Monitoring
 - Prometheus: http://localhost:9090/
 - Grafana: http://localhost:3000/ (login: admin / password: password).  

Included are pre-configured dashboards for all databases.  

When you face problems with the Grafana login you can set a password like this.

    $ docker exec -it <name of grafana container> grafana-cli admin reset-admin-password <fill in password>

## 💻 Clients
Written in Python and for different JavaScript engines.  
The folder `clients` contains some examples to work with these databases without code changes.  

**Queuing**  
The queue is a list that appends or removes the last element, Last In – First Out principle.  

**Publish/Subscribe**  
For the possibility of losing messages the sender iterates over the last messages until a receiver is connected.

**Create User data**  
User data is stored with key `user:<uuid>` and hashes `personal`, `address` and `images`.

**Lua**  
Some simple Lua scripts to count and get the user data.  

 - count_all_entries.lua
 - get_all_entries.lua

### Python
The Python clients are based on [redis](https://redis-py.readthedocs.io/).  
Project and dependency management is done with [uv](https://docs.astral.sh/uv/).

    cd /clients/py

    # simple queue
    uv run python queue_receive.py
    uv run python queue_send.py

    # pub/sub
    uv run python subscribe.py
    uv run python publish.py

    # set some user data
    uv run python create_user.py

    # lua script
    uv run python lua.py

BullMQ is a fast and robust queue system, where a queue is list of jobs and workers receiving the jobs.

    bun bullmq_queue.py
    bun bullmq_worker.py

### JavaScript
The JavaScript clients are based on [redis](https://www.npmjs.com/package/redis) and [BullMQ](https://docs.bullmq.io/).  
You can use `node`, `deno` or `bun` to run the scripts, `deno` needs `--allow-net` for the `run` command.

    cd /clients/js

    # simple queue
    node queueReceive.js
    node queueSend.js

    # pub/subs
    bun subscribe.js
    deno run --allow-net publish.js

    # set some user data
    bun createUser.js

    # lua script
    bun lua.js

BullMQ is a fast and robust queue system, where a queue is list of jobs and workers receiving the jobs.

    bun bullmqQueue.js
    bun bullmqWorker.js

#### Bun
Since v1.3 Bun includes native bindings for interacting with the Redis Serialization Protocol (RESP3).  
An example demonstrating its usage is provided in the `bun_redis_client.ts` file, not all RESP3 features are currently supported.  

    bun bun_redis_client.ts
    👤 Created user
    ✅ Connected to Redis server
    Send to queue
    Received from queue the following task {"id":"4e60a059-cfe3-4f04-b509-e92672e2d83a","name":"Wendy Swaniawski"}

For Publish/Subscribe communication there are two other scripts provided.

    bun bun_redis_subscriber.ts
    bun bun_redis_publisher.ts

## 💬 Feedback
Star this repo if you found it useful. Use the github issue tracker to give feedback on this repo.