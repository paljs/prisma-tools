import React, { useEffect, useState } from 'react';

export const useFilter = (
  init: any,
  setFilter: (value: any) => void,
  number?: boolean,
) => {
  const [state, setState] = useState<{
    value: any;
    typingTimeout?: number;
  }>({
    value: init ?? {},
  });

  useEffect(() => {
    setState({ value: init || {} });
  }, [init]);

  const onChangeHandler = (newValue: any) => {
    let search: any = false;
    Object.keys(newValue).forEach((key) => {
      if (newValue[key] !== undefined) {
        if (!search) {
          search = {};
        }
        search[key] = newValue[key];
      }
    });
    setFilter(search ?? undefined);
  };

  const onChange: (options?: {
    event?: React.ChangeEvent<HTMLInputElement>;
    name?: string;
    value?: any;
  }) => void = (options) => {
    if (!options) {
      setState({ value: {} });
      onChangeHandler({});
    } else if (options.name) {
      const { event, name, value } = options;
      const search = event?.target.value || value;
      if (state.typingTimeout) clearTimeout(state.typingTimeout);
      const newValue = {
        ...state.value,
        [name]:
          search || value === false
            ? number
              ? parseFloat(search)
              : search
            : undefined,
      };
      setState({
        value: newValue,
        typingTimeout: setTimeout(
          function () {
            onChangeHandler(newValue);
          },
          !event ? 1 : 1000,
        ),
      });
    }
  };

  return {
    value: state.value,
    onChange,
  };
};
