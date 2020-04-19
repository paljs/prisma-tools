import { generateAdmin, Schema } from '@prisma-tools/admin'
import defaultSchema from './server/src/types/schema/schema.json'

generateAdmin('./server/prisma/schema.prisma', defaultSchema as Schema, {})
