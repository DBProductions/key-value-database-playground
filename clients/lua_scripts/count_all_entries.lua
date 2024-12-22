local sum = 0
local matches = redis.call('KEYS', ARGV[1])
for _,key in ipairs(matches) do
    sum = sum + 1
end
return sum