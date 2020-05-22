import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  EvaIcon,
  InputGroup,
  OverLayContext,
  Popover,
  Row,
  Select,
  Tab,
  Tabs,
} from 'oah-ui';
import styled from 'styled-components';
import { useFilter } from './useFilter';
import { useEnum, useModel } from '../useSchema';
import { FieldFragment } from '../../generated';

interface Option {
  value: any;
  label: any;
}

const Input = styled(InputGroup)`
  input {
    padding-left: 5px;
  }
`;
const StyledSelect = styled(Select)`
  min-width: 120px;
`;

interface FiltersProps {
  filterValue: any;
  setFilter: (value: any) => void;
}

export const NumberFilter: React.FC<any> = ({ column: { filterValue, setFilter } }) => {
  return (
    <Popover
      eventListener="#popoverScroll"
      className="inline-block"
      trigger="click"
      placement="top"
      overlay={<Number filterValue={filterValue} setFilter={setFilter} />}
    >
      <Button
        status={filterValue ? 'Success' : 'Primary'}
        fullWidth
        size="Small"
        shape="SemiRound"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>Filter</span>
        {filterValue && <EvaIcon name="search-outline" />}
      </Button>
    </Popover>
  );
};

const Number: React.FC<FiltersProps> = ({ filterValue, setFilter }) => {
  const { value, onChange } = useFilter(filterValue, setFilter, true);
  return (
    <Tabs activeIndex={0} fullWidth>
      <Tab title="Equals">
        <Input size="Medium" fullWidth status="Primary">
          <input
            placeholder="Equals"
            type="number"
            value={value?.equals ?? ''}
            onChange={(e) => onChange(e, 'equals')}
          />
        </Input>
      </Tab>
      <Tab title="Range">
        <Row between="xs">
          <Col breakPoint={{ xs: 6 }}>
            <Input size="Medium" fullWidth status="Primary">
              <input
                style={{ maxWidth: '85px' }}
                placeholder="min"
                type="text"
                value={value?.gte ?? ''}
                onChange={(e) => onChange(e, 'gte')}
              />
            </Input>
          </Col>
          <Col breakPoint={{ xs: 6 }}>
            <Input size="Medium" fullWidth status="Primary">
              <input
                style={{ maxWidth: '85px' }}
                placeholder="max"
                type="text"
                value={value?.lte ?? ''}
                onChange={(e) => onChange(e, 'lte')}
              />
            </Input>
          </Col>
        </Row>
      </Tab>
    </Tabs>
  );
};

export const DateTimeFilter: React.FC<any> = ({ column: { filterValue, setFilter } }) => {
  return (
    <Popover
      eventListener="#popoverScroll"
      className="inline-block"
      trigger="click"
      placement="top"
      overlay={<DateTime filterValue={filterValue} setFilter={setFilter} />}
    >
      <Button
        status={filterValue ? 'Success' : 'Primary'}
        fullWidth
        size="Small"
        shape="SemiRound"
        style={{ justifyContent: 'center' }}
      >
        <span>Filter</span> {filterValue && <EvaIcon name="search-outline" />}
      </Button>
    </Popover>
  );
};

const DateTime: React.FC<FiltersProps> = ({ filterValue, setFilter }) => {
  const { value, onChange } = useFilter(filterValue, setFilter);
  return (
    <Tabs activeIndex={0} fullWidth>
      <Tab title="Start Date">
        <Input size="Medium" fullWidth status="Primary">
          <input placeholder="min" type="date" value={value?.gte ?? ''} onChange={(e) => onChange(e, 'gte')} />
        </Input>
      </Tab>
      <Tab title="End Date">
        <Input size="Medium" fullWidth status="Primary">
          <input placeholder="max" type="date" value={value?.lte ?? ''} onChange={(e) => onChange(e, 'lte')} />
        </Input>
      </Tab>
    </Tabs>
  );
};

