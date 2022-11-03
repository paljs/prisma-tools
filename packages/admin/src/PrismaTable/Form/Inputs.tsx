import React, { useContext, useState } from 'react';
import { useLazyQuery, NetworkStatus, useQuery } from '@apollo/client';
import { SearchIcon, XCircleIcon } from '@heroicons/react/outline';

import Modal from '../../components/Modal';
import { useEnum } from '../useSchema';
import { getDisplayName } from '../Table/utils';
import DynamicTable from '../dynamicTable';
import { queryDocument } from '../QueryDocument';
import { TableContext } from '../Context';
import { FormInputs, ModelTableProps } from '../../types';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import { buttonClasses, classNames, inputClasses } from '../../components/css';
import { getDate } from './getDate';
import { SchemaField } from '@paljs/types';

interface Option {
  id: any;
  name: any;
}

const getFieldValidation = (field: SchemaField, inputValidation: ModelTableProps['inputValidation']) => {
  const modelName = field.id.split('.')[0];
  return inputValidation ? (inputValidation[modelName] ? inputValidation[modelName][field.name] || {} : {}) : {};
};

const defaultInputs: Omit<FormInputs, 'Upload' | 'Editor'> = {
  Default({ field, error, register, disabled, value }) {
    const { lang, inputValidation } = useContext(TableContext);
    const options: any = {
      disabled,
      defaultValue: value
        ? field.type === 'Json'
          ? JSON.stringify(value)
          : field.list
          ? value.join(',')
          : value
        : value,
    };
    if (field.list) {
      options['type'] = 'text';
    } else {
      switch (field.type) {
        case 'Int':
        case 'BigInt':
          options['type'] = 'number';
          break;
        case 'Float':
        case 'Decimal':
          options['type'] = 'number';
          options['step'] = 'any';
          break;
        case 'String':
          options['type'] = 'text';
          break;
      }
    }
    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <div className="w-full text-gray-600">
          {field.title}
          {error && <span className="text-red-700 text-xs">{error.message ? error.message : lang.isRequired}</span>}
        </div>
        <input
          className={classNames('w-full', inputClasses, error ? 'border-red-400' : '')}
          {...register(field.name, {
            required: field.required,
            ...getFieldValidation(field, inputValidation),
          })}
          {...options}
        />
      </div>
    );
  },
  Enum({ field, value, error, register, setValue, disabled }) {
    const [state, setState] = useState(value);
    const enumType = useEnum(field.type);
    const { lang, dir, inputValidation } = useContext(TableContext);

    React.useEffect(() => {
      register(field.name, {
        required: field.required,
        ...getFieldValidation(field, inputValidation),
      });
    }, [register]);

    const options: Option[] = field.required ? [] : [{ id: null, name: lang.all }];
    if (enumType) {
      options.push(...enumType.fields.map((item) => ({ id: item, name: item })));
    }
    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <div className="w-full text-gray-600">
          {field.title}
          {error && <span className="text-red-700 text-xs">{error.message ? error.message : lang.isRequired}</span>}
        </div>
        <Select
          dir={dir}
          className="w-full"
          disabled={disabled}
          value={options.find((option) => option.id === state)}
          onChange={(option: Option) => {
            setState(option.id);
            setValue(field.name, option.id, {
              shouldValidate: !!option.id,
              shouldDirty: true,
            });
          }}
          options={options}
        />
      </div>
    );
  },

  Object({ field, value, error, register, setValue, disabled }) {
    const {
      schema: { models },
      lang,
    } = useContext(TableContext);
    const model = models.find((item) => item.id === field.type)!;
    const [modal, setModal] = useState(false);
    const [state, setSate] = useState(value);

    const { data } = useQuery(queryDocument(models, field.type, true), {
      variables: {
        where: {
          [model.idField]: state[model.idField],
        },
      },
      skip: !(state && Object.keys(state).length > 0),
    });

    const result = data ? data[`findUnique${field.type}`] : {};

    React.useEffect(() => {
      register(field.name, { required: field.required });
    }, [register]);

    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <Modal on={modal} toggle={() => setModal(!modal)}>
          <DynamicTable
            model={model.id}
            inEdit
            connect={Object.keys(state).length > 0 ? result : {}}
            onConnect={(_value) => {
              setSate(_value);
              setValue(field.name, _value[model.idField], {
                shouldValidate: true,
                shouldDirty: true,
              });
              setModal(!modal);
            }}
          />
        </Modal>
        <div className="w-full text-gray-600">
          {field.title}
          <span className="text-red-700 text-xs">{error ? lang.isRequired : ''}</span>
        </div>
        <div className="w-full flex items-center">
          <button
            disabled={disabled}
            type="button"
            className={classNames(
              buttonClasses,
              'rounded-md bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25',
            )}
            onClick={() => setModal(!modal)}
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <input className={classNames(inputClasses, 'mx-2 flex-1')} value={getDisplayName(state, model)} disabled />
          {!field.required && (
            <button
              disabled={disabled}
              type="button"
              className={classNames(
                buttonClasses,
                'rounded-md bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-25',
              )}
              onClick={() => {
                setSate({});
                setValue(field.name, null, {
                  shouldValidate: !field.required,
                  shouldDirty: true,
                });
              }}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  },
  Date({ field, value, error, register, disabled }) {
    const { lang, inputValidation } = useContext(TableContext);
    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <div className="w-full text-gray-600">
          {field.title}
          {error && <span className="text-red-700 text-xs">{error.message ? error.message : lang.isRequired}</span>}
        </div>
        <input
          className={classNames('w-full', inputClasses, error ? 'border-red-400' : '')}
          type="datetime-local"
          disabled={disabled}
          defaultValue={value ? getDate(new Date(value)) : undefined}
          {...register(field.name, {
            required: field.required,
            valueAsDate: true,
            ...getFieldValidation(field, inputValidation),
          })}
        />
      </div>
    );
  },
  Boolean({ field, value, register, setValue, disabled }) {
    const [state, setState] = useState(value);

    const onChangeHandler = (value: boolean) => {
      setValue(field.name, value, { shouldValidate: true, shouldDirty: true });
      setState(value);
    };

    React.useEffect(() => {
      register(field.name);
    }, [register]);

    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <Checkbox
          label={field.title}
          id={field.id}
          disabled={disabled}
          onChange={(e) => onChangeHandler(e.target.checked)}
          checked={!!state}
        />
      </div>
    );
  },
};

export const Inputs: FormInputs = {
  ...defaultInputs,
  Upload: defaultInputs.Default,
  Editor: defaultInputs.Default,
};
