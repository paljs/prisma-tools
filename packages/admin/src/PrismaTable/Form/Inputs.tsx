/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

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
import { AdminSchemaField } from '@paljs/types';
import { useController, useFormContext } from 'react-hook-form';

interface Option {
  id: any;
  name: any;
}

const getFieldValidation = (field: AdminSchemaField, inputValidation: ModelTableProps['inputValidation']) => {
  const modelName = field.id.split('.')[0];
  return inputValidation ? (inputValidation[modelName] ? inputValidation[modelName][field.name] || {} : {}) : {};
};

const defaultInputs: Omit<FormInputs, 'Upload' | 'Editor'> = {
  Default({ field, disabled, value }) {
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
    const { register, getFieldState } = useFormContext();
    const { error } = getFieldState(field.name);
    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <div className="w-full text-gray-600">
          {field.title}
          {error && (
            <span className="text-red-700 text-xs">
              {typeof error.message === 'string' ? error.message : lang.isRequired}
            </span>
          )}
        </div>
        <input
          className={classNames('w-full', inputClasses, error ? 'border-red-400' : '')}
          defaultValue={value}
          {...register(field.name, { required: field.required, ...getFieldValidation(field, inputValidation) })}
          {...options}
        />
      </div>
    );
  },
  Enum({ field, value, disabled }) {
    const [state, setState] = useState(value);
    const enumType = useEnum(field.type);
    const { lang, dir, inputValidation } = useContext(TableContext);
    const { control } = useFormContext();
    const {
      field: inputField,
      fieldState: { error },
    } = useController({
      name: field.name,
      control,
      defaultValue: value,
      rules: { required: field.required, ...getFieldValidation(field, inputValidation) },
    });

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
            inputField.onChange(option.id);
          }}
          options={options}
        />
      </div>
    );
  },

  Object({ field, value, disabled }) {
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

    const { control } = useFormContext();
    const {
      field: inputField,
      fieldState: { error },
    } = useController({
      name: field.name,
      control,
      defaultValue: value[model.idField],
      rules: { required: field.required },
    });

    return (
      <div className="flex flex-wrap w-full sm:w-1/2 pr-2 pt-2">
        <Modal on={modal} toggle={() => setModal(!modal)}>
          <DynamicTable
            model={model.id}
            inEdit
            connect={Object.keys(state).length > 0 ? result : {}}
            onConnect={(_value) => {
              setSate(_value);
              inputField.onChange(_value[model.idField]);
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
            <MagnifyingGlassIcon className="h-5 w-5" />
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
                inputField.onChange(null);
              }}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  },
  Date({ field, value, disabled }) {
    const { lang, inputValidation } = useContext(TableContext);
    const { register, getFieldState } = useFormContext();
    const { error } = getFieldState(field.name);
    return (
      <div className="flex w-full flex-wrap pr-2 pt-2 sm:w-1/2">
        <div className="w-full text-gray-600">
          {field.title}
          {error && (
            <span className="text-xs text-red-700">
              {typeof error.message === 'string' ? error.message : lang.isRequired}
            </span>
          )}
        </div>
        <input
          className={classNames('w-full', inputClasses, error ? 'border-red-400' : '')}
          type="datetime-local"
          disabled={disabled}
          defaultValue={value ? new Date(value).toISOString().slice(0, 16) : ''}
          {...register(field.name, {
            required: field.required,
            valueAsDate: true,
            ...(getFieldValidation(field, inputValidation) as any),
          })}
        />
      </div>
    );
  },
  Boolean({ field, value, disabled }) {
    const [state, setState] = useState(value);

    const { control } = useFormContext();
    const { field: inputField } = useController({
      name: field.name,
      control,
      defaultValue: value,
    });

    const onChangeHandler = (value: boolean) => {
      inputField.onChange(value);
      setState(value);
    };

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
