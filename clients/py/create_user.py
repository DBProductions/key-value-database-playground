import json
import uuid
import redis
from faker import Faker

fake = Faker()

redis_host = 'localhost'
redis_password = 'data_store_password'

r = redis.Redis(host=redis_host, port=6379, db=0, password=redis_password)

## left and right push to build a list
#r.lpush(f'{str(id)}-list', 'two', 'one')
#r.rpush(f'{str(id)}-list', 'three', 'four')
#r.linsert(f'{str(id)}-list', 'after', 'four', 'five')

# user data
for i in range(10):
    id = uuid.uuid4()
    user = {
        'name': fake.first_name(),
        'surname': fake.last_name()
    }
    address = {
        'city': fake.city()
    }
    images = {
        'profile': fake.image_url()
    }
    r.hset(f'user:{str(id)}:personal', mapping=user)
    r.hset(f'user:{str(id)}:address', mapping=address)
    r.hset(f'user:{str(id)}:images', mapping=images)
    returned_user = r.hgetall(f'user:{str(id)}:personal')
    print(returned_user) 

# pipelining
# does not support operations that rely on the outcome of previous operations
#r.set(f'{str(id)}-counter', 0)
#with r.pipeline() as pipe: 
#    pipe.multi()
#    pipe.set(f'{str(id)}-counter', 3)
#    pipe.set(f'{str(id)}-counter', 5)
#    pipe.execute()
