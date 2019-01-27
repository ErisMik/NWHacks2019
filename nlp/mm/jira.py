import spacy
from spacy.symbols import nsubj, pobj, ADP, advcl, PRON

from mm.redisw import get_line_from_redis

def backtrack_jira_preposition(rdb, idx):
    nlp = spacy.load('en')

    prep_phrase = None
    while not prep_phrase and idx > 0:
        idx -= 1;
        sent = nlp( get_line_from_redis(rdb, idx)['line'] )

        # ccomp bypass

        # Normal case
        for word in sent:
            if word.pos == ADP:
                deps = [tok.text for tok in word.ancestors if tok.dep == advcl]  # Parse out false positives
                if len(deps) == 0:
                    return ' '.join([tok.text for tok in word.subtree])  # Find the prepositional phrase


def find_jira_item(rdb, idx, line):
    """
    Need to find the following items:
    - Who is reporting the issue
    - What the issue is about
    """
    who = None
    what = None

    for word in line:
        if "jira" in word.text.lower():  # Find the jira tag
            for parent in word.ancestors:
                if parent.text.lower() in ['file', 'create']:  # Find the verb action
                    for child in parent.subtree:
                        # Find the noun subject
                        if child.dep == nsubj:
                            who = child.text

                        # Find the prepositional phrase
                        if child.pos == ADP:
                            deps = [tok.text for tok in child.ancestors if tok.dep == advcl]  # Parse out false positives
                            if len(deps) == 0:
                                for prep_child in child.subtree:
                                    if prep_child.dep == pobj:
                                        if prep_child.pos == PRON:
                                            what = backtrack_jira_preposition(rdb, idx)
                                        else:
                                            what = ' '.join([tok.text for tok in child.subtree])  # Find the prepositional phrase

                print("Jira item: %s - %s" % (who, what))