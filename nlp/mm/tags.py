import requests

text_analytics_base_url = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/"
subscription_key = "b9524cc198b54f62946f015ade376c9b"

def normalize(doc):
    content = []
    for line in doc:
        content.append(line['line'])

    for x in range(len(content)):
        content[x] = content[x].strip()
        if len(content[x]) > 0:
            if '.' not in content[x][-1]:
                content[x] += '.'
    return ' '.join(content)

def feature_extract_document(doc):
    norm_cont = normalize(doc)

    documents = {'documents' : [
                        {'id': '1', 'language': 'en', 'text': norm_cont}
            ]}

    key_phrase_api_url = text_analytics_base_url + "keyPhrases"
    headers   = {'Ocp-Apim-Subscription-Key': subscription_key}
    response  = requests.post(key_phrase_api_url, headers=headers, json=documents)
    key_phrases = response.json()

    if len(key_phrases['documents']) > 0:
        return key_phrases['documents'][0]['keyPhrases']
    else:
        return ""
