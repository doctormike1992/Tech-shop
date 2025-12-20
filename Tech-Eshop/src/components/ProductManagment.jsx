import EditProduct from "./EditProduct";
import categories from "../store/categories";
import { useState } from "react";

export default function ProductManagment({products}) {
  const [shownCategories, setShownCategories] = useState({});

  

  //SHOW THE PRODUCTS FUNCTION
  function toggleCategoryVisibility(cat) {
    setShownCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  }

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }
 

  return (
    <>
      <ul>
        {categories.map((cat) => {
          let categoryProducts = products?.filter(
            (items) => items.category === cat
          );
          return (
            <li key={cat}>
              <button
                onClick={() => toggleCategoryVisibility(cat)}
                className="text-xl text-stone-50 text-bold tracking-wider bg-stone-900 z-100 cursor-pointer flex justify-center w-full p-2 border-3 border-stone-950 hover:text-stone-950 hover:bg-stone-50 transition-all"
              >
                {cat} 
              </button>
              <hr className="text-stone-300 border-2" />
              <div
                className={`transition-all duration-500 ease-in-out transform overflow-hidden flex flex-row ${
                  shownCategories[cat]
                    ? " max-h-96 "
                    : " max-h-0 "
                }`}
              >
                {shownCategories[cat] &&
                  categoryProducts.map((pro) => (
                    <EditProduct
                      key={pro.id}                 
                      product={pro}
                    />
                  ))}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
