'use strict';

var options = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
var sms = AfricasTalking.SMS;
var voice = AfricasTalking.VOICE;
var redis = require("redis");
var r = redis.createClient();

var Houndify = require('houndify').Houndify;

var houndify = new Houndify({
  auth: {
    clientId: 'KS3xVzZ3e1LYKPYpje8BVA==',
    clientKey: 'unUgmQ4ZFvjk4LeJVs5oa16H7V-O4DTbDpJ1-KCSnKpVPu6lP59Y4gyTufdn7_EkGHj8EZGzMIAcLd4F8l-GdA==',
    userId: 'ijuma@africastalking.com'
  }
});

exports.receiveSms = function(req, res) {
  // Respond with 200 meaning sms received
  res.send(200);

  var incomingSms = {
    from: req.body.from,
    message: req.body.text,
    to: req.body.to,
    date: req.body.date
  }

  console.log(JSON.stringify(incomingSms, 0, 4) + '\n');

  // Make houndify query
  houndify.query(incomingSms.message, function(err, resp) {
    if (err) {
      console.log('[ERROR] -> Houndify Query');
      console.log(error);
      return;
    }

    // // Houndify query results
    var command = resp[0].raw.CommandKind;
    var toSend;

    if (command === 'NoResultCommand') {
      toSend = 'Sorry, we couldn\'t get any results.';
    } else {
      toSend  = resp[0].raw.SpokenResponse;
    }

    // Reply with an SMS
    var smsOptions = {
      to: incomingSms.from,
      message: command + ' -> ' + toSend
    };

    return sms.send(smsOptions)
    .then(function(s) {
      console.log('[SUCCESS] -> SMS Send');
      console.log(JSON.stringify(s, 0, 4) + '\n');
    })
    .catch(function (err) {
      console.log('[ERROR] -> SMS Send');
      console.log(err + '\n');
    });

    // Reply with a phone call

    // // Save to redis to query later
    // r.set(incomingSms.from, toSend, redis.print);
    //
    // var voiceOptions = {
    //   callFrom: '+254711082489',
    //   callTo: incomingSms.from
    // }
    //
    // return voice.call(voiceOptions)
    // .then(function(s) {
    //   console.log('[SUCCESS] -> Voice Call');
    //   console.log(JSON.stringify(s, 0, 4) + '\n');
    // })
    // .catch(function(err) {
    //   console.log('[ERROR] -> Voice Call');
    //   console.log(err);
    // });
  });
}
