import asyncio
import websockets
import redis
import json

r = redis.StrictRedis(host='redis', port=6379, db=0)

async def hello(websocket, path):
    await websocket.recv()

    trans_content = r.lrange('tagged_transcript', 0, -1)
    transcript = [json.loads(line.decode("utf-8")) for line in trans_content]

    tag_content = r.lrange('tags', 0, -1)
    tags = [tag.decode("utf-8") for tag in tag_content]

    payload = {
        'transcript': transcript,
        'tags': tags,
    }

    await websocket.send(json.dumps(payload))

start_server = websockets.serve(hello, '0.0.0.0', 6677)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()