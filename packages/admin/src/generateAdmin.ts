import { Enums, Model, SchemaObject, Options, Schema } from "./types";
import { writeFile, readFile } from "fs";
import { format } from "prettier";
import { createGraphql } from "./createGraphql";
import { buildPages } from "./buildPages";
import { mergeSchema } from "./mergeSchema";

const defaultOptions: Options = {
  schemaOutput: "./server/src/types/schema/schema.json",
  graphqlOutput: "./admin/src/graphql",
  pagesOutput: "./admin/src/pages/models",
  fieldsExclude: [],
  modelsExclude: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function generateAdmin(
  path: string,
  schema: Schema,
  customOptions?: Partial<Options>
) {
  const options: Options = { ...defaultOptions, ...customOptions };
  readFile(path, { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      const modelsObject = getSchemaInObject(data);
      const newSchema = mergeSchema(modelsObject, schema);
      !options.disableCreateGraphql && createGraphql(modelsObject, options);
      createSchemaObject(options.schemaOutput, newSchema);
      !options.disableCreatePages && buildPages(newSchema, options.pagesOutput);
    }
  });
}

function createSchemaObject(path: string, schema: Schema) {
  const fileContent = format(`${JSON.stringify(schema)}`, {
    singleQuote: true,
    semi: false,
    trailingComma: "all",
    parser: "json",
  });

  writeFile(path, fileContent, () => {});
}

function getSchemaInObject(data: string) {
  const modelsObject: SchemaObject = {
    models: [],
    enums: [],
  };
  const lines = data.split(`
`);
  let currentModel: Model = {
    id: "",
    fields: [],
  };
  let currentEnum: Enums = {
    name: "",
    fields: [],
  };
  let inModel = "";
  lines.forEach((line) => {
    if (line !== "") {
      const clearedLine = line.replace(/[\n\r]/g, "");
      const lineArray = clearedLine.split(" ");
      const filteredArray = lineArray.filter((v) => v);
      if (["model", "enum"].includes(filteredArray[0]) && inModel === "") {
        if (filteredArray[0] === "model") {
          currentModel.id = filteredArray[1];
        } else {
          currentEnum.name = filteredArray[1];
        }
        inModel = filteredArray[0];
      } else if (
        inModel !== "" &&
        !filteredArray[0].includes("//") &&
        filteredArray[0] !== "{" &&
        !filteredArray[0].includes("@@")
      ) {
        if (filteredArray[0] !== "}") {
          if (inModel === "enum") {
            currentEnum.fields.push(filteredArray[0]);
          } else {
            const type = filteredArray[1].replace("?", "").replace("[]", "");
            currentModel.fields.push({
              id: currentModel.id + "." + filteredArray[0],
              name: filteredArray[0],
              type,
              isId: filteredArray.includes("@id"),
              unique: filteredArray.includes("@unique"),
              list: filteredArray[1].includes("[]"),
              required:
                !filteredArray[1].includes("[]") &&
                !filteredArray[1].includes("?"),
              kind: data.includes(`enum ${type} `)
                ? "enum"
                : data.includes(`model ${type} `)
                ? "object"
                : "scalar",
            });
          }
        } else if (filteredArray[0] === "}") {
          if (inModel === "enum") {
            modelsObject.enums.push({ ...currentEnum });
            currentEnum = {
              name: "",
              fields: [],
            };
          } else {
            modelsObject.models.push({ ...currentModel });
            currentModel = {
              id: "",
              fields: [],
            };
          }
          inModel = "";
        }
      }
    }
  });
  return modelsObject;
}
