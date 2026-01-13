import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guestActions } from "../store/guestSlice";

export default function UserForm({editForm}) {
  const userName = useRef();
  const phone = useRef();
  const email = useRef();
  const city = useRef();
  const address = useRef();

  const userInfo = useSelector((state) => state.guest.info);
  const dispatch = useDispatch();

  //ON SUBMIT FUNTION THAT SENDS THE INFOS FORM TO BACKEND
  function handleInfos(e) {
    e.preventDefault();
    const phoneValid = phone.current.value.trim();
    const isValidPhone = /^\d{10}$/.test(phoneValid);

    if (
      userName.current.value.trim() === "" ||
      phoneValid === "" ||
      !isValidPhone ||
      email.current.value === "" ||
      city.current.value.trim() === "" ||
      address.current.value.trim() === ""
    ) {
      return;
    } else {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      dispatch(guestActions.addInfo(data));
    }
  }

  return (
    <>
      <form
        onSubmit={handleInfos}
        id="user-form"
        className="bg-(--white) h-full w-full flex flex-col justify-center p-5 items-start rounded-md"
      >
        <label htmlFor="userName" className="font-medium text-(--primary)">
          Name
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          defaultValue={userInfo.userName || ""}
          ref={userName}
          required
          disabled={editForm && editForm === "close"}
          className="disabled:opacity-50  bg-(--input)  w-full rounded-md p-2 text-(--primary) outline-0"
        />

        <label htmlFor="phone" className="font-medium text-(--primary)">
          Phone
        </label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          id="phone"
          name="phone"
          defaultValue={userInfo.phone || ""}
          ref={phone}
          required
          disabled={editForm && editForm === "close"}
          className="disabled:opacity-50 bg-(--input) w-full rounded-md p-2 text-(--primary)  outline-0"
        />
        <label htmlFor="email" className="font-medium text-(--primary)">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={userInfo.email || ""}
          ref={email}
          required
          disabled={editForm && editForm === "close"}
          className="disabled:opacity-50 bg-(--input) w-full rounded-md p-2  outline-0 text-(--primary)"
        />
        <label htmlFor="city" className="font-medium text-(--primary)">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue={userInfo.city || ""}
          ref={city}
          required
          disabled={editForm && editForm === "close"}
          className="disabled:opacity-50 bg-(--input) w-full rounded-md p-2  outline-0 text-(--primary)"
        />
        <label htmlFor="address" className="font-medium text-(--primary)">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={userInfo.address || ""}
          ref={address}
          required
          disabled={editForm && editForm === "close"}
          className="disabled:opacity-50 bg-(--input) w-full rounded-md p-2  outline-0 text-(--primary)"
        />
      </form>
    </>
  );
}
