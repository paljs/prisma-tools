import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import {
  breakpointDown,
  Button,
  Card,
  CardBody,
  Col,
  EvaIcon,
  InputGroup,
  Popover,
  Row,
  Spinner,
  Tooltip,
} from 'oah-ui';
import { columns } from './Columns';
import { initPages } from './utils';
import { useModel } from '../useSchema';
import { navigate } from '@reach/router';

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
  onAction: (action: 'create' | 'delete' | 'connect', value?: number | object) => void;
  connect?: any;
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
}) => {
  const model = useModel(modelName);
  const columnList = columns(model);
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
    state: { pageIndex, pageSize, filters, sortBy },
  } = useTable(
    {
      columns: columnList,
      data,
      initialState: { pageIndex: 0, filters: initialFilter }, // Pass our hoisted table state
      manualFilters: true,
      manualSortBy: true,
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useFilters,
    useSortBy,
    usePagination,
  );
  const tableRef = useRef<HTMLTableElement>(null);
  const [columnSize, setColumnSize] = useState(1);
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchMore(pageSize, pageIndex);
  }, [fetchMore, pageIndex, pageSize]);

  React.useEffect(() => {
    sortByHandler(sortBy);
  }, [sortBy]);

  React.useEffect(() => {
    filterHandler(filters);
  }, [filters]);

  React.useEffect(() => {
    function columnHandler() {
      const clientRect = tableRef?.current?.getBoundingClientRect();
      if (clientRect) {
        setColumnSize(clientRect.width / columnList.length);
      }
    }
    if (columnList.length > 0) columnHandler();
    window.addEventListener('resize', columnHandler);
    return () => {
      window.removeEventListener('resize', columnHandler);
    };
  }, [columnList]);

  const actions = {
    create: model?.create,
    update: model?.update,
    delete: model?.delete,
  };
  // Render the UI for your table
  return (
    <Card style={{ marginBottom: 0, maxHeight: '100vh' }}>
      {!inEdit && (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {model?.name}
        </header>
      )}
      <CardBody id="popoverScroll">
        {loading && <Spinner size="Giant" />}
        <StyledTable ref={tableRef} {...getTableProps()} columnSize={columnSize}>
          <thead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <React.Fragment key={index}>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th colSpan={2}>Actions</th>
                  {headerGroup.headers.map((column: any, index2: number) => (
                    <th key={index2} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
                <tr>
                  {connect ? (
                    <th colSpan={2} />
                  ) : (
                    <th colSpan={2}>
                      {actions.create && (
                        <Button size="Tiny" onClick={() => onAction('create')}>
                          <EvaIcon name="plus-outline" />
                        </Button>
                      )}
                    </th>
                  )}
                  {headerGroup.headers.map((column: any, index: number) => (
                    <th key={index}>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, index: number) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {connect && (
                    <td colSpan={2}>
                      <Button
                        size="Small"
                        appearance="ghost"
                        status="Success"
                        disabled={model && connect[model.idField] === row.original[model.idField]}
                        onClick={() =>
                          onAction(
                            'connect',
                            data.find((item) => model && item[model.idField] === row.original[model.idField]),
                          )
                        }
                      >
                        {model && connect[model.idField] === row.original[model.idField] ? 'Connected' : 'Connect'}
                      </Button>
                    </td>
                  )}
                  {!connect && (
                    <td colSpan={actions.delete ? 1 : 2}>
                      <Tooltip
                        className="inline-block"
                        status="Primary"
                        trigger="hint"
                        placement="top"
                        content={actions.update ? 'Edit Row' : 'View Row'}
                      >
                        <Button
                          style={{ padding: 0 }}
                          appearance="ghost"
                          onClick={() =>
                            model &&
                            navigate(
                              `/models/${modelName}?${actions.update ? 'update' : 'view'}=${
                                row.original[model.idField]
                              }`,
                            )
                          }
                        >
                          <EvaIcon name={actions.update ? 'edit-outline' : 'eye-outline'} />
                        </Button>
                      </Tooltip>
                    </td>
                  )}
                  {actions.delete && !connect && (
                    <td colSpan={1}>
                      <Tooltip
                        className="inline-block"
                        status="Danger"
                        trigger="hint"
                        placement="top"
                        content="Delete Row"
                      >
                        <Button
                          style={{ padding: 0 }}
                          status="Danger"
                          appearance="ghost"
                          onClick={() => {
                            const confirm = window.confirm('Are you sure you want to delete this record ?');
                            if (confirm && model) onAction('delete', row.original[model.idField]);
                          }}
                        >
                          <EvaIcon name="trash-2-outline" />
                        </Button>
                      </Tooltip>
                    </td>
                  )}
                  {actions.create && !actions.update && !actions.delete && <td colSpan={2} />}
                  {row.cells.map((cell: any, index2: number) => {
                    return (
                      <td key={index2} {...cell.getCellProps()}>
                        {cell.value && cell.value.length > Math.floor(columnSize / 6) ? (
                          <Popover
                            eventListener="#popoverScroll"
                            trigger="click"
                            placement="top"
                            overlay={
                              <Card style={{ marginBottom: '0', maxHeight: '300px' }}>
                                <CardBody>
                                  <div style={{ maxWidth: '300px' }} dangerouslySetInnerHTML={{ __html: cell.value }} />
                                </CardBody>
                              </Card>
                            }
                          >
                            <div style={{ cursor: 'pointer' }}>{cell.render('Cell')}</div>
                          </Popover>
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <td colSpan={10000}>
                Showing {page.length} of ~{controlledPageCount * pageSize} results
              </td>
            </tr>
          </tbody>
        </StyledTable>
      </CardBody>
      <footer>
        <StyledRow middle="xs">
          <Col breakPoint={{ md: 12, lg: 4 }}>
            <Tooltip
              className="inline-block"
              status="Primary"
              trigger="hint"
              placement="top"
              content="Go to first page"
            >
              <StyledButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <EvaIcon name="arrowhead-left-outline" />
              </StyledButton>
            </Tooltip>
            <StyledButton onClick={() => previousPage()} disabled={!canPreviousPage}>
              <EvaIcon name="arrow-ios-back" />
            </StyledButton>
            {initPages(pageCount, pageIndex + 1).map((item) => (
              <StyledButton
                key={item}
                onClick={() => gotoPage(item - 1)}
                status={item === pageIndex + 1 ? 'Primary' : 'Basic'}
              >
                {item}
              </StyledButton>
            ))}
            <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>
              <EvaIcon name="arrow-ios-forward" />
            </StyledButton>
            <Tooltip className="inline-block" status="Primary" trigger="hint" placement="top" content="Go to last page">
              <StyledButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <EvaIcon name="arrowhead-right-outline" />
              </StyledButton>
            </Tooltip>
          </Col>
          <Col breakPoint={{ md: 12, lg: 4 }}>
            <InputGroup size="Small" style={{ justifyContent: 'center' }}>
              <input
                placeholder="Go Page Number"
                type="number"
                value={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </InputGroup>
          </Col>
          <Col breakPoint={{ md: 12, lg: 4 }}>
            {[10, 20, 30, 40, 50, 100].map((item) => (
              <Tooltip
                key={item}
                className="inline-block"
                status="Primary"
                trigger="hint"
                placement="top"
                content={'Set page size ' + item}
              >
                <StyledButton onClick={() => setPageSize(item)} status={item === pageSize ? 'Primary' : 'Basic'}>
                  {item}
                </StyledButton>
              </Tooltip>
            ))}
          </Col>
        </StyledRow>
      </footer>
    </Card>
  );
};

const StyledTable = styled.table<{ columnSize: number }>`
  border-spacing: 0;
  width: 100%;
  tbody tr:nth-child(2n) {
    background-color: ${(props) => props.theme.backgroundBasicColor2};
  }
  tbody tr:hover {
    background: ${(props) => props.theme.backgroundBasicColor3} !important;
  }

  thead tr {
    background: ${(props) => props.theme.backgroundBasicColor2};
    th {
      border-top: 1px solid ${(props) => props.theme.backgroundBasicColor3};
      border-left: 1px solid ${(props) => props.theme.backgroundBasicColor3};
      :last-child {
        border-right: 1px solid ${(props) => props.theme.backgroundBasicColor3};
      }
    }
  }

  tr {
    :last-child {
      td {
        text-align: start;
        border: 1px solid ${(props) => props.theme.backgroundBasicColor2};
      }
    }
  }

  td div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  th,
  td {
    max-width: ${({ columnSize }) => (columnSize > 150 ? columnSize : 150)}px;
    margin: 0;
    padding: 0.5rem;
    border-top: 1px solid ${(props) => props.theme.backgroundBasicColor2};
    border-left: 1px solid ${(props) => props.theme.backgroundBasicColor2};
    text-align: center;
    :last-child {
      border-right: 1px solid ${(props) => props.theme.backgroundBasicColor2};
    }
  }
`;

const StyledButton = styled(Button)`
  margin-right: 5px;
  padding: 0.3rem;
`;

const StyledRow = styled(Row)`
  text-align: center;
  ${breakpointDown('md')`
    & > :not(:last-child) {
      margin-bottom: 20px;
    }
  `}
`;
