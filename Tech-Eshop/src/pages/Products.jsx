import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState, useEffect, useRef } from "react";
import ProductItem from "../components/ProductItem";
import { guestActions } from "../store/guestSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import Modal from "../components/Modal";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const products = useSelector((state) => state.products.products);
  const categoryFilter = useSelector((state) => state.filter.categoryFilter);
  const subCategoryFilter = useSelector(
    (state) => state.filter.subCategoryFilter
  );
  const brandFilter = useSelector((state) => state.filter.brandFilter);
  const max = useSelector((state) => state.filter.max);
  const sale = useSelector((state) => state.filter.sale);
  const search = useSelector((state) => state.filter.search);
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const dispatch = useDispatch();
  const guestFavorites = useSelector((state) => state.guest.favorites);
  const dialog = useRef();
  const modalContent = useRef();
 
 

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

    if (brandFilter) {
      temp = temp.filter((item) => item.brand === brandFilter);
    }

    if (max !== null) {
      temp = temp.filter((item) => item.finalPrice <= max);
    }

    if (sale) {
      temp = temp.filter((item) => item.sale === true);
    }

    setFilteredProducts(temp);
  }, [
    products,
    categoryFilter,
    subCategoryFilter,
    brandFilter,
    max,
    sale,
    search,
  ]);

  //FUNCTION TO ADD THE ADDED ITEMS ON THE ANIMATION ARRAY AND TO PUT A TIMEOUT ON EACH OF THEM
 function addedAnimation(item) {
   const effectId = crypto.randomUUID();
   dispatch(
     guestActions.addEffect({
       ...item,
       effectId,
     })
   );
   setTimeout(() => {
     dispatch(guestActions.clearEffect(effectId));
   }, 10000);
 }


 

  // OPEN SIDE BAR
  function openSideBar() {
    dialog.current.open();
    setIsVisible(true);
  }
  // ADD TO CART FUNCTION
  async function handleAddToCart(item) {
    const uid = auth.currentUser.uid;
    const cartRef = collection(db, `users/${uid}/cart`);
    const itemDocRef = doc(cartRef, item.id.toString());

    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      const current = docSnap.data();
      await setDoc(itemDocRef, {
        ...current,
        quantity: current.quantity + 1,
      });
    } else {
      await setDoc(itemDocRef, {
        ...item,
        quantity: 1,
        status: 'pending'
      });
    }
    addedAnimation(item);
  }

  

  //ADD TO FAVORITES FUNCTION
  async function handleFavorites(item) {
    const uid = auth.currentUser.uid;
    const itemDocRef = doc(db, `users/${uid}/favorites`, item.id.toString());

    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      await deleteDoc(itemDocRef);
      dispatch(guestActions.removeFromFavorites(item.id));
    } else {
      await setDoc(itemDocRef, { ...item });
      dispatch(guestActions.addToFavorites([...guestFavorites, item]));
    }
  }

  return (
    <>
      <section className="flex px-3 flex-col pb-5">
        <Modal ref={dialog}>
          <div className="h-full" ref={modalContent}>
            <SideBar
              dialog={dialog}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          </div>
        </Modal>
        
        <div className="flex py-15 gap-5 items-center flex-row w-full">
          <button
            className="w-fit border rounded-md px-2 py-1 border-(--secondText) dark:border-(--ordersBorder) dark:text-white dark:hover:text-white cursor-pointer hover:bg-(--blue) hover:text-(--white) hover:border-(--blue)"
            onClick={openSideBar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="font-semibold text-(--primary) text-2xl">Products</h1>
        </div>

        <div className="w-full  flex flex-col ">
          <ul className="flex w-full flex-row items-center justify-start flex-wrap gap-6  md:py-10  lg:pl-2 ">
            {filteredProducts.length === 0 ? (
              <div
                className="w-12 h-12 border-4 border-stone-900 border-t-transparent
                            rounded-full animate-spin absolute top-[50%] left-[50%]"
              ></div>
            ) : (
              filteredProducts.map((item) => {
                const existing = guestFavorites.find((ex) => ex.id === item.id);
                return (
                  <li key={item.id}>
                    <Link
                      to={`/${item.id}`}
                      className="flex flex-col justify-center items-center text-[1.1rem] relative"
                    >
                      <ProductItem
                        inFavorites={existing}
                        handleFavorites={() => handleFavorites(item)}
                        item={item}
                        userLoggedIn={userLoggedIn}
                        handleAddToCart={handleAddToCart}
                      />
                    </Link>
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
