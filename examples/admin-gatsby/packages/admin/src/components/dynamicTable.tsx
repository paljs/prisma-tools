import { Row, Col, Modal } from 'oah-ui';
import React, { useState } from 'react';
import { Table } from './Table';
import * as generate from '../generated';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { DocumentNode, useMutation, useQuery } from '@apollo/client';

type keys = keyof typeof generate;

interface DynamicTableProps {
  model: string;
  filter?: object;
  toggle?: () => void;
}
const DynamicTable: React.FC<DynamicTableProps> = ({ model, filter, toggle }) => {
  const [pageSize, setPageSize] = useState(10);
  const [update, setUpdate] = useState();
  const [create, setCreate] = useState(false);

  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(model, filter);

  const { data, loading, fetchMore } = useQuery(generate[`FindMany${model}Document` as keys] as DocumentNode, {
    variables: {
      where,
      orderBy,
      first: pageSize,
    },
  });

  const { data: dataCount, loading: loadingCount } = useQuery(
    generate[`FindMany${model}CountDocument` as keys] as DocumentNode,
    {
      variables: {
        where,
      },
    },
  );

  const [deleteOne] = useMutation(generate[`DeleteOne${model}Document` as keys] as DocumentNode);

  const fetchMoreHandler = (pageSize: number, pageIndex: number) => {
    fetchMore({
      variables: {
        skip: pageIndex * pageSize,
        first: pageSize,
      },
    });
    setPageSize(pageSize);
  };

  const onAction = (action: 'create' | 'update' | 'delete', id?: number) => {
    if (action === 'delete' && id) {
      deleteOne({
        variables: {
          where: {
            id,
          },
        },
      });
    } else if (action === 'update' && id && data[`findMany${model}`]) {
      setUpdate(data[`findMany${model}`].find((item: { id: number }) => item.id === id));
    } else if (action === 'create') {
      setCreate(true);
    }
  };

  return (
    <Row>
      <Modal on={create} toggle={() => setCreate(false)}>
        <Form model={model} action="create" data={{}} onCancel={() => setCreate(false)} />
      </Modal>
      <Modal on={!!update} toggle={() => setUpdate(undefined)}>
        <Form model={model} action="update" data={update} onCancel={() => setUpdate(undefined)} />
      </Modal>
      <Col breakPoint={{ xs: 12 }}>
        <Table
          toggle={toggle}
          onAction={onAction}
          model={model}
          data={data ? data[`findMany${model}`] : []}
          fetchMore={fetchMoreHandler}
          loading={loading || loadingCount}
          filterHandler={filterHandler}
          sortByHandler={sortByHandler}
          initialFilter={initialFilter}
          pageCount={dataCount ? Math.ceil(dataCount[`findMany${model}Count`] / pageSize) : 0}
        />
      </Col>
    </Row>
  );
};

export default DynamicTable;
