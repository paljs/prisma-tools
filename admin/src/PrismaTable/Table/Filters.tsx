import React, { useContext, useState } from 'react';

import Select from '../../components/Select';
import { useFilter } from './useFilter';
import { useEnum, useModel } from '../useSchema';
import { SchemaField, SchemaModel } from '../../types';
import { TableContext } from '../Context';
import { SearchCircleIcon } from '@heroicons/react/solid';
import { buttonClasses, inputClasses } from '../../components/css';

interface Option {
  id: any;
  name: any;
}

interface FilterComponentsProps {
  filterValue: any;
  setFilter: (value: any) => void;
  field: SchemaField;
}

interface FilterProps {
  model: SchemaModel;
  setAllFilters: (values: { id: string; value: any }[]) => void;
  filters: { id: string; value: any }[];
}

export const Filter: React.FC<FilterProps> = ({
  model,
  setAllFilters,
  filters,
}) => {
  const options: Option[] = model.fields
    .filter((f) => f.filter)
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((f) => ({ id: f.name, name: f.title }));
  const { dir } = useContext(TableContext);

  const [option, setOption] = useState<Option>(options[0]);

  const getField = model.fields.find((f) => f.name === option.id)!;
  const optionFilterValue = filters.find((f) => f.id === option.id);

  const props: FilterComponentsProps = {
    field: getField,
    filterValue: optionFilterValue?.value,
    setFilter: (value) => {
      if (!value && optionFilterValue) {
        setAllFilters([...filters.filter((value1) => value1.id !== option.id)]);
      } else {
        setAllFilters([...filters, { id: option.id, value }]);
      }
    },
  };

  let filterComponent;
  if (getField.kind === 'enum') {
    filterComponent = <EnumFilter {...props} />;
  } else if (getField.kind === 'object') {
    filterComponent = <ObjectFilter {...props} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'BigInt':
      case 'Decimal':
      case 'Float':
        filterComponent = <Number {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter {...props} />;
        break;
      case 'DateTime':
        filterComponent = <DateTime {...props} />;
        break;
      case 'String':
        filterComponent = <StringFilter {...props} />;
        break;
    }
  }

  return (
    <div
      className={`flex space-x-4 ${
        dir === 'rtl' ? 'space-x-reverse' : ''
      } items-center bg-white rounded-lg shadow p-4 mb-4`}
    >
      <Select
        value={option}
        onChange={(option: Option) => setOption(option)}
        options={options}
      />
      {filterComponent}
    </div>
  );
};

const Number: React.FC<FilterComponentsProps> = ({
  filterValue,
  setFilter,
}) => {
  const { value, onChange } = useFilter(filterValue, setFilter, true);
  const { lang } = useContext(TableContext);
  const options: Option[] = [
    { id: 1, name: lang.equals },
    { id: 2, name: lang.range },
  ];
  const [option, setOption] = useState<Option>(options[0]);
  return (
    <>
      <Select
        value={option}
        onChange={(option: Option) => setOption(option)}
        options={options}
      />
      {option.id === 1 ? (
        <input
          style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
          className={inputClasses.replace('py-2 px-4', 'py-2 px-3 ')}
          placeholder={lang.equals}
          type="number"
          value={value?.equals ?? ''}
          onChange={(event) => onChange({ event, name: 'equals' })}
        />
      ) : (
        <>
          <input
            style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
            className={inputClasses.replace('py-2 px-4', 'py-2 px-3 ')}
            placeholder={lang.min}
            type="number"
            value={value?.gte ?? ''}
            onChange={(event) => onChange({ event, name: 'gte' })}
          />
          <input
            style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
            className={inputClasses.replace('py-2 px-4', 'py-2 px-3 ')}
            placeholder={lang.max}
            type="number"
            value={value?.lte ?? ''}
            onChange={(event) => onChange({ event, name: 'lte' })}
          />
        </>
      )}
      <button
        className={
          buttonClasses +
          'rounded-md py-2 px-3 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800'
        }
        onClick={() => onChange()}
      >
        {lang.clear}
      </button>
    </>
  );
};

