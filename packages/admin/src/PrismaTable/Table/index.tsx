import React, { useContext, useState } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';

import { columns } from './Columns';
import { initPages } from './utils';
import { TableContext } from '../Context';
import Spinner from '../../components/Spinner';
import Checkbox from '../../components/Checkbox';
import { ListConnect } from './ListConnect';
import {
  PencilAltIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/outline';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  SearchCircleIcon,
} from '@heroicons/react/solid';
import { Filter } from './Filters';
import { buttonClasses } from '../../components/css';

interface TableProps {
  inEdit?: boolean;
  model: string;
  data: any[];
  fetchMore: (pageSize: number, pageIndex: number) => void;
  loading: boolean;
  pageCount: number;
  initialFilter: { id: string; value: any }[];
  sortByHandler: (sortBy: { id: string; desc: boolean }[]) => void;
  filterHandler: (filters: { id: string; value: any }[]) => void;
  onAction: (action: 'create' | 'delete' | 'connect', value?: unknown) => void;
  connect?: any;
  parent?: { name: string; value: any; field: string };
}

export const Table: React.FC<TableProps> = ({
  initialFilter,
  model: modelName,
  data,
  fetchMore,
  loading,
  pageCount: controlledPageCount,
  sortByHandler,
  filterHandler,
  onAction,
  inEdit,
  connect,
  parent,
}) => {
  const {
    schema: { models },
    push,
    pagesPath,
    pageSize: defaultPageSize,
    pageSizeOptions,
    paginationOptions,
    tableColumns,
    onSelect,
    actions: userActions,
    actionButtons,
    lang,
    dir,
  } = useContext(TableContext);
  const model = models.find((item) => item.id === modelName);
  const columnList = columns(model, tableColumns);
  const tableInstance = useTable(
    {
      columns: columnList,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        filters: initialFilter,
      }, // Pass our hoisted table state
      manualFilters: true,
      manualSortBy: true,
      manualPagination: true,
      pageCount: controlledPageCount,
    } as any,
    useFilters,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setAllFilters,
    state: { pageIndex, pageSize, filters, sortBy },
  } = tableInstance as any;

  const [selected, setSelected] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(initialFilter.length > 0);
  // Listen for changes in pagination and use the state to fetch our new data

  const onSelectHandler = (state: boolean, id?: any) => {
    let newValues: any[];
    if (!state && !id) {
      newValues = [];
      setSelected(newValues);
    } else if (state && !id && model) {
      newValues = data.map((row) => row[model.idField]);
      setSelected(newValues);
    } else if (!state && id) {
      newValues = selected.filter((value) => value !== id);
      setSelected(newValues);
    } else {
      newValues = [...selected, id];
      setSelected(newValues);
    }
    onSelect && onSelect(newValues);
  };

  React.useEffect(() => {
    fetchMore(pageSize, pageIndex);
  }, [fetchMore, pageIndex, pageSize]);

  React.useEffect(() => {
    sortByHandler(sortBy);
  }, [sortBy]);

  React.useEffect(() => {
    filterHandler(filters);
  }, [filters]);

  const actions = userActions
    ? {
        create: userActions.includes('create'),
        update: userActions.includes('update'),
        delete: userActions.includes('delete'),
      }
    : {
        create: model?.create,
        update: model?.update,
        delete: model?.delete,
      };

  const ActionButtons = {
    Add: () => (
      <button
        className={
          buttonClasses +
          'rounded-md py-2 px-2 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800'
        }
        onClick={() => onAction('create')}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    ),
    Update: ({ id }: { id: any }) => (
      <button
        className={
          buttonClasses +
          'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
        }
        onClick={() =>
          model &&
          push(
            `${pagesPath}${modelName}?${
              actions.update ? 'update' : 'view'
            }=${id}`,
          )
        }
      >
        {actions.update ? (
          <PencilAltIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    ),
    Delete: ({ id }: { id: any }) => (
      <button
        className={
          buttonClasses +
          'bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-25'
        }
        onClick={() => {
          const confirm = window.confirm(lang.deleteConfirm);
          if (confirm && model) onAction('delete', id);
        }}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    ),
    ...actionButtons,
  };

  const isSelect = onSelect && !inEdit;

  const hasFilters = filters.length > 0;

  const parentModel = models.find((item) => item.id === parent?.name);
  const fieldUpdate = parentModel?.fields.find((f) => f.name === parent?.field)
    ?.update;
  // Render the UI for your table

  const thClasses =
    'px-4 py-2 text-center text-sm font-medium text-gray-500 whitespace-nowrap tracking-wider overflow-hidden overflow-ellipsis';
  const tdClasses =
    'px-4 py-2 text-center whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-500';
  return (
    <>
      {showFilter && model && (
        <Filter filters={filters} setAllFilters={setAllFilters} model={model} />
      )}
      <div className="flex flex-col rounded-lg shadow bg-white overflow-hidden">
        <div
          className={`w-full inline-flex space-x-4  space-y-2.5 space-y-reverse mt-4 ${
            dir === 'rtl' ? 'mr-4 space-x-reverse' : 'ml-4'
          }`}
        >
          <div>
            <ActionButtons.Add />
          </div>
          <button
            className={
              buttonClasses +
              'rounded-md py-2 px-2 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800'
            }
            onClick={() => {
              setShowFilter(!showFilter);
              setAllFilters([]);
            }}
          >
            {showFilter ? lang.clearAll : lang.filter}
          </button>
        </div>
        <div className="-my-2 overflow-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden relative">
              {loading && <Spinner />}
              <table
                className="min-w-full divide-y divide-gray-200 border-b border-t border-gray-200"
                {...getTableProps()}
              >
                <thead className="bg-gray-100">
                  {headerGroups.map((headerGroup: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {isSelect && (
                          <th scope="col" className={thClasses}>
                            <Checkbox
                              onChange={(e) =>
                                onSelectHandler(e.target.checked)
                              }
                              checked={
                                data.length > 0 &&
                                selected.length === data.length
                              }
                              indeterminate={
                                selected.length > 0 &&
                                selected.length !== data.length
                              }
                            />
                          </th>
                        )}
                        <th scope="col" className={thClasses} colSpan={2}>
                          {lang.actions}
                        </th>
                        {fieldUpdate && parent && (
                          <th scope="col" className={thClasses}>
                            <button
                              className={
                                buttonClasses +
                                'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
                              }
                              onClick={() => {
                                if (hasFilters) {
                                  setAllFilters([]);
                                } else {
                                  setAllFilters(initialFilter);
                                }
                              }}
                            >
                              {hasFilters ? lang.viewAll : lang.viewRelated}
                            </button>
                          </th>
                        )}
                        {headerGroup.headers.map(
                          (column: any, index2: number) => (
                            <th
                              scope="col"
                              className={thClasses}
                              key={index2}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps(),
                              )}
                            >
                              <div className="flex justify-center items-center">
                                {column.render('Header')}
                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <ArrowNarrowDownIcon className="h-5 w-5" />
                                    ) : (
                                      <ArrowNarrowUpIcon className="h-5 w-5" />
                                    )
                                  ) : (
                                    ''
                                  )}
                                </span>
                                {column.filterValue ? (
                                  <SearchCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  ''
                                )}
                              </div>
                            </th>
                          ),
                        )}
                      </tr>
                    </React.Fragment>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  {...getTableBodyProps()}
                >
                  {page.map((row: any, index: number) => {
                    prepareRow(row);
                    return (
                      <tr
                        className="hover:bg-gray-100 even:bg-gray-50"
                        key={index}
                        {...row.getRowProps()}
                      >
                        {isSelect && (
                          <td className={tdClasses}>
                            <Checkbox
                              onChange={(e) =>
                                onSelectHandler(
                                  e.target.checked,
                                  model && row.original[model.idField],
                                )
                              }
                              checked={
                                !!(
                                  model &&
                                  selected.includes(row.original[model.idField])
                                )
                              }
                            />
                          </td>
                        )}
                        {connect && (
                          <td colSpan={2} className={tdClasses}>
                            <button
                              className={
                                buttonClasses +
                                'bg-transparent text-green-600 hover:bg-green-100 hover:bg-opacity-25'
                              }
                              disabled={
                                model &&
                                connect[model.idField] ===
                                  row.original[model.idField]
                              }
                              onClick={() =>
                                onAction(
                                  'connect',
                                  data.find(
                                    (item) =>
                                      model &&
                                      item[model.idField] ===
                                        row.original[model.idField],
                                  ),
                                )
                              }
                            >
                              {model &&
                              connect[model.idField] ===
                                row.original[model.idField]
                                ? lang.connected
                                : lang.connect}
                            </button>
                          </td>
                        )}
                        {!connect && (
                          <td
                            className={tdClasses}
                            title={actions.update ? lang.editRow : lang.viewRow}
                            colSpan={actions.delete ? 1 : 2}
                          >
                            <ActionButtons.Update
                              id={model ? row.original[model.idField] : 0}
                            />
                          </td>
                        )}
                        {actions.delete && !connect && (
                          <td
                            className={tdClasses}
                            title={lang.deleteRow}
                            colSpan={1}
                          >
                            <ActionButtons.Delete
                              id={model ? row.original[model.idField] : 0}
                            />
                          </td>
                        )}
                        {parent && model && fieldUpdate && (
                          <ListConnect
                            parent={parent}
                            row={row}
                            model={model}
                          />
                        )}
                        {row.cells.map((cell: any, index2: number) => {
                          return (
                            <td
                              style={{ maxWidth: '9rem' }}
                              className={tdClasses}
                              key={index2}
                              {...cell.getCellProps()}
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr>
                    <td className={tdClasses} colSpan={10000}>
                      {lang.showing} {page.length} {lang.of} ~
                      {controlledPageCount * pageSize} {lang.results}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`flex flex-wrap w-full ${tdClasses}`}>
          <nav
            className={`"w-full md:w-1/2 justify-center mb-4 md:justify-start md:mb-0 relative z-0 inline-flex -space-x-px ${
              dir === 'rtl' ? 'space-x-reverse' : ''
            }`}
            aria-label="Pagination"
          >
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className={`relative inline-flex items-center px-2 py-2 ${
                dir === 'rtl' ? 'rounded-r-md' : 'rounded-l-md'
              } border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
            >
              <ChevronDoubleRightIcon
                className={`h-4 w-4 ${
                  dir === 'rtl' ? '' : 'transform rotate-180'
                }`}
              />
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronRightIcon
                className={`h-4 w-4 ${
                  dir === 'rtl' ? '' : 'transform rotate-180'
                }`}
              />
            </button>
            {initPages(pageCount, pageIndex + 1, paginationOptions).map(
              (item) => (
                <button
                  className={`${
                    item === pageIndex + 1
                      ? 'bg-blue-500 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
                  key={item}
                  onClick={() => gotoPage(item - 1)}
                >
                  {item}
                </button>
              ),
            )}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeftIcon
                className={`h-4 w-4 ${
                  dir === 'rtl' ? '' : 'transform rotate-180'
                }`}
              />
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={`relative inline-flex items-center px-2 py-2 ${
                dir === 'rtl' ? 'rounded-l-md' : 'rounded-r-md'
              } border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
            >
              <ChevronDoubleLeftIcon
                className={`h-4 w-4 ${
                  dir === 'rtl' ? '' : 'transform rotate-180'
                }`}
              />
            </button>
          </nav>
          <div
            className={`relative z-0 inline-flex -space-x-px ${
              dir === 'rtl' ? 'space-x-reverse' : ''
            } w-full justify-center md:justify-end md:w-1/2`}
          >
            {pageSizeOptions.map((item, index) => (
              <button
                key={index}
                className={`${
                  index === 0
                    ? dir === 'rtl'
                      ? 'rounded-r-md'
                      : 'rounded-l-md'
                    : index === pageSizeOptions.length - 1
                    ? dir === 'rtl'
                      ? 'rounded-l-md'
                      : 'rounded-r-md'
                    : ''
                } ${
                  item === pageSize
                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } relative inline-flex items-center px-2 py-1 border border-gray-300  text-sm font-medium`}
                onClick={() => setPageSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
