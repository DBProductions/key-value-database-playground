import time
import json
import redis

host = 'localhost'
port = 6379
redis_password = 'data_store_password'
channel = 'queue-job'

def process(message):
    print(message)
    if message['type'] == 'message':
        jsonData = json.loads(message['data'].decode('utf-8'))
        print(jsonData)

try:
    r = redis.Redis(host=host, port=port, db=0, password=redis_password)
    pubsub = r.pubsub()
    pubsub.subscribe(channel)
    print(f"Subscribed to {channel}. Waiting for messages...")
    while True:
        try:
            message = pubsub.get_message()
        except redis.ConnectionError:
            time.sleep(3)
            r = redis.Redis(host=host, port=port, db=0, password=redis_password)
            pubsub = r.pubsub()
            pubsub.subscribe(channel)
        if message:
            process(message)
            time.sleep(0.001)
except KeyboardInterrupt:
    pass
