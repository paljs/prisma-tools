import React, { useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import Spinner from '../components/Spinner';
import Form from './Form';
import DynamicTable from './dynamicTable';
import { queryDocument } from './QueryDocument';
import { TableContext } from './Context';
import Select, { Option } from '../components/Select';

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
  const [getRecord, { data, loading, error }] = useLazyQuery(
    queryDocument(models, model, true, true),
  );

  const tabs = modelObject?.fields.filter(
    (field) => field.kind === 'object' && field.list && field.read,
  );
  const options: Option[] =
    tabs?.map((t) => ({ id: t.id, name: t.title })) || [];
  const [option, setOption] = useState(options[0]);
  const relationField = tabs?.find((t) => t.id === option.id);

  const isField = modelObject?.fields.find(
    (field) => field.name === modelObject?.idField,
  );
  if (modelObject && !data && !loading && !error) {
    getRecord({
      variables: {
        where: {
          [modelObject.idField]:
            isField?.type === 'String'
              ? update || view
              : parseInt(update || view),
        },
      },
    });
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
          <div className="flex items-center bg-white rounded shadow-lg mb-4 p-4">
            <div
              className={`text-gray-700 font-bold ${
                dir === 'rtl' ? 'ml-4' : 'mr-4'
              }`}
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
          {relationField && (
            <DynamicTable
              key={relationField.type}
              model={relationField.type}
              inEdit
              filter={{ [model]: record[modelObject.idField] }}
              parent={{ name: model, value: record, field: relationField.name }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditRecord;
