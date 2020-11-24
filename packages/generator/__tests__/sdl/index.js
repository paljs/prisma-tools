const { join } = require('path');
const { Generator } = require('../../dist');

async function main() {
  try {
    const generator = new Generator(
      {
        name: 'sdl',
        schemaPath: './schema.prisma',
      },
      { output: join(process.cwd(), './graphql') },
    );
    await generator.run();
  } catch (error) {
    console.log(error);
  }
}
main();
