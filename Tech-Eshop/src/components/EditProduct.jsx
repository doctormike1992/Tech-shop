import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { categories, subCategories, brands } from "../store/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SwitchButton from "./SwitchButton";
import Input from "./Input";

export default function EditProduct({ product, modal }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(product.image);
  const [ischeck, setIscheck] = useState(product.sale);
  const [isLoading, setIsLoading] = useState(false);
  const [specs, setSpecs] = useState(product.specifications || []);
 


 

  //CHANGE THE EXISTING IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  //CLOSING THE MODAL
  function closeModal() {
    modal.current.close();
  }
  //SUBMITING THE CHANGES
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = editedProduct.image;

      // Upload new image if a file is selected
      if (selectedFile) {
        const imageRef = ref(storage, `product-images/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        imageURL = await getDownloadURL(imageRef);
        setImageSrc(imageURL);

        // Delete old image from storage
        const oldImageRef = ref(storage, editedProduct.image);
        await deleteObject(oldImageRef).catch((error) => {
          console.warn("Old image deletion failed:", error);
        });

       
      }
       const originalPrice = Number(editedProduct.price);
        const discount = ischeck ? parseInt(editedProduct.percentage, 10) / 100 : 0;
        const finalPrice = ischeck
          ? originalPrice * (1 - discount)
          : originalPrice;

      const updatedData = {
        ...editedProduct,
        specifications: specs,
        price: originalPrice,
        finalPrice: finalPrice,
        sale: ischeck,
        image: imageURL,
      };

      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, updatedData);
      ;
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  //DISABLE FORM UNTIL ITS SUBMITED
  let formClass =
    "flex items-center justify-center  flex-col md:gap-2 gap-0.5 bg-stone-50 h-fit w-[40%] border-1 rounded-md border-stone-200";
  if (isLoading) {
    formClass += "pointer-events-none";
  }

  //ADD MORE SPECIFICATIONS
  function addSpecs() {
    setSpecs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", value: "" },
    ]);
  }
 //DELETING SPECIFICATIONS
  function handleDeleteSpec(specId) {
    const updatedSpec = specs.filter((item) => item.id != specId);
    setSpecs(updatedSpec);
  }

  return (
    <form onSubmit={handleSave} className={formClass}>
      <div className="flex flex-row">
        <div className="flex flex-col w-full justify-center h-full">
          <div className="flex flex-col  items-start  p-2 ">
            <label className="text-sm font-semibold" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
            />
          </div>

          <div className="flex flex-col justify-center items-start p-2 ">
            <label htmlFor="summary" className="text-sm font-semibold">
              Summary
            </label>
            <textarea
              name="summary"
              id="summary"
              maxLength={100}
              value={editedProduct.summary}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, summary: e.target.value })
              }
              className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
            />
          </div>

          <div className="flex flex-col  justify-center items-start  p-2  ">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
              className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
            />
          </div>

          <div className="flex flex-row justify-around gap-2 items-start p-2 ">
            <div className="w-full">
              <label htmlFor="price" className="text-sm font-semibold">
                Price
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                name="price"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                  })
                }
                className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
              />
            </div>
            <div className="w-full">
              <label htmlFor="delivery" className="text-sm font-semibold">
                Delivery Days
              </label>
              <input
                type="number"
                id="delivery"
                name="deliveryTime"
                value={editedProduct.deliveryTime}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    deliveryTime: e.target.value,
                  })
                }
                className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
              />
            </div>
          </div>

          <div className="flex flex-row justify-start gap-2 items-center p-2">
            <SwitchButton
              enabled={ischeck}
              setEnabled={setIscheck}
            />
            <p className="text-sm font-semibold">On Sale</p>
          </div>

          {ischeck && (
            <div className="w-full p-2">
              <label htmlFor="percentage" className="text-sm font-semibold">
                Sale Percentage
              </label>
              <input
                name="percentage"
                type="number"
                id="percentage"
                value={editedProduct.percentage}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    percentage: e.target.value,
                  })
                }
                className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
              />
            </div>
          )}

          <div className="w-full flex flex-col p-2 ">
            <label htmlFor="category" className="text-sm font-semibold">
              Category
            </label>
            <div className="relative">
              <button
                type="button"
                className={`bg-[#f3f3f5] w-full rounded-md  pointer-events-none p-2 z-2 outline-0 flex justify-between items-center font-medium`}
              >
                <span>{editedProduct.category}</span>
                <FontAwesomeIcon
                  className="text-stone-400"
                  icon={faChevronDown}
                />
              </button>
              <select
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
                name="category"
                id="category"
                className=" w-full rounded-md p-2  outline-0 opacity-0  absolute inset-0 cursor-pointer"
              >
                {categories.map((item) => (
                  <option
                    className="text-md font-medium py-1"
                    value={item}
                    key={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col p-2 ">
            <label htmlFor="subCategory" className="text-sm font-semibold">
              Sub Category
            </label>
            <div className="relative">
              <button
                type="button"
                className={`bg-[#f3f3f5] w-full rounded-md  pointer-events-none p-2 z-2 outline-0 flex justify-between items-center font-medium `}
              >
                <span>{editedProduct.subCategory}</span>
                <FontAwesomeIcon
                  className="text-stone-400"
                  icon={faChevronDown}
                />
              </button>
              <select
                value={editedProduct.subCategory}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    subCategory: e.target.value,
                  })
                }
                name="subCategory"
                id="subCategory"
                className=" w-full rounded-md p-2  outline-0 opacity-0  absolute inset-0 cursor-pointer"
              >
                {subCategories.map((item) => (
                  <option
                    className="text-md font-medium py-1"
                    value={item}
                    key={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col p-2 ">
            <label htmlFor="brand" className="text-sm font-semibold">
              Brand
            </label>
            <div className="relative">
              <button
                type="button"
                className={`bg-[#f3f3f5] w-full rounded-md  pointer-events-none p-2 z-2 outline-0 flex justify-between items-center font-medium`}
              >
                <span>{editedProduct.brand}</span>
                <FontAwesomeIcon
                  className="text-stone-400"
                  icon={faChevronDown}
                />
              </button>
              <select
                value={editedProduct.brand}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, brand: e.target.value })
                }
                name="brand"
                id="brand"
                className="w-full rounded-md p-2  outline-0 opacity-0  absolute inset-0 cursor-pointer"
              >
                {brands.map((item) => (
                  <option
                    className="text-md font-medium py-1"
                    value={item}
                    key={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex justify-between items-center flex-col p-2">
            <div className="flex flex-row justify-between w-full">
              <p className="text-sm font-semibold">Specifications</p>
              <button
                type="button"
                onClick={addSpecs}
                className="border transition-all cursor-pointer border-stone-300 hover:bg-stone-200 text-sm font-medium px-2 py-1 rounded-sm"
              >
                + Add Spec
              </button>
            </div>

            {specs.map((spec, index) => (
              <div
                className="w-full flex justify-between gap-2 pt-3 flex-row "
                key={spec.id}
              >
                <input
                  className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
                  type="text"
                  placeholder="expample (battery life)"
                  id={`specName${spec.id}`}
                  value={spec.name}
                  onChange={(e) => {
                    const updated = [...specs];
                    updated[index].name = e.target.value;
                    setSpecs(updated);
                  }}
                />

                <input
                  type="text"
                  placeholder="example (8 hours)"
                  className="bg-[#f3f3f5] w-full rounded-md p-2  outline-0"
                  id={`specValue${spec.id}`}
                  value={spec.value}
                  onChange={(e) => {
                    const updated = [...specs];
                    updated[index].value = e.target.value;
                    setSpecs(updated);
                  }}
                />

                <button
                  onClick={() => handleDeleteSpec(spec.id)}
                  type="button"
                  className="transition-all  text-md py-2 px-3 rounded-md hover:bg-[#f3f3f5]"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex  items-center justify-center p-2 flex-col gap-2 h-full  w-full">
          <img
            src={imageSrc}
            alt="Selected"
            className="w-md h-md object-cover aspect-[4/3]"
          />

          <Input
            htmlFor="file"
            id="file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            label="select image"
            labelClass="p-1  text-md font-medium rounded-md active:scale-75 bg-stone-900 text-amber-50 px-2 text-center cursor-pointer"
            hidden
          />
          {isLoading && (
            <div
              className="w-12 h-12 border-4 border-stone-900 border-t-transparent
                              rounded-full animate-spin"
            ></div>
          )}
        </div>
      </div>

      <div>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
        <button>save</button>
      </div>
    </form>
  );
}
