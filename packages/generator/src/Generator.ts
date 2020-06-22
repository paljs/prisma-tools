import { GeneratorsType, Options } from '@paljs/types';
import { GenerateNexus } from './nexus';
import { GenerateSdl } from './sdl';
import { GenerateModules } from './graphql-modules';

export class Generator {
  generators: {
    [key in GeneratorsType]: GenerateNexus | GenerateSdl | GenerateModules;
  } = {
    nexus: new GenerateNexus(this.options),
    'nexus-schema': new GenerateNexus({ ...this.options, nexusSchema: true }),
    sdl: new GenerateSdl(this.options),
    'graphql-modules': new GenerateModules(this.options),
  };

  constructor(
    private generator: GeneratorsType,
    private options?: Partial<Options>,
  ) {}

  async run() {
    await this.generators[this.generator].run();
  }
}
