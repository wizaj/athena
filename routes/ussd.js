'use strict';

var db = require('./../models');

exports.wiredUssd = function(req, res) {

  var message = '';

  var sessionId   = req.body.sessionId;
  var serviceCode = req.body.serviceCode;
  var phoneNumber = req.body.phoneNumber;
  var text 	      = req.body.text;

  console.log(sessionId, serviceCode, phoneNumber, text);

  var length = text.split('*').length;
  var txt = text.split('*');

  if (text === '') {
	message = 'CON InfoText Surveys\n';
	message += 'Client: MOST (MW)\n';
	message += '1: Enter new sale\n';
	message += '2: Information\n';
	message += '3: Exit\n';
  }

  // add device
  else if (text === '1') {
    // check if user is agent
  	message = 'CON Enter name of customer:';
  }
  else if (length === 2 && txt[0] === '1') {
    message = 'CON Enter contact number:';
  }
  else if (length === 3 && txt[0] === '1') {
    message = 'CON Enter farm location:\n';
  }
  else if (length === 4 && txt[0] === '1') {
    message = 'CON Enter farm size:\n';
  }
  else if (length === 5 && txt[0] === '1') {
    message = 'CON How many KGs of groundnut seed bought?\n';
  }
  else if (length === 6 && txt[0] === '1') {
    message = 'CON How many KGs of sunflower seed bought?\n';
  }
  else if (length === 7 && txt[0] === '1') {
    message = 'CON How many KGs of soya seed bought?\n';
  }
  else if (length === 8 && txt[0] === '1') {
    message = 'CON Did customer buy last year?\n';
    message += '1: Yes \n';
    message += '2: No \n';
  }
  else if (length === 9 && txt[0] === '1') {
    // commit to db
    message = 'END Customer recorded';
    var options = text.split('*');

    db.SeedCustomer.create({
      name: options[1],
      phone_number: options[2],
      farm_location: options[3],
      farm_size: options[4],
      groundnut_bought: options[5],
      sunflower_bought: options[6],
      soya_bought: options[7],
      repeat_customer: options[8]
    }).then(function(SeedCustomer) {
      console.log('Seed customer added', SeedCustomer);
    });

  }

  // add sales person
  else if (text === '2') {
    // check is user is agent
  message = 'END Enter the information to be stored  \n';
  message += 'within 120 seconds to record it. \n';
  message += 'Developed by Wiza Jalakasi \n';
  message += 'http://wiza.jalaka.si \n';
  message += '+265999563706 \n';
  }

  else if (text === '3') {
    message = 'END Thank you';
  }


  else if (text === '4') {
    message = 'CON Enter Sales code';
  }
  else if (length === 2 && txt[0] === '4') {
      message = 'CON Enter Phone IMEI number';
  }
  else if (length === 3 && txt[0] === '4') {
      message = 'CON Enter Buyer ID number';
  }
  else if (length === 4 && txt[0] === '4') {
      message = 'CON Enter Buyer Name';
  }
  else if (length === 5 && txt[0] === '4') {
      message = 'CON Enter Buyer Phone number';
  }
  else if (length === 6 && txt[0] === '4') {
    message = 'END Device sold';
    var options = text.split('*');

    db.Sale.create({
      sales_code: options[1],
      imei: options[2],
      buyer_id: options[3],
      buyer_name: options[4],
      buyer_phone_number: options[5]
    }).then(function(sales) {
      console.log('sales added', sales);
    });

    db.Device.findOne({
      where: { imei: options[1] }
    }).then(function(device) {
      device.update({
        sold: 'true'
      }).then(function(device) {
        console.log('device marked as sold', device);
      });
    });
  }

  else {
	message = 'END Wrong input';
    // reply with menu
  }

  res.contentType('text/plain');
  res.send(message, 200);
};
