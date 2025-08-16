
import { discountOnFilter } from "../utils/discountOnFilter";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export default function Orders() {
  
  const guestOrders = useSelector((state) => state.guest.orders);

 

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center py-20">
        <h3 className="text-2xl">YOUR ORDERS</h3>

        <ul className="border-t-4 border-fuchsia-800 lg:w-[60%] md:w-[90%] w-full text-center">
          {  guestOrders.length === 0 && <h1>No Orders Have been made!!</h1>}
          { guestOrders.map((item) => {
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
                    <h2 className="text-center">{item.name}</h2>
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
