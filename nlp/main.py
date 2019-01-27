import redis
import json
import spacy
from spacy import displacy

from mm.jira import find_jira_item, do_jira_action
from mm.redisw import get_redis_len, get_line_from_redis, norm_from_line
from mm.tags import feature_extract_document

def main(rdb):
    # Preload models for performance later
    nlp = spacy.load('en')

    current_idx = 0

    while True:
        # Find the Jira item in the current newest line
        if current_idx < get_redis_len(rdb):
            content = get_line_from_redis(rdb, current_idx)
            print("=== === === ===")
            print(content)
            expanded_content = norm_from_line(content['line'])
            line_doc = nlp(expanded_content)

            jira_item = find_jira_item(rdb, current_idx, line_doc, content['speaker'])
            if jira_item:
                do_jira_action(jira_item)

            tagged_line_dict = {'speaker': content['speaker'], 'line': content['line'], 'item': jira_item}
            rdb.rpush('tagged_transcript', json.dumps(tagged_line_dict))

            current_idx += 1

            ## Find the tags from the whole transcript
            trans_content = rdb.lrange('transcript', 0, -1)
            transcript = [json.loads(line.decode("utf-8")) for line in trans_content]
            tags = feature_extract_document(transcript)
            rdb.set('tags', json.dumps(tags))

if __name__ == "__main__":
    rdb = redis.StrictRedis(host='redis', port=6379, db=0)
    main(rdb)