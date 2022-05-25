// import { UserInputError } from 'apollo-server-core'
// import { schemaComposer } from 'graphql-compose'

import { UserTC } from '../../models/user'

export const users = UserTC.getResolver('findMany')
export const userId = UserTC.getResolver('findById')
export const me = UserTC.getResolver('findById')

export const me = schemaComposer.createResolver({
  name: 'me',
  kind: 'query',
  type: UserTC.getType(),
  resolve: async ({ context }) => {
    if (!context.user) {
      throw new UserInputError('User ID not found in token')
    }
    // const { user: { _id: userId } } = context
    const user = await UserModel.findById(context.user.userId)
    return user
  },
})

export const studentUserId = schemaComposer.createResolver({
  name: 'studentUserId',
  kind: 'query',
  type: UserTC.getType(),
  args: {
    studentId: 'String!',
    // password: 'String!',
  },
  resolve: async ({ args }) => {
    const { studentId } = args
    const user = await UserModel.findOne({ studentId })
    if (!user) {
      throw new UserInputError('User ID not found in studentId')
    }
    return user
  },
})

