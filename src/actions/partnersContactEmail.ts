"use server";

import { partnersContactSchema } from "@/schemas/partnersContactSchema";
import { sendEmail } from "@/lib/email";

// Escape user-provided values before embedding them in the email HTML to
// prevent HTML/script injection (the form endpoint is publicly accessible).
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function partnersContactEmail(data: {
  name: string;
  company: string;
  email: string;
  message: string;
}) {
  const parsed = partnersContactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const { name, company, email, message } = parsed.data;
  const toEmail = process.env.PARTNERS_TO_EMAIL ?? "sponsors@tcsummit.net";

  return sendEmail({
    to: toEmail,
    subject: "[Partners] Nuevo contacto de patrocinio",
    html: `
      <h2>[Partners] Nuevo contacto de patrocinio</h2>
      <p><b>Nombre:</b> ${escapeHtml(name)}</p>
      <p><b>Empresa:</b> ${escapeHtml(company)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
    replyTo: email,
  });
}