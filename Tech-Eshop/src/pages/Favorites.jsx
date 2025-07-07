import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { discountOnFilter } from "../utils/discountOnFilter";
import { guestActions } from "../store/guestSlice";

export default function Favorites() {
  const guestCart = useSelector((state) => state.guest.cart);
  const dispatch = useDispatch();
  const guestFavorites = useSelector((state) => state.guest.favorites);


  

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
