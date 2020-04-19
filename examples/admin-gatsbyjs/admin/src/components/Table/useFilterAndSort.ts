import React, { useState } from 'react';
import { CourseTakingOrderByInput, CourseTakingWhereInput, OrderByArg } from '../../generated';
import { SchemaModel } from '@prisma-tools/admin';

export const useFilterAndSort = (location: any, model?: SchemaModel | null) => {
  const initialFilter = React.useMemo(() => {
    let initialValue = [];
    if (location.state?.id) {
      initialValue.push({
        id: 'id',
        value: {
          equals: parseInt(location.state?.id),
        },
      });
    }
    if (location.state) {
      Object.keys(location.state).forEach((key) => {
        if (model) {
          const field = model.fields.find((item) => item.type === key);
          if (field) {
            initialValue.push({
              id: field.name + '.id',
              value: {
                equals: parseInt(location.state[key]),
              },
            });
          }
        }
      });
    }
    return initialValue;
  }, [location]);

  const [where, setWhere] = useState<CourseTakingWhereInput | null>(handleFilter(initialFilter));
  const [orderBy, setOrderBy] = useState<CourseTakingOrderByInput | null>(null);

  const filterHandler = (filters: { id: string; value: any }[]) => {
    setWhere(handleFilter(filters));
  };

  const sortByHandler = (sortBy: { id: string; desc: boolean }[]) => {
    if (sortBy.length > 0) {
      let newOrderBy: { [key: string]: OrderByArg } = {};
      sortBy.forEach((item) => {
        newOrderBy[item.id.split('.')[0]] = item.desc ? OrderByArg.Desc : OrderByArg.Asc;
      });
      setOrderBy(newOrderBy);
    } else {
      setOrderBy(null);
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

const handleFilter = (filters: { id: string; value: any }[]) => {
  if (filters.length) {
    let newWhere: { [key: string]: { [key: string]: object } } = {};
    filters.forEach((item) => {
      const idArray = item.id.split('.');
      if (idArray.length > 1) {
        newWhere[idArray[0]] = {};
        newWhere[idArray[0]][idArray[1]] = item.value;
      } else {
        newWhere[idArray[0]] = item.value;
      }
    });
    return newWhere;
  }
  return null;
};
