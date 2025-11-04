import { z } from 'genkit';

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
