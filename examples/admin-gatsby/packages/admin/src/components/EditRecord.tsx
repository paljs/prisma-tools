import React from 'react';
import { Card, Col, Row, Spinner, Tab, Tabs } from 'oah-ui';
import Form from './Form';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import DynamicTable from './dynamicTable';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import * as generate from '../generated';
import { useModel } from './useSchema';

interface EditRecordProps {
  model: string;
  update: any;
  view?: any;
  onSave: () => void;
}
type keys = keyof typeof generate;

const StyledTabs = styled(Tabs)<{ children: any }>`
  .tab-content {
    padding: 0;
  }
`;

const EditRecord: React.FC<EditRecordProps> = ({ model, update, onSave, view }) => {
  const modelObject = useModel(model);
  const [getRecord, { data, loading }] = useLazyQuery(generate[`FindOne${model}Document` as keys] as DocumentNode);

  if (modelObject && !data && !loading) {
    getRecord({
      variables: {
        where: { [modelObject.idField]: parseInt(update || view) },
      },
    });
  }

  const record = data ? data[`findOne${model}`] : {};
  const tabs = modelObject?.fields.filter((field) => field.kind === 'object' && field.list && field.update);

  if (!loading && data && !data[`findOne${model}`] && modelObject) navigate(`/models/${model}`);

  return loading || !modelObject ? (
    <Spinner size="Giant" />
  ) : (
    <Row>
      <Col breakPoint={{ xs: 12 }}>
        <Form
          model={model}
          action={view ? 'view' : 'update'}
          data={record}
          onCancel={() => navigate(`/models/${model}`)}
          onSave={onSave}
        />
      </Col>
      {!!tabs?.length && (
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
