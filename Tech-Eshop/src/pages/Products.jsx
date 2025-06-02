import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";

export default function Products() {
  const products = useSelector((state) => state.products.products);
  const categoryFilter = useSelector((state) => state.filter.categoryFilter);
  const subCategoryFilter = useSelector(
    (state) => state.filter.subCategoryFilter
  );
  const min = useSelector((state) => state.filter.min);
  const max = useSelector((state) => state.filter.max);
  const sale = useSelector((state) => state.filter.sale);
  const search = useSelector((state) => state.filter.search);
  const [filteredProducts, setFilteredProducts] = useState(products);

  //FILTERS
  useEffect(() => {
    let temp = [...products];

    if (search && search.trim() !== "") {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) {
      temp = temp.filter((item) => item.category === categoryFilter);
    }

    if (subCategoryFilter) {
      temp = temp.filter((item) => item.subCategory === subCategoryFilter);
    }

    if (min !== null) {
      temp = temp.filter((item) => persentageOnFilter(item) >= min);
    }

    if (max !== null) {
      temp = temp.filter((item) => persentageOnFilter(item) <= max);
    }

    if (sale) {
      temp = temp.filter((item) => item.sale === true);
    }

    setFilteredProducts(temp);
  }, [products, categoryFilter, subCategoryFilter, min, max, sale, search]);

  //FILTERING WORKING WITH THE DISCOUNT NUMBER 
  function persentageOnFilter(item) {
    if (item.sale) {
      const discountAmount = item.percentage * 100;
      const discountedPrice = (item.price * discountAmount - item.price) / 10;
      return discountedPrice;
    } else {
      return item.price;
   }
 }

  return (
    <>
      <section className="flex flex-row md:gap-16 h-screen">
        <SideBar />
        <div className="w-full">
          <ul className="flex w-full flex-row items-center md:justify-start justify-center flex-wrap xl:gap-20 lg:gap-10 gap-7 py-10  pl-2 md:pl-0 ">
            {filteredProducts.length === 0 ? (
              <p className="text-2xl">No Items Found!</p>
            ) : (
              filteredProducts.map((item) => {
                return (
                  <li key={item.id} className=" border-4 border-stone-700 ">
                    <Link
                      to={`/${item.id}`}
                      className="flex flex-col justify-center items-center text-[1.1rem] text-bold relative"
                    >
                      <ProductItem
                        item={item}
                        discountedPrice={persentageOnFilter(item)}
                      />
                    </Link>
                    <div className="w-full">
                      <button className="bg-stone-950 text-stone-50 text-xl text-bold  py-2 w-full cursor-pointer hover:text-stone-300 active:text-lg">
                        Add to cart
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
