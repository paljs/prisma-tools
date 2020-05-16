import { schema } from "./schema";
import { DMMF } from "@prisma/client/runtime";

export function createInput() {
  let fileContent = `import gql from 'graphql-tag';

  export default gql\`
  
  scalar DateTime
  
  type BatchPayload {
  count: Int!
}
`;
  schema.enums.forEach((item) => {
    fileContent += `enum ${item.name} {`;
    item.values.forEach((item2) => {
      fileContent += `
      ${item2}`;
    });
    fileContent += `}

`;
  });

  schema.inputTypes.forEach((model) => {
    fileContent += `input ${model.name} {
    `;
    model.fields.forEach((field) => {
      let inputType: DMMF.SchemaArgInputType;
      if (
        field.inputType.length > 1 &&
        field.inputType[1].type !== "null" &&
        field.name !== "not"
      ) {
        inputType = field.inputType[1];
      } else {
        inputType = field.inputType[0];
      }
      fileContent += `${field.name}: ${
        inputType.isList ? `[${inputType.type}!]` : inputType.type
      }${inputType.isRequired ? "!" : ""}
      `;
    });
    fileContent += `}
  
`;
  });
  fileContent += "`;";
  return fileContent;
}
