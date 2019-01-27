const request = require('request');
const _ = require('underscore');

let fieldContent = {
     
        "project": {
          "id": "10000"
        },
        "issuetype": {
          "id": "10002"
        }
        
       
};

const jsonObj = {   
       "fields": fieldContent
};

const addContent = (summaryContent, descriptionContent, target) =>{
  _.extend(target, {"summary": summaryContent, "description": descriptionContent}) 
  return jsonObj;
};

/**
* summary = summary of the ticket
* description = description of the ticket
*/
module.exports =  (context, callback) => {
  console.log(JSON.stringify(context))
  const summary = context.params.action.original_message.text
  const description = "auto generate by minute walking"
  request.post({
   url: 'https://nwhacks.atlassian.net/rest/api/2/issue',
   headers: {'content-type': 'application/json','authorization': 'Basic bndoYWNrczIwMTlAZ21haWwuY29tOm53aGFja3NhY2M='},
   body: JSON.stringify(addContent(summary, description, fieldContent)),
  }, function(error, response, body){
    if(error){
      callback(error)
    }
    console.log(`body is ${body}`)
    const bodyUri = JSON.parse(body)
    callback(null, `:heart: Successfully created ticket: ${bodyUri.key} accessible at: `+ bodyUri.self)
    /*let body;
    try {
      body = JSON.parse(result.body);
    } catch (e) {
      body = {}
    }

    if (!body.ok) {
      return callback(new Error(body.error ? `Slack Error: ${body.error}` : 'Invalid JSON Response from Slack'));
    }

    callback(null, data);*/
  })

}