FROM python:3.6

RUN mkdir -p /usr/src/speech
WORKDIR /usr/src/speech

RUN apt-get -y update && apt-get install -y alsa-utils build-essential libcurl3 libasound2 wget

RUN wget "http://ftp.se.debian.org/debian/pool/main/o/openssl/libssl1.0.0_1.0.2l-1~bpo8+1_amd64.deb"

RUN dpkg -i libssl1.0.0_1.0.2l-1~bpo8+1_amd64.deb

RUN pip install redis azure-cognitiveservices-speech googletrans requests

