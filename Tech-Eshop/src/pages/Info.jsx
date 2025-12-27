import { useSelector } from "react-redux";
import UserForm from "../components/userForm";

export default function Info() {
  const orders = useSelector((state) => state.guest.orders);
  console.log(orders)

  return (
    <>
      <div className="flex flex-row justify-around items-start">
        <UserForm />

        <div>
          <h2 className="md:text-2xl p-1 col-span-2  text-(--secondary) text-center">
            ORDER HISTORY
          </h2>
          <section className="overflow-y-scroll  h-[80vh]">
            {orders.map((item) => (
              item.items.map((order) => (
                <div key={order.id}>
                  <img src={order.image} />
                  <p>{order.name}</p>
                  <p>{order.price}</p>
                </div>
              ))
              
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
