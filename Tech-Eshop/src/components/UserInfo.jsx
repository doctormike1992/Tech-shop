import { db, auth } from "../firebase/firebase";
import {  doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { useSelector } from "react-redux";


export default function UserInfo({ handleToOrder, closeModal }) {
 
  const userName = useRef();
  const lastName = useRef();
  const city = useRef();
  const address = useRef();
  const postCode = useRef();
  const floor = useRef();
  const info = useSelector((state) => state.guest.info);
  console.log(typeof{ info })


  

  //ON SUBMIT FUNTION THAT SENDS THE INFOS FORM TO BACKEND
  async function handleInfos(e) {
    e.preventDefault();

    if (
      userName.current.value.trim() === "" ||
      lastName.current.value.trim() === "" ||
      city.current.value.trim() === "" ||
      address.current.value.trim() === "" ||
      postCode.current.value.trim() === "" ||
      floor.current.value.trim() === ""
    ) {
      return;
    } else {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const uid = auth.currentUser.uid;
      const infoDocRef = doc(db, `users/${uid}/info/main`);
      await setDoc(infoDocRef, data);

      closeModal();
      handleToOrder();
    }
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleInfos}
          className="bg-stone-50 flex flex-col items-center rounded-lg"
        >
          <h2 className="md:text-2xl p-1 text-fuchsia-700">
            {info.length !== 0 ? "CHECK" : "ADD"} YOUR INFORMATIONS
          </h2>

          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col md:p-15 p-10 gap-2">
              <label className="text-xl">Name</label>
              <input
                type="text"
                name="userName"
                defaultValue={info.length !== 0 && info[0].userName}
                ref={userName}
                required
                className=" border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">Post Code</label>
              <input
                type="number"
                name="postCode"
                defaultValue={info.length !== 0 && info[0].postCode}
                ref={postCode}
                required
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">City</label>
              <input
                type="text"
                name="city"
                defaultValue={info.length !== 0 && info[0].city}
                ref={city}
                required
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
            </div>

            <div className="flex flex-col md:p-15 p-10 gap-2">
              <label className="text-xl">Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={info.length !== 0 && info[0].lastName}
                ref={lastName}
                required
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">Floor</label>
              <input
                type="text"
                name="floor"
                defaultValue={info.length !== 0 && info[0].floor}
                ref={floor}
                required
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={info.length !== 0 && info[0].address}
                ref={address}
                required
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
            </div>
          </div>

          <button className="text-xl text-stone-50 bg-stone-950 p-4 items-center cursor-pointer">
            Finish Order
          </button>
        </form>
      </div>
    </>
  );
}
