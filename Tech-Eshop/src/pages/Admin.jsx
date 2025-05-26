import NewProductForm from "../components/NewProductForm";
import { useState } from "react";
import ProductManagment from "../components/ProductManagment";
import { useSelector } from "react-redux";

export default function Admin() {
  const products = useSelector(state => state.products.products)
  const [buttonClick, setButtonClick] = useState("Add");
   
console.log(products)
  // CSS CLASSES
  const buttonClass =
    "rounded-md border-2 border-stone-500 p-1 w-40 md:text-lg text-[0.5rem] text-bold text-stone-500 cursor-pointer hover:text-stone-800";

  const activeButton =
    "rounded-md border-2  p-1 w-40 md:text-lg text-[0.5rem] text-bold text-stone-50 bg-stone-900 border-stone-900";

  //COMONENT DISPLAY BASED ON BUTTON PRESSED
  let show;
 

  if (buttonClick === "Add") {
    show = <NewProductForm />;
  }
  if (buttonClick === "Products") {
    show = <ProductManagment products={products}/>;
  }
  // BUTTONS FUNCTION
  function handleButtons(param) {
    setButtonClick(param);
  }

 
 

 

  return (
    <>
      <main className="h-full  w-full md:gap-5 gap-0.5 flex justify-center items-center flex-col ">
        <div className=" flex w-[70%] justify-center md:gap-3">
          <button
            className={buttonClick === "Add" ? activeButton : buttonClass}
            onClick={() => handleButtons("Add")}
          >
            Add{" "}
          </button>
          <button
            className={buttonClick === "Products" ? activeButton : buttonClass}
            onClick={() => handleButtons("Products")}
          >
            Products
          </button>
          <button
            className={buttonClick === "Orders" ? activeButton : buttonClass}
            onClick={() => handleButtons("Orders")}
          >
            Orders
          </button>
        </div>
        <div className="w-[70%] border-1 border-stone-200 ">{show}</div>
      </main>
    </>
  );
}
