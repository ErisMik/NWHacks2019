import redis
import spacy
from spacy import displacy

from mm.jira import find_jira_item, do_jira_action
from mm.redisw import get_redis_len, get_line_from_redis
from mm.contractions import expand_contractions

def main(rdb):
    # Preload models for performance later
    nlp = spacy.load('en')

    current_idx = 0

    while True:
        if current_idx < get_redis_len(rdb):
            content = get_line_from_redis(rdb, current_idx)
            print("=== === === ===")
            print(content)
            expanded_content = expand_contractions(content['line'])
            line_doc = nlp(expanded_content)

            jira_item = find_jira_item(rdb, current_idx, line_doc, content['speaker'])
            if jira_item:
                do_jira_action(jira_item)

            current_idx += 1

if __name__ == "__main__":
    rdb = redis.StrictRedis(host='redis', port=6379, db=0)
    main(rdb)