import React, { useState } from 'react';

export const useFilter = (init: any, setFilter: (value: any) => void, number?: boolean) => {
  const [state, setState] = useState({
    value: init ?? {},
    typingTimeout: 0,
  });

  const onChangeHandler = (newValue: any) => {
    let search: any = false;
    Object.keys(newValue).forEach((key) => {
      if (newValue[key]) {
        if (!search) {
          search = {};
        }
        search[key] = newValue[key];
      }
    });
    setFilter(search ?? undefined);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const search = event.target.value;
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    const newValue = {
      ...state.value,
      [name]: search ? (number ? parseInt(event.target.value) : event.target.value) : undefined,
    };
    setState({
      value: newValue,
      typingTimeout: setTimeout(function () {
        onChangeHandler(newValue);
      }, 1000),
    });
  };

  return {
    value: state.value,
    onChange,
  };
};
