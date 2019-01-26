import spacy
from spacy import displacy
from jira import find_jira_item

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

    # displacy.serve(doc, style='dep')

if __name__ == "__main__":
    main()