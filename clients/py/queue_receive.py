import time
import redis

host = 'localhost'
read_port = 6379
redis_password = 'data_store_password'
queue_name = 'tasks'

try:
    r = redis.Redis(host=host, port=read_port, db=0, password=redis_password)
    while True:
        try:
            task = r.blpop(f'queues:{queue_name}')
            print(task)
        except redis.ConnectionError:            
            print('connection error')
            time.sleep(2)
            r = redis.Redis(host=host, port=read_port, db=0, password=redis_password)
        time.sleep(.1)
except KeyboardInterrupt:
    pass
