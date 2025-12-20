import { useImperativeHandle, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ children, modalClass, closeButton }, ref) => {
  const dialog = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          dialog.current.showModal();
        },
        close() {
          dialog.current.close();
        },
      };
    },
    []
  );

  return createPortal(
    <dialog ref={dialog}>
      <div
        className={`fixed gap-3 inset-0 bg-[#00000059] z-50 transition-transform duration-300 ease-in-out ${modalClass} `}
      >
        {children}
        {closeButton && (
          <button
            className="bg-stone-800 md:py-2 py-3 md:px-4 px-4.5  text-md md:text-lg text-stone-50 hover:text-stone-900 hover:bg-stone-200 rounded-4xl"
            onClick={() => dialog.current.close()}
          >
            X
          </button>
        )}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
