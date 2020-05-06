import React from 'react';
import { Card, Col, Row, Spinner, Tab, Tabs } from 'oah-ui';
import Form from './Form';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import DynamicTable from './dynamicTable';
import { DocumentNode, useQuery } from '@apollo/client';
import * as generate from '../generated';
import { useModel } from './useSchema';

interface EditRecordProps {
  model: string;
  update: any;
  toggle?: () => void;
}
type keys = keyof typeof generate;

const StyledTabs = styled(Tabs)<{ children: any }>`
  .tab-content {
    padding: 0;
  }
`;

const EditRecord: React.FC<EditRecordProps> = ({ model, update, toggle }) => {
  const modelObject = useModel(model);
  const { data, loading } = useQuery(generate[`FindOne${model}Document` as keys] as DocumentNode, {
    variables: {
      where: modelObject
        ? {
            [modelObject.idField]: parseInt(update),
          }
        : {},
    },
    fetchPolicy: 'cache-first',
  });

  const record = data ? data[`findOne${model}`] : {};
  const tabs = modelObject?.fields.filter((field) => field.kind === 'object' && field.list);

  if (!loading && !data[`findOne${model}`]) {
    navigate(`/models/${model}`);
    return <></>;
  }

  return loading || !modelObject ? (
    <Spinner size="Giant" />
  ) : (
    <Row>
      <Col breakPoint={{ xs: 12 }}>
        <Form
          model={model}
          action="update"
          data={record}
          onCancel={() => (toggle ? toggle() : navigate(`/models/${model}`))}
          inModal={!!toggle}
        />
      </Col>
      {tabs?.length && !toggle && (
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <StyledTabs>
              {tabs.map((field) => {
                return (
                  <Tab title={field.title} key={field.id}>
                    <DynamicTable
                      model={field.type}
                      inEdit
                      filter={record ? { [model]: record[modelObject.idField] } : {}}
                      parent={{ name: model, value: record }}
                    />
                  </Tab>
                );
              })}
            </StyledTabs>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default EditRecord;
