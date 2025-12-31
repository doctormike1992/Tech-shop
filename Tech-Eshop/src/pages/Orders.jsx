import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isOrderExpired } from "../utils/finishedOrders";
import { useEffect, useState } from "react";

export default function Orders() {
  const guestOrders = useSelector((state) => state.guest.orders);
  const [orderInProgress, setOrderInProgress] = useState([]);

  //after the order is delivered it removes the order from  orderInProgress array
  useEffect(() => {
    setOrderInProgress(
      guestOrders.filter((item) => {
        return !isOrderExpired(item.time, item.deliveryTime);
      })
    );
  }, [guestOrders]);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center py-20">
        <h3 className="text-2xl">YOUR ORDERS</h3>

        <ul className="border-t-4 border-(--secondary) lg:w-[60%] md:w-[90%] w-full text-center">
          {guestOrders.length === 0 && <h1>No Orders Have been made!!</h1>}
          {orderInProgress.map((item) => {
            

            return (
              <li key={item.id} className="w-full relative">
                {item.items.map((order) => {
                  const total = order.finalPrice * order.quantity;
                  return (
                    <div>
                    <div className=" h-full w-full ">
                      <img
                        src={order.image}
                        alt="image"
                        className="w-full h-full aspect-square object-center"
                      />
                    </div>

                    <div className="w-full h-full flex items-center justify-center border-l-2 border-stone-400 flex-nowrap">
                      <h2 className="text-center">
                        {order.name}
                        {order.time}
                      </h2>
                    </div>
                    <div className="w-full border-l-2 border-stone-400  h-full flex items-center justify-center ">
                      {order.sale ? (
                        <div>
                          <p>{"$ " + order.finalPrice.toFixed(2)}</p>
                          <p className="line-through text-stone-500">
                            {"$ " + order.price.toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p>{"$ " + order.price.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="w-full border-l-2 border-stone-400  h-full flex items-center justify-center ">
                      {order.quantity && <p>{"x " + order.quantity}</p>}
                    </div>
                    <div className="w-full border-l-2 border-stone-400  h-full flex flex-col  items-center justify-center ">
                      <p className="text-bold border-b-2 border-stone-900 ">
                        Total
                      </p>
                      {"$ " + total.toFixed(2)}
                    </div>
                  </div>
                  )              
          })}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
