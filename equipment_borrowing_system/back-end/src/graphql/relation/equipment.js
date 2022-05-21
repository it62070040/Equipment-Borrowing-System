import { EquipmentTC } from '../../models/equipment'
import { OrderTC } from '../../models/order'

EquipmentTC.addRelation(
  'orders',
  {
    resolver: OrderTC.getResolver('findMany'),
    projection: { _id: 1 },
    prepareArgs: {
      filter: (equipment) => ({
        equipmentId: equipment._id,
      }),
    },
  },
)
