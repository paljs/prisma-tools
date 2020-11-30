import { GenerateNexusPrismaPlugin } from './nexus-prisma-plugin';
import { GeneratorsType, Options } from '@paljs/types';
import { GenerateNexus } from './nexus';
import { GenerateSdl } from './sdl';
import { GenerateModules } from './graphql-modules';

export class Generator {
  generators: {
    [key in GeneratorsType]:
      | GenerateNexus
      | GenerateSdl
      | GenerateModules
      | GenerateNexusPrismaPlugin;
  } = {
    nexus: new GenerateNexus(this.generator.schemaPath, this.options),
    sdl: new GenerateSdl(this.generator.schemaPath, this.options),
    'graphql-modules': new GenerateModules(
      this.generator.schemaPath,
      this.options,
    ),
    'nexus-plugin-prisma': new GenerateNexusPrismaPlugin(
      this.generator.schemaPath,
      this.options,
    ),
  };

  constructor(
    private generator: { name: GeneratorsType; schemaPath: string },
    private options?: Partial<Options>,
  ) {}

  async run() {
    if (this.generators[this.generator.name]) {
      await this.generators[this.generator.name].run();
    } else {
      console.error(
        `Your generator name: "${this.generator.name}" not correct.\nPlease use one of this`,
        Object.keys(this.generators),
      );
    }
  }
}
