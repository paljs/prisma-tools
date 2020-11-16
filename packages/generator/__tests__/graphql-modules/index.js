const { join } = require('path');
const { Generator } = require('../../dist');

async function main() {
  try {
    const generator = new Generator(
      {
        name: 'graphql-modules',
        schemaPath: './schema.prisma',
      },
      { output: join(process.cwd(), './app') },
    );
    await generator.run();
  } catch (error) {
    console.log(error);
  }
}
main();
