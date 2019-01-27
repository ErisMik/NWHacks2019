import spacy
from spacy import displacy

nlp = spacy.load('en')
doc = nlp("The REST request made is wrong.")

displacy.serve(doc, style='dep')