FROM python:3.6

RUN mkdir -p /usr/src/speech
WORKDIR /usr/src/speech


RUN apt-get -y update && apt-get install -y build-essential libcurl3 libasound2 wget

RUN wget https://packages.debian.org/jessie/libssl1.0.0

RUN dpkg --install libssl1.0.0_1.0.1t-+deb8u6_amd64.deb

RUN pip install redis azure-cognitiveservices-speech

