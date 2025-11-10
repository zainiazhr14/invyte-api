import { env } from '@config/env'
import nodemailer from 'nodemailer'

const mailer = nodemailer.createTransport({
  host: env.EMAIL_SMTP_HOST,
  port: parseInt(env.EMAIL_SMTP_PORT),
  secure: env.EMAIL_SMTP_SECURE === 'true', // Use true for port 465, false for other ports
  auth: {
    user: env.EMAIL_SMTP_USER,
    pass: env.EMAIL_SMTP_PASS,
  },
})

export default mailer