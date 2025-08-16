import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Info() {
  const info = useSelector((state) => state.guest.info);
  const [change, setChange] = useState(true);
  const userName = useRef();
  const lastName = useRef();
  const city = useRef();
  const address = useRef();
  const postCode = useRef();
  const floor = useRef();
  const areInfos = info.length === 0 ? '' : info[0]
  console.log(info)

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
    }
  }

    return (
      <>
        <form onSubmit={handleInfos} className=" flex flex-col items-center">
          <h2 className="md:text-2xl p-1 text-fuchsia-700">
            {info.length !== 0 && "CHECK"} YOUR INFORMATIONS
          </h2>

          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col md:p-15 p-10 gap-2">
              <label className="text-xl">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={areInfos.name}
                ref={userName}
                required={change}
                disabled={change}
                className=" border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">Post Code</label>
              <input
                type="number"
                name="postcode"
                defaultValue={areInfos.postcode}
                ref={postCode}
                required={change}
                disabled={change}
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">City</label>
              <input
                type="text"
                name="city"
                defaultValue={areInfos.city}
                ref={city}
                required={change}
                disabled={change}
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
            </div>

            <div className="flex flex-col md:p-15 p-10 gap-2">
              <label className="text-xl">Last Name</label>
              <input
                type="text"
                name="lastname"
                defaultValue={areInfos.lastname}
                ref={lastName}
                required={change}
                disabled={change}
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">Floor</label>
              <input
                type="text"
                name="floor"
                defaultValue={areInfos.floor}
                ref={floor}
                required={change}
                disabled={change}
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
              <label className="text-xl">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={areInfos.address}
                ref={address}
                required={change}
                disabled={change}
                className="border-2 border-stone-400 rounded p-2 text-lg"
              />
            </div>
          </div>

          <button
            type={change ? null : "button"}
            onClick={() => setChange((prev) => !prev)}
            className="text-xl text-stone-50 bg-stone-950 p-4 items-center cursor-pointer"
          >
            {change ? "Change Informations" : "Save Informations"}
          </button>
        </form>
      </>
    );
  }
