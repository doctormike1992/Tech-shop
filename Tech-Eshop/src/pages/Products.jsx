import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import { discountOnFilter } from "../utils/discountOnFilter";
import { guestActions } from "../store/guestSlice";
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const guestCart = useSelector((state) => state.guest.cart);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const dispatch = useDispatch();
  const [productOrder, setProductOrder] = useState("alphabetical");
  const guestFavorites = useSelector((state) => state.guest.favorites);
  

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
      temp = temp.filter((item) => discountOnFilter(item) >= min);
    }

    if (max !== null) {
      temp = temp.filter((item) => discountOnFilter(item) <= max);
    }

    if (sale) {
      temp = temp.filter((item) => item.sale === true);
    }

    if (productOrder === "alphabetical") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    } else if (productOrder === "higher price") {
      temp.sort((a, b) => b.price - a.price);
    } else if (productOrder === "lower price") {
      temp.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(temp);
  }, [
    products,
    categoryFilter,
    subCategoryFilter,
    min,
    max,
    sale,
    search,
    productOrder,
  ]);

  // ADD TO CART FUNCTION
  function handleAddToCart(item) {
    const existing = guestCart.find((ex) => ex.id === item.id);
    let updatedCart;

    if (existing) {
      updatedCart = guestCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...guestCart, { ...item, quantity: 1 }];
    }

    dispatch(guestActions.addToCart(updatedCart));
  }

  //CHANGE THE ORDER OF PRODUCTS
  function productsOrder(key) {
    setProductOrder(key);
  }

  //ADD TO FAVORITES FUNCTION
  function handleFavorites(item) {
    const existing = guestFavorites.find((ex) => ex.id === item.id);
    let updatedFavorites;

    if (existing) {
      dispatch(guestActions.removeFromFavorites(item));
    } else {
      updatedFavorites = [...guestFavorites, { ...item }];
      dispatch(guestActions.addToFavorites(updatedFavorites));
    }
  }

  return (
    <>
      <section className="flex flex-row md:gap-16 h-screen">
        <SideBar />
        <div className="w-full flex flex-col ">
          <div className="flex w-full  justify-end items-end border-b-2 z-0  pr-16 pb-5 pt-20  ">
            <button className="relative group h-full  px-16 py-1  text-stone-900 border-stone-50 border-1 focus:border-stone-400 hover:border-stone-400  hover:rounded-b-xl text-lg focus:border-b-0 rounded-t-xl  cursor-pointer z-50 flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowsUpDown} />
              {productOrder}
              <ul className="absolute top-7 border-t-0 left-[-1px] right-[-1px] p-4 text-stone-500 border-stone-400 border-1   rounded-b-xl flex flex-col gap-3 bg-stone-50 scale-y-0 group-focus:scale-y-100 origin-top duration-200 text-xl z-50">
                <li
                  onClick={() => productsOrder("alphabetical")}
                  className="hover:text-stone-900"
                >
                  alphabetical
                </li>
                <li
                  onClick={() => productsOrder("higher price")}
                  className="hover:text-stone-900"
                >
                  higher price
                </li>
                <li
                  onClick={() => productsOrder("lower price")}
                  className="hover:text-stone-900"
                >
                  lower price
                </li>
              </ul>
            </button>
          </div>

          <ul className="flex w-full flex-row items-center md:justify-start justify-center flex-wrap xl:gap-20 lg:gap-10 gap-7 py-10  pl-2 md:pl-0 ">
            {filteredProducts.length === 0 ? (
              <p className="text-2xl">No Items Found!</p>
            ) : (
              filteredProducts.map((item) => {
                const existing = guestFavorites.find((ex) => ex.id === item.id);
                return (
                  <li key={item.id} className=" border-4 border-stone-700 ">
                    <Link
                      to={`/${item.id}`}
                      className="flex flex-col justify-center items-center text-[1.1rem] text-bold relative"
                    >
                      <ProductItem
                        inFavorites={existing}
                        handleFavorites={() => handleFavorites(item)}
                        item={item}
                    
                      />
                    </Link>
                    <div className="w-full">
                      <button
                        className="bg-stone-950 text-stone-50 text-xl text-bold  py-2 w-full cursor-pointer hover:text-stone-300 active:text-lg"
                        onClick={() => handleAddToCart(item)}
                      >
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
