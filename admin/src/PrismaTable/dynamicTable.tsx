import { Modal } from 'oah-ui';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from './Table';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { useLazyQuery, useMutation } from '@apollo/client';
import { TableContext } from './Context';
import EditRecord from './EditRecord';
import { mutationDocument, queryDocument } from './QueryDocument';

interface DynamicTableProps {
  parent?: { name: string; value: any };
  inEdit?: boolean;
  model: string;
  filter?: unknown;
  connect?: any;
  onConnect?: (value: any) => void;
}
const DynamicTable: React.FC<DynamicTableProps> = ({
  model,
  inEdit,
  filter,
  parent,
  connect,
  onConnect,
}) => {
  const [page, setPage] = useState({
    take: 10,
    skip: 0,
  });
  const [create, setCreate] = useState(false);
  const {
    schema: { models },
    query,
  } = useContext(TableContext);
  const modelObject = models.find((item) => item.id === model);

  const {
    where,
    orderBy,
    filterHandler,
    sortByHandler,
    initialFilter,
  } = useFilterAndSort(model, inEdit ? filter : query);

  const [getData, { data, loading, error }] = useLazyQuery(
    queryDocument(models, model),
    {
      variables: {
        where,
        orderBy,
        ...page,
      },
      fetchPolicy: 'no-cache',
    },
  );

  const [deleteOne] = useMutation(mutationDocument(models, model, 'delete'));

  useEffect(() => {
    let timeOut = 0;
    if (
      (!(query?.update || query?.view) || inEdit) &&
      !data &&
      !loading &&
      !error
    ) {
      timeOut = setTimeout(() => {
        getData();
      }, 5);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [data, loading, query]);

  const fetchMoreHandler = (pageSize: number, pageIndex: number) => {
    if (pageSize !== page.take || pageSize * pageIndex !== page.skip) {
      setPage({
        take: pageSize,
        skip: pageSize * pageIndex,
      });
    }
  };

  const onAction = (
    action: 'create' | 'delete' | 'connect',
    value?: unknown,
  ) => {
    switch (action) {
      case 'delete':
        deleteOne({
          variables: {
            where: {
              id: value,
            },
          },
        }).then(() => {
          getData();
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
  const parentName = modelObject?.fields.find(
    (item) => item.type === parent?.name,
  )?.name;
  const _data: any[] = data ? data[`findMany${model}`] : [];
  return (
    <>
      <Modal on={create} toggle={() => setCreate(false)}>
        <Form
          model={model}
          action="create"
          data={inEdit && parentName ? { [parentName]: parent?.value } : {}}
          onCancel={() => setCreate(false)}
          onSave={getData}
        />
      </Modal>
      {(query?.update || query?.view) && !inEdit ? (
        <EditRecord
          model={model}
          update={query.update}
          view={query?.view}
          onSave={getData}
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
                  _data.filter(
                    (item) =>
                      modelObject &&
                      item[modelObject.idField] !==
                        connect[modelObject.idField],
                  ),
                )
              : _data
          }
          fetchMore={fetchMoreHandler}
          loading={loading}
          filterHandler={filterHandler}
          sortByHandler={sortByHandler}
          initialFilter={initialFilter}
          pageCount={
            data ? Math.ceil(data[`findMany${model}Count`] / page.take) : 0
          }
        />
      )}
    </>
  );
};

export default DynamicTable;
