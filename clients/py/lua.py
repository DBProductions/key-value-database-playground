import time
import json
import uuid
import redis
from faker import Faker

fake = Faker()

host = 'localhost'
redis_password = 'data_store_password'
channel = 'queue-job'

r = redis.Redis(host='localhost', port=6379, db=0, password=redis_password)

#if r.get('list:id') == None:
#    r.set('list:id', 0)

with open('../lua_scripts/count_all_entries.lua','r') as f:
    count_all_entries = f.read()

with open('../lua_scripts/get_all_entries.lua','r') as f:
    get_all_entries = f.read()


# ----------------------------------------------------------------

create_list = """
-- create new list key:
local list_key = "list:" .. redis.call("INCR", "list:id")
-- store fields for list:
for i = 1, #KEYS do
    redis.call("HMSET", list_key, KEYS[i], ARGV[i])
end
-- return new id
return {"id", list_key}
"""

show_list = """
local list = KEYS[1]
local list_items = {}

local entry = redis.call("HGETALL", list)

return entry
"""

#print( r.eval(create_list, 2, 'firstName', 'lastName', fake.first_name(), fake.last_name()) )
#print( r.eval(create_list, 2, 'firstName', 'lastName', fake.first_name(), fake.last_name()) )

#print( r.eval(show_list, 1, 'list:2') )

print( r.eval(count_all_entries, 0, 'user:*') )
print( r.eval(get_all_entries, 0, 'user:*') )




# register lua scripts
"""
services_count = r.register_script(count_services_lua)
get_all_user = r.eval(get_all_user_lua, 1, '*')

print(services_count(args=['*']))
print(services_count(args=['*-images']))

print(get_all_user)
"""
