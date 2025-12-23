import { useState } from "react";


export default function Footer() {

  const [show, setShow] = useState(false);


  return (
    <>
      <button className="text-stone-50 w-fit fixed bottom-3 right-3 text-center bg-stone-900 rounded-full px-4 py-1.5 text-xl" onClick={() => setShow((prev) => !prev)}>?</button>
      <footer
        className={`${
          show ? "opacity-100 translate-y-0" : "translate-y-full opacity-0 "
        } transition-all duration-400 ease-in-out w-full fixed flex flex-row justify-center text-center items-start bottom-0 bg-stone-900 text-stone-50 xl:gap-50 lg:gap-30 md:gap-13 gap-0.5`}
      >
        <button
          onClick={() => setShow((prev) => !prev)}
          className="absolute top-3 right-5"
        >
          X
        </button>
        <div className="py-3 md:text-sm text-xs pl-1">
          <h3 className="md:text-lg text-xs md:font-medium text-red-600 ">
            TERMS OF USE
          </h3>
          <ul className="flex flex-col gap-0.5 ">
            <li>Personal Data</li>
            <li>Privacy Statement</li>
            <li>Copyrights</li>
            <li>Contest Terms</li>
            <li>Terms of Use</li>
          </ul>
        </div>

        <div className="py-3 md:text-sm text-xs px-1">
          <h3 className="md:text-lg text-xs md:font-medium text-red-600">
            SHOPPING POLICY
          </h3>
          <ul className="flex flex-col gap-0.5">
            <li>Transaction Security</li>
            <li>Payment Methods</li>
            <li>Shipping Methods</li>
            <li>Order Cancellation</li>
            <li>Product Returns</li>
          </ul>
        </div>

        <div className="py-3 md:text-sm text-xs px-1">
          <h3 className="md:text-lg text-xs md:font-medium text-red-600">
            FRANCHISE
          </h3>
          <ul className="flex flex-col gap-0.5">
            <li>Join the Franchise</li>
            <li>Become a Partner</li>
          </ul>
        </div>

        <div className="py-3 md:text-sm text-xs px-3">
          <h3 className="md:text-lg text-xs md:font-medium text-red-600">
            INFORMATION
          </h3>
          <ul className="flex flex-col gap-0.5">
            <li>Stores</li>
            <li>Contact</li>
            <li>Help - Questions</li>
            <li>About Us</li>
            <li>Service</li>
          </ul>
        </div>
      </footer>
    </>
  );
}