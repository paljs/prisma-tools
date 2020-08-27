import React from 'react';
import { Button } from '@paljs/ui/Button';
import { useListConnectToOne } from '../useListConnectToOne';
import { SchemaModel } from '@paljs/types';
import Spinner from '@paljs/ui/Spinner';

interface ListConnectProps {
  parent: { name: string; value: any; field: string };
  row: any;
  model: SchemaModel;
}
export const ListConnect: React.FC<ListConnectProps> = ({
  parent,
  row,
  model,
}) => {
  const { listConnectToOne, updateLoading } = useListConnectToOne(parent);

  const rowId = row.original[model.idField];

  const isConnected = !!parent.value[parent.field].find(
    (r: any) => r[model.idField] === rowId,
  );

  return (
    <td style={{ position: 'relative' }}>
      <Button
        size="Small"
        appearance="ghost"
        status={isConnected ? 'Danger' : 'Success'}
        onClick={() => listConnectToOne(model, rowId, !isConnected)}
      >
        {isConnected ? 'DisConnect' : 'Connect'}
        {updateLoading && <Spinner size="Tiny" />}
      </Button>
    </td>
  );
};
