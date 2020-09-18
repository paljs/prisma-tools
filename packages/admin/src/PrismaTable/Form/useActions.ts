import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { TableContext } from '../Context';
import { FormProps } from './index';
import { mutationDocument } from '../QueryDocument';
import { SchemaModel } from '../../types';

export const getValueByType = (type: string | undefined, value: string) => {
  return type === 'Int'
    ? { set: parseInt(value) }
    : type === 'Float'
    ? { set: parseFloat(value) }
    : { set: value };
};

const useActions = (
  model: SchemaModel,
  data: any,
  action: FormProps['action'],
  onSave: () => void,
) => {
  const {
    schema: { models },
    valueHandler,
  } = useContext(TableContext);
  const [updateModel, { loading: updateLoading }] = useMutation(
    mutationDocument(models, model.id, 'update'),
  );
  const [createModel, { loading: createLoading }] = useMutation(
    mutationDocument(models, model.id, 'create'),
  );
  const getField = (name: string) => {
    return model.fields.find((item) => item.name === name);
  };

  const onUpdateHandler = (newData: any) => {
    const updateData: any = {};

    Object.keys(newData).forEach((key) => {
      const field = getField(key);
      if (field?.update) {
        if (field.kind === 'object') {
          const fieldModel = models.find((item) => item.id === field.type)!;
          if (
            (newData[key] && !data[key]) ||
            (newData[key] &&
              newData[key][fieldModel.idField] !==
                data[key][fieldModel.idField])
          ) {
            const editField = fieldModel.fields.find(
              (item) => item.name === fieldModel.idField,
            )!;
            updateData[key] = {
              connect: {
                id: getValueByType(
                  editField.type,
                  newData[key][fieldModel.idField],
                ),
              },
            };
          } else if (!newData[key] && data[key]) {
            updateData[key] = { disconnect: true };
          }
        } else if (newData[key] !== data[key]) {
          updateData[key] = valueHandler
            ? valueHandler(newData[key], field?.type)
            : getValueByType(field?.type, newData[key]);
        }
      }
    });
    if (Object.keys(updateData).length > 0) {
      updateModel({
        variables: {
          where: {
            id: data.id,
          },
          data: updateData,
        },
      }).then(() => {
        onSave();
      });
    }
  };

  const onCreateHandler = (newData: any) => {
    const createData: any = {};
    Object.keys(newData).forEach((key) => {
      const field = getField(key);
      if (field?.kind === 'object') {
        const fieldModel = models.find((item) => item.id === field.type)!;
        const editField = fieldModel.fields.find(
          (item) => item.name === fieldModel.idField,
        )!;
        if (newData[key]) {
          createData[key] = {
            connect: {
              id: getValueByType(
                editField.type,
                newData[key][fieldModel.idField],
              ),
            },
          };
        }
      } else {
        createData[key] = valueHandler
          ? valueHandler(newData[key], field?.type)
          : getValueByType(field?.type, newData[key]);
      }
    });
    createModel({
      variables: {
        data: createData,
      },
    }).then(() => {
      onSave();
    });
  };

  const onSubmit = (newData: any) => {
    action === 'create' ? onCreateHandler(newData) : onUpdateHandler(newData);
  };

  return {
    onSubmit,
    loading: updateLoading || createLoading,
  };
};

export default useActions;
