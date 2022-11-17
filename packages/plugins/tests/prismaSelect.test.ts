import { server } from './server';
import gql from 'graphql-tag';
import { PrismaSelect } from '../src';
import { DocumentNode } from 'graphql';

const userQuery = gql`
  query user {
    user {
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

describe('test PrismaSelect class', () => {
  const executeOperation = async (query: DocumentNode, variables?: Record<string, any>) => {
    let log: { parsedResolveInfoFragment: any; select: any } = { parsedResolveInfoFragment: undefined, select: {} };
    const testServer = await server((o) => {
      log = o;
    });
    const result = await testServer.executeOperation({
      query,
      variables,
    });
    return {
      log,
      result,
    };
  };

  it('test nested relations with args', async () => {
    const { result, log } = await executeOperation(userQuery);
    expect(result.data).toMatchSnapshot();
    expect(result.errors).toMatchSnapshot();
    expect(log.select).toMatchSnapshot();
    expect(log.parsedResolveInfoFragment).toMatchSnapshot();
  });

  it('should merge deep add custom select object to current one', async () => {
    const { log } = await executeOperation(mergeDeepQuery);
    expect(
      PrismaSelect.mergeDeep(log.select, { select: { id: true, posts: { select: { title: true } } } }),
    ).toMatchSnapshot();
  });

  it('should get value from nested object and filter by given type', async () => {
    const { log } = await executeOperation(valueOfQuery, { value: 'posts', type: 'Post' });
    expect(log.select).toMatchSnapshot();
  });

  it('should get value from nested object more than one deep', async () => {
    const { log } = await executeOperation(valueOfQuery, { value: 'posts.comments', type: 'Comment' });
    expect(log.select).toMatchSnapshot();
  });

  it('should back empty object if the path not found', async () => {
    const { log } = await executeOperation(valueOfQuery, { value: 'post', type: 'Post' });
    expect(log.select).toMatchSnapshot();
  });

  it('should filter the type depend on the @PrismaSelect comment on the schema file', async () => {
    const { log } = await executeOperation(mapQuery);
    expect(log.select).toMatchSnapshot();
  });

  it('should add the selected fields on the args object if the type is aggregate', async () => {
    const { log } = await executeOperation(aggregateUserQuery);
    expect(log.select).toMatchSnapshot();
  });

  it('should contain default values firstName, lastName', async () => {
    const { log } = await executeOperation(userWithDefaultValuesQuery);
    expect(log.select).toMatchSnapshot();
  });
});