const DateTime: React.FC<FilterComponentsProps> = ({
  filterValue,
  setFilter,
}) => {
  const { value, onChange } = useFilter(filterValue, setFilter);
  const { lang } = useContext(TableContext);
  return (
    <>
      <span className="whitespace-nowrap">{lang.startDate}</span>
      <input
        style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
        className={inputClasses.replace('py-2 px-4', 'py-2 px-3 ')}
        placeholder={lang.min}
        type="date"
        value={value?.gte ?? ''}
        onChange={(event) => onChange({ event, name: 'gte' })}
      />
      <span className="whitespace-nowrap">{lang.endDate}</span>
      <input
        style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
        className={inputClasses.replace('py-2 px-4', 'py-2 px-3 ')}
        placeholder={lang.max}
        type="date"
        value={value?.lte ?? ''}
        onChange={(event) => onChange({ event, name: 'lte' })}
      />
      <button
        className={
          buttonClasses +
          'rounded-md py-2 px-3 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800'
        }
        onClick={() => onChange()}
      >
        {lang.clear}
      </button>
    </>
  );
};

export const BooleanFilter: React.FC<FilterComponentsProps> = ({
  filterValue,
  setFilter,
}) => {
  const { lang } = useContext(TableContext);
  const { value, onChange } = useFilter(filterValue, setFilter);
  const options: Option[] = [
    { id: undefined, name: lang.all },
    { id: true, name: lang.yes },
    { id: false, name: lang.no },
  ];
  return (
    <Select
      value={options.find((option) => option.id === value?.equals)}
      onChange={(option: Option) =>
        onChange({ value: option.id, name: 'equals' })
      }
      options={options}
    />
  );
};

export const StringFilter: React.FC<FilterComponentsProps> = ({
  filterValue,
  setFilter,
}) => {
  const { value, onChange } = useFilter(filterValue, setFilter);
  const { lang } = useContext(TableContext);
  return (
    <>
      <input
        style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
        className={inputClasses.replace('py-2 px-4', 'py-2 px-3 ')}
        type="text"
        value={value?.contains ?? ''}
        onChange={(event) => onChange({ event, name: 'contains' })}
      />
      <button
        className={
          buttonClasses +
          'rounded-md py-2 px-3 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800'
        }
        onClick={() => onChange()}
      >
        {lang.clear}
      </button>
    </>
  );
};

export const EnumFilter: React.FC<FilterComponentsProps> = ({
  field,
  filterValue,
  setFilter,
}) => {
  const { lang } = useContext(TableContext);
  const enumType = useEnum(field.type);
  const options: Option[] = [{ id: undefined, name: lang.all }];
  if (enumType) {
    options.push(...enumType.fields.map((item) => ({ id: item, name: item })));
  }
  const { value, onChange } = useFilter(filterValue, setFilter);
  return (
    <Select
      value={options.find((option) => option.id === value?.equals)}
      onChange={(option: Option) =>
        onChange({ value: option.id, name: 'equals' })
      }
      options={options}
    />
  );
};

const ObjectFilter: React.FC<FilterComponentsProps> = ({
  field,
  filterValue,
  setFilter,
}) => {
  const model = useModel(field.type)!;
  const [currentField, setCurrentField] = useState<Option>({
    id: model.fields[0].name,
    name: model.fields[0].title,
  });
  const getField = model.fields.find((item) => item.name === currentField.id)!;
  const filter = filterValue
    ? field.list
      ? filterValue.some
      : filterValue
    : {};
  const props: FilterComponentsProps = {
    field: getField,
    filterValue: filter[getField.name],
    setFilter: (value: any) => {
      const newValue = { ...filter };
      if (value) {
        newValue[getField.name] = value;
      } else {
        delete newValue[getField.name];
      }
      setFilter(
        Object.keys(newValue).length > 0
          ? field.list
            ? { some: newValue }
            : newValue
          : undefined,
      );
    },
  };

  let filterComponent;
  if (getField.kind === 'enum') {
    filterComponent = <EnumFilter {...props} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'Float':
        filterComponent = <Number {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter {...props} />;
        break;
      case 'DateTime':
        filterComponent = <DateTime {...props} />;
        break;
      case 'String':
        filterComponent = <StringFilter {...props} />;
        break;
    }
  }
  return (
    <>
      <Select
        value={currentField}
        onChange={(option: Option) => {
          if (option) {
            setCurrentField(option);
          }
        }}
        options={
          model.fields
            .filter(
              (item) =>
                item.kind !== 'object' && !item.list && item.type !== 'Json',
            )
            .sort((a, b) => a.order - b.order)
            .map((item) => ({
              id: item.name,
              name: (
                <div className="flex items-center">
                  <span>{item.title}</span>{' '}
                  {filter[item.name] && (
                    <SearchCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
              ),
            })) as any
        }
      />
      {filterComponent}
    </>
  );
};
