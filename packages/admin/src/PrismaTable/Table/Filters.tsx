/* eslint  @typescript-eslint/no-non-null-assertion: 0 */
import React, { useContext, useState, useEffect } from 'react';

import Select from '../../components/Select';
import { useFilter } from './useFilter';
import { useEnum, useModel } from '../useSchema';
import { AdminSchemaField, AdminSchemaModel } from '../../types';
import { TableContext } from '../Context';
import { MagnifyingGlassCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { buttonClasses, classNames, inputClasses } from '../../components/css';
import { randString } from './utils';

interface Option {
  id: any;
  name: any;
}

interface FilterComponentsProps {
  filterValue: any;
  setFilter: (value: any) => void;
  field: AdminSchemaField;
}

interface FilterProps {
  model: AdminSchemaModel;
  setAllFilters: (values: { id: string; value: any }[]) => void;
  filters: { id: string; value: any }[];
}

const removeByIndexWithSplice = (array: any[], index: number) => {
  const newArr = array.slice(); // create a copy of the original array
  newArr.splice(index, 1); // remove the item at the specified index
  return newArr; // return the modified array
};

export const Filter: React.FC<FilterProps> = ({ model, setAllFilters, filters }) => {
  const [state, setState] = useState(filters.map(() => randString(10)));
  const { lang } = useContext(TableContext);

  const deleteFilter = (index: number) => {
    setState(removeByIndexWithSplice(state, index));
    setAllFilters(removeByIndexWithSplice(filters, index));
  };

  return (
    <div className={`flex w-full flex-col bg-white rounded-lg shadow border border-gray-300`}>
      {state.map((key, index) => (
        <FilterRow
          model={model}
          key={key}
          index={index}
          deleteFilter={() => deleteFilter(index)}
          filter={filters[index]}
          setFilter={({ id, value }) => {
            // Deep clone filters to break references
            const newFilters = JSON.parse(JSON.stringify(filters));

            if (!value) {
              setAllFilters(removeByIndexWithSplice(newFilters, index));
              return;
            }

            newFilters[index] = { id, value: { ...value } };

            // Update the filters state
            setAllFilters(newFilters);
          }}
        />
      ))}
      {state.length === 0 && <div className="p-2 text-gray-500">{lang.nonFilterMsg}</div>}
      <div className="w-full p-2">
        <button
          type="button"
          className={classNames(
            buttonClasses,
            'rounded-md py-2 px-2 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800',
          )}
          onClick={() => setState((prev) => prev.concat([randString(10)]))}
        >
          {lang.addFilter}
        </button>
      </div>
    </div>
  );
};

interface FilterRowProps {
  index: number;
  model: AdminSchemaModel;
  filter?: { id: string; value: any };
  setFilter: (option: { id: string; value: any }) => void;
  deleteFilter: () => void;
}

const FilterRow: React.FC<FilterRowProps> = ({ model, filter, setFilter, index, deleteFilter }) => {
  const options: Option[] = model.fields
    .filter((f) => f.filter)
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((f) => ({ id: f.name, name: f.title }));
  const { dir } = useContext(TableContext);

  const [option, setOption] = useState<Option>(!filter ? options[0] : options.find((item) => item.id === filter.id)!);

  const getField = model.fields.find((f) => f.name === option.id)!;
  const props: FilterComponentsProps = {
    field: getField,
    filterValue: getField.name === filter?.id ? filter.value : undefined,
    setFilter: (value) => setFilter({ id: option.id, value }),
  };
  let filterComponent;
  if (getField.kind === 'enum') {
    filterComponent = <EnumFilter key={getField.name + index} {...props} />;
  } else if (getField.kind === 'object') {
    filterComponent = <ObjectFilter key={getField.name + index} {...props} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'BigInt':
      case 'Decimal':
      case 'Float':
      case 'DateTime':
      case 'String':
        filterComponent = <DefaultFilter key={getField.name + index} {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter key={getField.name + index} {...props} />;
        break;
    }
  }
  return (
    <div
      className={classNames(
        'flex flex-col space-y-2 items-center border-b border-gray-500 bg-gray-200 p-1 md:space-y-0 md:flex-row md:space-x-2',
        dir === 'rtl' ? 'md:space-x-reverse' : '',
        index === 0 ? 'rounded-t-lg' : '',
      )}
    >
      <Select dir={dir} value={option} onChange={(option: Option) => setOption(option)} options={options} />
      {filterComponent}
      <button
        type="button"
        className={classNames(
          buttonClasses,
          'bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-75 p-2 rounded-full',
        )}
        onClick={deleteFilter}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const DefaultFilter: React.FC<FilterComponentsProps> = ({ filterValue, setFilter, field }) => {
  const { value, onChange } = useFilter(filterValue, setFilter, !['String', 'DateTime'].includes(field.type));
  const { lang, dir } = useContext(TableContext);

  const getName = (name: string): any => {
    return (
      <div className="flex items-center">
        <span>{name}</span>{' '}
        {filterValue && filterValue[name] && <MagnifyingGlassCircleIcon className="h-5 w-5 text-green-500" />}
      </div>
    );
  };
  const options: Option[] = ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'].map((item) => ({
    id: item,
    name: getName(lang[item as 'gt']),
  }));
  if (options.length === 8 && field.type === 'String') {
    options.push(
      ...['contains', 'startsWith', 'endsWith'].map((item) => ({
        id: item,
        name: getName(lang[item as 'gt']),
      })),
    );
  }
  const [option, setOption] = useState<Option>(
    filterValue ? options.find((item) => !!filterValue[item.id])! : options[0],
  );

  const inputProps =
    field.type === 'DateTime'
      ? {
          type: 'datetime-local',
          defaultValue: value[option.id] ? new Date(value[option.id]).toISOString().slice(0, 16) : undefined,
        }
      : { type: 'text', value: value[option.id] || '' };

  return (
    <>
      <Select
        key={field.id}
        dir={dir}
        value={option}
        onChange={(option: Option) => setOption(option)}
        options={options}
      />
      <input
        style={{ maxWidth: '13rem', lineHeight: 'inherit' }}
        className={inputClasses.replace('py-2 px-4', 'py-2 px-3 text-sm')}
        placeholder={lang[option.id as 'gt']}
        {...inputProps}
        onChange={(event) =>
          onChange({
            name: option.id,
            value: field.type === 'DateTime' ? new Date(event.target.value).toISOString() : event.target.value,
            wait: true,
          })
        }
      />
    </>
  );
};

