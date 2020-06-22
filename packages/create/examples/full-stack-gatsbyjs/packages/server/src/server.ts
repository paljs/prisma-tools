import { ApolloServer } from 'apollo-server'
import { schema } from './nexusSchema'
import { createContext } from './context'

const server = new ApolloServer({
  schema,
  context: createContext,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
