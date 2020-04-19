import React, { useState } from 'react';
import { Accordion, AccordionItem, Card, CardBody, Col, EvaIcon, Row, Select } from 'oah-ui';
import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useGetModelsQuery, useUpdateModelMutation } from '../../generated';
import UpdateModel from './UpdateModel';
import UpdateField from './UpdateField';
import styled from 'styled-components';

export const Settings: React.FC = () => {
  const { data } = useGetModelsQuery();
  const [updateModel] = useUpdateModelMutation();
  const [currentModel, setCurrentModel] = useState<any>();
  if (data?.getModels && !currentModel) {
    setCurrentModel({ value: data.getModels[0].id, label: data.getModels[0].name });
  }
  const model =
    currentModel && data?.getModels ? data?.getModels?.find((model) => model.id === currentModel.value) : null;

  const onDragEnd = (result: DropResult) => {
    const list = model?.fields.slice().sort((a, b) => a.order - b.order);
    if (list && result.destination && model) {
      const [removed] = list.splice(result.source.index, 1);
      list.splice(result.destination.index, 0, removed);
      const newListOrder = list.map((f, i) => {
        const field = { ...f };
        delete field.__typename;
        return { ...field, order: i + 1 };
      });
      updateModel({
        variables: {
          id: model.id,
          data: {
            fields: newListOrder,
          },
        },
      });
    }
  };

  return (
    <Row>
      <Col breakPoint={{ xs: 12, md: 6 }}>
        <Card size="Medium">
          <header>Update models Tables</header>
          <CardBody>
            <Row>
              <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
                <Select
                  status="Primary"
                  shape="SemiRound"
                  value={currentModel}
                  onChange={(option) => setCurrentModel(option)}
                  options={data?.getModels?.map((model) => ({ value: model.id, label: model.name }))}
                />
              </Col>
              <Col breakPoint={{ xs: 12 }}>{model && <UpdateModel {...model} />}</Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col breakPoint={{ xs: 12, md: 6 }}>
        {model && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={model.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Accordion>
                    {model.fields
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <StyledDragItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <AccordionItem
                                uniqueKey={index}
                                key={index}
                                title={
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <EvaIcon name="menu-outline" status="Primary" />{' '}
                                    <span style={{ marginLeft: '5px' }}>{field.title}</span>
                                  </div>
                                }
                              >
                                <UpdateField field={field} model={model?.id} />
                              </AccordionItem>
                            </StyledDragItem>
                          )}
                        </Draggable>
                      ))}
                  </Accordion>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Col>
    </Row>
  );
};

const StyledDragItem = styled.div`
  margin-bottom: 10px;
`;
