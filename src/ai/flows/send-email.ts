
'use server';
/**
 * @fileOverview A Genkit flow for sending a contact form email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';
import { ContactEmailSchema, type ContactEmailData } from '@/ai/flows/types';


const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactEmailSchema,
    outputSchema: z.object({ success: z.boolean(), error: z.string().optional() }),
  },
  async (data: ContactEmailData) => {
    
    if (!process.env.RESEND_API_KEY) {
        const errorMsg = "Resend API key is not set. Cannot send email.";
        console.error(errorMsg);
        return { success: false, error: "Server configuration error." };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          // IMPORTANT: To prevent emails from going to spam, you must verify your own domain in Resend
          // and use an email from that domain here. e.g., 'contact@yourdomain.com'
          from: 'Studio Ascent Contact <onboarding@resend.dev>',
          to: 'studioascent.in@gmail.com', // <--- IMPORTANT: Change this to your actual email address
          subject: `New Inquiry from ${data.name}`,
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

export async function sendEmail(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
    return sendEmailFlow(data);
}
