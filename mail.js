var Mail = {
	nodemailer  : null,
	transporter : null,
	sendgrid    : null,
	configs     : null,
	init : function(){
		Mail.configs    = {
			sendgrid_key : 'README.md',
			smtp         : 'smtp.gmail.com',
			port         : 587,
			user         : '',
			pass         : '',
			to           : '',
			from         : ''
		};
		Mail.nodemailer = require('nodemailer');
		Mail.sendgrid   = require('sendgrid')(Mail.configs.sendgrid_key);
		Mail.sendMail();
		Mail.sendGrid();
	},
	sendMail: function(){
		var smtpConfig = {
		    host: Mail.configs.smtp,
		    port: Mail.configs.port,
		    auth: {
		        user: Mail.configs.user,
		        pass: Mail.configs.pass
		    }
		};
		var mailOptions = {
		    from    : Mail.configs.from,
		    to      : Mail.configs.to,
		    subject : 'NodeJS SMTP',
		    html    : '<h1>Teste NodeJS</h1>'
		};
		Mail.transporter = Mail.nodemailer.createTransport(smtpConfig);
		Mail.transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
	},
	sendGrid: function(){
		Mail.sendgrid.send(
			{
				to      : Mail.configs.to,
				from    : Mail.configs.from,
				subject : 'NodeJS SendGrid',
				html    : '<h1>Teste SendGrid</h1>'
			},
			function(err, json) {
				if (err) { return console.error(err); }
				console.log(json);
			});
		}
};
Mail.init();