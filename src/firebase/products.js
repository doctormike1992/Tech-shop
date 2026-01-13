import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const productsRef = collection(db, "products");

export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = (data) => addDoc(productsRef, data);

export const updateProduct = (id, data) =>
  updateDoc(doc(db, "products", id), data);

export const deleteProduct = (id) => deleteDoc(doc(db, "products", id));

export const addToCart = async (userId, product) => {
  const userCartRef = doc(db, "carts", userId);
  const cartSnap = await getDoc(userCartRef);
  const prevCart = cartSnap.exists() ? cartSnap.data().items : [];
  await setDoc(userCartRef, { items: [...prevCart, product] });
};
