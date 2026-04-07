import { Resend } from 'resend'

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { name, company, email, phone, services, budget, timeline, inquiry } = body

    if (!name || !email || !inquiry) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const resend = new Resend(process.env.RESEND_API_TOKEN)

    const servicesText = services && services.length > 0
      ? services.join(', ')
      : 'Not specified'

    await resend.emails.send({
      from: 'BaghLabs Contact <onboarding@resend.dev>',
      to: 'sweaniz@icloud.com',
      replyTo: email,
      subject: `New contact from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; width: 140px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Company</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Services</td>
              <td style="padding: 8px 0;">${servicesText}</td>
            </tr>
            ${budget ? `<tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Budget</td>
              <td style="padding: 8px 0;">${budget}</td>
            </tr>` : ''}
            ${timeline ? `<tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Timeline</td>
              <td style="padding: 8px 0;">${timeline}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <p style="font-weight: bold; color: #666; margin: 0 0 8px;">Inquiry</p>
            <p style="margin: 0; white-space: pre-wrap;">${inquiry}</p>
          </div>
        </div>
      `,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Resend error:', err)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: '/api/send-contact' }
