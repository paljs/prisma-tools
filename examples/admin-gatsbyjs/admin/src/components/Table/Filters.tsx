import React from 'react';
import { Button, Col, EvaIcon, InputGroup, Popover, Row, Select, Tab, Tabs } from 'oah-ui';
import styled from 'styled-components';
import { Field } from '@prisma-tools/admin';
import { useGetEnumQuery } from '../../generated';
import { useFilter } from './useFilter';

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

export const NumberFilter: React.FC<any> = ({ column: { filterValue, setFilter } }) => {
  const { value, onChange } = useFilter(filterValue, setFilter, true);

  return (
    <Popover
      eventListener="#popoverScroll"
      className="inline-block"
      trigger="click"
      placement="top"
      overlay={
        <Tabs activeIndex={0} fullWidth>
          <Tab title="Equals">
            <Input size="Medium" fullWidth status="Primary">
              <input placeholder="Equals" type="number" value={value?.equals} onChange={(e) => onChange(e, 'equals')} />
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
                    value={value?.gte}
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
                    value={value?.lte}
                    onChange={(e) => onChange(e, 'lte')}
                  />
                </Input>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      }
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

export const DateTimeFilter: React.FC<any> = ({ column: { filterValue, setFilter } }) => {
  const { value, onChange } = useFilter(filterValue, setFilter);

  return (
    <Popover
      eventListener="#popoverScroll"
      className="inline-block"
      trigger="click"
      placement="top"
      overlay={
        <Tabs activeIndex={0} fullWidth>
          <Tab title="Start Date">
            <Input size="Medium" fullWidth status="Primary">
              <input placeholder="min" type="date" value={value?.gte} onChange={(e) => onChange(e, 'gte')} />
            </Input>
          </Tab>
          <Tab title="End Date">
            <Input size="Medium" fullWidth status="Primary">
              <input placeholder="max" type="date" value={value?.lte} onChange={(e) => onChange(e, 'lte')} />
            </Input>
          </Tab>
        </Tabs>
      }
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
      <input type="text" value={value?.contains} onChange={(e) => onChange(e, 'contains')} />
    </Input>
  );
};

export const EnumFilter: (field: Field) => React.FC<any> = (field) => {
  return ({ column: { filterValue, setFilter } }) => {
    const { data } = useGetEnumQuery({
      variables: {
        name: field.type,
      },
    });
    const options: Option[] = [{ value: undefined, label: 'All' }];
    if (data?.getEnum) {
      options.push(...data.getEnum.fields.map((item) => ({ value: item, label: item })));
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
