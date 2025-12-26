import { useDispatch } from "react-redux";
import { filterActions } from "../store/filterSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { brands, subCategories, categories } from "../store/categories";
import SwitchButton from "./SwitchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function SideBar({ dialog, isVisible, setIsVisible }) {
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState(null);
  const [subCategorySelected, setSubCategorySelected] = useState(null);
  const [brandSelected, setBrandSelected] = useState(null);
  const [saleCheck, setSaleCheck] = useState(false);
  const [price, setPrice] = useState(2000);
  const navRef = useRef();

  //FILTER BY MAX PRICE ON SCROLLER
  useEffect(() => {
    dispatch(filterActions.setMax(price));
  }, [price, dispatch]);

  //CLOSE SIDEBAR MODAL
  const closeSideBar = useCallback(() => {
    setTimeout(() => {
      dialog.current.close();
    }, 200);
    setIsVisible(false);
  }, [dialog, setIsVisible]);

  //CLOSE SIDEBAR MODAL WHEN CLICKING OUTSIDE OF IT
  useEffect(() => {
    function clickOutside(e) {
      if (isVisible && !navRef.current.contains(e.target)) {
        closeSideBar();
      }
    }

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isVisible, closeSideBar, setIsVisible]);

  //ON SALE FILTER
  useEffect(() => {
    function handleSaleFilter() {
      dispatch(filterActions.onSale(saleCheck));
    }
    handleSaleFilter();
  }, [dispatch, saleCheck]);

  //FILTER BY CATEGORY
  function handleCategoryChange(item) {
    if (categorySelected === item) {
      setCategorySelected(null);
      dispatch(filterActions.setCategory(null));
    } else {
      setCategorySelected(item);
      dispatch(filterActions.setCategory(item));
    }
  }

  //FILTER BY SUBCATEGORY
  function handleSubCategoryChange(item) {
    if (subCategorySelected === item) {
      setSubCategorySelected(null);
      dispatch(filterActions.setSubCategory(null));
    } else {
      setSubCategorySelected(item);
      dispatch(filterActions.setSubCategory(item));
    }
  }

  // FILTER BY BRAND
  function handleBrandChange(item) {
    if (brandSelected === item) {
      setBrandSelected(null);
      dispatch(filterActions.setBrand(null));
    } else {
      setBrandSelected(item);
      dispatch(filterActions.setBrand(item));
    }
  }

  //CLEAR FILTERS
  function handleClearFilters() {
    dispatch(filterActions.clear());
    setCategorySelected(null);
    setSubCategorySelected(null);
    setSaleCheck(false);
    setPrice(2000);
    setBrandSelected(null);
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`2xl:w-[15%] xl:w-[22%] lg:w-[30%] md:w-[40%] w-[60%] h-full z-50 backdrop-blur-md  bg-white/80 
          transform duration-500 ease-in-out sm:overflow-auto overflow-y-scroll transition-all ${
            isVisible
              ? "opacity-100 translate-0"
              : "opacity-0 -translate-x-full"
          }
          `}
      >
        <div className="flex flex-row justify-between items-end  w-full p-2">
          <h2 className="text-lg  w-full">Filters</h2>
          <button
            onClick={closeSideBar}
            className="flex items-center h-10 text-lg text-stone-700 hover:text-stone-950 cursor-pointer border-2 border-transparent active:border-black  px-1.5 rounded-md"
          >
            <FontAwesomeIcon className="text-sm" icon={faX} />
          </button>
        </div>

        <div className="w-full pl-3">
          <label className="md:text-2xl font-semibold text-lg text-(--primary)">
            Category
          </label>
          <div className="py-3">
            {categories.map((item) => (
              <p key={item}>
                <label
                  htmlFor={`category-${item}`}
                  className="flex font-medium items-center gap-2 "
                >
                  <input
                    className="w-4 h-4  accent-stone-950"
                    type="checkbox"
                    id={`category-${item}`}
                    checked={categorySelected === item}
                    value={item}
                    onChange={() => handleCategoryChange(item)}
                  />
                  {item}
                </label>
              </p>
            ))}
          </div>
        </div>

        <div className=" w-full pl-3">
          <label className="md:text-2xl font-semibold text-lg text-(--primary)">
            Type
          </label>
          <div className="py-3">
            {subCategories.map((item) => (
              <p key={item}>
                <label
                  htmlFor={`subCategory-${item}`}
                  className="flex font-medium items-center gap-2"
                >
                  <input
                    className="w-4 h-4  accent-stone-950"
                    id={`subCategory-${item}`}
                    type="checkbox"
                    value={item}
                    checked={subCategorySelected === item}
                    onChange={() => handleSubCategoryChange(item)}
                  />
                  {item}
                </label>
              </p>
            ))}
          </div>
        </div>

        <div className="w-full pl-3">
          <label className="md:text-2xl font-semibold text-lg text-(--primary)">
            Brand
          </label>
          <div className="py-3">
            {brands.map((item) => (
              <p key={item}>
                <label
                  htmlFor={`brand-${item}`}
                  className="flex font-medium items-center gap-2"
                >
                  <input
                    className="w-4 h-4  accent-stone-950"
                    id={`brand-${item}`}
                    type="checkbox"
                    value={item}
                    checked={brandSelected === item}
                    onChange={() => handleBrandChange(item)}
                  />
                  {item}
                </label>
              </p>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col  pl-3">
          <label className="md:text-2xl pb-2 font-medium text-lg text-(--primary)">
            On Sale
          </label>

          <SwitchButton enabled={saleCheck} setEnabled={setSaleCheck} />
        </div>

        <div className="w-full py-2 pb-6 px-2 pl-3">
          <label className="md:text-2xl  font-medium text-lg text-(--primary)">
            Max price
          </label>

          <input
            type="range"
            min="0"
            max="2000"
            value={price}
            step="100"
            className="w-full accent-black cursor-pointer"
            onChange={(e) => setPrice(e.target.value)}
          />
          <span className="font-medium text-[#717182]">Up to ${price}</span>
        </div>

        <button
          onClick={handleClearFilters}
          className="w-full rounded-md border transition-all cursor-pointer hover:bg-stone-800 hover:text-stone-50 border-stone-300 font-medium text-sm py-1"
        >
          clear filters
        </button>
      </nav>
    </>
  );
}
