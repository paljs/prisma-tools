import React from 'react';
import { Button, Col, EvaIcon, InputGroup, Popover, Row, Select, Tab, Tabs } from 'oah-ui';
import styled from 'styled-components';
import { Field } from '@prisma-tools/admin';
import { useGetEnumQuery } from '../../generated';

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
  const onChangeHandler = (value: string, name: string) => {
    const second = name === 'lte' ? 'gte' : 'lte';
    if (filterValue && value && filterValue[second]) {
      setFilter({ [second]: filterValue[second], [name]: parseInt(value) });
    } else if (value) {
      setFilter({ [name]: parseInt(value) });
    } else if (filterValue && filterValue[second]) {
      setFilter({ [second]: filterValue[second] });
    } else {
      setFilter(undefined);
    }
  };
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
              <input
                placeholder="Equals"
                type="number"
                value={filterValue?.equals}
                onChange={(e) => setFilter(e.target.value ? { equals: parseInt(e.target.value) } : undefined)}
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
                    value={filterValue?.gte}
                    onChange={(e) => onChangeHandler(e.target.value, 'gte')}
                  />
                </Input>
              </Col>
              <Col breakPoint={{ xs: 6 }}>
                <Input size="Medium" fullWidth status="Primary">
                  <input
                    style={{ maxWidth: '85px' }}
                    placeholder="max"
                    type="text"
                    value={filterValue?.lte}
                    onChange={(e) => onChangeHandler(e.target.value, 'lte')}
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
        size="Medium"
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
  const onChangeHandler = (value: string, name: string) => {
    const second = name === 'lte' ? 'gte' : 'lte';
    if (filterValue && value && filterValue[second]) {
      setFilter({ ...filterValue, [name]: value });
    } else if (value) {
      setFilter({ [name]: value });
    } else if (filterValue && filterValue[second]) {
      setFilter({ [second]: filterValue[second] });
    } else {
      setFilter(undefined);
    }
  };
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
              <input
                placeholder="min"
                type="date"
                value={filterValue?.gte}
                onChange={(e) => onChangeHandler(e.target.value, 'gte')}
              />
            </Input>
          </Tab>
          <Tab title="End Date">
            <Input size="Medium" fullWidth status="Primary">
              <input
                placeholder="max"
                type="date"
                value={filterValue?.lte}
                onChange={(e) => onChangeHandler(e.target.value, 'lte')}
              />
            </Input>
          </Tab>
        </Tabs>
      }
    >
      <Button
        status={filterValue ? 'Success' : 'Primary'}
        fullWidth
        size="Medium"
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
  return (
    <Input size="Small" fullWidth status="Primary">
      <input
        placeholder="word"
        type="text"
        value={filterValue?.contains}
        onChange={(e) => setFilter(e.target.value ? { contains: e.target.value } : undefined)}
      />
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
