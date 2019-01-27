import redis
import spacy
from spacy import displacy

from mm.jira import find_jira_item
from mm.redisw import get_redis_len, get_line_from_redis

def main(rdb):
    nlp = spacy.load('en')
    current_idx = 0

    while current_idx < get_redis_len(rdb):
        content = get_line_from_redis(rdb, current_idx)
        line_doc = nlp(content['line'])

        print(content)
        find_jira_item(rdb, current_idx, line_doc)
        current_idx += 1

    # displacy.serve(doc, style='dep')

if __name__ == "__main__":
    rdb = redis.StrictRedis(host='redis', port=6379, db=0)
    main(rdb)