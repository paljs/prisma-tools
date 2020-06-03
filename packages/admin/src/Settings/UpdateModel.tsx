import React, { useRef, useState } from 'react';
import { Checkbox, Col, InputGroup, Row, Select } from 'oah-ui';
import { SchemaModel } from '../types';
import { useMutation } from '@apollo/client';
import { UPDATE_MODEL } from '../SchemaQueries';

type Fields = 'delete' | 'create' | 'update' | 'name';
type Option = {
  label: string;
  value?: string;
  model?: string;
  options?: Option[];
};
const fieldsArray: Fields[] = ['create', 'update', 'delete'];

const UpdateModel: React.FC<{
  models: SchemaModel[];
  modelObject: SchemaModel;
}> = ({ models, modelObject }) => {
  const [updateModel] = useMutation(UPDATE_MODEL);
  const [title, setTitle] = useState({
    value: modelObject.name,
    typingTimeout: 0,
  });
  const titleRef = useRef(modelObject.name);

  if (titleRef.current !== modelObject.name) {
    titleRef.current = modelObject.name;
    setTitle({
      value: modelObject.name,
      typingTimeout: 0,
    });
  }

  const onChangeHandler = (name: string, value: boolean | string) => {
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

  const values: { label: string; value: string }[] = [];
  const allOptions: Option[] = [];
  const getOptions = (model: SchemaModel, parent = '') => {
    const options: Option[] = [];
    model.fields
      .filter((item) => !item.list)
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach((item) => {
        if (item.kind !== 'object') {
          const option = {
            value: parent ? parent + '.' + item.name : item.name,
            label: item.title,
          };
          if (modelObject.displayFields.includes(option.value)) {
            values.push(option);
          }
          parent ? options.push(option) : allOptions.push(option);
        } else {
          const modelExiting = allOptions.find(
            (option) => option.model === item.type,
          );
          if (!modelExiting) {
            getOptions(
              models.find((item2) => item2.id === item.type)!,
              parent ? parent + '.' + item.name : item.name,
            );
          }
        }
      });
    allOptions.push({
      model: model.id,
      label: parent
        .split('.')
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(' '),
      options,
    });
  };

  getOptions(modelObject);

  const idField = modelObject.fields.find(
    (item) => item.name === modelObject.idField,
  )!;
  return (
    <Row middle="xs">
      <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Database Name</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <span className="subtitle text-hint">{modelObject.id}</span>
          </Col>
        </Row>
      </Col>
      <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Display Name</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <InputGroup>
              <input
                name="name"
                value={title.value}
                placeholder="Model Name"
                onChange={onChange}
              />
            </InputGroup>
          </Col>
        </Row>
      </Col>
      <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Id Field</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <Select
              status="Primary"
              shape="SemiRound"
              value={{ value: idField.name, label: idField.title }}
              onChange={(option: any) =>
                onChangeHandler('idField', option.value)
              }
              options={modelObject.fields
                .filter((item) => item.isId || item.unique)
                .map((item) => ({ value: item.name, label: item.title }))}
            />
          </Col>
        </Row>
      </Col>
      <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Display Fields</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <Select
              isMulti
              status="Primary"
              shape="SemiRound"
              value={values}
              onChange={(option: any) => {
                if (option) {
                  onChangeHandler(
                    'displayFields',
                    option.map((item: any) => item.value),
                  );
                }
              }}
              options={allOptions as any}
            />
          </Col>
        </Row>
      </Col>
      <Col breakPoint={{ xs: 12 }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Actions</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <Row around="xs" middle="xs">
              {fieldsArray.map((key, index) => (
                <Col breakPoint={{ xs: 4 }} key={index}>
                  <Checkbox
                    status="Success"
                    checked={modelObject[key] as boolean}
                    onChange={(value) => onChangeHandler(key, value)}
                  >
                    {key}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default UpdateModel;
