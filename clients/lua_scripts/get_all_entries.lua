--!df flags=allow-undeclared-keys,disable-atomicity
-- script body below

local list_items = {}
local matches = redis.call('KEYS', ARGV[1])
for _,key in ipairs(matches) do
    table.insert(list_items, key)

    local fields = redis.call('HGETALL', key)
    for _, field in ipairs(fields) do
        table.insert(list_items, field)
    end
end
return list_items