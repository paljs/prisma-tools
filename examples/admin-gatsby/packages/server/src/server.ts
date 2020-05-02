const express = require('express')
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { createContext } from './context'

const server = new ApolloServer({
  schema,
  context: createContext,
})

const app = express()

server.applyMiddleware({
  app,
  path: '/',
  cors: { credentials: true, origin: true },
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
)
