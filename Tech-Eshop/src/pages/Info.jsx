import { useSelector } from "react-redux";
import UserForm from "../components/userForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {  useState } from "react";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { orderStatus } from "../utils/finishedOrders";


export default function Info() {
  const orders = useSelector((state) => state.guest.orders);
  const [editForm, setEditForm] = useState('close');

console.log(orders)




  return (
    <>
      <section className="flex flex-col justify-start  px-3 items-start w-full max-w-3/5">
        <h1 className="text-2xl py-15 font-medium">My account</h1>

        <div className="flex flex-row items-start gap-5 justify-start w-full">
          <div className="w-full border border-(--secondary) rounded-lg">
            <div className="flex flex-row justify-between items-center p-5">
              <div className="flex flex-row  items-center gap-1 text-lg font-medium">
                <FontAwesomeIcon icon={faUser} />
                <h1>Profile Information</h1>
              </div>

              <div className="flex flex-row items-center gap-1">
                <button
                  type="reset"
                  form="user-form"
                  onClick={() => setEditForm("close")}
                  className={`border text-sm font-medium border-stone-300 py-2 px-3 rounded-md cursor-pointer  hover:bg-stone-200 transition-all ${
                    editForm === "close" && "opacity-0 pointer-events-none"
                  }`}
                >
                  cancel
                </button>
                {editForm === "open" ? (
                  <button
                    type="submit"
                    form="user-form"
                    onClick={() => setEditForm("close")}
                    hidden={editForm === "close"}
                    className="border text-sm font-medium border-(--primary) py-2 px-3 rounded-md cursor-pointer min-w-16.25 hover:bg-stone-900 bg-(--primary) text-(--white) transition-all"
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditForm("open")}
                    className="border text-sm font-medium border-stone-300 py-2 px-3 rounded-md cursor-pointer min-w-16.25 hover:bg-stone-200 transition-all"
                  >
                    edit
                  </button>
                )}
              </div>
            </div>
            <UserForm editForm={editForm} />
          </div>

          <div className="flex flex-col border border-(--secondary) rounded-lg w-full">
            <div className="flex flex-row items-center gap-2 text-lg font-medium p-4">
              <FontAwesomeIcon icon={faBoxArchive} />
              <h2 className="">Order History</h2>
            </div>

            <section className="flex flex-col gap-7 p-4">
              {orders.length === 0 && (
                <h1 className="w-full text-center text-lg font-medium">
                  No Orders Have Been Made
                </h1>
              )}
              {[...orders].reverse().map((item) => 
              (
                <div
                  key={item.id}
                  className="flex flex-col border gap-2 p-3 border-(--ordersBorder) rounded-lg"
                >
                  <div className="flex flex-row items-center pb-2 justify-between">
                    <p className="font-medium">
                      Order{" "}
                      <span className="text-(--secondText) font-normal pl-1">
                        #{item.id}
                      </span>
                    </p>
                    <p className="font-medium text-sm text-(--secondText)">
                      {item.time}
                    </p>
                  </div>
                  <hr className="text-(--secondary)" />

                  {item.items.map((order) => {
                    const status = orderStatus(item.time, order.deliveryTime);

                    return (
                      <div
                        key={order.id}
                        className="flex flex-col items-center py-3"
                      >
                        <div className="flex flex-row w-full items-center justify-between">
                          <p className="font-medium text-(--ordersName) text-sm">
                            {order.name} <span className="font-normal">x</span>
                            {order.quantity}
                          </p>
                          <p>
                            {(order.finalPrice * order.quantity).toFixed(2)}
                            <sup>€</sup>
                          </p>
                        </div>

                        <div className="flex flex-col w-full pt-2 gap-1">
                          <div className="flex flex-row justify-between w-full">
                            <span
                              className={`text-xs font-medium  shadow/40 rounded-lg py-0.5 px-2 ${
                                status === "processing" && "bg-(--secondary)"
                              } ${
                                status === "shipped" &&
                                "bg-(--secondText) text-(--white)"
                              }  ${
                                status === "delivered" &&
                                "bg-(--primary) text-(--white)"
                              } `}
                            >
                              {status}
                            </span>
                            <p className="text-sm text-(--secondText)">
                              {status === "pending" && "25%"}
                              {status === "processing" && "50%"}
                              {status === "shipped" && "75%"}
                              {status === "delivered" && "100%"}
                            </p>
                          </div>
                          <div className="w-full  rounded-lg h-1.5 bg-(--ordersBorder) overflow-hidden">
                            <div
                              className={`h-full ${
                                status === "pending" && "w-[25%]"
                              }  ${status === "processing" && "w-[50%]"}  ${
                                status === "shipped" && "w-[75%]"
                              }  ${
                                status === "delivered" && "w-100%"
                              }  bg-(--primary) flex items-center pl-3`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  )}
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
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
