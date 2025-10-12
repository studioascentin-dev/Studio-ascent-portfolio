
'use server';
/**
 * @fileOverview A Genkit flow for sending a contact form email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';

const ContactEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  service: z.string(),
  message: z.string(),
});

type ContactEmailData = z.infer<typeof ContactEmailSchema>;


const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactEmailSchema,
    outputSchema: z.object({ success: z.boolean(), error: z.string().optional() }),
  },
  async (data: ContactEmailData) => {
    
    if (!process.env.RESEND_API_KEY) {
        console.error("Resend API key is not set. Cannot send email.");
        return { success: false, error: "Server configuration error." };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'onboarding@resend.dev', // Must be a verified domain on Resend
          to: 'your-email@example.com', // Your email address to receive notifications
          subject: `New Contact Form Submission - ${data.service}`,
          react: ContactFormEmail({ 
              name: data.name, 
              email: data.email, 
              service: data.service, 
              message: data.message 
          }),
        });

        return { success: true };

    } catch (error: any) {
        console.error("Error sending email with Resend:", error);
        return { success: false, error: error.message || "Failed to send email." };
    }
  }
);

export async function sendEmail(data: ContactEmailData): Promise<{ success: boolean }> {
    const result = await sendEmailFlow(data);
    return { success: result.success };
}
