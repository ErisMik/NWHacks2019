import json
import re

TRANS_KEY = "transcript"

def get_redis_len(rdb):
    return rdb.llen(TRANS_KEY)

def get_line_from_redis(rdb, line_no):
    line_bytes = rdb.lindex(TRANS_KEY, line_no)
    line_string = line_bytes.decode("utf-8")
    return json.loads(line_string)

def norm_from_line(text):
    from mm.contractions import expand_contractions
    regex = re.compile(".*?\((.*?)\)")
    text = re.sub(regex, "", text)
    line = expand_contractions(text)
    return line
