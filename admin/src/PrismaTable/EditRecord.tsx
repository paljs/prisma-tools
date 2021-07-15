import React, { useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import Spinner from '../components/Spinner';
import Form from './Form';
import DynamicTable from './dynamicTable';
import { queryDocument } from './QueryDocument';
import { TableContext } from './Context';
import Select, { Option } from '../components/Select';
import { classNames } from '../components/css';

interface EditRecordProps {
  model: string;
  update: any;
  view?: any;
  onSave: () => void;
}

const EditRecord: React.FC<EditRecordProps> = ({
  model,
  update,
  onSave,
  view,
}) => {
  const {
    schema: { models },
    push,
    pagesPath,
    onCancelUpdate,
    actions,
    lang,
    dir,
  } = useContext(TableContext);
  const modelObject = models.find((item) => item.id === model);
  const isField = modelObject?.fields.find(
    (field) => field.name === modelObject?.idField,
  );
  const [getRecord, { data, loading, error, refetch }] = useLazyQuery(
    queryDocument(models, model, true, true),
    {
      variables: modelObject
        ? {
            where: {
              [modelObject.idField]:
                isField?.type === 'String'
                  ? update || view
                  : parseInt(update || view),
            },
          }
        : undefined,
    },
  );

  const tabs = modelObject?.fields.filter(
    (field) => field.kind === 'object' && field.list && field.read,
  );
  const options: Option[] =
    tabs?.map((t) => ({ id: t.id, name: t.title })) || [];
  const [option, setOption] = useState(options[0]);
  const relationField = tabs?.find((t) => t.id === option.id);

  if (modelObject && !data && !loading && !error) {
    getRecord();
  }

  const record = data ? data[`findUnique${model}`] : {};

  if (
    (!loading && data && !data[`findUnique${model}`] && modelObject) ||
    (modelObject && !modelObject.update && !actions && !view) ||
    (actions && !actions.includes('update') && !view)
  )
    push(pagesPath + model);

  const onUpdateCancel =
    onCancelUpdate ||
    function () {
      push(pagesPath + model);
    };

  return loading || !modelObject || !data ? (
    <Spinner />
  ) : (
    <div className="flex flex-wrap w-full">
      <div className="w-full">
        <Form
          model={model}
          action={view ? 'view' : 'update'}
          data={record}
          onCancel={() => onUpdateCancel({ model })}
          onSave={onSave}
        />
      </div>
      {!!tabs?.length && !!Object.keys(record).length && (
        <div className="w-full">
          {relationField && (
            <DynamicTable
              headerActions={
                <div className="flex items-center">
                  <div
                    className={classNames(
                      'text-gray-700 font-bold',
                      dir === 'rtl' ? 'ml-4' : 'mr-4',
                    )}
                  >
                    {lang.relation}
                  </div>
                  <Select
                    dir={dir}
                    className="max-w-xs"
                    value={option}
                    onChange={setOption}
                    options={options}
                  />
                </div>
              }
              key={relationField.type}
              model={relationField.type}
              inEdit
              filter={{ [model]: record[modelObject.idField] }}
              parent={{
                name: model,
                value: record,
                field: relationField.name,
                updateRecord: refetch,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditRecord;
