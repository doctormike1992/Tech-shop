import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { guestActions } from "../store/guestSlice";
// import {  useRef } from "react";
import Modal from "../components/Modal";
// import { auth, db } from "../firebase/firebase";
// import { deleteDoc, doc, writeBatch, increment } from "firebase/firestore";
import UserInfo from "../components/UserInfo";
// import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";


export default function Cart() {
  const guestCart = useSelector((state) => state.guest.cart);
  // const dispatch = useDispatch();
  // const amount = guestCart.reduce((acc, item) => {
  //   return acc + discountOnFilter(item) * item.quantity;
  // }, 0);
  // const dialog = useRef();
//  const readableTime = dayjs().format("YYYY-MM-DD");

 

  //REMOVE FROM CART BUTTON
  // async function handleRemoveFromCart(item) {
  //   const uid = auth.currentUser.uid;
  //   const itemDocRef = doc(db, `users/${uid}/cart`, item.id.toString());

  //   await deleteDoc(itemDocRef);
  //   dispatch(guestActions.removeFromCart(item.id));
  // }

  // ADD TO ORDERS FUNCTION
  // async function handleAddToOrders() {
  //   const uid = auth.currentUser.uid;
  //   const batch = writeBatch(db);
   

  //   guestCart.forEach((item) => {
  //     const ref = doc(db, `users/${uid}/orders/${item.id}`);

  //     batch.set(
  //       ref,
  //       {
  //         ...item,
  //         quantity: increment(item.quantity ?? 1),
  //         time: readableTime
  //       },
  //       { merge: true }
  //     );

  //     const cartRef = doc(db, `users/${uid}/cart/${item.id}`);
  //     batch.delete(cartRef);
  //   });

  //   await batch.commit();
  //   dispatch(guestActions.clearCart());
  // }

  return ( <>
      <section className="flex flex-col max-w-[80%] items-center justify-center px-3">
        <div className="w-full flex flex-row items-center justify-between py-15">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        {guestCart === 0 && <button>Clear Cart</button>}      
        </div>
        <div className="w-full">
           <ul className=" w-full flex gap-5 flex-col items-center justify-start text-center">
          {guestCart.length === 0 ? (
            <div className="flex flex-col w-full gap-2 items-center justify-center">
              <FontAwesomeIcon
                className="text-white drop-shadow-[0_0_1px_rgba(0,0,0,2)] text-8xl"
                icon={faBasketShopping}
              />
              <h1 className="text-xl font-semibold">Your cart is empty</h1>
              <p className="text-(--secondText) pb-2">
                Add some products to get started
              </p>
              <Link
                className="bg-(--primary) text-(--white) py-1 px-2 rounded-md font-medium "
                to={"/"}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            guestCart.map((item) => {
            return (
              <li
                key={item.id}
                className="w-full border p-4 gap-4 flex flex-row items-center  rounded-xl border-stone-200"
              >
                <div className="w-24 h-24 shrink-0 content-center ">
                  <img
                    className="aspect-4/3 rounded-md w-full h-full"
                    src={item.image}
                  />
                </div>

                <div className="w-full min-w-o px-1 flex flex-col justify-between">
                  <div className="flex  flex-row justify-between items-start">
                    <div className="flex flex-col items-start">
                      <p className="font-medium">{item.name} </p>
                    <p className="text-(--secondText)  text-sm">
                      {item.category}{" "}
                    </p>
                    </div>
                    

                    <button
                      className=" cursor-pointer"
                      // onClick={() => handleRemoveFromCart(item)}
                    >
                      <FontAwesomeIcon
                        className="text-sm  text-red-600"
                        icon={faTrashCan}
                      />
                    </button>

                    
                  </div>

                  <div className="flex flex-row items-end justify-between">

                    <div className="w-full flex pt-2 flex-row gap-5 items-center">
                      <button className="border border-stone-300 px-1 py-0.5 rounded-lg">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{item.quantity}</span>
                      <button className="border border-stone-300 px-1 py-0.5 rounded-lg">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    
                    <p>${item.finalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            );
          }) 
          )}
          
        </ul>
      </div>
      </section>

       
        {/* <div
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
        <UserInfo
          handleToOrder={handleAddToOrders}
          closeModal={() => dialog.current.close()}
        />
      </Modal> */}
    </>
  );
}
