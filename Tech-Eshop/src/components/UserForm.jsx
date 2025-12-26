import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guestActions } from "../store/guestSlice";


export default function UserForm() {
  
  
  const userName = useRef();
  const phone = useRef();
  const email = useRef();
  const city = useRef();
  const address = useRef();
 
  const info = useSelector((state) => state.guest.info);
  const dispatch = useDispatch();
 

  //ON SUBMIT FUNTION THAT SENDS THE INFOS FORM TO BACKEND


   function handleInfos(e) {
     e.preventDefault();
     const isValidPhone = /^\d{10}$/.test(phone);

 

    
    if (
      userName.current.value.trim() === "" ||
      phone.current.value.trim() === "" ||
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
        <label htmlFor="userName" className="font-medium">
          Name
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          defaultValue={info.length !== 0 ? info[0].userName : ""}
          ref={userName}
          required
          className=" bg-(--input) w-full rounded-md p-2  outline-0"
        />

        <label htmlFor="phone" className="font-medium">
          Phone
        </label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          id="phone"
          name="phone"
          defaultValue={info.length !== 0 ? info[0].phone : ""}
          ref={phone}
          required
          className=" bg-(--input) w-full rounded-md p-2  outline-0"
        />
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={info.length !== 0 ? info[0].email : ""}
          ref={email}
          required
          className=" bg-(--input) w-full rounded-md p-2  outline-0"
        />
        <label htmlFor="city" className="font-medium">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue={info.length !== 0 ? info[0].city : ""}
          ref={city}
          required
          className="bg-(--input) w-full rounded-md p-2  outline-0"
        />
        <label htmlFor="address" className="font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={info.length !== 0 ? info[0].address : ""}
          ref={address}
          required
          className="bg-(--input) w-full rounded-md p-2  outline-0"
        />
      </form>
    </>
  );
}