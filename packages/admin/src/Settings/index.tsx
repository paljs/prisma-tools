import React, { useRef, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Col,
  EvaIcon,
  Row,
  Select,
} from '@paljs/ui';
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import UpdateModel from './UpdateModel';
import UpdateField from './UpdateField';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SCHEMA, UPDATE_MODEL } from '../SchemaQueries';
import { SchemaModel, ContextProps } from '../types';

export const Settings: React.FC = () => {
  const { data } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);
  const models = data?.getSchema.models ?? [];
  const [updateModel] = useMutation(UPDATE_MODEL);
  const [currentModel, setCurrentModel] = useState<SchemaModel>();
  const dataRef = useRef(models);

  if (!currentModel && models.length > 0) setCurrentModel(models[0]);

  if (dataRef.current !== models && models.length > 0 && currentModel) {
    dataRef.current = models;
    setCurrentModel(models.find((model) => model.id === currentModel.id));
  }

  const onDragEnd = (result: DropResult) => {
    const list = currentModel?.fields.slice().sort((a, b) => a.order - b.order);
    if (list && result.destination && currentModel) {
      const [removed] = list.splice(result.source.index, 1);
      list.splice(result.destination.index, 0, removed);
      const newListOrder = list.map((f, i) => {
        const field: any = { ...f };
        delete field.__typename;
        return { ...field, order: i + 1 };
      });
      updateModel({
        variables: {
          id: currentModel.id,
          data: {
            fields: newListOrder,
          },
        },
      });
      setCurrentModel({
        ...currentModel,
        fields: newListOrder,
      });
    }
  };

  return (
    <Row>
      <Col breakPoint={{ xs: 12, md: 6 }}>
        <Card>
          <header>Update models Tables</header>
          <CardBody style={{ overflow: 'visible' }}>
            <Row>
              <Col breakPoint={{ xs: 12 }} style={{ marginBottom: '20px' }}>
                {currentModel && (
                  <Select
                    status="Primary"
                    shape="SemiRound"
                    value={{ value: currentModel.id, label: currentModel.name }}
                    onChange={(option: any) =>
                      setCurrentModel(
                        models.find((model) => model.id === option.value),
                      )
                    }
                    options={models.map((model) => ({
                      value: model.id,
                      label: model.name,
                    }))}
                  />
                )}
              </Col>
              <Col breakPoint={{ xs: 12 }}>
                {currentModel && (
                  <UpdateModel models={models} modelObject={currentModel} />
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col breakPoint={{ xs: 12, md: 6 }}>
        {currentModel && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={currentModel.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Accordion>
                    {currentModel.fields
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
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
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <EvaIcon
                                      name="menu-outline"
                                      status="Primary"
                                    />{' '}
                                    <span style={{ marginLeft: '5px' }}>
                                      {field.title}
                                    </span>
                                  </div>
                                }
                              >
                                <UpdateField
                                  field={field}
                                  model={currentModel?.id}
                                />
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
