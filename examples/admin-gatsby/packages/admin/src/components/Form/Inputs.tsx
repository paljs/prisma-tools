import React, { useRef, useState } from 'react';
import { Button, Checkbox, Col, EvaIcon, InputGroup, Modal, Row, Select } from 'oah-ui';
import { FormContextValues } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import styled, { css } from 'styled-components';
import { useEnum, useModel } from '../useSchema';
import * as generated from '../../generated';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import { getDisplayName } from '../Table/utils';
import DynamicTable from '../dynamicTable';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = typeof window !== 'undefined' ? require('react-quill') : <div />;

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
  disabled: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 4, 5, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export const DefaultInput: React.FC<InputProps> = ({ field, value, error, register, setValue, disabled }) => {
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setValue(field.name, value);
  }

  const options: any = {
    name: field.name,
    disabled,
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
            <input {...options} />
          </InputGroup>
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const QuillInput: React.FC<InputProps> = ({ field, value, error, register, setValue, disabled }) => {
  const [state, setState] = useState(value);
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setState(value);
    setValue(field.name, value);
  }

  const onChangeHandler = (value: string) => {
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
        <StyledReactQuillCol breakPoint={{ xs: 8 }}>
          <ReactQuill
            readOnly={disabled}
            theme="snow"
            modules={modules}
            formats={formats}
            value={state}
            onChange={(value: string) => onChangeHandler(value)}
          />
        </StyledReactQuillCol>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const EnumInput: React.FC<InputProps> = ({ field, value, error, register, setValue, disabled }) => {
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
            disabled={disabled}
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
export const ObjectInput: React.FC<InputProps> = ({ field, value, error, register, setValue, disabled }) => {
  const model = useModel(field.type)!;
  const [modal, setModal] = useState(false);
  const [state, setSate] = useState(value);
  const valueRef = useRef(value[model.idField]);

  if (valueRef.current !== value[model.idField]) {
    valueRef.current = value[model.idField];
    setSate(value);
    setValue(field.name, value);
  }

  const [getData, { data, loading }] = useLazyQuery(generated[`FindOne${field.type}Document` as keys] as DocumentNode);
  const result = data ? data[`findOne${field.type}`] : {};

  if (state && Object.keys(state).length > 0 && !loading && state[model.idField] !== result[model.idField]) {
    getData({
      variables: {
        where: {
          [model.idField]: state[model.idField],
        },
      },
    });
  }

  React.useEffect(() => {
    register({ name: field.name, required: field.required });
  }, [register]);

  return (
    <StyledCol breakPoint={{ xs: 12, lg: 6 }}>
      <Modal on={modal} toggle={() => setModal(!modal)}>
        <DynamicTable
          model={model.id}
          inEdit
          connect={Object.keys(state).length > 0 ? result : {}}
          onConnect={(_value) => {
            setSate(_value);
            setValue(field.name, _value);
            setModal(!modal);
          }}
        />
      </Modal>
      <Row around="xs" middle="xs">
        <Col breakPoint={{ xs: 4 }}>
          <span className="subtitle text-hint">{field.title}</span>
        </Col>
        <Col breakPoint={{ xs: 8 }}>
          <InputWithIcons fullWidth>
            <Button
              disabled={disabled}
              type="button"
              appearance="ghost"
              className="searchIcon"
              onClick={() => setModal(!modal)}
            >
              <EvaIcon name="search-outline" />
            </Button>
            {!field.required && (
              <Button
                disabled={disabled}
                type="button"
                appearance="ghost"
                status="Danger"
                className="closeIcon"
                onClick={() => {
                  setSate({});
                  setValue(field.name, null);
                }}
              >
                <EvaIcon name="close-circle-outline" />
              </Button>
            )}
            <input value={getDisplayName(state, model)} disabled />
          </InputWithIcons>
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const DateInput: React.FC<InputProps> = ({ field, value, error, register, setValue, disabled }) => {
  const [state, setState] = useState(value ? new Date(value) : new Date());
  const valueRef = useRef(value);

  if (valueRef.current !== value) {
    valueRef.current = value;
    setState(value ? new Date(value) : new Date());
    setValue(field.name, value);
  }

  const onChangeHandler = (value: Date) => {
    setValue(field.name, value.toISOString());
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
          <StyledInputGroup status={error ? 'Danger' : 'Primary'} fullWidth>
            <DatePicker
              disabled={disabled}
              selected={state}
              onChange={(date) => date && onChangeHandler(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </StyledInputGroup>
        </Col>
      </Row>
      <span className="caption-2 status-Danger">{error ? field.title + ' is required' : ''}</span>
    </StyledCol>
  );
};

export const BooleanInput: React.FC<InputProps> = ({ field, value, register, setValue, disabled }) => {
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
          <Checkbox
            disabled={disabled}
            status="Success"
            onChange={(value) => onChangeHandler(value)}
            checked={!!state}
          />
        </Col>
      </Row>
    </StyledCol>
  );
};

const StyledInputGroup = styled(InputGroup)`
  li {
    color: black;
  }
`;

const StyledCol = styled(Col)`
  padding-bottom: 5px;
  padding-top: 5px;
  margin: 5px 0;
  border: 1px solid ${(props) => props.theme.backgroundBasicColor2};
`;

const InputWithIcons = styled(InputGroup)`
  .searchIcon {
    position: absolute;
    padding: 0;
    left: 5px;
    top: 10px;
  }
  .closeIcon {
    position: absolute;
    padding: 0;
    right: 5px;
    top: 10px;
  }
  input {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const StyledReactQuillCol = styled(Col)`
  ${({ theme }) => css`
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      background-color: ${theme.inputPrimaryBackgroundColor};
      border: ${theme.inputPrimaryBorderColor} ${theme.inputBorderStyle} ${theme.inputBorderWidth};
      color: ${theme.inputPrimaryTextColor};
    }
    .ql-container.ql-snow {
      border-bottom-left-radius: ${theme.inputRectangleBorderRadius};
      border-bottom-right-radius: ${theme.inputRectangleBorderRadius};
    }
    .ql-toolbar.ql-snow {
      border-top-left-radius: ${theme.inputRectangleBorderRadius};
      border-top-right-radius: ${theme.inputRectangleBorderRadius};
    }
    .ql-editor {
      max-height: 200px;
    }

    .ql-tooltip {
      z-index: 10;
    }
  `}
`;
