import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, Row, CardFooter } from 'oah-ui';
import { BooleanInput, DateInput, DefaultInput, EnumInput, ObjectInput } from './Inputs';
import 'react-datepicker/dist/react-datepicker.css';
import useActions from './useActions';
import { LayoutContext } from '../../Layouts';
import { ModelFragment } from '../../generated';

interface FormProps {
  action: 'update' | 'create';
  model: string;
  data: any;
  onCancel: () => void;
  onSave?: () => void;
  inModal?: boolean;
}

const getDefaultValues = (action: 'update' | 'create', model: ModelFragment, data: any, models: ModelFragment[]) => {
  const defaultValues: any = {};
  model.fields
    .filter((field) => field.update && !field.list && !field.relationField)
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      if (field.kind === 'object') {
        const fieldModel = models.find((item) => item.id === field.type)!;
        defaultValues[field.name] = data[field.name] ? data[field.name][fieldModel.idField] : null;
      } else {
        defaultValues[field.name] = data[field.name];
      }
    });
  return defaultValues;
};

const Form: React.FC<FormProps> = ({ action, model: modelName, data, onCancel, inModal, onSave }) => {
  const {
    schema: { models },
  } = useContext(LayoutContext);
  const model = models.find((item) => item.id === modelName)!;
  const { onSubmit } = useActions(model, data, action, onCancel, onSave);

  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: getDefaultValues(action, model, data, models),
  });

  return (
    <Card
      status={action === 'update' ? 'Warning' : 'Success'}
      style={{ maxWidth: action === 'update' && !inModal ? '100%' : '1200px', maxHeight: '100vh', minWidth: '50vw' }}
    >
      <header>{action.charAt(0).toUpperCase() + action.slice(1) + ' ' + model.name}</header>
      <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: 'auto' }}>
        <CardBody style={{ overflow: 'visible' }}>
          <Row between="lg">
            {model.fields
              .filter((field) => field[action] && !field.list && !field.relationField)
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((field) => {
                if (field.kind === 'enum')
                  return (
                    <EnumInput
                      key={field.id}
                      field={field}
                      value={data[field.name]}
                      error={errors[field.name]}
                      register={register}
                      setValue={setValue}
                    />
                  );
                if (field.kind === 'object')
                  return (
                    <ObjectInput
                      key={field.id}
                      field={field}
                      value={data[field.name] ? data[field.name] : {}}
                      error={errors[field.name]}
                      register={register}
                      setValue={setValue}
                    />
                  );
                switch (field.type) {
                  case 'Boolean':
                    return (
                      <BooleanInput
                        key={field.id}
                        field={field}
                        value={data[field.name]}
                        error={errors[field.name]}
                        register={register}
                        setValue={setValue}
                      />
                    );
                  case 'DateTime':
                    return (
                      <DateInput
                        key={field.id}
                        field={field}
                        value={data[field.name]}
                        error={errors[field.name]}
                        register={register}
                        setValue={setValue}
                      />
                    );
                  default:
                    return (
                      <DefaultInput
                        key={field.id}
                        field={field}
                        value={data[field.name]}
                        error={errors[field.name]}
                        register={register}
                        setValue={setValue}
                      />
                    );
                }
              })}
          </Row>
        </CardBody>
        <CardFooter>
          <Button
            style={{ marginRight: '20px' }}
            type="submit"
            status="Success"
            disabled={Object.keys(errors).length !== 0}
          >
            Save
          </Button>
          <Button type="button" status="Danger" onClick={onCancel}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default Form;
