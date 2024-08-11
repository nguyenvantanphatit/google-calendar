import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

interface ModalProps {
  visibleModal: boolean;
  wrapperClassName?: string;
  contentClassName?: string;
  bodyClassName?: string;
  children: ReactNode;
  onClose: () => void;
  fill?: string;
  showCloseButton?: boolean;
}

const Modal = ({
  visibleModal,
  wrapperClassName = "",
  contentClassName = "",
  bodyClassName = "",
  children,
  onClose,
  fill = "black",
  showCloseButton = false,
}: ModalProps) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`m-auto justify-center items-center flex overflow-hidden fixed inset-0 z-[101] outline-none focus:outline-none transition-all duration-300 w-[90%] sm:w-[940px] ${wrapperClassName} ${(visibleModal ? "visible opacity-1" : "invisible opacity-0")
          }`}
      >
        <div
          style={{
          }}
          className={`relative p-4 md:p-4 rounded-3xl border border-[#5684AE]  max-h-[95vh] min-h-[460px] w-full bg-slate-50  bottom-0 sm:bottom-auto sm:block ${contentClassName}`}
        >
          {showCloseButton && (
            <button onClick={onClose} className="absolute top-6 right-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" fill="#5684AE">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" /></svg>
            </button>
          )}
          <div className={bodyClassName}>{children}</div>
        </div>
      </div>
      <button
        onClick={onClose}
        className={`fixed inset-0 z-[100] transition-all duration-300 ${visibleModal ? "visible opacity-1" : "invisible opacity-0"
          }`}
      />
    </>
  );
}

export default Modal;
