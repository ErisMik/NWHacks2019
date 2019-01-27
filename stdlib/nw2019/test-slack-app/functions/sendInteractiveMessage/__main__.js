const message = require('../../utils/message');
//const key = 'xoxp-535547249894-534329040453-533966167796-f0ace6f1775943d5fae99765cf56c7ad'
const key = 'xoxb-535547249894-534190948674-LUyyNxaySxkT8DMktkczBbPO'
const getBotToken = require('../../helpers/get_bot_token.js');

const priority = {
  0: "Low",
  1: "Medium",
  2: "High"
}

/**
* /sendMessage
* 
* Basic request to forward a message to slack
*/
module.exports = (text = "Everything is broken", author = "Default", callback) => {
  const pri = Math.floor(Math.random() * (2 - 0 + 1));
  const ts = Math.round((new Date()).getTime() / 1000);
  const slackObj = {
    "attachments": [
        {
            "fallback": "Minutes Made has a ticket for review!",
            "color": "#36a64f",
            "author_name": author,
            "title": "Would you like me to create this JIRA ticket for you?",
            "callback_id": "create_jira",
            "fields": [
                {
                  "title": "Summary",
                  "value": text,
                  "short": false
                },
                {
                    "title": "Priority",
                    "value": priority[pri],
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Minutes Made API",
            "footer_icon": "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/042012/jira.png",
            "ts": ts,
			 "actions": [
                {
                    "name": "jira",
                    "text": "Publish Ticket to JIRA",
                    "type": "button",
                    "value": "jira"
                },
                {
                    "name": "no",
                    "text": "Remove Ticket",
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