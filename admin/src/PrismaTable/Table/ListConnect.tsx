import React, { useContext } from 'react';

import { SchemaModel, TableParentRecord } from '../../types';
import { useListConnectToOne } from '../useListConnectToOne';
import Spinner from '../../components/Spinner';
import { TableContext } from '../Context';
import { buttonClasses, classNames } from '../../components/css';

interface ListConnectProps {
  parent: TableParentRecord;
  row: any;
  model: SchemaModel;
  getData: () => void;
}
export const ListConnect: React.FC<ListConnectProps> = ({
  parent,
  row,
  model,
  getData,
}) => {
  const { listConnectToOne, updateLoading } = useListConnectToOne(parent);
  const { lang } = useContext(TableContext);
  const rowId = row.original[model.idField];

  const isConnected = !!parent.value[parent.field].find(
    (r: any) => r[model.idField] === rowId,
  );

  return (
    <td className="px-4 py-2 text-center whitespace-nowrap">
      <button
        className={classNames(
          buttonClasses,
          'rounded-md py-2 px-4 bg-transparent hover:bg-opacity-25',
          isConnected
            ? 'text-red-600 hover:bg-red-100'
            : 'text-green-600 hover:bg-green-100',
        )}
        onClick={() => listConnectToOne(model, rowId, !isConnected, getData)}
      >
        {isConnected ? lang.disConnect : lang.connect}
        {updateLoading && <Spinner h="h-5" w="w-5" />}
      </button>
    </td>
  );
};
