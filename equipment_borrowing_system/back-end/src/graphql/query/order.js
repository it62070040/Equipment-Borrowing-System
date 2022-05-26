import { schemaComposer } from 'graphql-compose'

import { OrderTC, OrderModel } from '../../models/order'

export const Orders = OrderTC.getResolver('findMany')
export const OrderId = OrderTC.getResolver('findById')

export const OrderEquipmentId = schemaComposer.createResolver({
  name: 'OrderEquipmentId',
  kind: 'query',
  type: OrderTC.getResolver('findMany').getType(),
  args: {
    equipmentId: 'String!',
  },
  resolve: async ({ args }) => {
    const { equipmentId } = args
    const borrowstatus = 'Approved'
    // eslint-disable-next-line object-shorthand
    let order = await OrderModel.find({ equipmentId: equipmentId, borrowstatus: borrowstatus }).sort({ createdAt: -1 }).lean()
    if (!order) {
      // throw new orderInputError('order ID not found in equipmentId')
      order = []
      return order
    }
    return order
  },
})

// export const tweets = schemaComposer.createResolver({
//     name: 'tweets',
//     kind: 'query',
//     type: TweetTC.mongooseResolvers.findMany().getType(),
//     args: {
//       username: 'String!',
//     },
//     resolve: async ({ args }: ResolverResolveParams<ITweet, IApolloContext, ITweetsArgs>) => {
//       const { username } = args
//       const user = await UserModel.findOne({ username })
//       if (!user) {
//         return []
//       }
//       const records = await TweetModel.find({ userId: user._id as string }).sort({ createdAt: -1 }).lean()
//       return records
//     },
//   })
