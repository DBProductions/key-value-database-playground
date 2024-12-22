# Key-Value Database Playground

This repository provides you with the possibility to experiment with different key value databases. They offer different data structures, publish/subscribe channels and Lua script support.  
They are potential good candidates to be used as cache layer solution.  
Tested with Docker version 27.3.1 and you need `docker compose` Docker Compose version v2.29.7.  

### [Redis](https://github.com/redis/redis)
Redis is an in-memory data structure store, used as a cache or message broker.

    docker compose -f docker-compose-redis.yml up

### [Dragonfly](https://github.com/dragonflydb/dragonfly)
A modern replacement for Redis and Memcached.  
Dragonfly forbids accessing undeclared keys from scripts, it's configured inside the script source code.

    docker compose -f docker-compose-dragonfly.yml up

### [Valkey](https://github.com/valkey-io/valkey)
A flexible distributed key-value datastore that is optimized for caching and other realtime workloads.

    docker compose -f docker-compose-valkey.yml up

### [KeyDB](https://github.com/Snapchat/KeyDB)
Open source database and a faster replacement for Redis

    docker compose -f docker-compose-keydb.yml up

## Monitoring
Prometheus is available under `http://localhost:9090/` and Grafana serves here `http://localhost:3000/`.  
For Grafana the `admin` password is simple `password`. Some community built dashboards are included.  

When you face problems with the Grafana login you can set a password like this.

    $ docker exec -it <name of grafana container> grafana-cli admin reset-admin-password <fill in password>

## Clients
Written in Python and for different JavaScript engines.  
The Folder `clients` contains some examples to work with these databases without code changes.  

**Queuing**  
The queue is a list that appends or removes the last element, Last In – First Out principle.  

**Publish/Subscribe**  
For the possibility of losing messages the sender iterates over the last messages until a receiver is connected.

**Create User**  
User data is stored with key `user:<uuid>` and hashes `persoanl`, `address` and `images`.

**Lua**  
Some simple Lua scripts to count and get the user data.  

 - count_all_entries.lua
 - get_all_entries.lua

### Python
The Python clients are based on [redis](https://redis-py.readthedocs.io/).  
Dependency management is done with [poetry](https://python-poetry.org/).

    cd /clients/py

    # simple queue
    poetry run python queue_receive.py
    poetry run python queue_send.py

    # pub/sub
    poetry run python subscribe.py
    poetry run python publish.py

    # set some user data
    poetry run python create_user.py

    # lua script
    poetry run python lua.py

### JavaScript
The JavaScript clients are based on [redis](https://www.npmjs.com/package/redis).  
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

## Feedback
Star this repo if you found it useful. Use the github issue tracker to give feedback on this repo.