import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, Row, CardFooter } from 'oah-ui';
import { SchemaModel } from '@prisma-tools/admin';
import { BooleanInput, DateInput, DefaultInput, EnumInput } from './Inputs';
import 'react-datepicker/dist/react-datepicker.css';
import useActions from './useActions';

interface FormProps {
  action: 'update' | 'create';
  model: SchemaModel;
  data: any;
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({ action, model, data, onCancel }) => {
  const { onSave } = useActions(model, data, action, onCancel);
  const { register, errors, handleSubmit, setValue } = useForm();
  const onSubmit = (newData: any) => {
    console.log(newData);
    onSave(newData);
  };

  return (
    <Card status={action === 'update' ? 'Warning' : 'Success'}>
      <header>{action + ' ' + model.name}</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Row between="lg">
            {model.fields
              .filter((field) => field[action] && !field.list)
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
                    <DefaultInput
                      key={field.id}
                      field={field}
                      value={data[field.name].id}
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
