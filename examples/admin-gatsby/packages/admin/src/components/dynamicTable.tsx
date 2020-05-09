import { Modal } from 'oah-ui';
import React, { useContext, useState } from 'react';
import { Table } from './Table';
import * as generate from '../generated';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import { useUrlQuery } from './useUrlQuery';
import { LayoutContext } from '../Layouts';
import EditRecord from './EditRecord';

type keys = keyof typeof generate;

interface DynamicTableProps {
  parent?: { name: string; value: any };
  inEdit?: boolean;
  model: string;
  filter?: object;
  connect?: any;
  onConnect?: (value: any) => void;
}
const DynamicTable: React.FC<DynamicTableProps> = ({ model, inEdit, filter, parent, connect, onConnect }) => {
  const [page, setPage] = useState({
    first: 10,
    skip: 0,
  });
  const [create, setCreate] = useState(false);
  const query = useUrlQuery();
  const {
    schema: { models },
  } = useContext(LayoutContext);
  const modelObject = models.find((item) => item.id === model);

  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(
    model,
    inEdit ? filter : query,
  );

  const { data, loading, refetch } = useQuery(generate[`FindMany${model}Document` as keys] as DocumentNode, {
    variables: {
      where,
      orderBy,
      ...page,
    },
    fetchPolicy: 'no-cache',
  });

  const { data: dataCount, loading: loadingCount, refetch: refetchCount } = useQuery(
    generate[`FindMany${model}CountDocument` as keys] as DocumentNode,
    {
      variables: {
        where,
      },
      fetchPolicy: 'no-cache',
    },
  );

  const [deleteOne] = useMutation(generate[`DeleteOne${model}Document` as keys] as DocumentNode);

  const fetchMoreHandler = (pageSize: number, pageIndex: number) => {
    if (pageSize !== page.first || pageSize * pageIndex !== page.skip) {
      setPage({
        first: pageSize,
        skip: pageSize * pageIndex,
      });
    }
  };

  const onAction = (action: 'create' | 'delete' | 'connect', value?: number | object) => {
    switch (action) {
      case 'delete':
        deleteOne({
          variables: {
            where: {
              id: value,
            },
          },
        }).then(() => {
          refetch();
          refetchCount();
        });
        break;
      case 'create':
        setCreate(true);
        break;
      case 'connect':
        if (onConnect) {
          onConnect(value);
        }
        break;
    }
  };
  const parentName = modelObject?.fields.find((item) => item.type === parent?.name)?.name;
  const _data: any[] = data ? data[`findMany${model}`] : [];
  return (
    <>
      <Modal on={create} toggle={() => setCreate(false)}>
        <Form
          model={model}
          action="create"
          data={inEdit && parentName ? { [parentName]: parent?.value } : {}}
          onCancel={() => setCreate(false)}
          onSave={() => {
            refetch();
            refetchCount();
          }}
        />
      </Modal>
      {query?.update && !inEdit ? (
        <EditRecord
          model={model}
          update={query.update}
          onSave={() => {
            refetch();
            refetchCount();
          }}
        />
      ) : (
        <Table
          connect={connect}
          inEdit={inEdit}
          onAction={onAction}
          model={model}
          data={
            connect && Object.keys(connect).length > 0
              ? [connect].concat(
                  _data.filter((item) => modelObject && item[modelObject.idField] !== connect[modelObject.idField]),
                )
              : _data
          }
          fetchMore={fetchMoreHandler}
          loading={loading || loadingCount}
          filterHandler={filterHandler}
          sortByHandler={sortByHandler}
          initialFilter={initialFilter}
          pageCount={dataCount ? Math.ceil(dataCount[`findMany${model}Count`] / page.first) : 0}
        />
      )}
    </>
  );
};

export default DynamicTable;
