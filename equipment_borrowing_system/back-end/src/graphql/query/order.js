import { schemaComposer } from 'graphql-compose'

import { OrderModel, OrderTC } from '../../models/order'

export const Orders = OrderTC.getResolver('findMany')
export const OrderId = OrderTC.getResolver('findById')

// Query user's orders
// export const UserOrder = schemaComposer.createResolver({
//   name: 'UserOrder',
//   kind: 'query',
//   type: OrderTC.getType(),
//   resolve: async ({ context }) => {
//     const { userId: _id } = context
//     const userOrder = await OrderModel.findById(_id)
//     return userOrder
//   },
// })
