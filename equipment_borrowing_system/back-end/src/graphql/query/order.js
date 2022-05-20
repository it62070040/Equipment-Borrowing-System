// import { schemaComposer } from 'graphql-compose'

import { OrderTC } from '../../models/order'

export const Orders = OrderTC.getResolver('findMany')
export const OrderId = OrderTC.getResolver('findById')
// export const relatedOrders = schemaComposer.createResolver({
//   name: 'relatedOrders',
//   kind: 'query',
//   type: OrderTC.getResolver('findMany').getType(),
//   args: OrderTC.getResolver('findMany').getArgType(),
//   resolve: async ({ args }) => {

//     return []
//   },
// })
