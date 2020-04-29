import { readFile } from "fs";
import { SchemaObject, Model, Enums, Field } from "./types";
export * from "./types";

export default function convertSchemaToObject(
  path: string,
  callback: (schema: SchemaObject) => void
) {
  readFile(path, { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      callback(getSchemaInObject(data));
    }
  });
}

function getSchemaInObject(data: string) {
  const modelsObject: SchemaObject = {
    models: [],
    enums: [],
  };
  const lines = data.split(`
`);
  let currentModel: Model = {
    name: "",
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
          currentModel.name = filteredArray[1];
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
            const field: Field = {
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
            };
            if (field.kind === "object") {
              field.relation = getRelation(filteredArray);
            }
            currentModel.fields.push(field);
          }
        } else if (filteredArray[0] === "}") {
          if (inModel === "enum") {
            modelsObject.enums.push({ ...currentEnum });
            currentEnum = {
              name: "",
              fields: [],
            };
          } else {
            currentModel.fields
              .filter((item) => item.kind !== "object")
              .forEach((item) => {
                let relationField = false;
                currentModel.fields
                  .filter((field) => field.kind === "object")
                  .forEach((field) => {
                    if (!relationField) {
                      relationField = !!field.relation?.fields?.includes(
                        item.name
                      );
                    }
                  });
                item.relationField = relationField;
              });
            modelsObject.models.push({ ...currentModel });
            currentModel = {
              name: "",
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

function getRelation(line: string[]) {
  line.splice(0, 2);
  let str = line
    .join(" ")
    .split("@")
    .find((item) => item.includes("relation("))
    ?.replace("relation(", "")
    .replace(")", "");
  if (str) {
    if (str.includes('"') && !str.includes("name")) {
      str = "name: " + str;
    }
    str
      .replace(/\]/g, " ")
      .replace(/\[/g, " ")
      .replace(/,/g, " ")
      .replace(/:/g, " ")
      .split(" ")
      .filter((item) => item && !item.includes('"'))
      .forEach((item) => {
        str = str.replace(item, `"${item}"`);
      });
    return JSON.parse(`{${str}}`);
  }
  return null;
}
