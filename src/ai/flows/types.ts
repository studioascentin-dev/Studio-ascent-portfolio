import { z } from 'genkit';

export const SayHiOutputSchema = z.object({
  media: z.string().describe('The base64 encoded audio data URI.'),
});
export type SayHiOutput = z.infer<typeof SayHiOutputSchema>;

export const ContactEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  service: z.string(),
  message: z.string(),
});
export type ContactEmailData = z.infer<typeof ContactEmailSchema>;

export const SupportEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  paymentId: z.string(),
  productName: z.string(),
  message: z.string(),
});
export type SupportEmailData = z.infer<typeof SupportEmailSchema>;
