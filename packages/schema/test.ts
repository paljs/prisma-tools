import convertSchemaToObject from "./src";

convertSchemaToObject(
  "/Users/ahmed/Sites/homeschool_hub/server/gql/prisma/schema.prisma",
  (schema) => {
    console.dir(schema, { depth: null });
  }
);
