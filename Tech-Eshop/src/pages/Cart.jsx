import { useSelector } from "react-redux";
import { discountOnFilter } from "../utils/discountOnFilter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { guestActions } from "../store/guestSlice";
import {  useRef } from "react";
import Modal from "../components/Modal";
import { auth, db } from "../firebase/firebase";
import { deleteDoc, doc, writeBatch, increment } from "firebase/firestore";
import UserInfo from "../components/UserInfo";
import dayjs from "dayjs";

export default function Cart() {
  const guestCart = useSelector((state) => state.guest.cart);
  const dispatch = useDispatch();
  const amount = guestCart.reduce((acc, item) => {
    return acc + discountOnFilter(item) * item.quantity;
  }, 0);
  const dialog = useRef();
 const readableTime = dayjs().format("YYYY-MM-DD");

 

  //REMOVE FROM CART BUTTON
  async function handleRemoveFromCart(item) {
    const uid = auth.currentUser.uid;
    const itemDocRef = doc(db, `users/${uid}/cart`, item.id.toString());

    await deleteDoc(itemDocRef);
    dispatch(guestActions.removeFromCart(item.id));
  }

  // ADD TO ORDERS FUNCTION
  async function handleAddToOrders() {
    const uid = auth.currentUser.uid;
    const batch = writeBatch(db);
   

    guestCart.forEach((item) => {
      const ref = doc(db, `users/${uid}/orders/${item.id}`);

      batch.set(
        ref,
        {
          ...item,
          quantity: increment(item.quantity ?? 1),
          time: readableTime
        },
        { merge: true }
      );

      const cartRef = doc(db, `users/${uid}/cart/${item.id}`);
      batch.delete(cartRef);
    });

    await batch.commit();
    dispatch(guestActions.clearCart());
  }

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center py-20">
        <h3 className="text-2xl">CART</h3>

        <ul className="border-t-4 border-[var(--secondary)] lg:w-[60%] md:w-[90%] w-full text-center">
          {guestCart.length === 0 && <h1>The Cart is Empty!!</h1>}
          {guestCart.map((item) => {
            const total = discountOnFilter(item) * item.quantity;

            return (
              <li key={item.id} className="w-full relative">
                <Link
                  to={`/${item.id}`}
                  className="flex md:flex-row  items-center justify-between  border-b-2 border-stone-400 md:h-50 h-30 w-full md:text-xl text-bold text-sm overflow-hidden"
                >
                  <div className=" h-full w-full ">
                    <img
                      src={item.image}
                      alt="image"
                      className="w-full h-full aspect-square object-center"
                    />
                  </div>

                  <div className="w-[20%] h-full flex items-center justify-center border-l-2 border-stone-400">
                    <h2 className="text-center whitespace-normal break-words">
                      {item.name}
                    </h2>
                  </div>
                  <div className="w-full border-l-2 border-stone-400  h-full flex items-center justify-center ">
                    {item.sale ? (
                      <div>
                        <p>{"$ " + discountOnFilter(item).toFixed(2)}</p>
                        <p className="line-through text-stone-500">
                          {"$ " + item.price.toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p>{"$ " + item.price.toFixed(2)}</p>
                    )}
                  </div>
                  <div className="w-full border-l-2 border-stone-400  h-full flex items-center justify-center ">
                    {item.quantity && <p>{"x " + item.quantity}</p>}
                  </div>
                  <div className="w-full border-l-2 border-stone-400  h-full flex flex-col  items-center justify-center ">
                    <p className="text-bold border-b-2 border-stone-900 ">
                      Total
                    </p>
                    {"$ " + total.toFixed(2)}
                  </div>
                </Link>
                <button
                  className="absolute right-0  top-1 md:top-2 text-[var(--secondary)] bg-stone-900 hover:bg-stone-700  md:px-3 px-2 text-sm md:text-lg py-1 cursor-pointer"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  CLEAR
                </button>
              </li>
            );
          })}
        </ul>
        <div
          hidden={guestCart.length === 0}
          className="flex flex-row justify-end items-center lg:w-[60%] md:w-[90%] w-full gap-3 pt-4 text-3xl "
        >
          <p>Total Amount:</p>
          {"$ " + amount.toFixed(2)}
        </div>
        <div
          hidden={guestCart.length === 0}
          className="flex flex-row justify-between items-center lg:w-[60%] md:w-[90%] w-full pt-20 text-2xl "
        >
          <Link
            to={"/"}
            className="text-stone-50 bg-stone-950 p-4 cursor-pointer border-r-2"
          >
            Continue Shoping
          </Link>
          <button
            className="text-stone-50 bg-stone-950 p-4 cursor-pointer"
            onClick={() => dialog.current.open()}
          >
            Finish Order
          </button>
        </div>
      </div>

      <Modal
        ref={dialog}
        modalClass="flex flex-col w-full justify-center items-center"
        closeButton
      >
        <UserInfo handleToOrder={handleAddToOrders} closeModal={() => dialog.current.close()}/>
      </Modal>
    </>
  );
}
