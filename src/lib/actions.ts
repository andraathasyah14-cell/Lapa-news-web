
"use server";

import { z } from "zod";
import { addCountry, addUpdate, addCommentToUpdate, getUpdateById } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateMagazineCover, type GenerateMagazineCoverInput } from "@/ai/flows/generate-magazine-cover";

const CountrySchema = z.object({
  name: z.string().min(3, "Country name must be at least 3 characters."),
  owner: z.string().min(2, "Owner name must be at least 2 characters."),
});

export async function registerCountryAction(prevState: any, formData: FormData) {
  const validatedFields = CountrySchema.safeParse({
    name: formData.get("name"),
    owner: formData.get("owner"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  try {
    await addCountry(validatedFields.data);
  } catch (e) {
    return { message: "Failed to register country." };
  }

  revalidatePath("/countries");
  revalidatePath("/");
  redirect("/countries");
}


const UpdateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  year: z.coerce.number().int().min(1, "Year must be a positive number."),
  countryId: z.string().min(1, "You must select a country."),
  needsMapUpdate: z.preprocess((val) => val === 'on', z.boolean()).optional(),
});

export async function submitUpdateAction(prevState: any, formData: FormData) {
  const validatedFields = UpdateSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    year: formData.get("year"),
    countryId: formData.get("countryId"),
    needsMapUpdate: formData.get("needsMapUpdate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  try {
    await addUpdate({
      ...validatedFields.data,
      createdAt: new Date().toISOString(),
    });
  } catch (e) {
    return { message: "Failed to submit update." };
  }

  revalidatePath("/");
  redirect("/");
}


const CommentSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters."),
  content: z.string().min(1, "Comment cannot be empty."),
  updateId: z.string(),
});

export async function addCommentAction(prevState: any, formData: FormData) {
  const validatedFields = CommentSchema.safeParse({
    author: formData.get("author"),
    content: formData.get("content"),
    updateId: formData.get("updateId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }
  
  const { updateId, ...commentData } = validatedFields.data;

  try {
    await addCommentToUpdate(updateId, commentData);
  } catch (e) {
    return { message: "Failed to add comment." };
  }

  revalidatePath("/");
}

const MagazineCoverSchema = z.object({
  updateId: z.string().min(1, "Please select an update."),
});

export async function generateCoverAction(formData: FormData) {
  const validatedFields = MagazineCoverSchema.safeParse({
    updateId: formData.get("updateId"),
  });

  if (!validatedFields.success) {
    return {
      error: "Validation failed.",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const update = await getUpdateById(validatedFields.data.updateId);

  if (!update) {
    return { error: "Update not found." };
  }

  try {
    const input: GenerateMagazineCoverInput = {
      updateTitle: update.title,
      updateContent: update.content,
      brandName: "UNITED LAPA NATIONS"
    };
    const result = await generateMagazineCover(input);
    return { coverImage: result.coverImage };
  } catch (error) {
    console.error("AI cover generation failed:", error);
    return { error: "Failed to generate magazine cover. Please try again." };
  }
}
