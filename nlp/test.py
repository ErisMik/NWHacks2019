import spacy
from spacy import displacy

nlp = spacy.load('en')
doc = nlp("While we are at it, can you create another jira ticket for the websocket issue")

displacy.serve(doc, style='dep')