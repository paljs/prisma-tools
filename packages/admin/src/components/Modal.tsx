import React from 'react';

interface ModalProps {
  on: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, on, toggle }) => {
  if (!on) return <></>;
  return (
    <div
      style={{ zIndex: 2000 }}
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
    >
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-25" onClick={toggle} />
      <div className="relative w-full my-6 mx-auto lg:w-10/12 max-w-full">{children}</div>
    </div>
  );
};

export default Modal;
