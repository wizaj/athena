'use strict';

exports.dlr = function(req, res) {
	var incoming = req.body;

	var smsDeliveryReport = {
		id: incoming.id,
		status: incoming.status
	}

	console.log('[SMS Delivery Report]');
	console.log(JSON.stringify(smsDeliveryReport, 0, 4) + '\n');

	res.send(200);
};
