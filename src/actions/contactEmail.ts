"use server";

import { contactSchema } from "@/schemas/contactSchema";
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

  return sendEmail({
    to: "contacto@tcsummit.net",
    subject: "[Web] Nuevo contacto",
    html: `
      <h2>[Web] Nuevo contacto</h2>
      <p><b>Nombre:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
    replyTo: email,
  });
}