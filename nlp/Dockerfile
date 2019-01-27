FROM python:3.6

RUN mkdir -p /usr/src/nlp
WORKDIR /usr/src/nlp

RUN apt-get -y update && apt-get install -y default-jre wget unzip

RUN pip install tika nltk spacy
RUN python -c "import nltk; nltk.download('punkt'); nltk.download('wordnet'); nltk.download('stopwords');"
RUN python -m spacy download en
run pip install plotly scikit-learn PyDictionary pycontractions redis requests

EXPOSE 5000