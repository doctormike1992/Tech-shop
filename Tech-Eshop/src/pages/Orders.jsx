import { useSelector } from "react-redux";
import { orderStatus } from "../utils/finishedOrders";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTruck } from "@fortawesome/free-regular-svg-icons";
import { faDolly } from "@fortawesome/free-solid-svg-icons";


export default function Orders() {
  const guestOrders = useSelector((state) => state.guest.orders);
  const [orderInProgress, setOrderInProgress] = useState([]);

  //after the order is delivered it removes the order from  orderInProgress array
  useEffect(() => {
    setOrderInProgress(
      guestOrders.filter((item) => {
        return orderStatus(item.time, item.deliveryTime) !== "delivered";
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
                      <div>
                        <p className="font-medium text-(--primary) text-sm">
                        {order.name}
                        </p>
                        <p className="text-sm text-(--secondText) font-medium">Quantity: {order.quantity}</p>
                      </div>
                      
                    </div>

                    <div className="flex flex-row gap-3">
                      <p>
                        {(order.finalPrice * order.quantity).toFixed(2)}
                        <sup>€</sup>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-full ">
                    <div className="flex flex-row w-full items-center justify-between pb-1">
                      <p className=" text-lg flex flex-row items-center gap-1">
                        {orderStatus(order.time, order.deliveryTime) ===
                          "arriving" && (
                          <FontAwesomeIcon className="text-xl" icon={faTruck} />
                        )}
                        {orderStatus(order.time, order.deliveryTime) ===
                          "processing" && <FontAwesomeIcon icon={faDolly} />}
                        {orderStatus(order.time, order.deliveryTime) ===
                          "pending" && (
                          <FontAwesomeIcon className="text-xl" icon={faClock} />
                        )}
                        {orderStatus(order.time, order.deliveryTime)}
                      </p>
                      <p
                        className={`text-sm font-medium  shadow/40 rounded-lg py-0.5 px-2 ${
                          orderStatus(order.time, order.deliveryTime) ===
                            "processing" && "bg-(--secondary)"
                        } ${
                          orderStatus(order.time, order.deliveryTime) ===
                            "arriving" && "bg-(--secondText) text-(--white)"
                        }`}
                      >
                        {orderStatus(order.time, order.deliveryTime)}
                      </p>
                    </div>

                    <div className="w-full  rounded-lg h-2 bg-(--ordersBorder) overflow-hidden">
                      <div
                        className={`h-full ${
                          orderStatus(order.time, order.deliveryTime) ===
                            "pending" && "w-[25%]"
                        }  ${
                          orderStatus(order.time, order.deliveryTime) ===
                            "processing" && "w-[50%]"
                        }  ${
                          orderStatus(order.time, order.deliveryTime) ===
                            "arriving" && "w-[75%]"
                        }  bg-(--primary) flex items-center pl-3`}
                      ></div>
                    </div>

                    <div className="flex flex-row items-center justify-between text-sm">
                      <p>Placed</p>
                      <p>Processing</p>
                      <p>Shipped</p>
                      <p>Delivered</p>
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
