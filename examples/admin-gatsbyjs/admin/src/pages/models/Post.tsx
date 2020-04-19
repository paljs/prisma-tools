import { Row, Col } from 'oah-ui';
import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { Table } from '../../components/Table';
import {
  PostFragmentFragment,
  useDeleteOnePostMutation,
  useFindManyPostCountQuery,
  useFindManyPostQuery,
  useGetModelQuery,
} from '../../generated';
import { useFilterAndSort } from '../../components/Table/useFilterAndSort';
import { IPageProps } from '../../components/pageProps';
import Form from '../../components/Form';

const Post: React.FC<IPageProps> = ({ location }) => {
  const [pageSize, setPageSize] = useState(10);
  const [update, setUpdate] = useState<PostFragmentFragment>();
  const [create, setCreate] = useState(false);

  const { data: modelData } = useGetModelQuery({
    variables: {
      id: 'Post',
    },
  });

  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(
    location,
    modelData?.getModel,
  );

  const { data, loading, fetchMore } = useFindManyPostQuery({
    variables: {
      where,
      orderBy,
      first: pageSize,
    },
  });

  const { data: dataCount, loading: loadingCount } = useFindManyPostCountQuery({
    variables: {
      where,
    },
  });

  const [deletePost] = useDeleteOnePostMutation();

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
      deletePost({
        variables: {
          where: {
            id,
          },
        },
      });
    } else if (action === 'update' && id && data?.findManyPost) {
      setUpdate(data.findManyPost.find((item) => item.id === id));
    } else if (action === 'create') {
      setCreate(true);
    }
  };

  const onCancel = (action: 'create' | 'update') => {
    action === 'create' ? setCreate(false) : setUpdate(undefined);
  };

  return (
    <>
      <SEO title="Post" keywords={['OAH', 'application', 'react']} />
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
            data={data?.findManyPost || []}
            fetchMore={fetchMoreHandler}
            loading={loading || loadingCount}
            filterHandler={filterHandler}
            sortByHandler={sortByHandler}
            initialFilter={initialFilter}
            pageCount={dataCount?.findManyPostCount ? Math.ceil(dataCount?.findManyPostCount / pageSize) : 0}
          />
        </Col>
      </Row>
    </>
  );
};

export default Post;