export const BooleanFilter: React.FC<FilterComponentsProps> = ({ filterValue, setFilter }) => {
  const { lang, dir } = useContext(TableContext);
  const { value, onChange } = useFilter(filterValue, setFilter);
  const options: Option[] = [
    { id: undefined, name: lang.all },
    { id: true, name: lang.yes },
    { id: false, name: lang.no },
  ];
  return (
    <Select
      dir={dir}
      value={options.find((option) => option.id === value?.equals)}
      onChange={(option: Option) => onChange({ value: option.id, name: 'equals' })}
      options={options}
    />
  );
};

export const EnumFilter: React.FC<FilterComponentsProps> = ({ field, filterValue, setFilter }) => {
  const { lang, dir } = useContext(TableContext);
  const enumType = useEnum(field.type);
  const options: Option[] = [{ id: undefined, name: lang.all }];
  if (enumType) {
    options.push(...enumType.fields.map((item) => ({ id: item, name: item })));
  }
  const { value, onChange } = useFilter(filterValue, setFilter);
  return (
    <Select
      dir={dir}
      value={options.find((option) => option.id === value?.equals)}
      onChange={(option: Option) => onChange({ value: option.id, name: 'equals' })}
      options={options}
    />
  );
};

const ObjectFilter: React.FC<FilterComponentsProps> = ({ field, filterValue, setFilter }) => {
  const { dir } = useContext(TableContext);
  const model = useModel(field.type)!;
  const filter = filterValue ? (field.list ? filterValue.some : filterValue.is) : {};
  const options = model.fields
    .filter((item) => item.filter && item.kind !== 'object' && !item.list && item.type !== 'Json')
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: item.name,
      name: (
        <div className="flex items-center">
          <span className="truncate">{item.title}</span>{' '}
          {filter[item.name] && <MagnifyingGlassCircleIcon className="h-5 w-5 text-green-500" />}
        </div>
      ),
    }));

  const [currentField, setCurrentField] = useState<Option>(
    filterValue ? options.find((item) => !!filter[item.id])! : options[0],
  );

  const getField = model.fields.find((item) => item.name === currentField.id)!;

  const props: FilterComponentsProps | null = getField
    ? {
        field: getField,
        filterValue: filter[getField.name],
        setFilter: (value: any) => {
          const newValue = { ...filter };
          if (value) {
            newValue[getField.name] = value;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete newValue[getField.name];
          }
          setFilter(
            Object.keys(newValue).length > 0 ? (field.list ? { some: newValue } : { is: newValue }) : undefined,
          );
        },
      }
    : null;

  useEffect(() => {
    setCurrentField(filterValue ? options.find((item) => !!filter[item.id])! : options[0]);
  }, [field]);

  if (!props) {
    return null;
  }

  let filterComponent;
  if (getField.kind === 'enum') {
    filterComponent = <EnumFilter {...props} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'BigInt':
      case 'Decimal':
      case 'Float':
      case 'DateTime':
      case 'String':
        filterComponent = <DefaultFilter {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter {...props} />;
        break;
    }
  }
  return (
    <>
      <Select
        dir={dir}
        value={currentField}
        onChange={(option: Option) => {
          if (option) {
            setCurrentField(option);
          }
        }}
        options={options as any}
      />
      {filterComponent}
    </>
  );
};
