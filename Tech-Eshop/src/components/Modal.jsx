import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref, children, modalClass, closeButton }) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    };
  }, []);

  return createPortal(
    <dialog ref={dialog}>
      <div
        className={`fixed  inset-0  bg-[#3b3b3be0] z-50 transition-transform duration-300 ease-in-out  ${modalClass} `}
      >
        {children}
        {closeButton && <button className="bg-stone-800 py-0.5 px-2 text-sm md:text-lg text-stone-50 hover:bg-stone-700 rounded-2xl" onClick={() => dialog.current.close()}>Cancel</button>}
         
      </div>
    
    </dialog>,
    document.getElementById("modal")
  );
}
