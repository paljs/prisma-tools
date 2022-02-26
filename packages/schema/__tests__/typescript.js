const { CamelCase } = require('../dist');

async function main() {
  const generate = new CamelCase('./schema.prisma').convert();
  console.log(await generate);
}

main();
