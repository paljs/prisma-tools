import { verify } from 'jsonwebtoken'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

export const APP_SECRET = 'appsecret321'

interface Token {
  userId: number
}

export function getUserId(request: ExpressContext['req']) {
  const authorization = request.get('authorization')
  if (authorization && authorization !== 'null') {
    try {
      const token = authorization.replace('Bearer ', '')
      const verifiedToken = verify(token, APP_SECRET) as Token
      return verifiedToken && verifiedToken.userId
    } catch (e) {
      console.log(e)
    }
  }
}
