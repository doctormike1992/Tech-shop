import NewProductForm from "../components/NewProductForm";
import { useState } from "react";
import ProductManagment from "../components/ProductManagment";


export default function Admin() {
  const [buttonClick, setButtonClick] = useState("Add");
   

  // CSS CLASSES
  const buttonClass = "text-sm font-medium py-1 px-2";

  const activeButton = "text-sm font-medium bg-stone-50 py-1 px-2 rounded-2xl";

  //COMONENT DISPLAY BASED ON BUTTON PRESSED
  let show;
 

  if (buttonClick === "Add") {
    show = <NewProductForm />;
  }
  if (buttonClick === "Products") {
    show = <ProductManagment/>;
  }
  // BUTTONS FUNCTION
  function handleButtons(param) {
    setButtonClick(param);
  }

 
 

 

  return (
    <>
      <main className="pt-10 w-full md:gap-5 gap-0.5 px-2 flex justify-center items-start  flex-col ">
        <div className=" flex  flex-col w-full items-start justify-start md:gap-3">
          <h1 className="font-semibold text-2xl">Admin Dashboard</h1>
          <div
            className="bg-[#ececf0]
           flex gap-0.5 px-1.5 py-1 rounded-2xl"
          >
            <button
              className={buttonClick === "Add" ? activeButton : buttonClass}
              onClick={() => handleButtons("Add")}
            >
              Add Product
            </button>
            <button
              className={
                buttonClick === "Products" ? activeButton : buttonClass
              }
              onClick={() => handleButtons("Products")}
            >
              Manage Products
            </button>
          </div>
        </div>
        <div
          className={`${buttonClick === "Products" ? "xl:w-[80%]" : 'w-full'} pr-1`}
        >
          {show}
        </div>
      </main>
    </>
  );
}
