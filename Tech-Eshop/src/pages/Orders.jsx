import { discountOnFilter } from "../utils/discountOnFilter";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { isOrderExpired } from "../utils/finishedOrders";
import { useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { guestActions } from "../store/guestSlice";

export default function Orders() {
  const guestOrders = useSelector((state) => state.guest.orders);
  const dispatch = useDispatch();

  //after 3 days removes the order from Orders and orders array and adds it to orderHistory 
useEffect(() => {
  if (!auth.currentUser) return;

  const cleanOldOrders = async () => {
    try {
      const ordersRef = collection(db, `users/${auth.currentUser.uid}/orders`);
      const ordersSnap = await getDocs(ordersRef);

      const movedOrders = [];
      const removedOrderIds = [];

      const promises = ordersSnap.docs.map(async (orderDoc) => {
        const order = orderDoc.data();
        if (isOrderExpired(order.time)) {
          const historyRef = doc(
            db,
            `users/${auth.currentUser.uid}/orderHistory/${orderDoc.id}`
          );
          await setDoc(historyRef, order);
          await deleteDoc(
            doc(db, `users/${auth.currentUser.uid}/orders/${orderDoc.id}`)
          );

          movedOrders.push(order);
          removedOrderIds.push(orderDoc.id);
        }
      });

      await Promise.all(promises);

      if (removedOrderIds.length > 0) {
        dispatch(guestActions.removeFromOrders(removedOrderIds));
        dispatch(guestActions.addToOrderHistory(movedOrders));
      }
    } catch (error) {
      console.error("Error cleaning old orders:", error);
    }
  };

  cleanOldOrders();
}, [dispatch]);


  return (
    <>
      <div className="flex flex-col w-full items-center justify-center py-20">
        <h3 className="text-2xl">YOUR ORDERS</h3>

        <ul className="border-t-4 border-fuchsia-800 lg:w-[60%] md:w-[90%] w-full text-center">
          {guestOrders.length === 0 && <h1>No Orders Have been made!!</h1>}
          {guestOrders.map((item) => {
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
                    <h2 className="text-center">{item.name}{ item.time}</h2>
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
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
