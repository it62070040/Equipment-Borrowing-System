import { OrderTC } from '../../models/order'
import { UserTC } from '../../models/user'

UserTC.addRelation(
  'orders',
  {
    resolver: OrderTC.getResolver('findMany'),
    projection: { _id: 1 },
    prepareArgs: {
      filter: (user) => ({
        userId: user._id,
      }),
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
