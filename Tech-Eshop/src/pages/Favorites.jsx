import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { guestActions } from "../store/guestSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { collection, getDoc, setDoc } from "firebase/firestore";
import HeartIcon from "../icons/heart.svg?react";




export default function Favorites() {
  const dispatch = useDispatch();
  const guestFavorites = useSelector((state) => state.guest.favorites);
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);


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
      });
    }
  }

  //ADD TO FAVORITES FUNCTION
  async function handleFavorites(item) {
    const uid = auth.currentUser.uid;
    const itemDocRef = doc(db, `users/${uid}/favorites`, item.id.toString());

    await deleteDoc(itemDocRef);
    dispatch(guestActions.removeFromFavorites(item.id));
  }

  return (
    <>
      <section className="flex px-3 flex-col">
        <div className="w-full flex flex-col ">
          <div className="py-15 flex flex-row items-center justify-start gap-2">
            <h1 className="font-semibold text-(--primary) text-2xl pl-2 ">
              Favorites
            </h1>
            {guestFavorites.length !== 0 && (
              <span className="font-semibold text-(--primary) text-2xl">
                ({guestFavorites.length})
              </span>
            )}
          </div>
          <ul className="flex w-full flex-row items-center justify-start flex-wrap gap-6  py-10  pl-2 ">
            {guestFavorites.length === 0 ? (
              <div className="flex flex-col w-full gap-2 items-center justify-center">
                <HeartIcon className='w-20 h-20 text-(--primary)'
                />
                <h1 className="text-xl text-(--primary) font-semibold">
                  No favorites yet
                </h1>
                <p className="text-(--secondText) pb-2">
                  Start adding products to your favorites
                </p>
                <Link
                  className="bg-(--deepBlue) text-white py-1 px-2 rounded-md font-medium cursor-pointer"
                  to={"/"}
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              guestFavorites.map((item) => {
                const existing = guestFavorites.find((ex) => ex.id === item.id);
                return (
                  <li key={item.id}>
                    <Link
                      to={`/${item.id}`}
                      className="flex flex-col justify-center items-center text-[1.1rem] text-bold relative"
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
