import redis
import json
import azure.cognitiveservices.speech as speechsdk

speech_key, service_region = "b7b619025538444082741e8befde119e", "westus"
speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

r = redis.StrictRedis(host='redis', port=6379, db=0)


while 1:
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
        break


# r.delete('transcript')

# with open("transcript.txt", 'r') as in_file:
#     for line in in_file:
#         split_line = line.split(":")
#         line_dict = {'speaker': split_line[0], 'line': split_line[1]}
#         r.rpush('transcript', json.dumps(line_dict))

print("Done!")