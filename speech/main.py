import redis
import json
import configparser
import urllib.request
import requests
from googletrans import Translator
import azure.cognitiveservices.speech as speechsdk

config = configparser.ConfigParser()
config.read('speech.config')
translator = Translator()

speech_key = config['DEFAULT']['SpeechKey']
speaker_key = config['DEFAULT']['SpeakerKey']
service_region = config['DEFAULT']['ServiceRegion']
speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
transl_config = speechsdk.translation.SpeechTranslationConfig(subscription=speech_key, region=service_region, target_languages=['en-us'], speech_recognition_language='zh-cn')

speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)
transl_recognizer = speechsdk.translation.TranslationRecognizer(translation_config=transl_config)
# setup Redis
r = redis.StrictRedis(host='redis', port=6379, db=0)
r.delete('transcript')
r.delete('tagged_transcript')
r.delete('tags')

print("Starting speech recognition ...")
print("Say something (I'm giving up on you).")
while 1:
    req = requests.get('https://nwhacks-229911.appspot.com/').json()
    print(req)
    if (not req) or req['translate'] == 'false':
        result = speech_recognizer.recognize_once()
        line = req['speaker'] + ": {}".format(result.text)
        print(line)
        split_line = line.split(":")
        split_text = split_line[1].split(".")
        for sent in split_text:
            line_dict = {'speaker': split_line[0], 'line': sent}
            r.rpush('transcript', json.dumps(line_dict))
    else:
        result = transl_recognizer.recognize_once()
        trans = translator.translate(result.text)
        line = req['speaker'] + ": {} (translated from - ".format(trans.text) + result.text + ")"
        print(line)
        split_line = line.split(":")
        split_text = split_line[1].split(".")
        for sent in split_text:
            line_dict = {'speaker': split_line[0], 'line': sent}
            r.rpush('transcript', json.dumps(line_dict))

print("Done!")