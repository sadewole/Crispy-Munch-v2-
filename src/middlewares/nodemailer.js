import nodemailer from 'nodemailer'
import 'dotenv/config'

const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({
                from,
                subject,
                to,
                html
            }, (err, info) => {
                if (err) reject(err)

                resolve(info)
            })
        })
    }
}