import React, { useContext, useState } from 'react';
import { TableContext } from '../Context';

const filterMemo = (modelName: string, filter?: any) => {
  const {
    schema: { models },
  } = useContext(TableContext);
  return React.useMemo(() => {
    const initialValue: any[] = [];
    if (filter) {
      const model = models.find((item) => item.id === modelName);
      Object.keys(filter).forEach((key) => {
        if (model && filter[key]) {
          // filter by model field type
          const field = model.fields.find((item) => item.type === key);
          const fieldModel = models.find((item) => item.id === field?.type);
          if (fieldModel) {
            const isField = fieldModel.fields.find((field) => field.name === fieldModel.idField);
            const filterValue = {
              [fieldModel.idField]: {
                equals: isField?.type === 'String' ? filter[key] : parseInt(filter[key]),
              },
            };
            const value = field?.list ? { some: filterValue } : { is: filterValue };
            initialValue.push({
              id: field ? field.name : key,
              value,
            });
          }
          // filter by model field name
          const fieldByName = model.fields.find((item) => item.name === key);
          if (fieldByName) {
            initialValue.push({
              id: key,
              value: {
                equals: fieldByName.type === 'String' ? filter[key] : parseInt(filter[key]),
              },
            });
          }
        }
      });
    }
    return initialValue;
  }, [filter, models]);
};

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source: any = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

const handleFilter = (filters: { id: string; value: any }[]) => {
  if (filters.length) {
    const newWhere: Record<string, Record<string, any>> = {};
    filters.forEach((item) => {
      // Check if an entry with the same id already exists
      if (newWhere[item.id]) {
        // If the value for the existing entry is an object, and the new value is also an object, merge them
        if (isObject(newWhere[item.id]) && isObject(item.value)) {
          newWhere[item.id] = mergeDeep(newWhere[item.id], item.value);
        } else {
          // Otherwise, just overwrite it (or you can handle it differently if needed)
          newWhere[item.id] = item.value;
        }
      } else {
        newWhere[item.id] = item.value;
      }
    });
    return newWhere;
  }
  return undefined;
};

type OrderBy = Record<string, 'asc' | 'desc' | { sort: 'asc' | 'desc'; nulls: 'last' | 'first' }>;

export const useFilterAndSort = (model: string, filter?: any, defaultOrder?: OrderBy[]) => {
  const initialFilter = filterMemo(model, filter);
  const {
    schema: { models },
  } = useContext(TableContext);
  const [where, setWhere] = useState<any>(handleFilter(initialFilter));
  const [orderBy, setOrderBy] = useState<OrderBy[] | undefined>(defaultOrder);

  const filterHandler = (filters: { id: string; value: any }[]) => {
    setWhere(handleFilter(JSON.parse(JSON.stringify(filters))));
  };

  const sortByHandler = (sortBy: { id: string; desc: boolean }[]) => {
    if (sortBy.length > 0) {
      const newOrderBy: OrderBy[] = [];
      sortBy.forEach((item) => {
        const field = item.id.split('.')[0];
        const modelObject = models.find((item) => item.id === model);
        const fieldModel = modelObject?.fields.find((item) => item.name === field);
        newOrderBy.push({
          [field]: fieldModel?.required
            ? item.desc
              ? 'desc'
              : 'asc'
            : { sort: item.desc ? 'desc' : 'asc', nulls: 'last' },
        });
      });
      setOrderBy(newOrderBy);
    } else if (orderBy) {
      setOrderBy(defaultOrder);
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
