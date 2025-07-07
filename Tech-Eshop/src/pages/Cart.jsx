import { useSelector } from "react-redux"
import { discountOnFilter } from "../utils/discountOnFilter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { guestActions } from "../store/guestSlice";
import { useEffect, useRef } from "react";
import Singin from "../components/Singin";
import Modal from "../components/Modal";




export default function Cart() {
  const guestCart = useSelector(state => state.guest.cart);
  const userLogged = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const amount = guestCart.reduce((acc, item) => {
    return acc + discountOnFilter(item) * item.quantity;
  }, 0);
  const dialog = useRef();

  //HANDLE CLOSING THE MODAL ON SINGIN IN
  useEffect(() => {
    if (userLogged) {
      dialog.current.close();
   }
  }, [userLogged])
  
  function finishOrder() {
    if (!userLogged) {
      dialog.current.open()
    }
  }

  //REMOVE FROM CART BUTTON
  function deleteCart(item) {
    dispatch(guestActions.removeFromCart(item))
  }


  return (
    <>
      <div className="flex flex-col w-full items-center justify-center py-20">
        <h3 className="text-2xl">CART</h3>

        <ul className="border-t-4 border-fuchsia-800 lg:w-[60%] md:w-[90%] w-full text-center">
          {guestCart.length === 0 && <h1>The Cart is Empty!!</h1>}
          {guestCart.map((item) => {
            const total = discountOnFilter(item) * item.quantity;

            return (
              <li key={item.id} className="w-full relative">
                <Link
                  to={`/${item.id}`}
                  className="flex flex-row items-center justify-between  border-b-2 border-stone-400 md:h-50 h-30 w-full md:text-xl text-sm "
                >
                  <div className=" h-full w-full ">
                    <img
                      src={item.image}
                      alt="image"
                      className="w-full h-full aspect-square object-center"
                    />
                  </div>

                  <div className="w-full h-full flex items-center justify-center border-l-2 border-stone-400 flex-nowrap">
                    <h2 className="text-center">{item.name}</h2>
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
                  className="absolute right-0 top-2 text-fuchsia-800 bg-stone-200 hover:bg-fuchsia-500 hover:text-stone-50 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => deleteCart(item)}
                >
                  X
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
          <Link to={'/'} className="text-stone-50 bg-stone-950 p-4 cursor-pointer">
            Continue Shoping
          </Link>
          <button
            className="text-stone-50 bg-stone-950 p-4 cursor-pointer"
            onClick={finishOrder}
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
        <Singin />
      </Modal>
    </>
  );
}