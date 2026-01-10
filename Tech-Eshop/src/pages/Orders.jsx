import { useSelector } from "react-redux";
import { orderStatus } from "../utils/finishedOrders";
import { useEffect, useState } from "react";
import ClockIcon from "../icons/clock.svg?react";
import BoxIcon from "../icons/box.svg?react";
import TruckIcon from "../icons/truck.svg?react";
import { Link } from "react-router-dom";

export default function Orders() {
  const guestOrders = useSelector((state) => state.guest.orders);
  const [orderInProgress, setOrderInProgress] = useState([]);

  //AFTER AN ORDER IS DELIVERED IS REMOVED FORM THE ONGOING ORDERS PAGE
 useEffect(() => {
   const ongoingOrders = guestOrders
     .map((item) => ({
       ...item,
       items: item.items.filter(
         (order) => orderStatus(item.time, order.deliveryTime) !== "delivered"
       )
     })).filter((item) => item.items.length !== 0);
     

   setOrderInProgress(ongoingOrders);
 }, [guestOrders]);

  console.log(orderInProgress);

  return (
    <>
      <section
        className={`flex flex-col w-full ${
          orderInProgress.length !== 0 && "max-w-3/5"
        } items-start justify-start px-3 pb-20`}
      >
        <h3 className="text-2xl font-semibold text-(--primary) py-15">
          Ongoing Orders
        </h3>

        <div className="w-full flex flex-col items-center gap-6 justify-center">
          {orderInProgress.length === 0 && (
            <div className="flex flex-col items-center gap-3">
              <BoxIcon className='w-20 h-20 text-(--primary)' />
              <h1 className="text-lg text-(--primary) font-medium">
                No Orders Have Been Made
              </h1>
              <Link to={"/"}>
                <button className="bg-(--deepBlue) text-white py-1 px-2 rounded-md font-medium cursor-pointer">
                  continue shopping
                </button>
              </Link>
            </div>
          )}
          {orderInProgress.map((item) => (
            <div
              key={item.id}
              className="flex flex-col w-full bg-(--white) border gap-2 p-4 border-(--ordersBorder) rounded-lg"
            >
              <div className="flex flex-row items-center pb-10 pt-3 justify-between">
                <p className="font-medium text-xl text-(--primary) flex flex-col">
                  Order{" "}
                  <span className="text-(--secondText) font-medium text-sm pl-1">
                    #{item.id}
                  </span>
                </p>
                <p className="font- text-sm text-(--secondText)">
                  Placed on: <span className="font-medium">{item.time}</span>
                </p>
              </div>
              <hr className="text-(--ordersBorder)" />

              {item.items.map((order) => {
                const status = orderStatus(item.time, order.deliveryTime);

                return (
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
                          <p className="text-sm text-(--secondText) font-medium">
                            Quantity: {order.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex text-(--primary) flex-row gap-3">
                        <p>
                          {(order.finalPrice * order.quantity).toFixed(2)}
                          <sup>€</sup>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col w-full ">
                      <div className="flex flex-row w-full items-center justify-start pt-1 pb-2 gap-2">
                        <p className=" text-lg  items-center">
                          {status === "shipped" && (
                            <TruckIcon className="w-7 h-7 text-(--primary)" />
                          )}
                          {status === "processing" && (
                            <BoxIcon className="w-7 h-7 text-(--primary)" />
                          )}
                          {status === "pending" && (
                            <ClockIcon className="w-7 h-7 text-(--primary)" />
                          )}
                        </p>
                        <p
                          className={`text-sm font-medium border border-(--ordersBorder) text-(--primary) rounded-lg py-0.5 px-2 ${
                            status === "processing" &&
                            "bg-(--purple)/30 dark:text-white"
                          } ${
                            status === "shipped" && "bg-(--purple) text-white"
                          }`}
                        >
                          {status}
                        </p>
                      </div>

                      <div className="w-full  rounded-lg h-2 bg-(--deepBlue)/20 overflow-hidden">
                        <div
                          className={`h-full ${
                            status === "pending" && "w-[25%]"
                          }  ${status === "processing" && "w-[50%]"}  ${
                            status === "shipped" && "w-[75%]"
                          }  bg-(--deepBlue) flex items-center pl-3`}
                        ></div>
                      </div>

                      <div className="flex flex-row items-center text-(--primary) justify-between text-sm">
                        <p>Placed</p>
                        <p>Processing</p>
                        <p>Shipped</p>
                        <p>Delivered</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <hr className="text-(--ordersBorder)" />
              <div className="flex flex-row justify-between pt-6 text-(--primary) items-center font-medium">
                <p>
                  Total Amount{" "}
                  <span className="text-xs text-(--secondText) font-normal">
                    {" "}
                    (after shipped and tax)
                  </span>
                </p>
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
