// /server/server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta que recibe los datos del formulario
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "mail.theglobalbid.com",
    port: 465,
    secure: true,
    auth: {
      user: "mensaje@theglobalbid.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"GlobalBids Web" <mensaje@theglobalbid.com>',
    to: "auctions@theglobalbid.com", // <-- cámbialo si quieres
    subject: `Nuevo contacto: ${subject}`,
    text: `
📩 NUEVO MENSAJE DESDE EL FORMULARIO

👤 Nombre: ${name}
📧 Correo: ${email}
📱 Teléfono: ${phone || "No indicado"}

📨 Mensaje:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado correctamente");
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
