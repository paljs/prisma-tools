import { Schema } from './types';
import { format } from 'prettier';
import { writeFile } from 'fs';

export function buildPages(schema: Schema, path: string) {
  schema.models.forEach((model) => {
    const fileContent = format(page(model.id, model.name), {
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      parser: 'babel',
    });
    writeFile(`${path}/${model.id}.tsx`, fileContent, () => {});
  });
}

const page = (id: string, name: string) => `
import { Row, Col } from 'oah-ui';
import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { Table } from '../../components/Table';
import { useFindMany${id}CountQuery, useFindMany${id}Query } from '../../generated';
import { useFilterAndSort } from '../../components/Table/useFilterAndSort';
import { IPageProps } from '../../components/pageProps';

const ${id}: React.FC<IPageProps> = ({ location }) => {
  const [pageSize, setPageSize] = useState(10);
  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(location, '${id}');

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

  const fetchMoreHandler = (pageSize: number, pageIndex: number) => {
    fetchMore({
      variables: {
        skip: pageIndex * pageSize,
        first: pageSize,
      },
    });
    setPageSize(pageSize);
  };
  return (
    <>
      <SEO title="${name}" keywords={['OAH', 'application', 'react']} />
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Table
            model="${id}"
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
