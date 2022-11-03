import React from 'react';
import { classNames } from './css';

const Spinner: React.FC<{ h?: string; w?: string }> = ({ h, w }) => {
  return (
    <div
      style={{ backgroundColor: 'rgba(143, 155, 179, 0.25)' }}
      className="opacity-100 absolute top-0 right-0 left-0 bottom-0 overflow-hidden flex justify-center items-center visible z-50"
    >
      <svg
        className={classNames('animate-spin -ml-1 mr-3 text-gray-700', h ? h : 'h-10', w ? w : 'w-10')}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export default Spinner;
