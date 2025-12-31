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
      <section className="flex flex-col w-full max-w-3/5 items-start justify-start px-3">
        <h3 className="text-2xl font-semibold py-15">Ongoing Orders</h3>

        <div className="w-full flex flex-col items-center gap-6 justify-center">
          {guestOrders.length === 0 && <h1>No Orders Have been made!!</h1>}
          {orderInProgress.map((item) => (
            <div
              key={item.id}
              className="flex flex-col w-full border gap-2 p-4 border-(--ordersBorder) rounded-lg"
            >
              <div className="flex flex-row items-center pb-10 pt-3 justify-between">
                <p className="font-medium text-xl flex flex-col">
                  Order{" "}
                  <span className="text-(--secondText) font-medium text-sm pl-1">
                    #{item.id}
                  </span>
                </p>
                <p className="font- text-sm text-(--secondText)">
                  Placed on: <span className="font-medium">{item.time}</span>
                </p>
              </div>
              <hr className="text-(--secondary)" />

              {item.items.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col items-start gap-3 py-3 justify-between"
                >
                  <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-row  items-center gap-4">
                      <div className="rounded-lg overflow-hidden ">
                        <img
                          src={order.image}
                          className="size-20 aspect-4/3 object-cover"
                        />
                      </div>
                      <p className="font-medium text-(--ordersName) text-sm">
                        {order.name} <span className="font-normal">x</span>
                        {order.quantity}
                      </p>
                    </div>

                    <div className="flex flex-row gap-3">
                      <span
                        className={`${
                          order.status === "pending" && "shadow/40 "
                        }
                              ${
                                order.status === "processing" &&
                                "shadow/40 bg-lime-400"
                              }
                              ${
                                order.status === "delivered" &&
                                "text-(--white) shadow/40 bg-(--primary)"
                              } 
                          tracking-wide font-medium text-sm rounded-lg px-2`}
                      >
                        {order.status}
                      </span>
                      <p>
                        {(order.finalPrice * order.quantity).toFixed(2)}
                        <sup>€</sup>
                      </p>
                    </div>
                  </div>
                  <div className="w-full border border-(--ordersBorder) rounded-lg h-7 overflow-hidden">
                    <div
                      className={`h-full ${
                        order.status === "pending" ? "w-[33%]" : "w-[66%]"
                      } bg-lime-500 flex items-center text-(--white)  pl-3`}
                    >
                      Your order is <span className="font-medium pl-1">{order.status} </span>
                    </div>
                  </div>
                </div>
              ))}
              <hr className="text-(--secondary)" />
              <div className="flex flex-row justify-between pt-2 items-center font-medium">
                <p>Total</p>
                <p>
                  {item.total.toFixed(2)}
                  <sup>€</sup>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
