
'use server';
/**
 * @fileOverview A Genkit flow for sending a payment support request email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Resend } from 'resend';
import { SupportRequestEmail } from '@/emails/support-request-email';
import { SupportEmailSchema, type SupportEmailData } from '@/ai/flows/types';


const sendSupportEmailFlow = ai.defineFlow(
  {
    name: 'sendSupportEmailFlow',
    inputSchema: SupportEmailSchema,
    outputSchema: z.object({ success: z.boolean(), error: z.string().optional() }),
  },
  async (data: SupportEmailData) => {
    
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
          from: 'Studio Ascent Support <onboarding@resend.dev>',
          // IMPORTANT: This MUST be the primary email you signed up to Resend with.
          to: 'studioascent.in@gmail.com',
          subject: `[Payment Support] Request for ${data.productName}`,
          react: SupportRequestEmail({ 
              name: data.name, 
              email: data.email, 
              whatsapp: data.whatsapp,
              paymentId: data.paymentId,
              productName: data.productName,
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

export async function sendSupportEmail(data: SupportEmailData): Promise<{ success: boolean; error?: string }> {
    return sendSupportEmailFlow(data);
}
