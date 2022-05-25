import jsonwebtoken, { JwtPayload, sign, verify } from 'jsonwebtoken'

export const generateUserToken = (user) => jsonwebtoken.sign(
  {
    userId: user._id,
  }, // payload
  process.env.JWT_SECRET, // secret
  {
    algorithm: 'HS256'
    // expiresIn: '1d',
  }, // options
)

export const getReqToken = (req) => {
  const { cookies, headers } = req
  if (cookies?.token) {
    return cookies.token
  }
  if (headers?.authorization?.split(' ')?.[0] === 'Bearer') {
    return headers.authorization.split(' ')[1]
  }
  return null
}

export const decodeToken = (token, secret) => {
  if (token) {
    return jsonwebtoken.verify(token, secret)
  }
  return null
}
