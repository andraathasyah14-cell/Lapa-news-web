'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a magazine cover
 *  based on a provided global update.
 *
 * - generateMagazineCover -  A function to generate a magazine cover based on a global update.
 * - GenerateMagazineCoverInput - The input type for the generateMagazineCover function.
 * - GenerateMagazineCoverOutput - The output type for the generateMagazineCover function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMagazineCoverInputSchema = z.object({
  updateTitle: z.string().describe('The title of the global update.'),
  updateContent: z.string().describe('The content of the global update.'),
  brandName: z.string().optional().describe('The name of the magazine.'),
});

export type GenerateMagazineCoverInput = z.infer<
  typeof GenerateMagazineCoverInputSchema
>;

const GenerateMagazineCoverOutputSchema = z.object({
  coverImage: z
    .string()
    .describe(
      'The generated magazine cover image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});

export type GenerateMagazineCoverOutput = z.infer<
  typeof GenerateMagazineCoverOutputSchema
>;

export async function generateMagazineCover(
  input: GenerateMagazineCoverInput
): Promise<GenerateMagazineCoverOutput> {
  return generateMagazineCoverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMagazineCoverPrompt',
  input: {schema: GenerateMagazineCoverInputSchema},
  output: {schema: GenerateMagazineCoverOutputSchema},
  prompt: `You are a magazine cover designer. Your task is to create a visually appealing magazine cover based on the provided global update. Use the update title and content to inspire your design.

  Update Title: {{{updateTitle}}}
  Update Content: {{{updateContent}}}
  Brand Name: {{{brandName}}}

  Instructions:
  - Design a cover that captures the essence of the update.
  - Use visually striking imagery and typography.
  - Ensure the cover is suitable for a digital magazine format.
  - Return the image as a data URI.

  Output:
  A magazine cover image in data URI format.
  `,
});

const generateMagazineCoverFlow = ai.defineFlow(
  {
    name: 'generateMagazineCoverFlow',
    inputSchema: GenerateMagazineCoverInputSchema,
    outputSchema: GenerateMagazineCoverOutputSchema,
  },
  async input => {
    const {
      media: {url},
    } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Create a magazine cover with the following title: ${input.updateTitle}, and the following content: ${input.updateContent}. Brand name: ${input.brandName}`,      
    });

    return {coverImage: url!};
  }
);
