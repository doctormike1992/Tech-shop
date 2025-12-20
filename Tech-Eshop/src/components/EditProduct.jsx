// import { useState } from "react";
// import { doc, updateDoc, deleteDoc } from "firebase/firestore";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";
// import { db, storage } from "../firebase/firebase"; 



// export default function EditProduct({ product }) {
  // const [editedProduct, setEditedProduct] = useState({ ...product });
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [previewImage, setPreviewImage] = useState(product.image);


 

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setPreviewImage(URL.createObjectURL(file));
  //   }
  // };

  // const handleSave = async () => {
  //   try {
  //     let imageURL = editedProduct.image;

  //     // Upload new image if a file is selected
  //     if (selectedFile) {
  //       const imageRef = ref(storage, `product-images/${selectedFile.name}`);
  //       await uploadBytes(imageRef, selectedFile);
  //       imageURL = await getDownloadURL(imageRef);

  //       // Delete old image from storage
  //       const oldImageRef = ref(storage, editedProduct.image);
  //       await deleteObject(oldImageRef).catch((error) => {
  //         console.warn("Old image deletion failed:", error);
  //       });
  //     }

  //     const updatedData = {
  //       ...editedProduct,
  //       image: imageURL,
  //     };

  //     const productRef = doc(db, "products", product.id);
  //     await updateDoc(productRef, updatedData);
  //     setConfig(false);
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     // Delete the product document from Firestore
  //     const productRef = doc(db, "products", product.id);
  //     await deleteDoc(productRef);

  //     // Delete the associated image from Firebase Storage
  //     const imageRef = ref(storage, product.image);
  //     await deleteObject(imageRef);

   
      
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

//   return (
//   div
//   );
// }
