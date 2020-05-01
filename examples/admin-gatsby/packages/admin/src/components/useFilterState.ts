import { useState } from 'react';

export const useFilterState = <T>(init: T) => {
  const [state, setState] = useState({
    value: init,
    typingTimeout: 0,
  });

  const onChange = (value: T, handler: (value: T) => void) => {
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    setState({
      value: value,
      typingTimeout: setTimeout(function () {
        handler(value);
      }, 1000),
    });
  };

  return {
    onChange,
  };
};
