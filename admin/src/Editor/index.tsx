import React, { useContext } from 'react';
import { InputProps } from '../types';
import { TableContext } from '../PrismaTable';

const ReactQuill =
  typeof window !== 'undefined' ? require('react-quill') : <div />;

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 4, 5, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'script',
  'code',
  'color',
  'size',
  'blockquote',
  'list',
  'font',
  'background',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
  'direction',
  'align',
];

const Editor: React.FC<InputProps> = ({
  field,
  value,
  error,
  register,
  setValue,
  disabled,
}) => {
  const { lang } = useContext(TableContext);
  React.useEffect(() => {
    register(field.name, { required: field.required });
  }, [register]);

  return (
    <div className="flex flex-wrap w-full pr-2 pt-2">
      <div className="w-full text-gray-600 font-bold">
        {field.title}
        <span className="text-red-700 text-xs">
          {error ? lang.isRequired : ''}
        </span>
      </div>
      <div className="w-full">
        <ReactQuill
          readOnly={disabled}
          theme="snow"
          modules={modules}
          formats={formats}
          defaultValue={value}
          onChange={(value: string) =>
            setValue(field.name, value, {
              shouldValidate: !!value || !field.required,
              shouldDirty: true,
            })
          }
        />
      </div>
    </div>
  );
};

export default Editor;
