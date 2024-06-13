import React, { Fragment, useContext, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

import { columns } from './Columns';
import { initPages } from './utils';
import { TableContext } from '../Context';
import Spinner from '../../components/Spinner';
import Checkbox from '../../components/Checkbox';
import { ListConnect } from './ListConnect';
import { PencilSquareIcon, EyeIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassCircleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import { Filter } from './Filters';
import { buttonClasses, classNames } from '../../components/css';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { TableParentRecord } from '../..';

interface TableProps {
  getData: () => void;
  inEdit?: boolean;
  model: string;
  data: any[];
  fetchMore: (pageSize: number, pageIndex: number) => void;
  loading: boolean;
  pageCount: number;
  headerActions?: any;
  initialFilter: { id: string; value: any }[];
  sortByHandler: (sortBy: { id: string; desc: boolean }[]) => void;
  filterHandler: (filters: { id: string; value: any }[]) => void;
  onAction: (action: 'create' | 'delete' | 'connect', value?: unknown) => void;
  connect?: any;
  parent?: TableParentRecord;
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
  getData,
  headerActions,
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
    state: { pageIndex, pageSize, sortBy },
  } = tableInstance as any;

  const [selected, setSelected] = useState<number[]>([]);
  const [filters, setFilters] = useState(initialFilter);
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

  const setAllFilters = (filters: { id: string; value: any }[]) => {
    filterHandler(filters);
    setFilters(filters);
  };

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
        type="button"
        className={classNames(
          buttonClasses,
          ' h-full rounded-md py-2 px-2 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800',
        )}
        onClick={() => onAction('create')}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    ),
    Update: ({ id }: { id: any }) => (
      <button
        type="button"
        className={classNames(buttonClasses, 'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25')}
        onClick={() => model && push(`${pagesPath}${modelName}?${actions.update ? 'update' : 'view'}=${id}`)}
      >
        {actions.update ? <PencilSquareIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    ),
    Delete: ({ id }: { id: any }) => (
      <button
        type="button"
        className={classNames(buttonClasses, 'bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-25')}
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
  const fieldUpdate = parentModel?.fields.find((f) => f.name === parent?.field)?.update;
  // Render the UI for your table

  const thClasses =
    'px-4 py-2 text-center text-sm font-medium text-gray-500 whitespace-nowrap tracking-wider overflow-hidden overflow-ellipsis';
  const tdClasses = 'px-4 py-2 text-center whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-500';
  return (
    <>
      <div className="flex flex-col rounded-lg shadow bg-white">
        {headerActions}
        <div className="w-full inline-flex space-x-4 my-4 rtl:pr-4 rtl:space-x-reverse ltr:pl-4">
          {actions.create && !connect && (
            <div>
              <ActionButtons.Add />
            </div>
          )}
          <Popover className="relative w-full">
            <PopoverButton
              className={classNames(
                buttonClasses,
                'flex items-center rounded-md py-2 px-2 bg-blue-500 text-white active:bg-blue-600 shadow hover:bg-blue-800',
              )}
            >
              {lang.filter}
              {!!filters.length && (
                <span className="rounded-full bg-yellow-400 px-2 rtl:mr-2 ltr:ml-2">{filters.length}</span>
              )}
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 mt-1">
                {model && <Filter filters={filters} setAllFilters={setAllFilters} model={model} />}
              </PopoverPanel>
            </Transition>
          </Popover>
        </div>
        <div className="overflow-hidden">
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
                                onChange={(e) => onSelectHandler(e.target.checked)}
                                checked={data.length > 0 && selected.length === data.length}
                                indeterminate={selected.length > 0 && selected.length !== data.length}
                              />
                            </th>
                          )}
                          <th scope="col" className={thClasses} colSpan={2}>
                            {lang.actions}
                          </th>
                          {fieldUpdate && parent && (
                            <th scope="col" className={thClasses}>
                              <button
                                className={classNames(
                                  buttonClasses,
                                  'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25',
                                )}
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
                          {headerGroup.headers.map((column: any, index2: number) => {
                            return (
                              <th
                                scope="col"
                                className={thClasses}
                                key={index2}
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                              >
                                <div className="flex justify-center items-center">
                                  {column.render('Header')}
                                  <span>
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <ArrowDownIcon className="h-5 w-5" />
                                      ) : (
                                        <ArrowUpIcon className="h-5 w-5" />
                                      )
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                  {filters.filter(Boolean).find((item) => item.id === column.id) ? (
                                    <MagnifyingGlassCircleIcon className="h-5 w-5 text-green-500" />
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </React.Fragment>
                    ))}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                    {page.map((row: any, index: number) => {
                      prepareRow(row);
                      return (
                        <tr className="hover:bg-gray-100 even:bg-gray-50" key={index} {...row.getRowProps()}>
                          {isSelect && (
                            <td className={tdClasses}>
                              <Checkbox
                                onChange={(e) =>
                                  onSelectHandler(e.target.checked, model && row.original[model.idField])
                                }
                                checked={!!(model && selected.includes(row.original[model.idField]))}
                              />
                            </td>
                          )}
                          {connect && (
                            <td colSpan={2} className={tdClasses}>
                              <button
                                type="button"
                                className={classNames(
                                  buttonClasses,
                                  'bg-transparent text-green-600 hover:bg-green-100 hover:bg-opacity-25',
                                )}
                                disabled={model && connect[model.idField] === row.original[model.idField]}
                                onClick={() =>
                                  onAction(
                                    'connect',
                                    data.find((item) => model && item[model.idField] === row.original[model.idField]),
                                  )
                                }
                              >
                                {model && connect[model.idField] === row.original[model.idField]
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
                              <ActionButtons.Update id={model ? row.original[model.idField] : 0} />
                            </td>
                          )}
                          {actions.delete && !connect && (
                            <td className={tdClasses} title={lang.deleteRow} colSpan={1}>
                              <ActionButtons.Delete id={model ? row.original[model.idField] : 0} />
                            </td>
                          )}
                          {parent && model && fieldUpdate && (
                            <ListConnect getData={getData} parent={parent} row={row} model={model} />
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
                        {lang.showing} {page.length} {lang.of} ~{controlledPageCount * pageSize} {lang.results}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames('flex flex-wrap md:justify-between justify-center w-full', tdClasses)}>
          <nav
            className="w-full md:w-auto  mb-4 md:mb-0 inline-flex -space-x-px rtl:space-x-reverse"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rtl:rounded-r-md ltr:rounded-l-md"
            >
              <ChevronDoubleRightIcon className={classNames('h-4 w-4', dir === 'rtl' ? '' : 'transform rotate-180')} />
            </button>
            <button
              type="button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronRightIcon className="h-4 w-4 ltr:transform ltr:rotate-180" />
            </button>
            {initPages(pageCount, pageIndex + 1, paginationOptions).map((item) => (
              <button
                type="button"
                className={classNames(
                  item === pageIndex + 1
                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                  'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium',
                )}
                key={item}
                onClick={() => gotoPage(item - 1)}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-4 w-4 ltr:transform ltr:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                dir === 'rtl' ? 'rounded-l-md' : 'rounded-r-md',
              )}
            >
              <ChevronDoubleLeftIcon className={classNames('h-4 w-4', dir === 'rtl' ? '' : 'transform rotate-180')} />
            </button>
          </nav>
          <div className="inline-flex justify-center -space-x-px w-full md:w-auto rtl:space-x-reverse">
            {pageSizeOptions.map((item, index) => (
              <button
                type="button"
                key={index}
                className={classNames(
                  index === 0
                    ? 'rtl:rounded-r-md ltr:rounded-l-md'
                    : index === pageSizeOptions.length - 1
                      ? 'rtl:rounded-l-md ltr:rounded-r-md'
                      : '',
                  item === pageSize
                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                  'relative inline-flex items-center px-2 py-1 border border-gray-300  text-sm font-medium',
                )}
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
