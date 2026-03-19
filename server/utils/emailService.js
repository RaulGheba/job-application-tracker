const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

const sendVerificationEmail = async (toEmail, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Job Tracker" <${process.env.BREVO_USER}>`,
    to: toEmail,
    subject: "Verify your Job Tracker account",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
        <h2 style="color: #ffffff; margin-bottom: 8px;">Welcome to Job Tracker</h2>
        <p style="color: #94a3b8; margin-bottom: 24px;">Click the button below to verify your email address and activate your account.</p>
        <a href="${verifyUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Verify my email</a>
        <p style="color: #475569; font-size: 12px; margin-top: 24px;">If you didn't create an account, you can ignore this email.</p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail };
