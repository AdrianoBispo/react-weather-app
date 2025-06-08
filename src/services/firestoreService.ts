import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

type UserData = {
  favorites?: string[];
  searchHistory?: string[];
};

export const getUserData = async (userId: string): Promise<UserData> => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists() ? userDoc.data() : {};
};

export const updateUserData = async (
  userId: string,
  data: Partial<UserData>
) => {
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(userDocRef, data, { merge: true });
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário: ", error);
  }
};

export const toggleFavoriteCity = async (
  userId: string,
  city: string,
  isFavorite: boolean
) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    favorites: isFavorite ? arrayRemove(city) : arrayUnion(city),
  });
};

export const updateSearchHistory = async (
  userId: string,
  city: string,
  currentHistory: string[]
) => {
  const newHistory = [city, ...currentHistory.filter((c) => c !== city)].slice(
    0,
    5
  );
  await updateUserData(userId, { searchHistory: newHistory });
  return newHistory;
};
