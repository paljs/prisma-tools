import { Schema } from "./types";
import { format } from "prettier";
import { writeFile } from "fs";

export function buildPages(schema: Schema, path: string) {
  schema.models.forEach((model) => {
    const fileContent = format(page(model.id, model.name), {
      semi: true,
      trailingComma: "all",
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: "babel-ts",
    });
    writeFile(`${path}/${model.id}.tsx`, fileContent, () => {});
  });
}

const page = (id: string, name: string) => `
import { Row, Col } from 'oah-ui';
import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { Table } from '../../components/Table';
import {
  ${id}FragmentFragment,
  useDeleteOne${id}Mutation,
  useFindMany${id}CountQuery,
  useFindMany${id}Query,
  useGetModelQuery,
} from '../../generated';
import { useFilterAndSort } from '../../components/Table/useFilterAndSort';
import { IPageProps } from '../../components/pageProps';
import Form from '../../components/Form';

const ${id}: React.FC<IPageProps> = ({ location }) => {
  const [pageSize, setPageSize] = useState(10);
  const [update, setUpdate] = useState<${id}FragmentFragment>();
  const [create, setCreate] = useState(false);

  const { data: modelData } = useGetModelQuery({
    variables: {
      id: '${id}',
    },
  });
  
  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(location, modelData?.getModel);

  const { data, loading, fetchMore } = useFindMany${id}Query({
    variables: {
      where,
      orderBy,
      first: pageSize,
    },
  });

  const { data: dataCount, loading: loadingCount } = useFindMany${id}CountQuery({
    variables: {
      where,
    },
  });

  const [delete${id}] = useDeleteOne${id}Mutation();

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
      delete${id}({
        variables: {
          where: {
            id,
          },
        },
      });
    } else if (action === 'update' && id && data?.findMany${id}) {
      setUpdate(data.findMany${id}.find((item) => item.id === id));
    } else if (action === 'create') {
      setCreate(true);
    }
  };

  const onCancel = (action: 'create' | 'update') => {
    action === 'create' ? setCreate(false) : setUpdate(undefined);
  }

  return (
    <>
      <SEO title="${name}" keywords={['OAH', 'application', 'react']} />
      <Row>
        {create && modelData?.getModel && (
          <Col breakPoint={{ xs: 12 }}>
            <Form model={modelData.getModel} action="create" data={{}} onCancel={() => onCancel('create')} />
          </Col>
        )}
        {update && modelData?.getModel && (
          <Col breakPoint={{ xs: 12 }}>
            <Form model={modelData.getModel} action="update" data={update} onCancel={() => onCancel('update')} />
          </Col>
        )}
        <Col breakPoint={{ xs: 12 }}>
          <Table
            onAction={onAction}
            model={modelData?.getModel}
            data={data?.findMany${id} || []}
            fetchMore={fetchMoreHandler}
            loading={loading || loadingCount}
            filterHandler={filterHandler}
            sortByHandler={sortByHandler}
            initialFilter={initialFilter}
            pageCount={
              dataCount?.findMany${id}Count ? Math.ceil(dataCount?.findMany${id}Count / pageSize) : 0
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default ${id};
`;
