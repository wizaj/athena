'use strict';

require('dotenv').config();
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var index      = require('./routes/index');
var sms        = require('./routes/sms');
var voice      = require('./routes/voice');
var ussd       = require('./routes/ussd');
var payments   = require('./routes/payments');
var dlrs       = require('./routes/dlrs');
var fs         = require('fs');
var logger     = require('morgan');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var accessLogStream = fs.createWriteStream(__dirname + 'app.log', { flags: 'a' });

app.use(logger('combined', {
  stream: accessLogStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  }
}));

app.use(logger('dev'));

var port = process.env.PORT || 8000;

var models = require('./models');

// Import routes
app.get('/', index.index);
app.post('/incomingSms', sms.receiveSms);
app.post('/wiredUssd', ussd.wiredUssd);
app.post('/dlrs', dlrs.dlr);
app.post('/voice', voice.voice);
app.post('/ipn', payments.ipn);


models.sequelize.sync({logging: false}).then(function () {
  var server = app.listen(port, function() {
      console.log('Magic happens on port ' + server.address().port);
  });
});
