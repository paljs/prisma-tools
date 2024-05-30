import React, { useContext, useEffect, useState } from 'react';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';

import Modal from '../components/Modal';
import { Table } from './Table';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { TableContext } from './Context';
import EditRecord from './EditRecord';
import { mutationDocument, queryDocument } from './QueryDocument';
import { ContextProps, TableParentRecord } from '..';
import { LazyQueryExecFunction } from '@apollo/client/react/types/types';

interface OperationVariables {
  where: any;
  orderBy?: any[];
  take: number;
  skip: number;
}

export interface DynamicTableProps {
  parent?: TableParentRecord;
  inEdit?: boolean;
  model: string;
  filter?: unknown;
  connect?: any;
  headerActions?: any;
  onConnect?: (value: any) => void;
  children?:
    | ((options: {
        context: ContextProps;
        query: {
          variables: {
            where: any;
            orderBy?: any[];
            take: number;
            skip: number;
          };
          data?: any;
          loading: boolean;
          error?: ApolloError;
          getData: LazyQueryExecFunction<any, OperationVariables>;
        };
      }) => React.ReactNode)
    | null;
}
const DynamicTable: React.FC<DynamicTableProps> = ({
  model,
  inEdit,
  filter,
  parent,
  connect,
  onConnect,
  children,
  headerActions,
}) => {
  const context = useContext(TableContext);
  const {
    schema: { models },
    query,
    onCancelCreate,
    onSaveCreate,
    onSaveUpdate,
    push,
    pagesPath,
    pageSize,
    defaultOrderBy,
  } = context;
  const [page, setPage] = useState({
    take: pageSize,
    skip: 0,
  });
  const [create, setCreate] = useState(false);
  const modelObject = models.find((item) => item.id === model);

  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(
    model,
    inEdit ? filter : query,
    defaultOrderBy ? defaultOrderBy[model] : undefined,
  );

  const variables: OperationVariables = {
    where,
    orderBy,
    ...page,
  };

  const [getData, { data, loading, error }] = useLazyQuery<any, OperationVariables>(queryDocument(models, model), {
    variables,
    fetchPolicy: 'no-cache',
  });
  const whereRef = React.useRef(where);

  useEffect(() => {
    if (
      where &&
      whereRef.current &&
      where !== whereRef.current &&
      Object.keys(whereRef.current).length === Object.keys(where).length
    ) {
      getData();
    }
    whereRef.current = where;
  }, [where, getData]);

  const [deleteOne] = useMutation(mutationDocument(models, model, 'delete'));

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if ((!(query?.update || query?.view) || inEdit) && !data && !loading && !error) {
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

  const onAction = (action: 'create' | 'delete' | 'connect', value?: unknown) => {
    switch (action) {
      case 'delete':
        if (modelObject) {
          deleteOne({
            variables: {
              where: {
                [modelObject.idField]: value,
              },
            },
          }).then(() => {
            getData();
          });
        }
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

  const onCreateCancel =
    onCancelCreate ||
    function () {
      setCreate(false);
    };

  const onCreateSave =
    onSaveCreate ||
    function () {
      setCreate(false);
      parent?.updateRecord && parent.updateRecord();
      getData();
    };

  const onUpdateSave =
    onSaveUpdate ||
    function () {
      push(pagesPath + model);
      getData();
    };

  const parentName = modelObject?.fields.find((item) => item.type === parent?.name)?.name;
  const _data: any[] = data ? data[`findMany${model}`] : [];
  return (
    <>
      {children &&
        children({
          context,
          query: { variables, data, getData, loading, error },
        })}
      <Modal on={create} toggle={() => setCreate(!create)}>
        <Form
          model={model}
          action="create"
          data={inEdit && parentName ? { [parentName]: parent?.value } : {}}
          onCancel={() => onCreateCancel({ model, setCreateModal: setCreate })}
          onSave={() =>
            onCreateSave({
              model,
              setCreateModal: setCreate,
              refetchTable: getData,
            })
          }
        />
      </Modal>
      {(query?.update || query?.view) && !inEdit ? (
        <EditRecord
          model={model}
          update={query.update}
          view={query?.view}
          onSave={() => onUpdateSave({ model, refetchTable: getData })}
        />
      ) : (
        <Table
          getData={getData}
          parent={parent}
          connect={connect}
          inEdit={inEdit}
          onAction={onAction}
          headerActions={headerActions}
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
          pageCount={data ? Math.ceil(data[`findMany${model}Count`] / page.take) : 0}
        />
      )}
    </>
  );
};

export default DynamicTable;
