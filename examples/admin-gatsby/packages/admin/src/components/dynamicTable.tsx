import { Row, Col, Modal, Tabs, Tab, Card } from 'oah-ui';
import React, { useContext, useState } from 'react';
import { Table } from './Table';
import * as generate from '../generated';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import { navigate } from '@reach/router';
import { useUrlQuery } from './useUrlQuery';
import styled from 'styled-components';
import { LayoutContext } from '../Layouts';

type keys = keyof typeof generate;

interface DynamicTableProps {
  parent?: { name: string; value: any };
  inEdit?: boolean;
  model: string;
  filter?: object;
}
const DynamicTable: React.FC<DynamicTableProps> = ({ model, inEdit, filter, parent }) => {
  const [pageSize, setPageSize] = useState(10);
  const [update, setUpdate] = useState();
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

  if (query?.update && !update && data && !inEdit) {
    setUpdate(data[`findMany${model}`].find((item: { id: string }) => item.id == query.update));
  } else if (update && !query?.update) {
    setUpdate(undefined);
  }

  const fetchMoreHandler = (pageSize: number, pageIndex: number) => {
    fetchMore({
      variables: {
        skip: pageIndex * pageSize,
        first: pageSize,
      },
    });
    setPageSize(pageSize);
  };

  const onAction = (action: 'create' | 'delete', id?: number) => {
    if (action === 'delete' && id) {
      deleteOne({
        variables: {
          where: {
            id,
          },
        },
      });
    } else if (action === 'create') {
      setCreate(true);
    }
  };
  const parentName = modelObject?.fields.find((item) => item.type === parent?.name)?.name;
  return (
    <>
      <Modal on={create} toggle={() => setCreate(false)}>
        <Form
          model={model}
          action="create"
          data={inEdit && parentName ? { [parentName]: parent?.value } : {}}
          onCancel={() => setCreate(false)}
        />
      </Modal>
      <Modal on={!!update} toggle={() => navigate(`/models/${model}`)}>
        <Card>
          <StyledTabs>
            <Tab title={model}>
              <Form model={model} action="update" data={update} onCancel={() => navigate(`/models/${model}`)} />
            </Tab>
            {modelObject?.fields
              .filter((field) => field.kind === 'object' && field.list)
              .map((field) => {
                return (
                  <Tab title={models.find((item) => item.id === field.type)?.name} key={field.id}>
                    <DynamicTable
                      model={field.type}
                      inEdit
                      filter={update ? { [model]: update[modelObject.idField] } : {}}
                      parent={{ name: model, value: update }}
                    />
                  </Tab>
                );
              })}
          </StyledTabs>
        </Card>
      </Modal>
      <Table
        inEdit={inEdit}
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
    </>
  );
};

export default DynamicTable;

const StyledTabs = styled(Tabs)`
  .tab-content {
    padding: 0;
  }
`;
