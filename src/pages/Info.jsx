import { useSelector } from "react-redux";
import UserForm from "../components/userForm";
import {  useState } from "react";
import UserIcon from "../icons/users.svg?react";
import BoxIcon from "../icons/box.svg?react";
import { orderStatus } from "../utils/finishedOrders";


export default function Info() {
  const orders = useSelector((state) => state.guest.orders);
  const [editForm, setEditForm] = useState('close');

console.log(orders)




  return (
    <>
      <section className="flex flex-col justify-start pb-5 px-3 items-start w-full xl:max-w-3/5">
        <h1 className="text-2xl py-15 text-(--primary) font-medium">
          My account
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-5 justify-start w-full">
          <div className="w-full border border-(--ordersBorder) bg-(--white) rounded-lg">
            <div className="flex flex-row justify-between items-center p-5">
              <div className="flex flex-row text-(--primary) items-center gap-1 md:text-lg font-medium">
                <UserIcon className="w-5 h-5" />
                <h1>Profile Information</h1>
              </div>

              <div className="flex flex-row items-center gap-1">
                <button
                  type="reset"
                  form="user-form"
                  onClick={() => setEditForm("close")}
                  className={`border text-sm font-medium border-(--ordersBorder) py-2 px-3 rounded-md cursor-pointer  hover:bg-(--blue) bg-(--white) text-(--primary) dark:hover:bg-(--background)/40 hover:text-white transition-all   ${
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
                    className="border text-sm font-medium  py-2 px-3 rounded-md cursor-pointer min-w-16.25 border-transparent hover:bg-(--deepBlue)/80 bg-(--deepBlue) text-white transition-all"
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditForm("open")}
                    className="border text-sm font-medium border-(--ordersBorder) py-2 px-3 rounded-md cursor-pointer min-w-16.25 hover:bg-(--blue) hover:text-white text-(--primary)  bg-(--white) transition-all hover:border-transparent  "
                  >
                    edit
                  </button>
                )}
              </div>
            </div>
            <UserForm editForm={editForm} />
          </div>

          <div className="flex flex-col border bg-(--white)  border-(--ordersBorder) rounded-lg w-full">
            <div className="flex flex-row items-center text-(--primary) gap-2 md:text-lg font-medium p-4">
              <BoxIcon className="w-5 h-5" />
              <h2>Order History</h2>
            </div>

            <section className="flex flex-col gap-7 p-4">
              {orders.length === 0 && (
                <h1 className="w-full text-center text-(--primary) md:text-lg font-medium">
                  No Orders Have Been Made
                </h1>
              )}
              {[...orders].reverse().map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border gap-2 p-3 border-(--ordersBorder) rounded-lg"
                >
                  <div className="flex flex-row items-center pb-2 justify-between">
                    <p className="font-medium text-(--primary)">
                      Order{" "}
                      <span className="text-(--secondText) text-xs md:text-md font-normal md:pl-1">
                        #{item.id}
                      </span>
                    </p>
                    <p className="font-medium text-xs md:text-sm text-(--secondText)">
                      {item.time}
                    </p>
                  </div>
                  <hr className="text-(--ordersBorder)" />

                  {item.items.map((order) => {
                    const status = orderStatus(item.time, order.deliveryTime);

                    return (
                      <div
                        key={order.id}
                        className="flex flex-col items-center py-3"
                      >
                        <div className="flex flex-row w-full items-center justify-between">
                          <p className="font-medium text-(--ordersName) dark:text-(--secondText) text-xs md:text-sm">
                            {order.name} <span className="font-normal">x</span>
                            {order.quantity}
                          </p>
                          <p className="text-(--primary)">
                            {(order.finalPrice * order.quantity).toFixed(2)}
                            <sup>€</sup>
                          </p>
                        </div>

                        <div className="flex flex-col w-full pt-2 gap-1">
                          <div className="flex flex-row justify-between w-full">
                            <span
                              className={`text-xs font-medium  border border-(--ordersBorder) text-(--primary)  rounded-lg py-0.5 px-2 ${
                                status === "processing" &&
                                "bg-(--purple)/30 dark:text-white"
                              } ${
                                status === "shipped" &&
                                "bg-(--purple) text-white"
                              }  ${
                                status === "delivered" &&
                                "bg-(--deepBlue) text-white"
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
                          <div className="w-full  rounded-lg h-1.5 bg-(--deepBlue)/20 overflow-hidden">
                            <div
                              className={`h-full ${
                                status === "pending" && "w-[25%]"
                              }  ${status === "processing" && "w-[50%]"}  ${
                                status === "shipped" && "w-[75%]"
                              }  ${
                                status === "delivered" && "w-100%"
                              }  bg-(--deepBlue) flex items-center pl-3`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <hr className="text-(--ordersBorder)" />
                  <div className="flex flex-row justify-between pt-2 items-center text-(--primary) font-medium">
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
