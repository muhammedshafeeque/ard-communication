import { sendEmail } from "../Service/email.service.js";

export const userRegisterEmail = ({name, password, email}) => {
  let html = `<html>
    <head>
        <title>Registration Success</title>
    </head>
    <body>
        <h1>Registration Successful</h1>
        <p>Dear ${name} <br> Your account has been created, and here is your system-generated password:</p>
        <p><strong>${password}</strong></p>
        <p>Please use this password to log in to your account. We recommend changing your password after the first login.</p>
        <p>Thank you!</p>
    </body>
    </html>`;

  sendEmail({ reciver: email, subject: "User Registration", html });
};

