const message = require('../../utils/message');
const key = 'xoxp-535547249894-534329040453-533966167796-f0ace6f1775943d5fae99765cf56c7ad'

/**
* /sendMessage
* 
* Basic request to forward a message to slack
*/
module.exports = (text = "lol test", callback) => {
	//token, channel, text, callback
	message(key, '#minute-maker', text, (err, result) => {
		if(err){
			callback(err);
		}

		else {
			callback(null, result);
		}
	});
};