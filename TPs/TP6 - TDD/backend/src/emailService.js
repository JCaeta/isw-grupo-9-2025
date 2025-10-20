const nodemailer = require("nodemailer");
require("dotenv").config();

async function enviarEmailConfirmacion(destinatario, asunto, cuerpo) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"EcoHarmony Park" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    text: cuerpo
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email enviado:", info.response);
  return info;
}

module.exports = { enviarEmailConfirmacion };
