import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const DateTime = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime');
