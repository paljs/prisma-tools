import { Row, Col } from 'oah-ui';
import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { Table } from '../../components/Table';
import {
  UserFragmentFragment,
  useDeleteOneUserMutation,
  useFindManyUserCountQuery,
  useFindManyUserQuery,
  useGetModelQuery,
} from '../../generated';
import { useFilterAndSort } from '../../components/Table/useFilterAndSort';
import { IPageProps } from '../../components/pageProps';
import Form from '../../components/Form';

const User: React.FC<IPageProps> = ({ location }) => {
  const [pageSize, setPageSize] = useState(10);
  const [update, setUpdate] = useState<UserFragmentFragment>();
  const [create, setCreate] = useState(false);

  const { data: modelData } = useGetModelQuery({
    variables: {
      id: 'User',
    },
  });

  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(
    location,
    modelData?.getModel,
  );

  const { data, loading, fetchMore } = useFindManyUserQuery({
    variables: {
      where,
      orderBy,
      first: pageSize,
    },
  });

  const { data: dataCount, loading: loadingCount } = useFindManyUserCountQuery({
    variables: {
      where,
    },
  });

  const [deleteUser] = useDeleteOneUserMutation();

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
      deleteUser({
        variables: {
          where: {
            id,
          },
        },
      });
    } else if (action === 'update' && id && data?.findManyUser) {
      setUpdate(data.findManyUser.find((item) => item.id === id));
    } else if (action === 'create') {
      setCreate(true);
    }
  };

  const onCancel = (action: 'create' | 'update') => {
    action === 'create' ? setCreate(false) : setUpdate(undefined);
  };

  return (
    <>
      <SEO title="User" keywords={['OAH', 'application', 'react']} />
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
            data={data?.findManyUser || []}
            fetchMore={fetchMoreHandler}
            loading={loading || loadingCount}
            filterHandler={filterHandler}
            sortByHandler={sortByHandler}
            initialFilter={initialFilter}
            pageCount={dataCount?.findManyUserCount ? Math.ceil(dataCount?.findManyUserCount / pageSize) : 0}
          />
        </Col>
      </Row>
    </>
  );
};

export default User;
