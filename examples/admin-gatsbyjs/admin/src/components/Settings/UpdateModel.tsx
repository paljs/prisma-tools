import React from 'react';
import { Checkbox, Col, InputGroup, Row } from 'oah-ui';
import { SchemaModel } from '@prisma-tools/admin';
import { useUpdateModelMutation } from '../../generated';

type Fields = 'delete' | 'create' | 'update' | 'name';

const fieldsArray: Fields[] = ['create', 'update', 'delete'];

const UpdateModel: React.FC<SchemaModel> = (props) => {
  const [updateModel] = useUpdateModelMutation();

  const onChangeHandler = (name: string, value: boolean | string) => {
    updateModel({
      variables: {
        id: props.id,
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
            <span className="subtitle text-hint">Model Name :</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <InputGroup>
              <input
                name="name"
                value={props.name}
                placeholder="Model Name"
                onChange={(e) => onChangeHandler('name', e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Col>
      {fieldsArray.map((key, index) => (
        <Col breakPoint={{ xs: 4 }} key={index}>
          <Checkbox status="Success" checked={props[key] as boolean} onChange={(value) => onChangeHandler(key, value)}>
            {key}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
};
export default UpdateModel;
