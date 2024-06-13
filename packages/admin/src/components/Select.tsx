import React from 'react';
import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { classNames } from './css';

export interface Option {
  name: string;
  id: string;
  unavailable?: boolean;
}

interface SelectProps {
  options: Option[];
  value?: Option | Option[];
  onChange: (option: Option) => void;
  disabled?: boolean;
  className?: string;
  dir?: string;
  popupFullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, value, className, onChange, disabled, dir, popupFullWidth }) => {
  return (
    <Listbox
      as="div"
      style={{ minWidth: '120px' }}
      className={classNames(className || '', 'space-y-1')}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <span className="inline-block w-full rounded-md shadow-sm">
              <ListboxButton
                className={classNames(
                  'cursor-default flex items-center justify-between relative w-full rounded-md border border-gray-300 font-bold text-gray-500 bg-gray-50 px-3 py-2',
                  dir === 'rtl' ? 'text-right' : 'text-left',
                  'focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition ease-in-out duration-150 sm:text-sm sm:leading-5',
                )}
              >
                <span className="block truncate">
                  {!value ? 'Select...' : Array.isArray(value) ? value.map((v) => v.name).join(', ') : value?.name}
                </span>
                <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
              </ListboxButton>
            </span>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions
                static
                className={classNames(
                  popupFullWidth ? 'w-full' : '',
                  'mt-1 min-w-[120px] z-50 absolute rounded-md bg-white shadow-lg max-h-60 py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5',
                )}
              >
                {options.map((item) => (
                  <ListboxOption key={item.id + item.name} value={item} disabled={item.unavailable}>
                    {({ focus }) => {
                      const selected =
                        (Array.isArray(value) && !!value.find((v) => v.id === item.id)) ||
                        (!Array.isArray(value) && value?.id === item.id);
                      return (
                        <div
                          className={classNames(
                            focus
                              ? 'text-white bg-blue-600'
                              : item.unavailable
                                ? 'bg-gray-300 text-gray-900'
                                : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-8 pr-4',
                          )}
                        >
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {item.name}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                focus ? 'text-white' : 'text-blue-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </div>
                      );
                    }}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
