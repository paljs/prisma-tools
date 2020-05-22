import React, { useState } from 'react';
import { Checkbox, Col, InputGroup, Row } from 'oah-ui';
import { useUpdateFieldMutation, FieldFragment } from '../../generated';

type Fields = 'read' | 'create' | 'update' | 'filter' | 'sort' | 'title' | 'editor';

const fieldsArray: Fields[] = ['read', 'create', 'update', 'filter', 'sort', 'editor'];

const UpdateField: React.FC<{ field: FieldFragment; model: string }> = ({ field, model }) => {
  const [updateField] = useUpdateFieldMutation();
  const [title, setTitle] = useState({
    value: field.title,
    typingTimeout: 0,
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
    <Row middle="xs">
      <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Database Name</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <span className="subtitle text-hint">{field.name}</span>
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
              <input name="name" value={title.value} placeholder="Field Name" onChange={onChange} />
            </InputGroup>
          </Col>
        </Row>
      </Col>
      {fieldsArray.map((item) => (
        <Col breakPoint={{ xs: 4 }} key={item}>
          <Checkbox
            disabled={!!(field.relationField && ['create', 'update'].includes(item))}
            status="Success"
            checked={!!field[item]}
            onChange={(value) => onChangeHandler(item, value)}
          >
            {item}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
};
export default UpdateField;
