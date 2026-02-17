import { createTransporter } from "../config/nodemailer.js";
import { NODEMAILER_USER } from "../utils/constants.js";

export const sendMail = async (req, res, email) => {
  console.log(req.body);
  try {
    let contactForm = req.body;

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `PortFolio - <${NODEMAILER_USER}>`,
      to: email,
      subject: contactForm.subject,
      html: `
      <p><b>De: </b>${contactForm.name}</p>
      <p><b>Email: </b>${contactForm.email}</p>
      <h2>${contactForm.subject}</h2>
      <p>${contactForm.message}</p>`,
    });

    return res
      .status(200)
      .json({ ok: true, message: "Mensaje enviado correctamente" });
  } catch (err) {
    console.error("Ocurrio un problema al enviar el correo: ", err.message);
    return res.status(500).json({
      ok: false,
      message: "Ocurrio un problema al enviar el mensaje, intentelo mas tarde",
    });
  }
};
