export const inputClasses =
  'focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white shadow-sm placeholder-gray-300 border border-gray-300 rounded-md text-gray-600 bg-gray-50 py-2 px-4 w-full';

export const buttonClasses =
  'disabled:opacity-50 disabled:cursor-not-allowed font-semibold uppercase  outline-none focus:outline-none ease-linear transition-all duration-150 ';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
