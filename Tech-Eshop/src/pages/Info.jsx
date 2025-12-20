import { useSelector } from "react-redux";

export default function Info() {
  const info = useSelector((state) => state.guest.info);
  const orders = useSelector((state) => state.guest.orders);
  const userInfo = info[0];

  console.log(info);

  return (
    <>
      <div className="flex flex-row justify-around items-start">
        <div className="grid grid-cols-1 md:grid-cols-[300px_300px] gap-5 place-content-center text-center">
          <h2 className="md:text-2xl p-1 col-span-2  text-[var(--secondary)] text-center">
            YOUR INFORMATIONS
          </h2>
          <div className="flex flex-col gap-2">
            <h3 className="bg-stone-300 text-bold text-xl">NAME</h3>
            <p>{userInfo ? userInfo.userName : "-- no info --"}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="bg-stone-300 text-bold text-xl">LAST NAME</h3>

            <p>{userInfo ? userInfo.lastName : "-- no info --"}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="bg-stone-300 text-bold text-xl">ADDRESS</h3>

            <p>{userInfo ? userInfo.address : "-- no info --"}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="bg-stone-300 text-bold text-xl">CITY</h3>

            <p>{userInfo ? userInfo.city : "-- no info --"}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="bg-stone-300 text-bold text-xl">FLOOR</h3>

            <p>{userInfo ? userInfo.floor : "-- no info --"}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="bg-stone-300 text-bold text-xl">POST CODE</h3>

            <p>{userInfo ? userInfo.postCode : "-- no info --"}</p>
          </div>
        </div>

        <div>
          <h2 className="md:text-2xl p-1 col-span-2  text-[var(--secondary)] text-center">
            ORDER HISTORY
          </h2>
          <section className="overflow-y-scroll  h-[80vh]">
            {orders.map((item) => (
              <div key={item.id}>
                <img src={item.image} />
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
