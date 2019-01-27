import asyncio
import websockets
import redis
import json
import time

r = redis.StrictRedis(host='redis', port=6379, db=0)

async def hello(websocket, path):
    while True:
        trans_content = r.lrange('tagged_transcript', 0, -1)
        transcript = ""
        if trans_content: transcript = [json.loads(line.decode("utf-8")) for line in trans_content]

        tag_content = r.get('tags')
        tags = "[]"
        if tag_content: tags = json.loads(tag_content.decode("utf-8"))

        payload = {
            'transcript': transcript,
            'tags': tags,
        }

        await websocket.send(json.dumps(payload))
        time.sleep(2)


start_server = websockets.serve(hello, '0.0.0.0', 6677)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()