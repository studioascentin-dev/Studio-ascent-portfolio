'use server';
/**
 * @fileOverview This file defines a Genkit flow that suggests relevant project examples
 * based on user selections in the welcome area.
 *
 * - suggestProjects - A function that suggests relevant projects based on user selections.
 * - SuggestProjectsInput - The input type for the suggestProjects function.
 * - SuggestProjectsOutput - The return type for the suggestProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectsInputSchema = z.object({
  selections: z
    .array(z.string())
    .describe("An array of strings representing the user's selections in the welcome area."),
});
export type SuggestProjectsInput = z.infer<typeof SuggestProjectsInputSchema>;

const SuggestProjectsOutputSchema = z.object({
  suggestedProjects: z
    .array(z.string())
    .describe('An array of project names that are relevant to the user selections.'),
});
export type SuggestProjectsOutput = z.infer<typeof SuggestProjectsOutputSchema>;

export async function suggestProjects(input: SuggestProjectsInput): Promise<SuggestProjectsOutput> {
  return suggestProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectsPrompt',
  input: {schema: SuggestProjectsInputSchema},
  output: {schema: SuggestProjectsOutputSchema},
  prompt: `Based on the user's selections: {{{selections}}},
  suggest the most relevant project examples from the following categories:
  video editing, photo editing, PPT, graphic design, web development.
  Return a list of project names that would be most impactful to the user.
  Be concise. Focus on matching the user's stated needs to a specific project type.
  For example, if the user is interested in "video editing" and "graphic design", return example projects from those categories.
  Do not return project examples that are not related to the user's selections.
  `,
});

const suggestProjectsFlow = ai.defineFlow(
  {
    name: 'suggestProjectsFlow',
    inputSchema: SuggestProjectsInputSchema,
    outputSchema: SuggestProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
