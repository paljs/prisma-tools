import { ApolloServer } from 'apollo-server'
import { schema } from './nexusSchema'
import { createContext } from './context'

const server = new ApolloServer({
  schema,
  context: createContext,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
