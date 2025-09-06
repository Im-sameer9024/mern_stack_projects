import nodemailer from "nodemailer";
import "dotenv/config.js"


const mailSender = async(email,title,body) =>{
    try {

        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            secure:process.env.NODE_ENV === "production",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = transporter.sendMail({
            from:`GreenCart Pvt. Ltd. || Grocery `,
            to:email,
            subject:title,
            html:body
        })

        // console.log("info of email",info)

        return info
        
    } catch (error) {
        console.log("error in sending mail",error)
        
    }

}


export default mailSender