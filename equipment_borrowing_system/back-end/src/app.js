import { createServer } from 'http'

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { decodeToken, getReqToken } from './lib/generateUserToken'
import './mongoose-connect'
// eslint-disable-next-line import/order
import schema from './graphql'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors({ origin: ['abc.com', '*.test.com'] }))
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:3000', 'https://equipment-borrowing-system.vercel.app'], credentials: true }))
// app.use(cors({credentials: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Server running' })
})

const startApolloServer = async () => {
  const httpServer = createServer(app)
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    // plugins: [
    //   ApolloServerPluginDrainHttpServer({ httpServer }),
    //   ApolloServerPluginLandingPageGraphQLPlayground(),
    // ],
    context: ({ req }) => {
      const token = getReqToken(req)
      const user = decodeToken(token, process.env.JWT_SECRET ?? '')
      console.log(user)
      return { user }
      // if (token) {
      //   const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET)
      //   console.log(payload)
      //   return { userId: payload.userId }
      // }
      // return { userId: null }
    },
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: { origin: ['http://localhost:3000', 'https://equipment-borrowing-system.vercel.app'], credentials: true },
  })
  httpServer.listen({ port: process.env.PORT || 3001 })
}
startApolloServer()
