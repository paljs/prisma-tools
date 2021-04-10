import gql from 'graphql-tag';

const fieldFragment = gql`
  fragment Field on Field {
    id
    name
    title
    type
    list
    kind
    read
    required
    isId
    unique
    create
    order
    update
    sort
    filter
    editor
    upload
    relationField
  }
`;

const modelFragment = gql`
  fragment Model on Model {
    id
    name
    create
    delete
    update
    idField
    displayFields
    fields {
      ...Field
    }
  }
  ${fieldFragment}
`;

export const GET_SCHEMA = gql`
  query getSchema {
    getSchema {
      models {
        ...Model
      }
      enums {
        name
        fields
      }
    }
  }
  ${modelFragment}
`;

export const UPDATE_MODEL = gql`
  mutation updateModel($id: String!, $data: UpdateModelInput!) {
    updateModel(id: $id, data: $data) {
      ...Model
    }
  }
  ${modelFragment}
`;

export const UPDATE_FIELD = gql`
  mutation updateField(
    $id: String!
    $modelId: String!
    $data: UpdateFieldInput!
  ) {
    updateField(id: $id, modelId: $modelId, data: $data) {
      ...Field
    }
  }
  ${fieldFragment}
`;
