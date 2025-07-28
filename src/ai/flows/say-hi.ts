'use server';
/**
 * @fileOverview A Genkit flow for text-to-speech.
 *
 * - sayHi - A function that converts text to speech.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';
import wav from 'wav';
import type { SayHiOutput } from '@/ai/flows/types';
import { SayHiOutputSchema } from '@/ai/flows/types';
import { Readable } from 'stream';


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d: Buffer) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    const readable = new Readable();
    readable._read = () => {};
    readable.push(pcmData);
    readable.push(null);

    readable.pipe(writer);
  });
}

const sayHiFlow = ai.defineFlow(
  {
    name: 'sayHiFlow',
    inputSchema: z.string(),
    outputSchema: SayHiOutputSchema,
  },
  async (query: string) => {
    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: query,
    });

    if (!media) {
      throw new Error('No media returned from TTS model');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavData = await toWav(audioBuffer);

    return {
      media: `data:audio/wav;base64,${wavData}`,
    };
  }
);

export async function sayHi(input: string): Promise<SayHiOutput> {
  return sayHiFlow(input);
}
