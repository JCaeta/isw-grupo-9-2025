const nodemailer = require("nodemailer");

dotenv.config();

export async function enviarEmailConfirmacion(destinatario, asunto, cuerpo) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"EcoHarmony Park" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    text: cuerpo,
  };

  const info = await transporter.sendMail(mailOptions);

  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('✅ Email enviado:', info.response);
  }

  return info;
}
