const sendVerificationEmail = async (toEmail, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_PASS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Job Tracker", email: process.env.EMAIL_USER },
      to: [{ email: toEmail }],
      subject: "Verify your Job Tracker account",
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #ffffff; margin-bottom: 8px;">Welcome to Job Tracker</h2>
          <p style="color: #94a3b8; margin-bottom: 24px;">Click the button below to verify your email address and activate your account.</p>
          <a href="${verifyUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Verify my email</a>
          <p style="color: #475569; font-size: 12px; margin-top: 24px;">If you didn't create an account, you can ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }
};

module.exports = { sendVerificationEmail };
