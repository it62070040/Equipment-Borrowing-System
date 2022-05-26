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
