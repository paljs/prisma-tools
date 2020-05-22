import React, { useContext, useState } from 'react';
import { OrderByArg } from '../../generated';
import { LayoutContext } from '../../Layouts';

const filterMemo = (modelName: string, filter?: any) => {
  const {
    schema: { models },
  } = useContext(LayoutContext);
  return React.useMemo(() => {
    const initialValue: any[] = [];
    if (filter) {
      const model = models.find((item) => item.id === modelName);
      Object.keys(filter).forEach((key) => {
        if (model && filter[key]) {
          const field = model.fields.find((item) => item.type === key);
          const fieldModel = models.find((item) => item.id === field?.type);
          if (fieldModel) {
            const filterValue = {
              [fieldModel.idField]: {
                equals: parseInt(filter[key]),
              },
            };
            const value = field?.list ? { some: filterValue } : filterValue;
            initialValue.push({
              id: field ? field.name : key,
              value,
            });
          }
          if (key === 'id') {
            initialValue.push({
              id: key,
              value: {
                equals: parseInt(filter[key]),
              },
            });
          }
        }
      });
    }
    return initialValue;
  }, [filter, models]);
};

const handleFilter = (filters: { id: string; value: any }[]) => {
  if (filters.length) {
    const newWhere: { [key: string]: { [key: string]: object } } = {};
    filters.forEach((item) => {
      newWhere[item.id] = item.value;
    });
    return newWhere;
  }
  return undefined;
};

export const useFilterAndSort = (model: string, filter?: any) => {
  const initialFilter = filterMemo(model, filter);
  const [where, setWhere] = useState<any>();
  const [orderBy, setOrderBy] = useState<any>();

  const filterHandler = (filters: { id: string; value: any }[]) => {
    setWhere(handleFilter(filters));
  };

  const sortByHandler = (sortBy: { id: string; desc: boolean }[]) => {
    if (sortBy.length > 0) {
      const newOrderBy: { [key: string]: OrderByArg } = {};
      sortBy.forEach((item) => {
        newOrderBy[item.id.split('.')[0]] = item.desc ? OrderByArg.Desc : OrderByArg.Asc;
      });
      setOrderBy(newOrderBy);
    } else if (orderBy) {
      setOrderBy(undefined);
    }
  };

  return {
    where,
    orderBy,
    initialFilter,
    filterHandler,
    sortByHandler,
  };
};
