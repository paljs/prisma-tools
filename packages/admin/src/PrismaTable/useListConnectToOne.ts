import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import { AdminSchemaModel, TableParentRecord } from '../types';
import { mutationDocument } from './QueryDocument';
import { TableContext } from './Context';

export const useListConnectToOne = (parent: TableParentRecord) => {
  const {
    schema: { models },
  } = useContext(TableContext);
  const [updateModel, { loading: updateLoading }] = useMutation(mutationDocument(models, parent.name, 'update'));

  const modelObject = models.find((m) => m.id === parent.name);

  const listConnectToOne = (fieldModel: AdminSchemaModel, fieldId: any, connect = true, getData: () => void) => {
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
      }).then(() => {
        void (parent.updateRecord && parent.updateRecord());
        getData();
      });
    }
  };

  return {
    listConnectToOne,
    updateLoading,
    modelObject,
  };
};
