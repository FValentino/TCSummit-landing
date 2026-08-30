"use server";

import { partnersContactSchema } from "@/schemas/partnersContactSchema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    await resend.emails.send({
      from: `I&M <${process.env.FROM_EMAIL}>`,
      to: [process.env.TO_EMAIL!],
      replyTo: email,
      subject: "[Partners] Nuevo contacto de patrocinio",
      html: `
        <h2>[Partners] Nuevo contacto de patrocinio</h2>
        <p><b>Nombre:</b> ${escapeHtml(name)}</p>
        <p><b>Empresa:</b> ${escapeHtml(company)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}