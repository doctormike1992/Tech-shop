import {useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productsActions } from "../store/productsSlice";
import Input from "./Input";
import { categories, subCategories, brands } from "../store/categories";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import SwitchButton from "./SwitchButton";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewProductForm() {
  const [imageSrc, setImageSrc] = useState("/placeholder.png");
  const [ischeck, setIscheck] = useState(false);
  const [noImage, setNoImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [specs, setSpecs] = useState([]);
  const [categoryValue, setCategoryValue] = useState("choose one...");
  const [subCategoryValue, setSubCategoryValue] = useState("choose one...");
  const [brandValue, setBrandValue] = useState("choose one...");
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  //CHECKING IF THE WIDTH OF THE SCREEN IN SMALLER TO CHANGE THE ADD PRODUCT BUUTON POSITION
  useEffect(() => {
    const widthChange = () => setWidth(window.innerWidth);

    window.addEventListener('resize', widthChange);

    return () => window.addEventListener("resize", widthChange);
     
  }, []);

  //IMAGE LOADER
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      setSelectedFile(file);
    }
  }

  //ON SUBMIT
  async function hanldeNewProduct(event) {
    event.preventDefault();

    if (!selectedFile) {
      setNoImage(true);
      return;
    }

    setIsLoading(true);
    setNoImage(false);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `product-images/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      // Prepare product data
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      const originalPrice = Number(data.price);
      const deliveryTime = Number(data.deliveryTime);
      const discount = ischeck ? parseInt(data.percentage, 10) / 100 : 0;
      const finalPrice = ischeck
        ? originalPrice * (1 - discount)
        : originalPrice;
      const specifications = specs;

      const productData = {
        ...data,
        image: downloadURL,
        price: originalPrice,
        finalPrice: finalPrice,
        sale: ischeck,
        deliveryTime: deliveryTime,
        specifications: specifications,
        percentage: ischeck ? data.percentage : 0,
      };

      // Add product to Firestore
      const docRef = await addDoc(collection(db, "products"), productData);

      // Optionally, dispatch to Redux store
      dispatch(productsActions.setProducts({ ...productData, id: docRef.id }));

      // RESET FORM
      event.target.reset();
      setImageSrc("/placeholder.png");
      setSelectedFile(null);
      setIscheck(false);
      setIsLoading(false);
      setCategoryValue("choose one");
      setSubCategoryValue("choose one");
      setBrandValue("choose one");
      setSpecs([]);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  }

  //DISABLE FORM UNTIL ITS SUBMITED
  let formClass =
    "flex items-start justify-center md:flex-row flex-col md:gap-2 gap-0.5  h-full w-full border-1 rounded-md border-stone-200";
  if (isLoading) {
    formClass += "pointer-events-none";
  }
 
  //ADD MORE SPECIFICATIONS
  function addSpecs() {
    setSpecs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", value: "" },
    ]);
    console.log(specs)
  }

  function handleDeleteSpec(specId) {
    const updatedSpec = specs.filter((item) => item.id != specId);
    setSpecs(updatedSpec);
  }

  return (
    <>
      <form onSubmit={hanldeNewProduct} className={formClass}>
        <div className="flex flex-col w-full justify-center h-full">
          <div className="flex flex-col  items-start  p-2 ">
            <Input
              label="Product Name"
              labelClass="text-sm font-semibold"
              htmlFor="name"
              type="text"
              id="name"
              name="name"
              required
              inputClass="bg-(--input) w-full rounded-md p-2  outline-0"
            />
          </div>

          <div className="flex flex-col justify-center items-start p-2 ">
            <label htmlFor="summary" className="text-sm font-semibold">
              Summary
            </label>
            <textarea
              name="summary"
              id="summary"
              required
              className="bg-(--input) w-full rounded-md p-2  outline-0"
            />
          </div>

          <div className="flex flex-col  justify-center items-start  p-2  ">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              className="bg-(--input) w-full rounded-md p-2  outline-0"
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
                className="bg-(--input) w-full rounded-md p-2  outline-0"
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
                className="bg-(--input) w-full rounded-md p-2  outline-0"
              />
            </div>
          </div>

          <div className="flex flex-row justify-start gap-2 items-center p-2">
            <SwitchButton enabled={ischeck} setEnabled={setIscheck} />
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
                className="bg-(--input) w-full rounded-md p-2  outline-0"
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
                className={`bg-(--input) w-full rounded-md  pointer-events-none p-2 z-2 outline-0 flex justify-between items-center font-medium ${
                  categoryValue === "choose one..." && "text-stone-400"
                }`}
              >
                <span>{categoryValue}</span>
                <FontAwesomeIcon
                  className="text-stone-400"
                  icon={faChevronDown}
                />
              </button>
              <select
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
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
                className={`bg-(--input) w-full rounded-md  pointer-events-none p-2 z-2 outline-0 flex justify-between items-center font-medium ${
                  subCategoryValue === "choose one..." && "text-stone-400"
                }`}
              >
                <span>{subCategoryValue}</span>
                <FontAwesomeIcon
                  className="text-stone-400"
                  icon={faChevronDown}
                />
              </button>
              <select
                value={subCategoryValue}
                onChange={(e) => setSubCategoryValue(e.target.value)}
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
                className={`bg-(--input) w-full rounded-md  pointer-events-none p-2 z-2 outline-0 flex justify-between items-center font-medium ${
                  brandValue === "choose one..." && "text-stone-400"
                }`}
              >
                <span>{brandValue}</span>
                <FontAwesomeIcon
                  className="text-stone-400"
                  icon={faChevronDown}
                />
              </button>
              <select
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
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
                  className="bg-(--input) w-full rounded-md p-2  outline-0"
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
                  className="bg-(--input) w-full rounded-md p-2  outline-0"
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
                  className="transition-all  text-md py-2 px-3 rounded-md hover:bg-(--input)"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {width > 766 && (
            <div className="flex justify-center items-center w-full p-2 ">
              <button className=" text-sm bg-stone-900 font-medium text-stone-50 py-1.5  w-full rounded-md  cursor-pointer ">
                Add Product
              </button>
            </div>
          )}
        </div>

        <div className="flex  items-center justify-center p-2 flex-col gap-2 h-full  w-full">
          <img
            src={imageSrc}
            alt="Selected"
            className="w-xl h-xl object-cover aspect-4/3 rounded-md"
          />
          {noImage && (
            <p className=" text-red-500 font-medium text-xl">Enter an image</p>
          )}

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

        {width < 767 && (
          <div className="flex justify-center items-center w-full p-2 ">
            <button className=" text-sm bg-stone-900 font-medium text-stone-50 py-1.5  w-full rounded-md  cursor-pointer ">
              Add Product
            </button>
          </div>
        )}
      </form>
    </>
  );
}
