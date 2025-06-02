import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref, children, closeButton, noButton, modalClass, buttonClass }) {
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
  });

  return createPortal(
    <dialog ref={dialog} className={modalClass}>
      <div
        className={`fixed  inset-0  bg-[#3b3b3be0] z-50 transition-transform duration-300 ease-in-out  ${modalClass} `}
      >
        {children}
      </div>
      <form method="dialog">
        <button hidden={!noButton} className={buttonClass}>
          {closeButton}
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
