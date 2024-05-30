/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';

import { AdminSchemaModel } from '../types';
import { UPDATE_MODEL } from '../SchemaQueries';
import { SettingLanguage } from './index';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import { inputClasses } from '../components/css';

type Fields = 'delete' | 'create' | 'update';
interface Option {
  name: string;
  id: string;
  unavailable?: boolean;
}
const fieldsArray: Fields[] = ['create', 'update', 'delete'];

const UpdateModel: React.FC<{
  models: AdminSchemaModel[];
  modelObject: AdminSchemaModel;
  language: SettingLanguage;
}> = ({ models, modelObject, language }) => {
  const [updateModel] = useMutation(UPDATE_MODEL);
  const [title, setTitle] = useState<{
    value: string;
    typingTimeout?: NodeJS.Timeout;
  }>({
    value: modelObject.name,
  });
  const titleRef = useRef(modelObject.name);

  if (titleRef.current !== modelObject.name) {
    titleRef.current = modelObject.name;
    setTitle({
      value: modelObject.name,
    });
  }

  const onChangeHandler = (name: string, value: boolean | string | string[]) => {
    updateModel({
      variables: {
        id: modelObject.id,
        data: {
          [name]: value,
        },
      },
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (title.typingTimeout) clearTimeout(title.typingTimeout);
    setTitle({
      value: newValue,
      typingTimeout: setTimeout(function () {
        onChangeHandler('name', newValue);
      }, 1000),
    });
  };

  const values: { id: string; name: string }[] = [];
  const allOptions: Option[] = [];
  //const modelsList: string[] = [];
  const getOptions = (model: AdminSchemaModel, parent = '') => {
    const options: Option[] = [];
    //modelsList.push(model.id);
    model.fields
      .filter((item) => !item.list)
      .slice()
      .sort((a, b) => {
        const aObject = Number(a.kind === 'object');
        const bObject = Number(b.kind === 'object');
        return aObject - bObject || a.order - b.order;
      })
      .forEach((item) => {
        if (item.kind !== 'object') {
          const option = {
            id: parent ? parent + '.' + item.name : item.name,
            name: item.title,
          };
          if (modelObject.displayFields.includes(option.id)) {
            values.push(option);
          }
          parent ? options.push(option) : allOptions.push(option);
        } else {
          if (item.type !== model.id && !parent) {
            getOptions(models.find((item2) => item2.id === item.type)!, parent ? parent + '.' + item.name : item.name);
          }
        }
      });
    if (parent) {
      allOptions.push({
        id: model.id,
        unavailable: true,
        name: model.name,
      });
      allOptions.push(...options);
    }
  };

  getOptions(modelObject);

  const onChangeMultiSelect = (option: Option) => {
    const isFound = !!values.find((v) => v.id === option.id);
    const value = isFound
      ? values.filter((v) => v.id !== option.id).map((v) => v.id)
      : [...values, option].map((v) => v.id);
    if (value && value.length > 0) {
      onChangeHandler('displayFields', value);
    }
  };

  const idField = modelObject.fields.find((item) => item.name === modelObject.idField);
  return (
    <>
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.dbName}</div>
        <div className="w-2/3 col-span-2 text-gray-400">{modelObject.id}</div>
      </div>
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.displayName}</div>
        <div className="w-2/3">
          <input
            name="name"
            value={title.value}
            placeholder={language.modelName}
            onChange={onChange}
            className={inputClasses}
          />
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.idField}</div>
        <Select
          dir={language.dir}
          popupFullWidth
          className="w-2/3"
          value={{
            id: idField?.name ?? '',
            name: idField?.title ?? 'No ID',
          }}
          onChange={(option: any) => onChangeHandler('idField', option.id)}
          options={modelObject.fields
            .filter((item) => item.isId || item.unique)
            .map((item) => ({ id: item.name, name: item.title }))}
        />
      </div>
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.displayFields}</div>
        <Select
          popupFullWidth
          dir={language.dir}
          className="w-2/3"
          value={values}
          onChange={onChangeMultiSelect}
          options={allOptions}
        />
      </div>
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.actions}</div>
        <div className="w-2/3 flex">
          {fieldsArray.map((key, index) => (
            <Checkbox
              key={key}
              id={key + index}
              label={language[key]}
              checked={modelObject[key]}
              onChange={(e) => onChangeHandler(key, e.target.checked)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default UpdateModel;
