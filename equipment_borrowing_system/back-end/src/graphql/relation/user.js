import { OrderTC } from '../../models/order'
import { UserTC } from '../../models/user'

UserTC.addRelation(
  'orders',
  {
    resolver: OrderTC.getResolver('findMany'),
    projection: { orderId: 1 },
    prepareArgs: {
      _id: (user) => user.equipmentId,
    },
  },
)
// UserTC.addFields({
//   fullname: {
//     type: 'String',
//     projection: { firstname: 1, lastname: 1 },
//     resolve: (user) => `${user.firstname} ${user.lastname}`,
//   },
// })
