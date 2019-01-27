import spacy
from spacy import displacy

nlp = spacy.load('en')
doc = nlp("Jeff could you file a jira issue for the bold text")

displacy.serve(doc, style='dep')