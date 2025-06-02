import categories from "../store/categories";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filterSlice";
import { useState, useEffect } from "react";

export default function SideBar() {
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState(null);
  const [subCategorySelected, setSubCategorySelected] = useState(null);
  const [saleCheck, setSaleCheck] = useState(false);
  const [minState, setMinState] = useState("");
  const [maxState, setMaxState] = useState("");
  const [hideNav, setHideNav] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  //CHANGING THE SIDEBAR ON MOBILE
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //MINIMUM PRICE FILTER
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setMinState(value);
    dispatch(filterActions.setMin(value));
  };

  //MAXIMUM PRICE FILTER
  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxState(value);
    dispatch(filterActions.setMax(value));
  };

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

  //ON SALE FILTER
  function handleSaleFilter(e) {
    const checked = e.target.checked;
    setSaleCheck(checked);
    dispatch(filterActions.onSale(checked));
  }

  //CLEAR FILTERS
  function handleClearFilters() {
    dispatch(filterActions.clear());
    setCategorySelected(null);
    setSubCategorySelected(null);
    setSaleCheck(false);
    setMinState("");
    setMaxState("");
  }

  //HIDDING OR SHOWING THE SIDEBAR
  let navClassBase = ` flex flex-col  ${
    isMobile ? "bg-stone-50" : "bg-[#c7c5c575]"
  } justify-start items-center h-full absolute top-0 left-0 transition-transform duration-300 ease-in-out z-20`;
  let navClassHidden = navClassBase + " -translate-x-full md:w-[100%] w-screen";
  let navClassVisible = navClassBase + " translate-x-0 md:w-[100%] w-screen";

  function handleNav() {
    setHideNav((prev) => !prev);
  }

  return (
    <>
      <nav className="xl:w-[15%] lg:w-[20%] md:w-[30%]  h-full relative">
        <div className={hideNav ? navClassHidden : navClassVisible}>
          {isMobile && hideNav && (
            <button
              onClick={handleNav}
              className="absolute left-[90%]   md:left-[94%] top-[5%] w-[22%] text-start rounded-br-xl rounded-tr-xl bg-[#c7c5c575] flex justify-end pr-3 py-2 md:text-2xl text-lg font-bold text-stone-50"
            >
              X
            </button>
          )}
          {!isMobile && (
            <button
              onClick={handleNav}
              className="absolute left-[100%] top-[5%] w-[18%] text-start rounded-br-xl rounded-tr-xl bg-[#c7c5c575] flex justify-end pr-3 md:px-7  py-2 md:text-2xl text-lg font-bold text-stone-50"
            >
              X
            </button>
          )}

          <div className="gap-5 flex flex-col items-center w-full max-h-full md:pt-10">
            <div className="border-b-fuchsia-800 border-b-2 w-full pl-2">
              <label htmlFor="categoryDiv" className="md:text-2xl text-lg">
                Category
              </label>
              <div
                id="categoryDiv"
                className="gap-2 flex flex-col md:text-lg text-md"
              >
                {Object.keys(categories).map((item) => (
                  <p key={item}>
                    <label
                      htmlFor={`category-${item}`}
                      className="flex items-center gap-1"
                    >
                      <input
                        className="w-5 h-5 accent-stone-950"
                        type="checkbox"
                        id={`category-${item}`}
                        checked={categorySelected === item}
                        value={item}
                        onChange={() => handleCategoryChange(item)}
                      />
                      {item === "power_supply" ? "power supply" : item}
                    </label>
                  </p>
                ))}
              </div>
            </div>
            {categorySelected && (
              <div className="gap-2 flex flex-col items-start justify-start text-lg  border-b-fuchsia-800 border-b-2 w-full pl-2">
                <label htmlFor="sub" className="md:text-2xl text-lg">
                  Type
                </label>
                {categories[categorySelected].map((item) => (
                  <p key={item}>
                    <label
                      htmlFor={`subCategory-${item}`}
                      className="flex items-center gap-1"
                    >
                      <input
                        className="w-5 h-5 accent-stone-950"
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
            )}

            <div className="w-full border-b-fuchsia-800 border-b-2 pl-2">
              <label
                htmlFor="sale"
                className="md:text-lg flex items-center  gap-1"
              >
                <input
                  className="w-5 h-5 accent-stone-950"
                  type="checkbox"
                  id="sale"
                  onChange={handleSaleFilter}
                  checked={saleCheck}
                />
                On Sale
              </label>
            </div>

            <div className=" w-full border-b-fuchsia-800 border-b-2 pb-2">
              <div className="flex flex-col pl-2">
                <div className="flex flex-col">
                  <label htmlFor="min" className="md:text-lg text-md text-bold">
                    from:
                  </label>
                  <input
                    type="number"
                    id="min"
                    onChange={handleMinPriceChange}
                    className="border py-2 w-[90%] text-bold"
                    placeholder={`Min Price`}
                    value={minState}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="max" className="md:text-lg text-md text-bold">
                    to:
                  </label>
                  <input
                    type="number"
                    id="max"
                    onChange={handleMaxPriceChange}
                    className="border py-2 w-[90%] text-bold"
                    placeholder={`Max Price`}
                    value={maxState}
                  />
                </div>
              </div>
            </div>
            {isMobile && (
              <button
                className="bg-stone-800 text-sm md:text-lg text-stone-50 md:py-2 md:px-3 px-2 py-2 rounded-xl"
                onClick={handleNav}
              >
                Add Filters
              </button>
            )}

            <button
              className="bg-stone-800 text-sm md:text-lg text-stone-50 md:py-2 md:px-3 px-2 py-2 rounded-xl"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
