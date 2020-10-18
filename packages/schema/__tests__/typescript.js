const { GenerateTypeScript } = require('../dist');

function main() {
  const generate = new GenerateTypeScript('./schema.prisma').run();
  console.log(generate);
}

main();
