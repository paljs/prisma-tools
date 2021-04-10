import { useContext } from 'react';
import { TableContext } from './Context';

export const useModel = (name: string) => {
  const {
    schema: { models },
  } = useContext(TableContext);
  return models.find((item) => item.id === name);
};

export const useEnum = (name: string) => {
  const {
    schema: { enums },
  } = useContext(TableContext);
  return enums.find((item) => item.name === name);
};
