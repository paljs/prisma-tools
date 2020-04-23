import * as generate from '../../generated';
import { DocumentNode, useMutation } from '@apollo/client';
import { SchemaModel } from '@prisma-tools/admin';

type keys = keyof typeof generate;

const useActions = (model: SchemaModel, data: any, action: 'create' | 'update', onCancel: () => void) => {
  const [updateModel] = useMutation(generate[`UpdateOne${model.id}Document` as keys] as DocumentNode);
  const [createModel] = useMutation(generate[`CreateOne${model.id}Document` as keys] as DocumentNode);

  const getField = (name: string) => {
    return model.fields.find((item) => item.name === name);
  };

  const getValue = (type: string | undefined, value: string) => {
    return type === 'Int' ? parseInt(value) : type === 'Float' ? parseFloat(value) : value;
  };

  const onUpdateHandler = (newData: any) => {
    const updateData: any = {};
    Object.keys(newData).forEach((key) => {
      const field = getField(key);
      if (field?.kind === 'object') {
        if (newData[key]) {
          if (!data[key] || newData[key] !== data[key].id) {
            updateData[key] = {
              connect: {
                id: getValue('Int', newData[key]),
              },
            };
          }
        }
      } else if (newData[key] !== data[key]) {
        updateData[key] = getValue(field?.type, newData[key]);
      }
    });
    updateModel({
      variables: {
        where: {
          id: data.id,
        },
        data: updateData,
      },
    }).then(onCancel);
  };

  const onCreateHandler = (newData: any) => {
    const createData: any = {};
    Object.keys(newData).forEach((key) => {
      const field = getField(key);
      if (field?.kind === 'object') {
        if (newData[key]) {
          createData[key] = {
            connect: {
              id: getValue('Int', newData[key]),
            },
          };
        }
      } else {
        createData[key] = getValue(field?.type, newData[key]);
      }
    });
    createModel({
      variables: {
        data: createData,
      },
    }).then(onCancel);
  };

  const onSave = (newData: any) => {
    action === 'create' ? onCreateHandler(newData) : onUpdateHandler(newData);
  };

  return {
    onSave,
  };
};

export default useActions;
