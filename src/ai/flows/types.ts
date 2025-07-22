import { z } from 'genkit';

export const SayHiOutputSchema = z.object({
  media: z.string().describe('The base64 encoded audio data URI.'),
});
export type SayHiOutput = z.infer<typeof SayHiOutputSchema>;
