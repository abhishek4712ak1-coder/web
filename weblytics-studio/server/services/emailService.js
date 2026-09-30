import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const mailbox = 'abhishek4712ak1@gmail.com';
const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env');

const getSmtpSetting = (key) => {
  const runtimeValue = process.env[key]?.trim();
  if (runtimeValue) return runtimeValue;

  try {
    return dotenv.parse(readFileSync(envPath, 'utf8'))[key]?.trim();
  } catch {
    return undefined;
  }
};

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const getTransporter = () => {
  const user = getSmtpSetting('SMTP_USER') || mailbox;
  const password = getSmtpSetting('SMTP_PASS');

  if (!password) {
    throw new Error('SMTP_PASS is not configured.');
  }

  const port = Number(getSmtpSetting('SMTP_PORT') || 587);
  return {
    from: mailbox,
    adminEmail: mailbox,
    transporter: nodemailer.createTransport({
      host: getSmtpSetting('SMTP_HOST') || 'smtp-mail.outlook.com',
      port,
      secure: port === 465,
      auth: { user, pass: password },
    }),
  };
};

const leadDetails = (lead) => [
  ['Name', lead.name],
  ['Business', lead.businessName],
  ['Email', lead.email],
  ['Phone', lead.phone],
  ['Service', lead.serviceRequired],
  ['Budget', lead.budget],
  ['Message', lead.projectDescription],
];

const formatDetails = (lead) => leadDetails(lead)
  .map(([label, value]) => `${label}: ${value || 'Not provided'}`)
  .join('\n');

const emailLayout = ({ preview, eyebrow, title, intro, content }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${escapeHtml(title)}</title>
  <style>
    @media screen and (max-width: 600px) {
      .email-outer { padding: 16px 8px !important; }
      .email-card { width: 100% !important; }
      .email-pad { padding: 24px 20px !important; }
      .email-title { font-size: 25px !important; line-height: 31px !important; }
      .detail-label, .detail-value { display: block !important; width: 100% !important; }
      .detail-label { padding: 12px 14px 3px !important; }
      .detail-value { padding: 0 14px 12px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f7;font-family:Arial,Helvetica,sans-serif;color:#172b3a;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f7;width:100%;">
    <tr><td class="email-outer" align="center" style="padding:36px 16px;">
      <table class="email-card" role="presentation" width="620" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background-color:#ffffff;border:1px solid #dce5e8;border-radius:10px;overflow:hidden;">
        <tr><td style="padding:22px 30px;background-color:#102c35;border-bottom:4px solid #36c5a0;">
          <span style="font-size:14px;font-weight:bold;letter-spacing:1px;color:#ffffff;">WEBLYTICS <span style="color:#7ce0c3;">STUDIO</span></span>
        </td></tr>
        <tr><td class="email-pad" style="padding:34px 38px 26px;">
          <p style="margin:0 0 10px;font-size:12px;line-height:18px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#16856f;">${escapeHtml(eyebrow)}</p>
          <h1 class="email-title" style="margin:0 0 12px;font-size:30px;line-height:37px;color:#142c36;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#526671;">${intro}</p>
          ${content}
        </td></tr>
        <tr><td class="email-pad" style="padding:18px 38px;background-color:#f7faf9;border-top:1px solid #e2e9e8;">
          <p style="margin:0;font-size:12px;line-height:19px;color:#71818a;">Weblytics Studio · Digital solutions for growing businesses</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const detailTable = (lead) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border:1px solid #dce5e8;border-radius:8px;border-spacing:0;overflow:hidden;">
  ${leadDetails(lead).map(([label, value], index) => `<tr style="background-color:${index % 2 ? '#ffffff' : '#f6f9f8'};">
    <td class="detail-label" width="155" valign="top" style="width:155px;padding:13px 14px;border-bottom:1px solid #e5ecea;font-size:12px;line-height:18px;font-weight:bold;color:#627780;">${escapeHtml(label)}</td>
    <td class="detail-value" valign="top" style="padding:13px 14px;border-bottom:1px solid #e5ecea;font-size:14px;line-height:21px;color:#193440;overflow-wrap:anywhere;white-space:pre-wrap;">${escapeHtml(value || 'Not provided')}</td>
  </tr>`).join('')}
</table>`;

const receiptHtml = (lead) => emailLayout({
  preview: 'We have received your message and our team will contact you soon.',
  eyebrow: 'Message received',
  title: 'Thanks for reaching out',
  intro: `Hi ${escapeHtml(lead.name)}, we have received your message. Our team will review it and contact you soon.`,
  content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin:0 0 20px;background-color:#eff9f5;border:1px solid #ccebdd;border-radius:8px;">
    <tr><td style="padding:17px 18px;font-size:14px;line-height:22px;color:#245e4c;">Your enquiry is safely with our team. You can reply to this email if you need to add anything.</td></tr>
  </table>
  <p style="margin:0 0 8px;font-size:12px;line-height:18px;font-weight:bold;letter-spacing:.5px;text-transform:uppercase;color:#627780;">Your message</p>
  <div style="padding:16px 18px;background-color:#f6f9f8;border:1px solid #e1e9e6;border-radius:8px;font-size:14px;line-height:23px;color:#193440;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(lead.projectDescription)}</div>`,
});

const adminHtml = (lead) => emailLayout({
  preview: `New website enquiry from ${lead.name}`,
  eyebrow: 'New enquiry',
  title: lead.name,
  intro: 'A new message has arrived through the Weblytics Studio website. Here are the submitted details:',
  content: `${detailTable(lead)}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
      <tr><td style="background-color:#16856f;border-radius:6px;">
        <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;padding:12px 18px;color:#ffffff;text-decoration:none;font-size:14px;line-height:20px;font-weight:bold;">Reply to ${escapeHtml(lead.name)}</a>
      </td></tr>
    </table>`,
});

export const sendLeadEmails = async (lead) => {
  const { transporter, from, adminEmail } = getTransporter();
  const adminMessage = {
    from,
    to: "team.weblytics@outlook.com",
    subject: 'New website enquiry received',
    text: `A new enquiry was received.\n\n${formatDetails(lead)}`,
    html: adminHtml(lead),
  };
  const senderMessage = {
    from,
    to: lead.email,
    subject: 'We received your message | Weblytics Studio',
    text: `Hi ${lead.name},\n\nThank you for reaching out to Weblytics Studio. We have received your message and our team will review it and contact you soon.\n\nRegards,\nWeblytics Studio\n\nYour message:\n${lead.projectDescription}`,
    html: receiptHtml(lead),
  };

  return Promise.allSettled([
    transporter.sendMail(senderMessage),
    transporter.sendMail(adminMessage),
  ]);
};