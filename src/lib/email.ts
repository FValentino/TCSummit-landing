import "server-only";

import { Client, LibraryResponse, SendEmailV3_1 } from "node-mailjet";

const FROM_EMAIL = process.env.MAILJET_FROM_EMAIL ?? "contacto@tcsummit.net";

let mailjetClient: Client | null = null;

function getMailjetClient(): Client {
  if (mailjetClient) return mailjetClient;

  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error(
      "Mailjet credentials missing: set MAILJET_API_KEY and MAILJET_API_SECRET"
    );
  }

  mailjetClient = new Client({ apiKey, apiSecret });
  return mailjetClient;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ success: boolean }> {
  const { to, subject, html, replyTo } = params;

  try {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: { Email: FROM_EMAIL, Name: "TCSummit" },
          To: [{ Email: to }],
          Subject: subject,
          HTMLPart: html,
          ...(replyTo ? { ReplyTo: { Email: replyTo } } : {}),
        },
      ],
    };

    const result: LibraryResponse<SendEmailV3_1.Response> = await getMailjetClient()
      .post("send", { version: "v3.1" })
      .request(data);

    const message = result.body.Messages[0];
    if (message?.Status !== "success") {
      console.error("Mailjet send failed", message);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}