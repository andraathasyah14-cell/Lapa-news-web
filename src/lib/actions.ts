
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateMagazineCover, type GenerateMagazineCoverInput } from "@/ai/flows/generate-magazine-cover";
import { collection, addDoc, doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { Country, Update, Comment } from './definitions';
import { getUpdateById } from "./data";


// --- WRITE OPERATIONS ---

export async function addCountry(country: Omit<Country, 'id'>) {
  const countriesCol = collection(db, 'countries');
  await addDoc(countriesCol, country);
}

export async function addUpdate(update: Omit<Update, 'id' | 'comments'>) {
    const newUpdateData = {
        ...update,
        createdAt: new Date(update.createdAt),
        comments: [],
    };
    await addDoc(collection(db, 'updates'), newUpdateData);
}

export async function addCommentToUpdate(updateId: string, comment: Omit<Comment, 'id' | 'createdAt'>) {
  const updateRef = doc(db, 'updates', updateId);
  const newComment = {
    ...comment,
    id: `c${Date.now()}`, 
    createdAt: Timestamp.now(),
  };

  await updateDoc(updateRef, {
    comments: arrayUnion(newComment),
  });
}


// --- SERVER ACTIONS ---

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
      success: false,
    };
  }

  try {
    await addCountry(validatedFields.data);
  } catch (e: any) {
    console.error("Firebase Error:", e);
    // More specific error message
    if (e.code === 'permission-denied') {
        return { message: "Failed to register country. Permission denied. Please check Firestore rules.", success: false, errors: {} };
    }
    return { message: `Failed to register country. Error: ${e.message}`, success: false, errors: {} };
  }

  revalidatePath("/countries");
  revalidatePath("/");
  redirect("/countries");
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const UpdateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  year: z.coerce.number().int().min(1, "Year must be a positive number."),
  countryId: z.string().min(1, "You must select a country."),
  needsMapUpdate: z.preprocess((val) => val === 'on', z.boolean()).optional(),
  coverImage: z
    .any()
    .refine((file) => !file || file.size === 0 || file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => !file || file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ).optional(),
});

async function fileToDataUrl(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function submitUpdateAction(prevState: any, formData: FormData) {
  const validatedFields = UpdateSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    year: formData.get("year"),
    countryId: formData.get("countryId"),
    needsMapUpdate: formData.get("needsMapUpdate"),
    coverImage: formData.get("coverImage"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  const { coverImage: imageFile, ...updateData } = validatedFields.data;
  let coverImageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
      try {
        coverImageUrl = await fileToDataUrl(imageFile);
      } catch (e) {
          return { message: "Failed to process image."}
      }
  }


  try {
    await addUpdate({
      ...updateData,
      coverImage: coverImageUrl,
      createdAt: new Date().toISOString(),
    });
  } catch (e: any) {
    console.error("Firebase Error:", e);
    return { message: `Failed to submit update. Error: ${e.message}` };
  }

  revalidatePath("/");
  redirect("/");
}


const CommentSchema = z.object({
  author: z.string().min(1, "Author name cannot be empty"),
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
  } catch (e: any) {
    console.error("Firebase Error:", e);
    return { message: `Failed to add comment. Error: ${e.message}` };
  }

  revalidatePath("/");
  revalidatePath(`/countries/${formData.get('countryId')}`);
  return { message: "Comment added." };
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
