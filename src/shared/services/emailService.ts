import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { initializeEmail } from "../../emailConfig";


class EmailService {

    sendMail: (e:Mail.Options) => Promise<SMTPTransport.SentMessageInfo> = async (e) => {    
        const {config,sender} = await initializeEmail()
        return await config.sendMail({
            ...e,
            from:sender    
        })
    }
}
 
export const emailService = new EmailService()
