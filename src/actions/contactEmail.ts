"use server";

import { contactSchema } from "@/schemas/contactSchema";
import resend from "@/client/resend";
import { env } from "@/config/env";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
      from: `I&M <${env.FROM_EMAIL}>`,
      to: [env.TO_EMAIL],
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
