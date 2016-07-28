'use strict';

var options = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
var redis = require("redis");
var r = redis.createClient();

exports.voice = function(req, res) {
  var incoming = req.body;

  // Call active, run response logic
  if (incoming.isActive === '1') {
    var callerNumber = incoming.callerNumber;

    return r.get(callerNumber, function (err, reply) {
      if (err) {
        console.log('[ERROR] -> Redis Query');
        console.log(err);
        return;
      }

      var message = reply;
      var response = "<Response><Say>" + message + "</Say></Response>";

    	res.setHeader('Content-Type', 'text/plain');
    	return res.send(response);
    });
  }

  // Call not active, meaning delivery status for response
  if (incoming.isActive === '0') {
    var voiceDeliveryReport = {
      id: incoming.sessionId,
      status: incoming.status
    }

    console.log('[Voice Delivery Report]');
  	console.log(JSON.stringify(voiceDeliveryReport, 0, 4) + '\n');

    return res.send(200);
  }
};
