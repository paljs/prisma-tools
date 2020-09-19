import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, CardFooter } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import Row from '@paljs/ui/Row';
import { Inputs } from './Inputs';
import useActions from './useActions';
import { TableContext } from '../Context';
import { SchemaModel } from '../../types';
import Spinner from '@paljs/ui/Spinner';

export interface FormProps {
  action: 'update' | 'create' | 'view';
  model: string;
  data: any;
  onCancel: () => void;
  onSave: () => void;
}

const getDefaultValues = (
  action: FormProps['action'],
  model: SchemaModel,
  data: any,
) => {
  const defaultValues: any = {};
  model.fields
    .filter(
      (field) =>
        (((field.update || field.read) && action !== 'create') ||
          (action === 'create' && field.create)) &&
        !(field.list && field.kind === 'object') &&
        !field.relationField,
    )
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      if (!data[field.name]) {
        defaultValues[field.name] = data[field.name];
      } else {
        defaultValues[field.name] =
          field.type === 'Json'
            ? JSON.stringify(data[field.name])
            : field.list
            ? data[field.name].join(',')
            : data[field.name];
      }
    });
  return defaultValues;
};

const Form: React.FC<FormProps> = ({
  action,
  model: modelName,
  data,
  onCancel,
  onSave,
}) => {
  const {
    schema: { models },
    formInputs,
  } = useContext(TableContext);
  const model = models.find((item) => item.id === modelName)!;
  const { onSubmit, loading } = useActions(model, data, action, onSave);

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: getDefaultValues(action, model, data),
  });

  const InputComponents = formInputs
    ? {
        ...Inputs,
        ...formInputs,
      }
    : Inputs;

  return (
    <Card
      status={action === 'update' ? 'Warning' : 'Success'}
      style={
        action === 'create'
          ? { maxWidth: '1200px', maxHeight: '100vh', minWidth: '50vw' }
          : {}
      }
    >
      <header>
        {action.charAt(0).toUpperCase() + action.slice(1) + ' ' + model.name}
      </header>
      <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: 'auto' }}>
        <CardBody style={{ overflow: 'visible' }}>
          {loading && <Spinner size="Large" />}
          <Row between="lg">
            {model.fields
              .filter(
                (field) =>
                  ((action !== 'view' && field[action]) ||
                    (['update', 'view'].includes(action) &&
                      (field.read || field.update))) &&
                  !(field.list && field.kind === 'object') &&
                  !field.relationField,
              )
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((field) => {
                const options = {
                  key: field.id,
                  data,
                  field: field,
                  value: data[field.name],
                  error: errors[field.name],
                  register,
                  setValue,
                  getValues,
                  watch,
                  disabled:
                    (action === 'update' && !field.update) || action === 'view',
                };
                if (field.list) {
                  return <InputComponents.Default {...options} />;
                }
                if (field.kind === 'enum')
                  return <InputComponents.Enum {...options} />;
                if (field.kind === 'object')
                  return (
                    <InputComponents.Object
                      {...options}
                      value={data[field.name] ? data[field.name] : {}}
                    />
                  );
                if (field.editor)
                  return <InputComponents.Editor {...options} />;
                if (field.upload)
                  return <InputComponents.Upload {...options} />;
                switch (field.type) {
                  case 'Boolean':
                    return <InputComponents.Boolean {...options} />;
                  case 'DateTime':
                    return <InputComponents.Date {...options} />;
                  default:
                    return <InputComponents.Default {...options} />;
                }
              })}
          </Row>
        </CardBody>
        <CardFooter>
          {action !== 'view' && (
            <Button
              style={{ marginRight: '20px' }}
              type="submit"
              status="Success"
              disabled={Object.keys(errors).length !== 0}
            >
              Save
            </Button>
          )}
          <Button type="button" status="Danger" onClick={onCancel}>
            {action !== 'view' ? 'Cancel' : 'close'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default Form;
