const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "..", "public")));

// Ruta para manejar envío del formulario
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "mail.theglobalbid.com",
    port: 465,
    secure: true,
    auth: {
      user: "mensajes@theglobalbid.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Formulario GlobalBids" <mensajes@theglobalbid.com>`,
    to: "auctions@theglobalbid.com",
    subject: `Nuevo contacto desde Web - ${subject || "Sin asunto"}`,
    html: `
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || "No indicado"}</p>
      <p><strong>Mensaje:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado correctamente");
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend activo en http://localhost:${PORT}`);
});
