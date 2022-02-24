import React, { useEffect, useState } from 'react';

export const useFilter = (
  init: any,
  setFilter: (value: any) => void,
  number?: boolean,
) => {
  const [state, setState] = useState<{
    value: any;
    typingTimeout?: NodeJS.Timeout;
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
        if (['in', 'notIn'].includes(key)) {
          search[key] = (newValue[key] as string)
            .split(',')
            .map((item) => (number ? parseFloat(item) : item));
        } else {
          search[key] = number ? parseFloat(newValue[key]) : newValue[key];
        }
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
      const search: string = event?.target.value || value;
      if (state.typingTimeout) clearTimeout(state.typingTimeout);

      const newValue = {
        [name]: search || value === false ? search : undefined,
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
