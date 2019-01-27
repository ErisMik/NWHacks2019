import http.client, urllib.request, urllib.parse, urllib.error, base64

files = {'file': open('output.wav', 'rb')}

headers = {
    # Request headers
    'Content-Type': 'multipart/form-data',
    'Ocp-Apim-Subscription-Key': '7f42f8854a974500a44bfa2e0664f1dc',
}

params = urllib.parse.urlencode({
    # Request parameters
    'shortAudio': True,
})

try:
    conn = http.client.HTTPSConnection('westus.api.cognitive.microsoft.com')
    conn.request("POST", "/spid/v1.0/identificationProfiles/{identificationProfileId}/enroll?%s" % params, "{'content-type': 'audio/wav'}", headers, files=files)
    response = conn.getresponse()
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))
