const nodemailer = require('nodemailer');
require('dotenv').config();



exports.sendMailFunction = (to, subject, message) => {
    console.log(process.env.SMTP_USER,process.env.SMPTP_PASSWPRD);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        // requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMPTP_PASSWPRD
        }
    });

    // return transporter;
    let mailOptions = {
        from: 'brianacarrillo37@gmail.com',
        to: to,
        subject: subject,
        html: message,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message, "gfdgdfgsdfdfghfds");
        } else {

            console.log('success');
        }
    });
}

exports.sendFeedbackFunction = (to, subject, message, filename) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        // requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMPTP_PASSWPRD
        }
    });

    // return transporter;
    let mailOptions = {
        from: 'brianacarrillo37@gmail.com',
        to: to,
        subject: subject,
        html: message,
        attachments: [
            { name: filename, path: `http://localhost:8000/feedback/${filename}` }
        ],

    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(mailOptions);

        if (error) {
            console.log(error.message);
        }
        console.log('success');
    });
}