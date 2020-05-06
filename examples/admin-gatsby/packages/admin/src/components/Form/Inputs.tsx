import React, { useRef, useState } from 'react';
import { Button, Checkbox, Col, EvaIcon, InputGroup, Modal, Row, Select } from 'oah-ui';
import { FormContextValues } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { useEnum, useModel } from '../useSchema';
import { useFilterState } from '../useFilterState';
import * as generated from '../../generated';
import { DocumentNode, useQuery } from '@apollo/client';
import { getDisplayName } from '../Table/utils';
import { getValueByType } from './useActions';
import { navigate } from '@reach/router';
import EditRecord from '../EditRecord';

interface Option {
  value: any;
  label: any;
}

interface InputProps {
  field: generated.FieldFragment;
  value: any;
  error: any;
  register: FormContextValues['register'];
  setValue: FormContextValues['setValue'];
}

export const DefaultInput: React.FC<InputProps> = ({ field, value, error, register, setValue }) => {
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setValue(field.name, value);
  }

  const options: any = {
    name: field.name,
    ref: register(field.required ? { required: true } : {}),
  };
  switch (field.type) {
    case 'Int':
      options['type'] = 'number';
      break;
    case 'Flout':
      options['type'] = 'number';
      options['step'] = 'any';
      break;
    case 'String':
      options['type'] = 'text';
      break;
  }
  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <InputGroup status={error ? 'Danger' : 'Primary'} fullWidth>
            {field.type === 'String' && value && value.length > 50 ? (
              <textarea rows={1} {...options} />
            ) : (
              <input {...options} />
            )}
          </InputGroup>
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const EnumInput: React.FC<InputProps> = ({ field, value, error, register, setValue }) => {
  const [state, setState] = useState(value);
  const enumType = useEnum(field.type);
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setState(value);
    setValue(field.name, value);
  }

  React.useEffect(() => {
    register({ name: field.name, required: field.required });
  }, [register]);

  const options: Option[] = field.required ? [] : [{ value: null, label: 'All' }];
  if (enumType) {
    options.push(...enumType.fields.map((item) => ({ value: item, label: item })));
  }
  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <Select
            status={error ? 'Danger' : 'Primary'}
            shape="SemiRound"
            value={options.find((option) => option.value === state)}
            onChange={(option: any) => {
              setState(option.value);
              setValue(field.name, option.value);
            }}
            options={options}
          />
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};
type keys = keyof typeof generated;
export const ObjectInput: React.FC<InputProps> = ({ field, value, error, register, setValue }) => {
  const model = useModel(field.type)!;
  const [state, setState] = useState(value[model.idField]);
  const [modal, setModal] = useState(false);
  const valueRef = useRef(value[model.idField]);

  if (valueRef.current !== value[model.idField]) {
    valueRef.current = value[model.idField];
    setState(value[model.idField]);
    setValue(field.name, value[model.idField]);
  }

  const [search, setSearch] = useState({});
  const { onChange } = useFilterState('');
  const { data } = useQuery(generated[`FindMany${field.type}Document` as keys] as DocumentNode, {
    variables: {
      where: search,
      first: 10,
    },
  });

  React.useEffect(() => {
    register({ name: field.name, required: field.required });
  }, [register]);

  const onSearch = (value: string) => {
    const searchFields = model.displayFields.includes(model.idField)
      ? model.displayFields
      : model.displayFields.concat([model.idField]);
    const searchObject: any = { OR: [] };
    model.fields
      .filter((item) => searchFields.includes(item.name))
      .forEach((item) => {
        searchObject.OR.push({
          [item.name]: item.type === 'String' ? { contains: value } : { equals: getValueByType(item.type, value) },
        });
      });
    setSearch(searchObject);
  };

  const result = data ? data[`findMany${field.type}`] : null;

  const options: Option[] = field.required ? [] : [{ value: null, label: 'clear' }];
  Object.keys(value).length > 0 && options.push({ value: value[model.idField], label: getDisplayName(value, model) });
  if (result) {
    options.push(
      ...result
        .filter((item: any) => item[model.idField] !== value[model.idField])
        .map((item: any) => ({ value: item[model.idField], label: getDisplayName(item, model) })),
    );
  }

  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Modal on={modal} toggle={() => setModal(!modal)}>
        <EditRecord model={model.id} update={state} toggle={() => setModal(!modal)} />
      </Modal>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
          {state && (
            <Button style={{ padding: 0 }} appearance="ghost" onClick={() => setModal(true)} type="button">
              <EvaIcon name="edit-outline" />
            </Button>
          )}
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <Select
            //menuPlacement="top"
            status={error ? 'Danger' : 'Primary'}
            shape="SemiRound"
            value={options.find((option) => option.value === state)}
            onInputChange={(value, meta) => {
              if (meta.action === 'input-change') {
                onChange(value, onSearch);
              }
            }}
            onChange={(option: any) => {
              setState(option.value);
              setValue(field.name, option.value);
            }}
            options={options}
          />
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const DateInput: React.FC<InputProps> = ({ field, value, error, register, setValue }) => {
  const [state, setState] = useState(value ? new Date(value) : new Date());
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setState(value);
    setValue(field.name, value);
  }

  const onChangeHandler = (value: Date) => {
    setValue(field.name, value);
    setState(value);
  };

  React.useEffect(() => {
    register({ name: field.name, required: field.required });
  }, [register]);

  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <InputGroup status={error ? 'Danger' : 'Primary'} fullWidth>
            <DatePicker
              selected={state}
              onChange={(date) => date && onChangeHandler(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </InputGroup>
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const BooleanInput: React.FC<InputProps> = ({ field, value, register, setValue }) => {
  const [state, setState] = useState(value);
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setState(value);
    setValue(field.name, value);
  }

  const onChangeHandler = (value: boolean) => {
    setValue(field.name, value);
    setState(value);
  };

  React.useEffect(() => {
    register({ name: field.name });
  }, [register]);

  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <Checkbox status="Success" onChange={(value) => onChangeHandler(value)} checked={state} />
        </Col>
      </Row>
    </StyledCol>
  );
};

const StyledCol = styled(Col)`
  padding-bottom: 5px;
  padding-top: 5px;
  margin: 5px 0;
  border: 1px solid ${(props) => props.theme.backgroundBasicColor2};
`;
