import { useSelector } from "react-redux";
import UserForm from "../components/userForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Info() {
  const [editForm, setEditForm] = useState('close');
  const orders = useSelector((state) => state.guest.orders);
  console.log(orders)

  return (
    <>
      <section className="flex flex-col justify-start  px-3 items-start">
        <h1 className="text-2xl py-15 font-medium">My account</h1>

        <div className="flex flex-row items-start gap-5 justify-start">
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

          <div>
            <h2 className="">ORDER HISTORY</h2>
            <section className="">
              {orders.map((item) =>
                item.items.map((order) => (
                  <div key={order.id}>
                    <img src={order.image} />
                    <p>{order.name}</p>
                    <p>{order.price}</p>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
