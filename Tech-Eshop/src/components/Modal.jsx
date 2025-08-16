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
        className={`fixed gap-3 inset-0 bg-[#3b3b3be0] z-50 transition-transform duration-300 ease-in-out ${modalClass} `}
      >
        {children}
        {closeButton && <button className="bg-stone-800 md:py-2 py-3 md:px-4 px-4.5  text-md md:text-lg text-stone-50 hover:text-stone-900 hover:bg-stone-200 rounded-4xl" onClick={() => dialog.current.close()}>X</button>}
         
      </div>
    
    </dialog>,
    document.getElementById("modal")
  );
}
