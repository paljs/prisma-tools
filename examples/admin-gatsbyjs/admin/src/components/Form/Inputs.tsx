import React, { useRef, useState } from 'react';
import { SchemaField } from '@prisma-tools/admin';
import { Checkbox, Col, InputGroup, Row, Select } from 'oah-ui';
import { FormContextValues } from 'react-hook-form';
import { useGetEnumQuery } from '../../generated';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

interface Option {
  value: any;
  label: any;
}

interface InputProps {
  field: SchemaField;
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

  let options: any = { name: field.name, defaultValue: value, ref: register(field.required ? { required: true } : {}) };
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
          <InputGroup status={error ? 'Danger' : 'Primary'}>
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
  const { data } = useGetEnumQuery({
    variables: {
      name: field.type,
    },
  });
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setState(value);
    setValue(field.name, value);
  }

  React.useEffect(() => {
    register({ name: field.name, required: field.required, defaultValue: value });
  }, [register]);

  const options: Option[] = field.required ? [] : [{ value: null, label: 'All' }];
  if (data?.getEnum) {
    options.push(...data.getEnum.fields.map((item) => ({ value: item, label: item })));
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
    register({ name: field.name, required: field.required, defaultValue: new Date(value) });
  }, [register]);

  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <InputGroup status={error ? 'Danger' : 'Primary'}>
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
    register({ name: field.name, defaultValue: value });
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
