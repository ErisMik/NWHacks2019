import spacy
from spacy import displacy
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

def normalize():
    content = ""
    with open('transcript.txt', 'r') as in_file:
        for line in in_file:
            texts = line.split(":")

            content += texts[1].strip()
            if not '.' in content[-1]:
                content += '.'
            content += " "
    return content

def main():
    nlp = spacy.load('en')
    content = normalize()
    print(content)
    doc = nlp(content)

    find_jira_item(doc)

    displacy.serve(doc, style='dep')

if __name__ == "__main__":
    main()