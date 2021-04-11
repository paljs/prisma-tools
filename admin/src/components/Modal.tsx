import React from 'react';

interface ModalProps {
  on: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, on, toggle }) => {
  if (!on) return <></>;
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div
        className="absolute inset-0 w-full h-full bg-black bg-opacity-25"
        onClick={toggle}
      />
      <div className="relative w-auto my-6 mx-auto md:max-w-5xl max-w-full">
        {children}
      </div>
    </div>
  );
};

export default Modal;
