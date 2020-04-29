import React from 'react';
import { Checkbox, Col, InputGroup, Row } from 'oah-ui';
import { SchemaField } from '@prisma-tools/admin';
import { useUpdateFieldMutation } from '../../generated';

type Fields = 'read' | 'create' | 'update' | 'filter' | 'sort' | 'title';

const fieldsArray: Fields[] = ['read', 'create', 'update', 'filter', 'sort'];

const UpdateField: React.FC<{ field: SchemaField; model: string }> = ({ field, model }) => {
  const [updateField] = useUpdateFieldMutation();

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
              <input
                name="name"
                value={field.title}
                placeholder="Field Name"
                onChange={(e) => onChangeHandler('title', e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Col>
      {fieldsArray.map((item) => (
        <Col breakPoint={{ xs: 4 }} key={item}>
          <Checkbox
            disabled={field.relationField && ['create', 'update'].includes(item)}
            status="Success"
            checked={field[item] as boolean}
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
