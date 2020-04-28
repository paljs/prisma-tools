import React, { useState } from 'react';
import { CourseTakingOrderByInput, CourseTakingWhereInput, OrderByArg } from '../../generated';
import { SchemaModel } from '@prisma-tools/admin';
import { useModel } from '../useSchema';

const filterMemo = (filter?: any, model?: SchemaModel | null) =>
  React.useMemo(() => {
    let initialValue: any[] = [];
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (model && filter[key]) {
          const field = model.fields.find((item) => item.type === key);
          initialValue.push({
            id: field ? field.name + '.id' : 'id',
            value: {
              equals: parseInt(filter[key]),
            },
          });
        }
      });
    }
    return initialValue;
  }, [filter, model]);

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

export const useFilterAndSort = (model: string, filter?: any) => {
  const initialFilter = filterMemo(filter, useModel(model));
  const [where, setWhere] = useState<CourseTakingWhereInput | null>();
  const [orderBy, setOrderBy] = useState<CourseTakingOrderByInput | null>(null);

  if (!where && initialFilter.length > 0) {
    setWhere(handleFilter(initialFilter));
  }

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
