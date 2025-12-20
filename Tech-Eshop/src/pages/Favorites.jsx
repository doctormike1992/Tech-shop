import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { discountOnFilter } from "../utils/discountOnFilter";
import { guestActions } from "../store/guestSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth} from "../firebase/firebase";
import { collection, getDoc, setDoc} from "firebase/firestore";

export default function Favorites() {

  const dispatch = useDispatch();
  const guestFavorites = useSelector((state) => state.guest.favorites);

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
      <section className="flex flex-row md:gap-16 ">
        <div className="w-full flex flex-col ">
          <ul className="flex w-full flex-row items-center md:justify-start justify-center flex-wrap xl:gap-20 lg:gap-10 gap-7 py-10  pl-2 md:pl-0 ">
            {guestFavorites.length === 0 ? (
              <p className="text-2xl">You Have No Favorites!!</p>
            ) : (
              guestFavorites.map((item) => {
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
                        discountedPrice={discountOnFilter(item)}
                      />
                    </Link>
                    <div className="w-full">
                      <button
                        className="bg-stone-950  text-stone-50 text-xl text-bold  py-2 w-full cursor-pointer hover:text-stone-300 active:text-lg"
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
