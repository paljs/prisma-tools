import { executeOperation } from './server';
import gql from 'graphql-tag';
import { PrismaSelect } from '../src';
import assert from 'assert';

const userQuery = gql`
  query user {
    user(where: { id: 1 }) {
      id
      email
      name: firstName
      fullName
      posts(where: { title: { contains: "a" } }, orderBy: { published: asc }, take: 10, skip: 5, distinct: id) {
        id
        title
        comments(where: { contain: { contains: "a" } }) {
          id
          contain
        }
      }
    }
  }
`;

const mergeDeepQuery = gql`
  query mergeDeep {
    user {
      email
      posts {
        id
      }
    }
  }
`;

const mapQuery = gql`
  query valueOf {
    account {
      id
      firstName
      newFieldNotInSchema
    }
  }
`;

const aggregateUserQuery = gql`
  query aggregateUser {
    aggregateUser {
      _avg {
        id
      }
      _count {
        email
      }
      _max {
        id
      }
      _sum {
        id
      }
    }
  }
`;

const valueOfQuery = gql`
  query getNestedValue($type: String!, $value: String!) {
    getNestedValue(type: $type, value: $value) {
      id
      posts {
        id
        comments {
          id
          contain
        }
      }
    }
  }
`;

const userWithDefaultValuesQuery = gql`
  query userWithDefaultValues {
    userWithDefaultValues {
      id
    }
  }
`;

const userWithExcludeValuesQuery = gql`
  query userWithExcludeValues {
    userWithExcludeValues {
      id
      email
      password
      firstName
      lastName
    }
  }
`;

describe('test PrismaSelect class', () => {
  it('test nested relations with args', async () => {
    const { result, log } = await executeOperation({ query: userQuery });
    assert(result.body.kind === 'single');
    expect(result.body.singleResult.data).toMatchSnapshot();
    expect(result.body.singleResult.errors).toMatchSnapshot();
    expect(log.select).toMatchSnapshot();
    expect(log.parsedResolveInfoFragment).toMatchSnapshot();
  });

  it('should merge deep add custom select object to current one', async () => {
    const { log } = await executeOperation({ query: mergeDeepQuery });
    expect(
      PrismaSelect.mergeDeep(log.select, { select: { id: true, posts: { select: { title: true } } } }),
    ).toMatchSnapshot();
  });

  it('should get value from nested object and filter by given type', async () => {
    const { log } = await executeOperation({ query: valueOfQuery, variables: { value: 'posts', type: 'Post' } });
    expect(log.select).toMatchSnapshot();
  });

  it('should get value from nested object more than one deep', async () => {
    const { log } = await executeOperation({
      query: valueOfQuery,
      variables: { value: 'posts.comments', type: 'Comment' },
    });
    expect(log.select).toMatchSnapshot();
  });

  it('should back empty object if the path not found', async () => {
    const { log } = await executeOperation({ query: valueOfQuery, variables: { value: 'post', type: 'Post' } });
    expect(log.select).toMatchSnapshot();
  });

  it('should filter the type depend on the @PrismaSelect comment on the schema file', async () => {
    const { log } = await executeOperation({ query: mapQuery });
    expect(log.select).toMatchSnapshot();
  });

  it('should add the selected fields on the args object if the type is aggregate', async () => {
    const { log } = await executeOperation({ query: aggregateUserQuery });
    expect(log.select).toMatchSnapshot();
  });

  it('should contain default values firstName, lastName', async () => {
    const { log } = await executeOperation({ query: userWithDefaultValuesQuery });
    expect(log.select).toMatchSnapshot();
  });

  it('should exclude values email, password', async () => {
    const { log } = await executeOperation({ query: userWithExcludeValuesQuery });
    expect(log.select).toMatchSnapshot();
  });
});
