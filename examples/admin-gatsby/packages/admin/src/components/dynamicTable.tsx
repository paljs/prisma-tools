import { Modal } from 'oah-ui';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from './Table';
import * as generate from '../generated';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { DocumentNode, useLazyQuery, useMutation } from '@apollo/client';
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

  const [getData, { data, loading }] = useLazyQuery(generate[`FindMany${model}Document` as keys] as DocumentNode, {
    variables: {
      where,
      orderBy,
      ...page,
    },
    fetchPolicy: 'no-cache',
  });

  const [deleteOne] = useMutation(generate[`DeleteOne${model}Document` as keys] as DocumentNode);

  useEffect(() => {
    let timeOut = 0;
    if ((!(query?.update || query?.view) || inEdit) && !data && !loading) {
      timeOut = setTimeout(() => {
        getData();
      }, 5);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [data, loading, query]);

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
          onSave={getData}
        />
      </Modal>
      {(query?.update || query?.view) && !inEdit ? (
        <EditRecord model={model} update={query.update} view={query?.view} onSave={getData} />
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
          loading={loading}
          filterHandler={filterHandler}
          sortByHandler={sortByHandler}
          initialFilter={initialFilter}
          pageCount={data ? Math.ceil(data[`findMany${model}Count`] / page.first) : 0}
        />
      )}
    </>
  );
};

export default DynamicTable;
