import { useSelector } from "react-redux";



export default function Info() {
  const info = useSelector((state) => state.guest.info);
  const userInfo = info[0];
 
  
  console.log(info);

  

  return (
    <>
      <h2 className="md:text-2xl p-1 text-fuchsia-700 text-center">
        YOUR INFORMATIONS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[300px_300px] gap-5 place-content-center text-center">
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
    </>
  );
}
