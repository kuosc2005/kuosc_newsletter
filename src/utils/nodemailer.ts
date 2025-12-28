import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
    service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASS
       }
  })

transporter.verify().then(() => {
    console.log(`Server is ready!`)
})
