'use server';

import { suggestProjects, type SuggestProjectsInput } from '@/ai/flows/suggest-projects';

export async function getProjectSuggestions(input: SuggestProjectsInput) {
  try {
    const result = await suggestProjects(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting project suggestions:', error);
    return { success: false, error: 'Failed to get suggestions. Please try again later.' };
  }
}
