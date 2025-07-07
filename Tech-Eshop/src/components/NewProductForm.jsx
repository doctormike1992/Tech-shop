import { useState } from "react";
import { useDispatch } from "react-redux";
import { productsActions } from "../store/productsSlice";
import Input from "./Input";
import categories from "../store/categories";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";

export default function NewProductForm() {
  const [imageSrc, setImageSrc] = useState("/placeholder.png");
  const [ischeck, setIscheck] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [noImage, setNoImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [subcategories, setSubcategories] = useState(categories.motherboard);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //SUB-CATEGORIES
  function hundleCategories(event) {
    const category = event.target.value;
    setSubcategories(categories[category] || []);
  }

  //PRICE FORMAT
  function handleChange(e) {
    let value = e.target.value;

    value = value.replace(/[^\d.,]/g, "");

    setInputValue(value);
  }

  //PRICE FORMAT
  function handleBlur() {
    let value = inputValue.replace(",", ".");

    if (value === "") return;

    const number = parseFloat(value);
    if (isNaN(number)) return;

    setInputValue(number.toString());
  }
  

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
      const originalPrice = parseFloat(inputValue.replace(",", "."));
      const discount = ischeck ? parseInt(data.percentage, 10) / 100 : 0;
      const finalPrice = ischeck
        ? originalPrice * (1 - discount)
        : originalPrice;

      const productData = {
        ...data,
        image: downloadURL,
        price: originalPrice,
        finalPrice: finalPrice,
        sale: ischeck,
        percentage: ischeck ? parseInt(data.percentage, 10) / 100 : 0,
      };

      // Add product to Firestore
      const docRef = await addDoc(collection(db, "products"), productData);

      // Optionally, dispatch to Redux store
      dispatch(productsActions.setProducts({ ...productData, id: docRef.id }));

      // Reset form
      event.target.reset();
      setImageSrc("/placeholder.png");
      setInputValue("");
      setSelectedFile(null);
      setIscheck(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  }

  //ON SALE CHECKBOX
  function onSale() {
    setIscheck((prev) => !prev);
  }

  //DISABLE FORM UNTIL ITS SUBMITED
  let formClass =
    "flex items-center justify-center md:flex-row flex-col md:gap-2 gap-0.5  h-full w-full bg-stone-50 ";
  if (isLoading) {
    formClass += 'pointer-events-none'
  }

  return (
    <>
      <form
        onSubmit={hanldeNewProduct}
        className= {formClass}
        
      >
        <div className="flex items-center justify-center flex-col gap-2 bg-stone-50 w-full h-full ">
          <img
            src={imageSrc}
            alt="Selected"
            className="w-lg h-lg aspect-square"
          />
          {noImage && <p className=" text-red-500 text-xl">Enter an image</p>}

          <Input
            htmlFor="file"
            id="file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            label="select image"
            labelClass="border-2 p-1 md:text-xl text-sm rounded-md active:scale-75 bg-stone-600 text-amber-50 hover:bg-stone-500 cursor-pointer"
            hidden
          />
          {isLoading && (
            <div
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent
                            rounded-full animate-spin"
            ></div>
          )}
        </div>

        <div className="flex flex-col md:gap-4 gap-0 w-full justify-center bg-stone-50 h-full">
          <div className="flex  justify-around items-center  p-3 border-b-stone-300  border-b-2 ">
            <Input
              label="Name:"
              labelClass="md:text-xl text-sm"
              htmlFor="name"
              type="text"
              id="name"
              name="name"
              required
              inputClass="bg-stone-200 rounded-sm p-1 outline-0 w-[90%]"
            />
          </div>
          <div className="flex  justify-around items-center p-2 border-b-stone-300 border-b-2">
            <Input
              label="Price:"
              labelClass="md:text-xl text-sm"
              htmlFor="price"
              type="text"
              inputMode="decimal"
              value={inputValue}
              onChange={handleChange}
              onBlur={handleBlur}
              id="price"
              name="price"
              inputClass="bg-stone-200 rounded-sm p-1 outline-0 w-[90%]"
            />
          </div>
          <div className="flex md:gap-2  justify-around items-center md:text-md lg:text-lg text-[0.7rem]  p-2 border-b-stone-300 border-b-2">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              className="bg-stone-200 rounded-sm outline-0 text-center cursor-pointer w-[20%] "
              required
              onChange={hundleCategories}
            >
              {Object.keys(categories).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label htmlFor="category">Sub-Category:</label>
            <select
              id="subCategory"
              name="subCategory"
              className="bg-stone-200 rounded-sm outline-0 text-center cursor-pointer w-[20%] "
              required
            >
              {subcategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex md:gap-2 gap-1   justify-around items-center text-xl  p-3 border-b-stone-300 border-b-2">
            <div className="flex gap-1 items-center text-stone-900">
              <Input
                label="On Sale?"
                labelClass="md:text-lg text-[0.7rem]"
                htmlFor="sale"
                type="checkbox"
                id="sale"
                name="sale"
                onChange={onSale}
                inputClass="w-6 scale-150 cursor-pointer"
              />
            </div>

            {ischeck ? (
              <div className="flex md:gap-2 gap-0.5 items-center text-stone-900">
                <Input
                  label="percentage:"
                  labelClass="md:text-lg text-[0.7rem]"
                  htmlFor="howMuch"
                  type="number"
                  id="howMuch"
                  name="percentage"
                  required
                  inputClass="w-[100%] p-0.5 outline-0 bg-stone-200 rounded text-bold "
                  placeholder="%"
                />
              </div>
            ) : (
              <div className="flex md:gap-2 gap-0.5 items-center text-stone-200 pointer-events-none">
                <Input
                  label="percentage:"
                  labelClass="md:text-lg text-[0.7rem]"
                  htmlFor="howMuch"
                  inputClass="w-[100%] p-0.5 outline-0 bg-stone-200 rounded text-bold "
                  placeholder="%"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col  justify-center items-center  p-2 border-b-stone-300  border-b-2 ">
            <label htmlFor="description" className="md:text-xl text-sm">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              className="bg-stone-200 rounded-sm p-1 outline-0 w-[90%] lg:h-[200px] h-sm align-text-top"
            />
          </div>
          <div className="flex justify-center items-center overflow-hidden ">
            <button className="md:text-xl text-sm bg-stone-900 text-amber-50 py-2 px-4 rounded-t-lg hover:bg-stone-800 active:translate-y-4 cursor-pointer overflow-hidden">
              ADD
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
