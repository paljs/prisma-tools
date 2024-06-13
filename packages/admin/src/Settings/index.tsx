import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ChevronUpIcon, ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import UpdateModel from './UpdateModel';
import UpdateField from './UpdateField';
import Select from '../components/Select';
import { GET_SCHEMA, UPDATE_MODEL } from '../SchemaQueries';
import { ContextProps, AdminSchemaModel } from '../types';
import { classNames } from '../components/css';

const defaultLanguage = {
  dir: 'ltr',
  header: 'Update models Tables',
  dbName: 'Database Name',
  displayName: 'Display Name',
  modelName: 'Model Name',
  idField: 'Id Field',
  displayFields: 'Display Fields',
  fieldName: 'Field Name',
  actions: 'Actions',
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
  read: 'Read',
  filter: 'Filter',
  sort: 'Sort',
  editor: 'Editor',
  upload: 'Upload',
  tableView: 'Table View',
  inputType: 'Input Type',
};

export type SettingLanguage = typeof defaultLanguage;

export const Settings: React.FC<{
  language?: Partial<SettingLanguage>;
}> = ({ language }) => {
  const { data } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);
  const models = data?.getSchema.models ?? [];
  const [updateModel] = useMutation(UPDATE_MODEL);
  const [currentModel, setCurrentModel] = useState<AdminSchemaModel>();
  const dataRef = useRef(models);
  const accordionRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openedField, setOpenedField] = useState('');

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
  const mergeLanguage = { ...defaultLanguage, ...language };
  const dir = mergeLanguage.dir;
  return (
    <div className="flex w-full flex-wrap">
      <div className={classNames('lg:w-1/2 w-full', dir === 'rtl' ? 'lg:pl-4' : 'lg:pr-4')}>
        <div className="flex flex-col bg-white rounded shadow-lg text-gray-800 mb-5">
          <header className="py-4 px-5 rounded-t border-b border-gray-100">{mergeLanguage.header}</header>
          <div className="relative py-4 px-5 flex-auto overflow-auto" style={{ overflow: 'visible' }}>
            <div className="w-full" style={{ marginBottom: '20px' }}>
              {currentModel && (
                <Select
                  value={{ id: currentModel.id, name: currentModel.name }}
                  onChange={(option: any) => setCurrentModel(models.find((model) => model.id === option.id))}
                  options={models.map((model) => ({
                    id: model.id,
                    name: model.name,
                  }))}
                  dir={dir}
                  popupFullWidth
                />
              )}
            </div>
            <div className="flex w-full flex-wrap space-y-4">
              {currentModel && <UpdateModel models={models} modelObject={currentModel} language={mergeLanguage} />}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
        {currentModel && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={currentModel.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ul className="shadow-box">
                    {currentModel.fields
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex flex-col w-full bg-white relative mb-2 rounded-md shadow-lg"
                            >
                              <div
                                className={classNames(
                                  'flex items-center justify-between text-gray-700 w-full px-8 py-6 cursor-pointer',
                                  field.id === openedField ? 'border-b border-gray-200' : '',
                                )}
                                onClick={() => setOpenedField(field.id === openedField ? '' : field.id)}
                              >
                                <div
                                  className={classNames(
                                    'flex items-center space-x-2.5',
                                    dir === 'rtl' ? 'space-x-reverse' : '',
                                  )}
                                >
                                  <Bars3Icon className="w-5 h-5 text-blue-700" />
                                  <span>{field.title}</span>
                                </div>
                                {field.id === openedField ? (
                                  <ChevronUpIcon className="w-5 h-5" />
                                ) : (
                                  <ChevronDownIcon className="w-5 h-5" />
                                )}
                              </div>

                              <div
                                ref={(r) => (accordionRef.current[index] = r)}
                                className="relative overflow-hidden transition-all max-h-0 duration-500"
                                style={
                                  openedField === field.id
                                    ? {
                                        maxHeight: accordionRef.current[index]?.scrollHeight + 'px',
                                      }
                                    : {}
                                }
                              >
                                <div className="p-6">
                                  <UpdateField field={field} model={currentModel?.id} language={mergeLanguage} />
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                  </ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};
