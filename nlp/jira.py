from spacy.symbols import nsubj, pobj, ADP, advcl, PRON

def backtrack_jira_preposition(idx, sents):
    prep_phrase = None
    while not prep_phrase and idx > 0:
        idx -= 1;
        sent = sents[idx]

        # ccomp bypass

        # Normal case
        for word in sent:
            if word.pos == ADP:
                deps = [tok.text for tok in word.ancestors if tok.dep == advcl]  # Parse out false positives
                if len(deps) == 0:
                    return ' '.join([tok.text for tok in word.subtree])  # Find the prepositional phrase


def find_jira_item(doc):
    """
    Need to find the following items:
    - Who is reporting the issue
    - What the issue is about
    """

    sents = [sent for sent in doc.sents]
    for x in range(len(sents)):
        who = None
        what = None
        sent = sents[x]
        for word in sent:
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
                                                what = backtrack_jira_preposition(x, sents)
                                            else:
                                                what = ' '.join([tok.text for tok in child.subtree])  # Find the prepositional phrase

                print("Jira item: %s - %s" % (who, what))