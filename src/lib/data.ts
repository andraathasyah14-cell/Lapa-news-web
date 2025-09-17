
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Country, Update, Comment } from './definitions';

// --- COUNTRIES ---

export async function getCountries(): Promise<Country[]> {
  const countriesCol = collection(db, 'countries');
  const countrySnapshot = await getDocs(query(countriesCol, orderBy('name')));
  return countrySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Country));
}

export async function getCountryById(id: string): Promise<Country | undefined> {
  const countryRef = doc(db, 'countries', id);
  const countrySnap = await getDoc(countryRef);
  if (countrySnap.exists()) {
    return { id: countrySnap.id, ...countrySnap.data() } as Country;
  }
  return undefined;
}

export async function addCountry(country: Omit<Country, 'id'>) {
  const countriesCol = collection(db, 'countries');
  const docRef = await addDoc(countriesCol, country);
  return { id: docRef.id, ...country };
}


// --- UPDATES ---

export async function getUpdates(count?: number): Promise<Update[]> {
  const updatesCol = collection(db, 'updates');
  const q = count 
    ? query(updatesCol, orderBy('createdAt', 'desc'), limit(count))
    : query(updatesCol, orderBy('createdAt', 'desc'));

  const updateSnapshot = await getDocs(q);

  return updateSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Convert Firestore Timestamps to ISO strings
      createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
      comments: data.comments.map((comment: any) => ({
        ...comment,
        createdAt: (comment.createdAt as Timestamp).toDate().toISOString(),
      })),
    } as Update;
  });
}

export async function getUpdatesByCountryId(countryId: string): Promise<Update[]> {
    const updatesCol = collection(db, 'updates');
    const q = query(
        updatesCol, 
        where('countryId', '==', countryId), 
        orderBy('createdAt', 'desc')
    );
    const updateSnapshot = await getDocs(q);

    return updateSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
        comments: data.comments.map((comment: any) => ({
            ...comment,
            createdAt: (comment.createdAt as Timestamp).toDate().toISOString(),
        })),
        } as Update;
    });
}

export async function getUpdateById(id: string): Promise<Update | undefined> {
  const updateRef = doc(db, 'updates', id);
  const updateSnap = await getDoc(updateRef);

  if (updateSnap.exists()) {
    const data = updateSnap.data();
    return {
      id: updateSnap.id,
      ...data,
      createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
      comments: data.comments.map((comment: any) => ({
        ...comment,
        createdAt: (comment.createdAt as Timestamp).toDate().toISOString(),
      })),
    } as Update;
  }
  return undefined;
}

export async function addUpdate(update: Omit<Update, 'id' | 'comments'>) {
    const newUpdateData = {
        ...update,
        createdAt: Timestamp.fromDate(new Date(update.createdAt)),
        comments: [],
    };
    const docRef = await addDoc(collection(db, 'updates'), newUpdateData);
    return { id: docRef.id, ...newUpdateData } as unknown as Update;
}


// --- COMMENTS ---

export async function addCommentToUpdate(updateId: string, comment: Omit<Comment, 'id' | 'createdAt'>) {
  const updateRef = doc(db, 'updates', updateId);
  const newComment = {
    ...comment,
    id: `c${Date.now()}`, // Still using this for simplicity within the array
    createdAt: Timestamp.now(),
  };

  await updateDoc(updateRef, {
    comments: arrayUnion(newComment),
  });

  return { 
      ...newComment,
      createdAt: newComment.createdAt.toDate().toISOString(),
  };
}
