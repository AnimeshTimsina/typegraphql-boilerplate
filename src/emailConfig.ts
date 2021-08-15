import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type emailConfigProps = {
    config: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
    sender: string
}

export const initializeEmail:() => Promise<emailConfigProps> = async () => {
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        auth: {
            user: 'project.1',
            pass: 'secret.1'
        }
      });
      return {
          config: transporter,
          sender: "foo@example.com"
      }
}




