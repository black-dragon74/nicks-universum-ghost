import { FC, PropsWithChildren } from "react"
import ReactModal from "react-modal"

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(5px)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: 8,
    padding: "40px 40px 40px 40px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--color-modal-ui)",
    border: "none",
    maxHeight: "80vh",
    width: "90%",
    maxWidth: 530,
  },
}

export interface ModalProps extends ReactModal.Props, PropsWithChildren {}

const Modal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={modalStyle}
      {...props}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-end absolute right-3 top-3 bg-gray dark:text-gray-400">
          <button onClick={e => props?.onRequestClose?.(e)}>&#10005;</button>
        </div>
      </div>

      <div className="focus:outline-none">{children}</div>
    </ReactModal>
  )
}

export default Modal
