import React from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

interface ModalProps {
  on: boolean;
  toggle: () => void;
}

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ children, on, toggle }) => {
  if (!on) return <></>;
  return (
    <Transition as={Dialog} className="relative z-50" show={on} onClose={toggle}>
      <div className="fixed inset-0 overflow-y-auto">
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4">
            <DialogPanel className="inline-block transform align-middle transition-all w-full lg:w-5/6">
              {children}
            </DialogPanel>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default Modal;
