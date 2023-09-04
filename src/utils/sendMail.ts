import nodemailer from 'nodemailer';
import hbs from 'handlebars';
import fs from 'fs'
import path from 'path';
import config from '../config';
import otp from '../utils/otp'


console.log(otp);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.MAILER.USERNAME,
        pass: config.MAILER.PASSWORD
    }
});

export default async function sendEmail(user: any, template: string) {
    const templateSource = fs.readFileSync(path.join(__dirname, `../views/${template}.hbs`), 'utf-8');
    const templateHbs = hbs.compile(templateSource);
    await transporter.sendMail({
        from: `e-commerce app <${config.MAILER.FROM}>`,
        to: user.email,
        subject: 'Welcome to e-commerce app',
        html: templateHbs({name: user.name, otp: otp}),
    });
    console.log('Email sent');

}

