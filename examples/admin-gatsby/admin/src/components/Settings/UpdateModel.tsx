import React from 'react';
import { Checkbox, Col, InputGroup, Row, Select } from 'oah-ui';
import { useUpdateModelMutation, ModelFragment } from '../../generated';

type Fields = 'delete' | 'create' | 'update' | 'name';

const fieldsArray: Fields[] = ['create', 'update', 'delete'];

const UpdateModel: React.FC<ModelFragment> = (props) => {
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
  const idField = props.fields.find((item) => item.name === props.idField)!;
  const displayFields = props.fields.filter((item) => props.displayFields.includes(item.name));
  return (
    <Row middle="xs">
      <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
        <Row around="xs" middle="xs">
          <Col breakPoint={{ xs: 4 }}>
            <span className="subtitle text-hint">Database Name</span>
          </Col>
          <Col breakPoint={{ xs: 8 }}>
            <span className="subtitle text-hint">{props.id}</span>
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
                value={props.name}
                placeholder="Model Name"
                onChange={(e) => onChangeHandler('name', e.target.value)}
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
              onChange={(option: any) => onChangeHandler('idField', option.value)}
              options={props.fields
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
              value={displayFields.map((item) => ({ value: item.name, label: item.title }))}
              onChange={(option: any) => {
                if (option) {
                  onChangeHandler(
                    'displayFields',
                    option.map((item: any) => item.value),
                  );
                }
              }}
              options={props.fields
                .filter((item) => item.kind !== 'object')
                .map((item) => ({ value: item.name, label: item.title }))}
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
                    checked={props[key] as boolean}
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
