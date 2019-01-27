import redis
import json
import configparser
import azure.cognitiveservices.speech as speechsdk

config = configparser.ConfigParser()
config.read('speech.config')

speech_key = config['DEFAULT']['SpeechKey']
speaker_key = config['DEFAULT']['SpeakerKey']
service_region = config['DEFAULT']['ServiceRegion']
speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

r = redis.StrictRedis(host='redis', port=6379, db=0)

r.delete('transcript')
r.delete('tagged_transcript')

print("Starting speech recognition ...")
while 1:
    print("Say something (I'm giving up on you).")
    result = speech_recognizer.recognize_once()
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        line = "Recognized: {}".format(result.text)
        print(line)
        split_line = line.split(":")
        line_dict = {'speaker': split_line[0], 'line': split_line[1]}
        r.rpush('transcript', json.dumps(line_dict))

    elif result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized: {}".format(result.no_match_details))
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))

print("Done!")