export const BooleanFilter: React.FC<any> = ({ column: { filterValue, setFilter } }) => {
  const options: Option[] = [
    { value: undefined, label: 'All' },
    { value: true, label: 'true' },
    { value: false, label: 'false' },
  ];
  return (
    <StyledSelect
      size="Small"
      status="Primary"
      isSearchable={false}
      shape="SemiRound"
      value={options.find((option) => option.value === filterValue?.equals)}
      onChange={(option: Option) => setFilter(option.value !== undefined ? { equals: option.value } : undefined)}
      options={options}
    />
  );
};

export const StringFilter: React.FC<any> = ({ column: { filterValue, setFilter } }) => {
  const { value, onChange } = useFilter(filterValue, setFilter);
  return (
    <Input size="Small" fullWidth status="Primary">
      <input type="text" value={value?.contains ?? ''} onChange={(e) => onChange(e, 'contains')} />
    </Input>
  );
};

export const EnumFilter: (field: FieldFragment) => React.FC<any> = (field) => {
  return ({ column: { filterValue, setFilter } }) => {
    const enumType = useEnum(field.type);
    const options: Option[] = [{ value: undefined, label: 'All' }];
    if (enumType) {
      options.push(...enumType.fields.map((item) => ({ value: item, label: item })));
    }
    return (
      <StyledSelect
        size="Small"
        status="Primary"
        isSearchable={false}
        shape="SemiRound"
        value={options.find((option) => option.value === filterValue?.equals)}
        onChange={(option: Option) => setFilter(option.value !== undefined ? { equals: option.value } : undefined)}
        options={options}
      />
    );
  };
};

export const ObjectFilter: (field: FieldFragment) => React.FC<any> = (field) => {
  return ({ column: { filterValue, setFilter } }) => {
    return (
      <Popover
        eventListener="#popoverScroll"
        className="inline-block"
        trigger="click"
        placement="top"
        overlay={<ObjectCard field={field} filterValue={filterValue} setFilter={setFilter} />}
      >
        <Button
          status={filterValue ? 'Success' : 'Primary'}
          fullWidth
          size="Small"
          shape="SemiRound"
          style={{ justifyContent: 'center' }}
        >
          <span>Filter</span> {filterValue && <EvaIcon name="search-outline" />}
        </Button>
      </Popover>
    );
  };
};

const ObjectCard: React.FC<FiltersProps & { field: FieldFragment }> = ({ field, filterValue, setFilter }) => {
  const model = useModel(field.type)!;
  const [currentField, setCurrentField] = useState<Option>({
    value: model.fields[0].name,
    label: model.fields[0].title,
  });
  const getField = model.fields.find((item) => item.name === currentField.value)!;
  const { positionHandle } = useContext(OverLayContext);
  const filter = filterValue ? (field.list ? filterValue.some : filterValue) : {};
  const props = {
    filterValue: filter[getField.name],
    setFilter: (value: any) => {
      const newValue = { ...filter };
      if (value) {
        newValue[getField.name] = value;
      } else {
        delete newValue[getField.name];
      }
      setFilter(Object.keys(newValue).length > 0 ? (field.list ? { some: newValue } : newValue) : undefined);
    },
  };

  let filterComponent;
  if (getField.kind === 'enum') {
    const EnumComponent = EnumFilter(getField);
    filterComponent = <EnumComponent column={{ ...props }} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'Float':
        filterComponent = <Number {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter column={{ ...props }} />;
        break;
      case 'DateTime':
        filterComponent = <DateTime {...props} />;
        break;
      case 'String':
        filterComponent = <StringFilter column={{ ...props }} />;
        break;
    }
  }
  return (
    <Card style={{ marginBottom: '0', minWidth: '200px' }}>
      <header>
        <Select
          value={currentField}
          onChange={(option: any) => {
            if (option) {
              setCurrentField(option);
              setTimeout(positionHandle, 100);
            }
          }}
          options={model.fields
            .filter((item) => item.kind !== 'object')
            .sort((a, b) => a.order - b.order)
            .map((item) => ({
              value: item.name,
              label: (
                <>
                  <span>{item.title}</span> {filter[item.name] && <EvaIcon name="search-outline" />}
                </>
              ),
            }))}
        />
      </header>
      <CardBody style={{ padding: 0, overflow: 'visible' }}>{filterComponent}</CardBody>
    </Card>
  );
};
