import nodemailer from 'nodemailer';
import hbs from 'handlebars';
import fs from 'fs'
import path from 'path';
import { htmlToText } from 'html-to-text'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email_username,
        pass: process.env.EMAIL_PASSWORD
    }
});

export default async function sendEmail(user: any, template: string, extra: string){
    const templateSource = fs.readFileSync(path.join(__dirname, `../views/${template}.hbs`), 'utf-8');
    const templateHbs = hbs.compile(templateSource);
    const info = transporter.sendMail({
        from: `e-commerce app <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: 'Welcome to e-commerce app',
        html: templateHbs({ name: user.name }),
    });
    console.log('Email sent');

}

