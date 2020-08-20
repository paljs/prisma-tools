import { useContext } from 'react';
import { TableContext } from './Context';
import { useMutation } from '@apollo/client';
import { mutationDocument } from './QueryDocument';
import { SchemaModel } from '@paljs/types';

export const useListConnectToOne = (parent: {
  name: string;
  value: any;
  field: string;
}) => {
  const {
    schema: { models },
  } = useContext(TableContext);
  const [updateModel, { loading: updateLoading }] = useMutation(
    mutationDocument(models, parent.name, 'update'),
  );

  const modelObject = models.find((m) => m.id === parent.name);

  const listConnectToOne = (
    fieldModel: SchemaModel,
    fieldId: any,
    connect = true,
  ) => {
    if (modelObject) {
      updateModel({
        variables: {
          where: {
            [modelObject.idField]: parent.value[modelObject.idField],
          },
          data: {
            [parent.field]: {
              [connect ? 'connect' : 'disconnect']: {
                [fieldModel.idField]: fieldId,
              },
            },
          },
        },
      });
    }
  };

  return {
    listConnectToOne,
    updateLoading,
    modelObject,
  };
};
