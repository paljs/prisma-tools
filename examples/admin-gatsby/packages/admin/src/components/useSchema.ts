import { useContext } from 'react';
import { LayoutContext } from '../Layouts';

export const useModel = (name: string) => {
  const {
    schema: { models },
  } = useContext(LayoutContext);
  return models.find((item) => item.id === name);
};

export const useEnum = (name: string) => {
  const {
    schema: { enums },
  } = useContext(LayoutContext);
  return enums.find((item) => item.name === name);
};
