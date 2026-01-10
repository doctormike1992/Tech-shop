import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { guestActions } from "../store/guestSlice";
import { useRef } from "react";
import Modal from "../components/Modal";
import { auth, db } from "../firebase/firebase";
import {
  deleteDoc,
  doc,
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import UserInfo from "../components/UserInfo";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CartIcon from "../icons/cart.svg?react";


export default function Cart() {
  const [subTotal, setSubTotal] = useState(0);
  const guestCart = useSelector((state) => state.guest.cart);
  const dispatch = useDispatch();
  const dialog = useRef();
  const shipping = 30;
  const tax = 5;
  const totalPrice = subTotal + shipping + tax;
  const cartEmpty = guestCart.length === 0;

  // FINDING THE SUBTOTAL OF THE CART AT THE START AND AT EVERY CHANGE OF IT
  useEffect(() => {
    const total = guestCart.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0
    );
    setSubTotal(total);
  }, [guestCart]);

  // PLUS QUANTITY BUTTON
  function plusCartQuantity(item) {
    dispatch(guestActions.plusQuantity(item.id));
  }

  // MINUS QUANTITY BUTTON
  function minusCartQuantity(item) {
    dispatch(guestActions.minusQuantity(item.id));
  }

  //CLEAR THE CART BUTTON
  async function clearCartButton() {
    const uid = auth.currentUser.uid;
    const cartCollectionRef = collection(db, `users/${uid}/cart`);
    const cartSnapshot = await getDocs(cartCollectionRef);
    cartSnapshot.forEach(async (docItem) => {
      await deleteDoc(doc(db, `users/${uid}/cart`, docItem.id));
    });

    dispatch(guestActions.clearCart());
  }

  
   const readableTime = dayjs().format("YYYY-MM-DD");

  // REMOVE FROM CART BUTTON
  async function handleRemoveFromCart(item) {
    const uid = auth.currentUser.uid;
    const itemDocRef = doc(db, `users/${uid}/cart`, item.id.toString());

    await deleteDoc(itemDocRef);
    dispatch(guestActions.removeFromCart(item.id));
  }

  // ADD THE CART TO ORDERS AT CHECKOUT AND CLEAR THE CART FROM REDUX AND FIREBASE
  async function handleAddToOrders() {
    const uid = auth.currentUser.uid;
    const batch = writeBatch(db);

    // 1️⃣ Create ONE order document
    const orderRef = doc(collection(db, `users/${uid}/orders`));

    batch.set(orderRef, {
      items: guestCart, 
      total: totalPrice,
      time: readableTime,
    });

    // 2️⃣ Clear cart (still batch-safe)
    guestCart.forEach((item) => {
      const cartRef = doc(db, `users/${uid}/cart/${item.id}`);
      batch.delete(cartRef);
    });

    // 3️⃣ Commit everything atomically
    await batch.commit();

    clearCartButton();
    dialog.current.close();
  }

  return (
    <>
      <section
        className={`flex flex-col   ${
          cartEmpty ? "w-full " : "w-full max-w-3/5"
        }  items-center justify-center px-3`}
      >
        <div className="w-full flex flex-row items-center justify-between py-15">
          <h1 className="font-semibold text-(--primary) text-2xl">
            Shopping Cart
          </h1>
          {!cartEmpty && (
            <button
              onClick={clearCartButton}
              className="border text-sm font-medium border-stone-300 py-2 px-3 rounded-md cursor-pointer dark:bg-(--white) text-(--primary) dark:border-(--ordersBorder) dark:hover:bg-(--ordersBorder)/20 hover:bg-(--blue) hover:text-white transition-all"
            >
              Clear Cart
            </button>
          )}
        </div>
        <div className="w-full flex flex-col py-10 md:flex-row gap-5">
          <ul className=" w-full flex gap-5 flex-col items-center  justify-start text-center">
            {cartEmpty ? (
              <div className="flex flex-col w-full gap-2 items-center justify-center">
                <CartIcon className="w-20 h-20 text-(--primary)" />
                <h1 className="text-xl text-(--primary) font-semibold">
                  Your cart is empty
                </h1>
                <p className="text-(--secondText) pb-2">
                  Add some products to get started
                </p>
                <Link
                  className="bg-(--deepBlue) text-white py-1 px-2 rounded-md font-medium cursor-pointer"
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
                    className="w-full border p-4 gap-4 flex flex-row items-center bg-(--white) rounded-xl border-(--ordersBorder)"
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
                          <p className="font-medium text-(--primary)">
                            {item.name}{" "}
                          </p>
                          <p className="text-(--secondText)  text-sm">
                            {item.category}{" "}
                          </p>
                        </div>

                        <button
                          className=" cursor-pointer"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <FontAwesomeIcon
                            className="text-sm  text-red-600"
                            icon={faTrashCan}
                          />
                        </button>
                      </div>

                      <div className="flex flex-row items-end justify-between">
                        <div className="w-full flex pt-2 flex-row gap-5 items-center">
                          <button
                            onClick={() => minusCartQuantity(item)}
                            className="border cursor-pointer hover:bg-(--blue) text-(--primary) hover:text-white border-(--ordersBorder) px-1 py-0.5 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="text-(--primary)">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => plusCartQuantity(item)}
                            className="border cursor-pointer hover:bg-(--blue) text-(--primary) hover:text-white border-(--ordersBorder) px-1 py-0.5 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>

                        <p className="text-(--primary)">
                          {(item.finalPrice * item.quantity).toFixed(2)}
                          <sup>€</sup>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
          {!cartEmpty && (
            <div className="flex flex-col  border p-6 h-fit min-w-[35%] 2xl:min-w-[30%]  border-(--ordersBorder) bg-(--white) rounded-2xl">
              <h1 className="font-medium text-(--primary) text-lg pb-10 ">
                Order Summary
              </h1>
              <div className="flex justify-between pb-15  flex-row">
                <div className="flex justify-start items-start flex-col text-(--secondText) font-medium text-sm gap-2">
                  <p>Subtotal</p>
                  <p>Shipping</p>
                  <p>Tax</p>
                </div>

                <div className=" flex flex-col gap-2 text-(--primary) justify-center items-end text-sm">
                  <p>
                    {subTotal.toFixed(2)}
                    <sup>€</sup>
                  </p>
                  <p>
                    {shipping.toFixed(2)}
                    <sup>€</sup>
                  </p>
                  <p>
                    {tax.toFixed(2)}
                    <sup>€</sup>
                  </p>
                </div>
              </div>

              <hr className="text-stone-300" />
              <br />
              <div className="flex py-10 flex-row text-(--primary) justify-between">
                <p className="text-lg">Total</p>
                <p className="font-medium text-lg">
                  {totalPrice.toFixed(2)}
                  <sup>€</sup>
                </p>
              </div>
              <button
                onClick={() => dialog.current.open()}
                className="w-full hover:bg-(--deepBlue)/90 cursor-pointer text-white bg-(--deepBlue) py-2 rounded-lg text-sm font-medium"
              >
                Procced to Checkout
              </button>
            </div>
          )}
        </div>
        <Modal ref={dialog} modalClass="flex items-center justify-center">
          <UserInfo
            handleToOrder={handleAddToOrders}
            closeModal={() => dialog.current.close()}
          />
        </Modal>
      </section>
    </>
  );
}
