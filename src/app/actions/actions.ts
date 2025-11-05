
'use server';
/**
 * @fileOverview Server Actions for sending emails.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';
import { SupportRequestEmail } from '@/emails/support-request-email';
import { ContactEmailSchema, SupportEmailSchema, type ContactEmailData, type SupportEmailData } from '@/ai/flows/types';

// --- Contact Form Email Action ---

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactEmailSchema,
    outputSchema: z.object({ success: z.boolean(), error: z.string().optional() }),
    model: 'googleai/gemini-2.0-flash',
  },
  async (data: ContactEmailData) => {
    
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
        const errorMsg = "Resend API key is not set. Please add it to your .env file.";
        console.error(errorMsg);
        return { success: false, error: "Server configuration error: Email API key is missing." };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'Studio Ascent Contact <contact@yourdomain.com>',
          to: 'studioascent.in@gmail.com',
          subject: `[Contact Form] New Inquiry from ${data.name}`,
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


// --- Support Form Email Action ---

const sendSupportEmailFlow = ai.defineFlow(
  {
    name: 'sendSupportEmailFlow',
    inputSchema: SupportEmailSchema,
    outputSchema: z.object({ success: z.boolean(), error: z.string().optional() }),
    model: 'googleai/gemini-2.0-flash',
  },
  async (data: SupportEmailData) => {
    
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
        const errorMsg = "Resend API key is not set. Cannot send email.";
        console.error(errorMsg);
        return { success: false, error: "Server configuration error: Email API key is missing." };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'Studio Ascent Support <contact@yourdomain.com>',
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
