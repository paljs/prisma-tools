import React from 'react';
import { classNames } from './css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, indeterminate, className, ...rest }) => {
  return (
    <label htmlFor={id} className={classNames(label ? '' : 'justify-center', 'flex items-center space-x-3')}>
      <input
        id={id}
        type="checkbox"
        className={classNames(
          className || '',
          'form-checkbox rounded text-blue-600 h-5 w-5 outline-none focus:outline-none focus:ring-1 focus:ring-opacity-25 focus:ring-offset-blue-300',
        )}
        style={
          indeterminate
            ? {
                borderColor: 'transparent',
                backgroundColor: 'currentColor',
                backgroundSize: '100% 100%,',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='2' x='4' y='7' rx='1'/%3E%3C/svg%3E\")",
              }
            : {}
        }
        {...rest}
      />
      {label && <span className="text-gray-600 whitespace-nowrap pr-1.5">{label}</span>}
    </label>
  );
};

export default Checkbox;
