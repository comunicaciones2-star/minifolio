import { NextResponse } from "next/server";
import { z } from "zod";

const leadPayloadSchema = z.object({
  profile: z.string().min(1),
  service: z.string().min(1),
  scope: z.string().min(1),
  timeline: z.string().min(1),
  sector: z.string().min(1),
  budget: z.object({
    target: z.number(),
    range: z.object({ min: z.number(), max: z.number() }),
  }),
  lead: z.object({
    name: z.string().min(1),
    phone: z.string(),
    email: z.string().email().optional(),
    company: z.string().optional(),
  }),
  createdAt: z.string(),
});

type LeadPayload = z.infer<typeof leadPayloadSchema>;

const sendToGoogleSheets = async (payload: LeadPayload) => {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    return { status: "skipped" as const, reason: "missing_webhook" };
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.ok
    ? { status: "sent" as const }
    : { status: "failed" as const, reason: `http_${response.status}` };
};

const sendConfirmationEmail = async (payload: LeadPayload) => {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !from || !payload.lead.email) {
    return { status: "skipped" as const, reason: "missing_email_config_or_recipient" };
  }

  const summary = [
    `Perfil: ${payload.profile}`,
    `Servicio: ${payload.service}`,
    `Alcance: ${payload.scope}`,
    `Presupuesto estimado: ${payload.budget.range.min} - ${payload.budget.range.max} COP`,
    `Timeline: ${payload.timeline}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from,
      to: payload.lead.email,
      subject: "Recibimos tu solicitud de cotización",
      text: `Hola ${payload.lead.name},\n\nGracias por usar nuestro cotizador. Este es el resumen:\n\n${summary}\n\nTe contactaremos pronto para continuar el proceso.`,
    }),
  });

  return response.ok
    ? { status: "sent" as const }
    : { status: "failed" as const, reason: `http_${response.status}` };
};

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const parsed = leadPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const payload: LeadPayload = parsed.data;

  const [crm, email] = await Promise.allSettled([
    sendToGoogleSheets(payload),
    sendConfirmationEmail(payload),
  ]);

  const crmResult = crm.status === "fulfilled" ? crm.value : { status: "failed", reason: "exception" };
  const emailResult = email.status === "fulfilled" ? email.value : { status: "failed", reason: "exception" };

  return NextResponse.json({
    ok: true,
    mode: "pipeline",
    crm: crmResult,
    email: emailResult,
  });
}
