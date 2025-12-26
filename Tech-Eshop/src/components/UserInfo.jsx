import { db, auth } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import UserForm from "./userForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function UserInfo({ handleToOrder, closeModal }) {
  const info = useSelector((state) => state.guest.info);

  useEffect(() => {
    async function submitForm() {
      const uid = auth.currentUser.uid;
      const infoDocRef = doc(db, `users/${uid}/info/main`);
      await setDoc(infoDocRef, info);
    }
    submitForm();
  }, [info]);

  return (
    <>
      <div className="flex flex-col
       w-full max-w-lg
       gap-2 rounded-xl bg-(--white) justify-center">
        <div className="flex flex-row items-center justify-between w-full p-5">
          <h1 className="text-lg font-medium ">Check your Informations</h1>
          <button
            onClick={closeModal}
          >
            <FontAwesomeIcon className="text-sm" icon={faX} />
          </button>
        </div>

        <UserForm />
        <div className="flex w-full itmes-center py-3 justify-center">
          <button
            className="border bg-(--primary) rounded-md text-(--white) py-2 px-5 text-sm font-medium"
            type="submit"
            form="user-form"
            onClick={handleToOrder}
          >
            Finish Checkout
          </button>
        </div>
      </div>
    </>
  );
}
