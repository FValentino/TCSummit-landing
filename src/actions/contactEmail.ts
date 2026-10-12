"use server";

import { contactSchema } from "@/schemas/contactSchema";
import { sendEmail } from "@/lib/email";
import { escapeHtml, escapeHtmlMultiline } from "@/lib/html";

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
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "contacto@tcsummit.net";

  return sendEmail({
    to: toEmail,
    subject: "[Web] Nuevo contacto",
    html: `
      <h2>[Web] Nuevo contacto</h2>
      <p><b>Nombre:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p>${escapeHtmlMultiline(message)}</p>
    `,
    replyTo: email,
  });
}
