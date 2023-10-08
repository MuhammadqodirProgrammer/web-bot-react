import React, { useRef } from "react";
import { GrClose } from "react-icons/gr";
import "./modal.css";
import { AiOutlineClose } from "react-icons/ai";



export const Modal = ({
  modal,
  setModal,
  children,
  title,
  width,
}) => {
  const overlayRef = useRef(null);

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className={`overlay   ${modal ? "open" : ""}`}
    >
      <div className={`w-[${width}] modal_wrapper bg-white dark:bg-topColor`}>
        <button
          onClick={() => setModal(false)}
          className={`btn modal_button text-black dark:text-white  rounded-0`}
        >
          <AiOutlineClose size={20} />
        </button>
        <div className={` modal_header`}>
          <h3 className="font-semibold text-[30px] text-black dark:text-white">
            {title}
          </h3>
        </div>
        <div className={`modal-content`}>{children}</div>
      </div>
    </div>
  );
};
