import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
  const fileRef = ref(storage, `products/${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
