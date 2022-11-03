import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { AdminSchemaField } from '../types';
import { UPDATE_FIELD } from '../SchemaQueries';
import { SettingLanguage } from './index';
import Checkbox from '../components/Checkbox';
import { inputClasses } from '../components/css';

type Fields = 'read' | 'create' | 'update' | 'filter' | 'sort' | 'editor' | 'upload';

const fields: { [key in keyof SettingLanguage]?: Fields[] } = {
  tableView: ['read', 'filter', 'sort'],
  actions: ['create', 'update'],
  inputType: ['editor', 'upload'],
};

const UpdateField: React.FC<{
  field: AdminSchemaField;
  model: string;
  language: SettingLanguage;
}> = ({ field, model, language }) => {
  const [updateField] = useMutation(UPDATE_FIELD);
  const [title, setTitle] = useState<{
    value: string;
    typingTimeout?: NodeJS.Timeout;
  }>({
    value: field.title,
  });

  const onChangeHandler = (name: string, value: boolean | string) => {
    updateField({
      variables: {
        id: field.id,
        modelId: model,
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
        onChangeHandler('title', newValue);
      }, 1000),
    });
  };

  return (
    <div className="flex flex-wrap w-full space-y-2.5">
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.dbName}</div>
        <div className="w-2/3 text-gray-400">{field.name}</div>
      </div>
      <div className="flex w-full items-center">
        <div className="w-1/3 text-gray-400">{language.displayName}</div>
        <div className="w-2/3">
          <input
            name="name"
            value={title.value}
            placeholder={language.fieldName}
            onChange={onChange}
            className={inputClasses}
          />
        </div>
      </div>
      {(Object.keys(fields) as (keyof SettingLanguage)[]).map((key) => (
        <div key={key} className="flex w-full items-center">
          <div className="w-1/3 text-gray-400">{language[key]}</div>
          <div className="flex w-2/3">
            {fields[key]?.map((item) => (
              <div key={item} className="w-1/3">
                <Checkbox
                  label={language[item]}
                  id={field.id + item}
                  disabled={field.relationField && ['create', 'update'].includes(item)}
                  checked={field[item]}
                  onChange={(e) => onChangeHandler(item, e.target.checked)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default UpdateField;
