import nodemailer from "nodemailer";
export const sendEmail = async (data) => {
  try {
    var transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to: data.reciver,
      subject: data.subject,

      html: data.html,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email sent: " + info.response)
        return { message: "Email sent: " + info.response };
      }
    });
  } catch (error) {
    throw error;
  }
};
