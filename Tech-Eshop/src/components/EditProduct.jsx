import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase"; 



export default function EditProduct({ product }) {
  const [config, setConfig] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(product.image);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "percentage" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      let imageURL = editedProduct.image;

      // Upload new image if a file is selected
      if (selectedFile) {
        const imageRef = ref(storage, `product-images/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        imageURL = await getDownloadURL(imageRef);

        // Delete old image from storage
        const oldImageRef = ref(storage, editedProduct.image);
        await deleteObject(oldImageRef).catch((error) => {
          console.warn("Old image deletion failed:", error);
        });
      }

      const updatedData = {
        ...editedProduct,
        image: imageURL,
      };

      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, updatedData);
      setConfig(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the product document from Firestore
      const productRef = doc(db, "products", product.id);
      await deleteDoc(productRef);

      // Delete the associated image from Firebase Storage
      const imageRef = ref(storage, product.image);
      await deleteObject(imageRef);

   
      
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="border p-2 m-2 rounded-md w-60 bg-white shadow-md">
      <img
        src={previewImage}
        alt="product"
        className="w-full h-40 object-cover rounded"
      />

      {config ? (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-1 border my-1"
          />
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="w-full p-1 border my-1"
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="w-full p-1 border my-1"
          />
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            className="w-full p-1 border my-1"
          />
          <input
            type="text"
            name="subCategory"
            value={editedProduct.subCategory}
            onChange={handleChange}
            className="w-full p-1 border my-1"
          />
          {editedProduct.sale && (
            <input
              type="number"
              name="percentage"
              value={editedProduct.percentage}
              onChange={handleChange}
              className="w-full p-1 border my-1"
            />
          )}
        </>
      ) : (
        <>
          <p>{product.name}</p>
          <p>€{product.price}</p>
          {product.sale && (
            <div>
              <p>On Sale</p>
              <p>{product.percentage * 100}%</p>
            </div>
          )}
          <p>{product.category}</p>
          <p>{product.subCategory}</p>
        </>
      )}

      <div className="mt-2 flex justify-between">
        <button className="text-red-600" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="text-blue-600"
          onClick={config ? handleSave : () => setConfig(true)}
        >
          {config ? "Save" : "Configure"}
        </button>
      </div>
    </div>
  );
}
