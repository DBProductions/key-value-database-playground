import time
import json
import uuid
import redis
from faker import Faker

fake = Faker()

host = 'localhost'
port = 6379
redis_password = 'data_store_password'
channel = 'queue-job'

unreceived_msg = None

try:
    r = redis.Redis(host=host, port=port, db=0, password=redis_password)
    while True:
        try:
            if unreceived_msg:
                print('unreceived message first', unreceived_msg)
                data = unreceived_msg
                unreceived_msg = None
            else:
                data = json.dumps({'name': fake.name(), 'id': str(uuid.uuid4())})
            reply = r.publish('queue-job', data)
            print(f'{reply} received the message')
            if reply == 0:
                unreceived_msg = data
        except redis.ConnectionError:
            print('connection error')
            time.sleep(3)            
            r = redis.Redis(host=host, port=port, db=0, password=redis_password)
        time.sleep(.1)
except KeyboardInterrupt:
    pass
