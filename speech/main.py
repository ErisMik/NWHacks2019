import redis
import json

r = redis.StrictRedis(host='redis', port=6379, db=0)

r.delete('transcript')

with open("transcript.txt", 'r') as in_file:
    for line in in_file:
        split_line = line.split(":")
        line_dict = {'speaker': split_line[0], 'line': split_line[1]}
        r.rpush('transcript', json.dumps(line_dict))

print("Done!")