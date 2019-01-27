import spacy
from spacy import displacy

nlp = spacy.load('en')
doc = nlp("I'll put the create backup issue in jira also")

displacy.serve(doc, style='dep')