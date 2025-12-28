import { useSelector } from "react-redux";
import UserForm from "../components/userForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";


export default function Info() {
  const [editForm, setEditForm] = useState('close');
  const orders = useSelector((state) => state.guest.orders);
  console.log(orders)
  // const day = dayjs().format("DD-MM-YYYY");

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
              {orders.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border border-(--secondary) rounded-lg"
                >
                  <div className="flex flex-row items-center justify-between">
                    <p className="font-medium">
                      Order{" "}
                      <span className="text-(--secondText) font-normal pl-1">
                        #{item.id}
                      </span>
                    </p>
                    <p className="font-medium text-(--secondText)">
                      {item.time}
                    </p>
                  </div>
                  <hr className="text-(--secondary)" />

                  {item.items.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-row items-center justify-between"
                    >
                      <p className="font-medium text-(--secondText) text-sm">
                        {order.name} <span className="font-normal">x</span>
                        {order.quantity}
                      </p>
                      <p>
                        {order.finalPrice.toFixed(2)}
                        <sup>$</sup>
                      </p>
                    </div>
                  ))}
                  <hr className="text-(--secondary)" />
                  <div className="flex flex-row justify-between items-center font-medium">
                    <p>Total</p>
                    <p>
                      {item.total.toFixed(2)}
                      <sup>$</sup>
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
