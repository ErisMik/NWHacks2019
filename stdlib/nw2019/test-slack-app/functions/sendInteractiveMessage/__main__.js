const message = require('../../utils/message');
const key = 'xoxp-535547249894-534329040453-533966167796-f0ace6f1775943d5fae99765cf56c7ad'

/**
* /sendMessage
* 
* Basic request to forward a message to slack
*/
module.exports = (text = "Would you like to create JIRA issue", callback) => {
  const slackObj = {
    "text": text,
    "attachments": [
        {
            "text": "Do you want to create JIRA ticket",
            "fallback": "You are unable to create JIRA ticket",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "jira",
                    "text": "yes",
                    "type": "button",
                    "value": "yes"
                },
                {
                    "name": "jira",
                    "text": "no",
                    "type": "button",
                    "value": "no"
                }
            ]
        }
    ]
  }
	//token, channel, text, callback
	message(key, '#minute-maker', slackObj, (err, result)=> {
		if(err){
      callback(err);
		}

		else {
      callback(null, result);
		}
	});
};