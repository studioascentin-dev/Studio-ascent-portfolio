
'use server';
/**
 * @fileOverview A Genkit flow for sending a payment support request email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';
import { SupportRequestEmail } from '@/emails/support-request-email';

export const SupportEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  paymentId: z.string(),
  productName: z.string(),
  message: z.string(),
});

export type SupportEmailData = z.infer<typeof SupportEmailSchema>;

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
          from: 'Studio Ascent Support <onboarding@resend.dev>', // Must be a verified domain on Resend
          to: 'your-email@example.com',   // <--- IMPORTANT: Change this to your actual email address
          subject: `Payment Support Request - ${data.productName}`,
          react: SupportRequestEmail({ ...data }),
        });

        return { success: true };

    } catch (error: any) {
        console.error("Error sending support email with Resend:", error);
        return { success: false, error: error.message || "Failed to send email." };
    }
  }
);

export async function sendSupportEmail(data: SupportEmailData): Promise<{ success: boolean; error?: string }> {
  return sendSupportEmailFlow(data);
}
