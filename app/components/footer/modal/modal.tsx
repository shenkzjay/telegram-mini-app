import { forwardRef, Ref, useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children }, ref: Ref<HTMLDialogElement>) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    // useEffect(() => {
    //   const handleOutsideModalClick = (event: MouseEvent) => {
    //     const dialogElement = ref && "current" in ref ? ref.current : dialogRef.current;

    //     if (dialogElement && !dialogElement.contains(event?.target as Node) && dialogElement.open) {
    //       dialogElement.close();
    //     }
    //   };

    //   document.addEventListener("click", handleOutsideModalClick);

    //   return () => {
    //     document.removeEventListener("click", handleOutsideModalClick);
    //   };
    // }, [ref]);

    const closeModal = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.close();
      }
    };

    return (
      <dialog ref={ref || dialogRef} className=" rounded-xl footerbg">
        <button className="px-6 py-1 flex justify-end w-full text-white" onClick={closeModal}>
          close
        </button>
        {children}
      </dialog>
    );
  }
);

export { Modal };
