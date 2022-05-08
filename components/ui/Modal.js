import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = (props) => {
  const { show, title, subTitle, onClose = null } = props;
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-20 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl min-w-[420px] max-w-[600px] relative shadow">
        <button
          type="button"
          onClick={() => {
            onClose && onClose();
          }}
          className="
            w-[24px] h-[24px] bg-white rounded-full flex justify-center items-center absolute right-[-24px] top-[-24px] transition
            hover:opacity-100 hover:bg-red-500 hover:text-white
          "
        >
          <IoClose />
        </button>
        {title && (
          <div className="mb-4">
            {title && <h2 className="font-bold text-2xl">{title}</h2>}
            {subTitle && <div className="text-sm">{subTitle}</div>}
          </div>
        )}
        <div>{props.children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
