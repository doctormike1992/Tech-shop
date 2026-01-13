import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCartShopping,
  faHeart,
  faShieldHalved,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { guestActions } from "../store/guestSlice";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { filterActions } from "../store/filterSlice";

export default function ProductDetail() {
  const { productId } = useParams();
  const [isFavorite, setIsFavorite] = useState();
  const [desc, setDesc] = useState(true);
  const products = useSelector((state) => state.products.products);
  const guestFavorites = useSelector((state) => state.guest.favorites);
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //CHECKS IF THE PRODUCT IS ALREADY IN FAVORITES OR NOT
  useEffect(() => {
    const isFavored = guestFavorites.find((item) => item.id === productId);
    if (isFavored) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [guestFavorites, productId]);

  //FINDING THE PRODUCT AND ITS INFORAMTIONS FROM PARAM
  const product =
    products.length !== 0 && products.find((item) => item.id === productId);

  const {
    name,
    image,
    finalPrice,
    price,
    sale,
    percentage,
    category,
    subCategory,
    description,
    summary,
    brand,
    specifications,
    deliveryTime,
  } = product;

  // ADD TO CART FUNCTION
  async function handleAddToCart() {
    const uid = auth.currentUser.uid;
    const cartRef = collection(db, `users/${uid}/cart`);
    const itemDocRef = doc(cartRef, product.id.toString());

    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      const current = docSnap.data();
      await setDoc(itemDocRef, {
        ...current,
        quantity: current.quantity + 1,
      });
    } else {
      await setDoc(itemDocRef, {
        ...product,
        quantity: 1,
        status: "pending",
      });
    }
  }

  //ADD TO FAVORITES FUNCTION
  async function handleFavorites() {
    const uid = auth.currentUser.uid;
    const itemDocRef = doc(db, `users/${uid}/favorites`, product.id.toString());

    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      await deleteDoc(itemDocRef);
      dispatch(guestActions.removeFromFavorites(product.id));
      setIsFavorite(false);
    } else {
      await setDoc(itemDocRef, { ...product });
      dispatch(guestActions.addToFavorites([...guestFavorites, product]));
      setIsFavorite(true);
    }
  }

  //ARRAY FOR RELATED PRODUCTS BASED ON PRODUCT TYPE
  const relatedProducts = products.filter(item => (item.subCategory === subCategory && item.id !== productId));

  return (
    <section className="flex flex-col w-full xl:max-w-3/5 items-start justify-start px-3 py-5">
      <Link className="pb-10" to={"/"}>
        <button
          className="flex flex-row items-center gap-2 hover:bg-(--blue) hover:text-white text-(--primary) pr-4 pl-1 py-2 rounded-md transition-all font-medium text-sm"
          onClick={() => dispatch(filterActions.clear())}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </Link>

      <main className="w-full flex flex-col lg:flex-row gap-5 pb-10">
        <div className=" w-full h-full   rounded-lg aspect-square overflow-hidden">
          <img src={image} className="rounded-lg object-cover h-full w-full" />
        </div>

        <div className="flex flex-col gap-2 md:gap-5 w-full items-start grow">
          <div className="flex flex-row gap-3 items-center justify-start">
            <p className="text-white  bg-(--deepBlue) px-2 py-0.5 text-xs font-medium rounded-lg">
              {category}
            </p>
            <p className="text-white bg-(--purple) px-2 py-0.5 text-xs font-medium rounded-lg">
              {subCategory}
            </p>
            <p className="text-(--primary) bg-(--white) px-2 py-0.5 text-xs border border-(--ordersBorder) font-medium rounded-lg">
              {brand}
            </p>
            {sale && (
              <p className="text-white bg-red-600 px-2 py-0.5 text-xs font-medium rounded-lg">
                -{percentage}% OFF
              </p>
            )}
          </div>

          <div className="text-start">
            <h1 className="font-semibold text-(--primary) text-xl">{name}</h1>
          </div>

          <div className="text-start">
            <h3 className="text-lg tracking-wide text-(--secondText) font-medium wrap-break-word ">
              {summary}
            </h3>
          </div>

          <div className="flex flex-row items-end justify-center gap-3">
            <p
              className={`text-4xl text-(--primary) ${sale && "text-red-600"}`}
            >
              {finalPrice?.toFixed(2)}
              <sup>€</sup>
            </p>
            {sale && (
              <p className="text-3xl text-(--secondText) ">
                <span className="line-through">{price?.toFixed(2)}</span>
                <sup>€</sup>
              </p>
            )}
          </div>

          <hr className="w-full text-(--ordersBorder)" />

          {userLoggedIn && (
            <div className="w-full gap-2 flex flex-col">
              <button
                className="flex flex-row items-center justify-center gap-1 bg-(--deepBlue) rounded-lg py-2 text-white text-sm font-medium hover:bg-(--deepBlue)/90 transition-all cursor-pointer"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                Add to Cart
              </button>
              <button
                className={`flex flex-row items-center justify-center gap-1  rounded-lg py-2 text-(--primary) border border-(--ordersBorder)  text-sm font-medium hover:bg-(--blue) hover:text-(--white) dark:hover:text-white  transition-all cursor-pointer ${
                  isFavorite &&
                  "bg-(--deepBlue) text-(--white) dark:text-white hover:bg-(--deepBlue)/90"
                }`}
                onClick={handleFavorites}
              >
                <FontAwesomeIcon icon={faHeart} />
                {isFavorite ? "Remove from" : "Add to"} Favorites
              </button>
            </div>
          )}

          <hr className="w-full text-(--ordersBorder)" />

          <div className="flex flex-col gap-5 justify-start">
            <div className="flex flex-row gap-3 items-center justify-start">
              <FontAwesomeIcon
                className="text-(--deepBlue) bg-(--deepBlue)/10 px-3 py-3.5 rounded-full"
                icon={faTruck}
              />
              <div className="flex flex-col text-(--primary) text-start">
                <p>Delivery in {deliveryTime} Days</p>
                <p className="text-sm text-(--secondText)">
                  Fast and reliable shipping
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-3 items-center justify-start">
              <FontAwesomeIcon
                className="text-(--deepBlue) bg-(--deepBlue)/10 px-3 py-3.5 rounded-full"
                icon={faShieldHalved}
              />
              <div className="flex flex-col text-(--primary) text-start">
                <p>2 Year Warranty</p>
                <p className="text-sm text-(--secondText)">
                  Full coverage included
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-3 items-center justify-start">
              <FontAwesomeIcon
                className="text-(--deepBlue) bg-(--deepBlue)/10 px-3 py-3.5 rounded-full"
                icon={faBoxArchive}
              />
              <div className="flex flex-col text-(--primary) text-start">
                <p>Easy Returns</p>
                <p className="text-sm text-(--secondText)">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="flex flex-col border border-(--ordersBorder) bg-(--white) rounded-xl w-full p-5">
        <div className="bg-(--secondary) dark:bg-(--background) text-white flex flex-row p-1.5 rounded-2xl">
          <button
            className={`w-full py-0.5 text-(--primary) text-sm md:text-md font-medium rounded-xl ${
              desc && "bg-(--white)"
            }`}
            onClick={() => setDesc(true)}
          >
            Description
          </button>
          <button
            className={`w-full py-0.5 text-(--primary) text-sm md:text-md font-medium rounded-xl ${
              !desc && "bg-(--white)"
            } `}
            onClick={() => setDesc(false)}
          >
            Specifications
          </button>
        </div>
        <div className="w-full flex flex-col items-start py-5 justify-start">
          {desc ? (
            <>
              <h1 className="md:text-lg text-(--primary) font-medium pb-3">
                Product Description
              </h1>
              <p className=" tracking-wide  text-(--secondText) wrap-break-word">
                {description}
              </p>
            </>
          ) : (
            <div className="w-full">
              <div className="flex flex-col  px-1">
                <div className="flex flex-row justify-between text-(--secondText)">
                  <p>Brand</p>
                  <p>Category</p>
                </div>
                <div className="flex text-(--primary) flex-row justify-between font-medium">
                  <p>{brand}</p>
                  <p>{category}</p>
                </div>
                <div className="flex flex-row justify-between text-(--secondText) pt-3">
                  <p>Type</p>
                  <p>Delivery Time</p>
                </div>
                <div className="flex flex-row text-(--primary) justify-between font-medium pb-3">
                  <p>{subCategory}</p>
                  <p>{deliveryTime} Days</p>
                </div>
              </div>
              <hr className="text-(--ordersBorder)" />
              <div className="flex flex-col gap-2 w-full pt-3">
                {specifications.map((item) => (
                  <div
                    className="flex flex-row justify-between w-full"
                    key={item.id}
                  >
                    <p className="text-(--secondText)">{item.name}</p>
                    <p className="text-(--primary)">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start  py-10 gap-2 md:px-3 w-full">
        <hr className="w-full  text-(--ordersBorder)" />
        <h1 className="text-xl text-(--primary) font-medium">
          Related Products
        </h1>
        <div className="flex flex-row gap-4 flex-wrap w-full">
          {relatedProducts.map((item) => (
            <li key={item.id} className="relative">
              <Link to={`/${item.id}`}>
                <ProductItem item={item} hideHeart />
              </Link>
            </li>
          ))}
        </div>
      </div>
    </section>
  );
}
