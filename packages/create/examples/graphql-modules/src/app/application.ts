import { createApplication } from 'graphql-modules'
import { InputsModule } from './inputs/inputs.module'
import { CommonModule } from './common/common.module'
import { addSelect } from './addSelect'
import { PrismaProvider } from './Prisma.provider'

export const application = createApplication({
  modules: [
    InputsModule,
    CommonModule,
  ],
  providers: [PrismaProvider],
  middlewares: {
    '*': { '*': [addSelect] },
  },
})
