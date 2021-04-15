import { verify } from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import cookie from 'cookie'
import getConfig from 'next/config'

export const JWT_SECRET = getConfig()?.serverRuntimeConfig.JWT_SECRET ?? null

interface Token {
  userId: number
}

export function getUserId(request: NextApiRequest) {
  const { token } = cookie.parse(request.headers.cookie ?? '')
  if (token && token !== 'null') {
    try {
      const verifiedToken = verify(token, JWT_SECRET) as Token
      return verifiedToken && verifiedToken.userId
    } catch (e) {
      console.log(e)
    }
  }
}
