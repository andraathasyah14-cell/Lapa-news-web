"use server";

import { z } from "zod";
import { addCountry, addUpdate, addCommentToUpdate, getUpdateById } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateMagazineCover, type GenerateMagazineCoverInput } from "@/ai/flows/generate-magazine-cover";

const CountrySchema = z.object({
  name: z.string().min(3, "validation.countryNameMin"),
  owner: z.string().min(2, "validation.ownerNameMin"),
});

export async function registerCountryAction(prevState: any, formData: FormData) {
  const validatedFields = CountrySchema.safeParse({
    name: formData.get("name"),
    owner: formData.get("owner"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "errors.validationFailed",
    };
  }

  try {
    await addCountry(validatedFields.data);
  } catch (e) {
    return { message: "errors.registerCountryFailed" };
  }

  revalidatePath("/countries");
  revalidatePath("/");
  redirect("/countries");
}


const UpdateSchema = z.object({
  title: z.string().min(5, "validation.titleMin"),
  content: z.string().min(20, "validation.contentMin"),
  year: z.coerce.number().int().min(1, "validation.yearMin"),
  countryId: z.string().min(1, "validation.countryRequired"),
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
      message: "errors.validationFailed",
    };
  }

  try {
    await addUpdate({
      ...validatedFields.data,
      createdAt: new Date().toISOString(),
    });
  } catch (e) {
    return { message: "errors.submitUpdateFailed" };
  }

  revalidatePath("/");
  redirect("/");
}


const CommentSchema = z.object({
  author: z.string().min(2, "validation.authorMin"),
  content: z.string().min(1, "validation.commentMin"),
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
      message: "errors.validationFailed",
    };
  }
  
  const { updateId, ...commentData } = validatedFields.data;

  try {
    await addCommentToUpdate(updateId, commentData);
  } catch (e) {
    return { message: "errors.addCommentFailed" };
  }

  revalidatePath("/");
}

const MagazineCoverSchema = z.object({
  updateId: z.string().min(1, "validation.updateRequired"),
});

export async function generateCoverAction(formData: FormData) {
  const validatedFields = MagazineCoverSchema.safeParse({
    updateId: formData.get("updateId"),
  });

  if (!validatedFields.success) {
    return {
      error: "errors.validationFailed",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const update = await getUpdateById(validatedFields.data.updateId);

  if (!update) {
    return { error: "errors.updateNotFound" };
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
    return { error: "errors.generateCoverFailed" };
  }
}
