"use server";

import { contactSchema } from "@/schemas/contactSchema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Default from/to reuse the configured web inbox (EMAIL_FROM). Override via env.
const FROM_EMAIL = process.env.EMAIL_FROM ?? "tickets@tcsummit.net";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? FROM_EMAIL;

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

export async function contactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: `TCSummit <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: "[Web] Nuevo contacto",
      html: `
        <h2>[Web] Nuevo contacto</h2>
        <p><b>Nombre:</b> ${escapeHtml(name)}</p>
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
