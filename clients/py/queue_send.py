import json
import time
import uuid
import redis
from faker import Faker

fake = Faker()
host = 'localhost'
write_port = 6379
redis_password = 'data_store_password'
queue_name = 'tasks'

try:
    r = redis.Redis(host=host, port=write_port, db=0, password=redis_password)
    while True:
        try:
            id = uuid.uuid4()
            r.rpush(f'queues:{queue_name}', json.dumps({'name': fake.name(), 'id': str(id)}))
            print('.', end='', flush=True)
        except redis.ConnectionError:
            print('connection error')
            time.sleep(2)
            r = redis.Redis(host=host, port=write_port, db=0, password=redis_password)
        time.sleep(.1)
except KeyboardInterrupt:
    pass
