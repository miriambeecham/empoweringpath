// Create/update file: app/api/contact/route.js

export async function POST(request) {
  console.log('Contact API called'); // Debug log

  try {
    const body = await request.json();
    const { firstName, lastName, email, message, captchaToken } = body;

    console.log('Form data received:', { firstName, lastName, email }); // Debug log

    // Verify reCAPTCHA
    const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    });

    const captchaData = await captchaResponse.json();
    console.log('Captcha verification:', captchaData); // Debug log

    if (!captchaData.success) {
      console.log('Captcha failed:', captchaData);
      return new Response(JSON.stringify({ error: 'Captcha verification failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if Resend API key exists
    if (!process.env.RESEND_API_KEY) {
      console.log('No Resend API key found');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use Resend
    console.log('Attempting to send email via Resend...');

    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's default for testing
      to: ['blakelypattersoncoaching@gmail.com'], // Array format
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
      // Also include plain text version
      text: `
        New Contact Form Submission

        Name: ${firstName} ${lastName}
        Email: ${email}

        Message:
        ${message}

        This message was sent from your website contact form.
      `
    });

    console.log('Email send result:', emailResult); // Debug log

    if (emailResult.error) {
      console.log('Resend error:', emailResult.error);
      return new Response(JSON.stringify({ 
        error: 'Failed to send email',
        details: emailResult.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Email sent successfully:', emailResult.data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: emailResult.data?.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send message',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}