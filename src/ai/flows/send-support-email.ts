
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
    
    if (!process.env.RESEND_API_KEY)