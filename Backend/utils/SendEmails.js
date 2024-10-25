const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // or the appropriate port for your SMTP server
        secure: false, // true for 465, false for other ports
        auth: {
            user: "kumaralok21095@gmail.com",
            pass: "wdzolnbamfeyptkq"
        }
    });
    const mailOptions = {
        from: "kumaralok21095@gmail.com",
        to : options.email,
        subject : options.subject,
        text : options.message,
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully!");
            console.log("Message ID:", info.messageId);
            console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        }
        // Close the transporter
        transporter.close();
    });
}

module.exports = sendEmail