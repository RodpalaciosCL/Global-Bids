/**
 *  Global Bids – Backend API (TypeScript)
 *  Contact form -> SMTP Office 365
 *  --------------------------------------------------
 *  Requiere .env  →  EMAIL_PASS=app‑password‑de‑auctions
 */

import express from "express";
import cors from "cors";
import path from "path";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

/* ───────────── Middlewares ───────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

/* ───────────── Transport SMTP ────────── */
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: "auctions@theglobalbid.com",
    pass: process.env.EMAIL_PASS,
  },
  tls: { ciphers: "SSLv3" },
});

/* ───────────── End‑point contacto ────── */
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const htmlBody = `
    <h2>Nuevo mensaje desde el formulario</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${phone || "No indicado"}</p>
    <p><strong>Mensaje:</strong><br>${message}</p>
  `;

  const mailOptions = {
    from: '"Global Bids Web" <auctions@theglobalbid.com>',
    to: "rodpalacios@me.com",
    subject: `Nuevo contacto – ${subject || "Sin asunto"}`,
    html: htmlBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado → ${info.messageId}`);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("❌ Error SMTP:", err);
    res.status(500).json({ ok: false, error: "Email not sent" });
  }
});

/* ───────────── Lanzar servidor ───────── */
app.listen(PORT, () =>
  console.log(`✅ Backend activo en http://localhost:${PORT}`),
);
