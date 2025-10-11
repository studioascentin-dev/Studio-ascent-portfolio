
'use server';
/**
 * @fileOverview A Genkit flow for sending an email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  service: z.string(),
  message: z.string(),
  whatsapp: z.string().optional(),
  paymentId: z.string().optional(),
});

type EmailData = z.infer<typeof EmailSchema>;

// This is a placeholder flow. In a real application, you would use a service
// like Resend, SendGrid, or Nodemailer to actually send the email.
const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: EmailSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (data: EmailData) => {
    console.log('Received email data:', data);

    // TODO: Implement actual email sending logic here.
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'your-email@example.com',
    //   subject: `New Contact Form Submission - ${data.service}`,
    //   react: EmailTemplate({ name: data.name, email: data.email, message: data.message }),
    // });
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, we'll just log it and return success.
    // This flow is no longer used for the support form, but kept for reference.
    return { success: true };
  }
);

export async function sendEmail(data: EmailData): Promise<{ success: boolean }> {
  return sendEmailFlow(data);
}
