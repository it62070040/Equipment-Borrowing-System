import { EquipmentTC } from '../../models/equipment'
import { OrderTC } from '../../models/order'
import { UserTC } from '../../models/user'

// function addRelation ('field', {option})
// projection tell what's key do you want to get | projection: { 'key': 1 } such as { 'title': 1}
// prepareArgs tell what's argument that set to resolver
OrderTC.addRelation(
  'user',
  {
    resolver: UserTC.getResolver('findById'),
    projection: { userId: 1 },
    prepareArgs: {
      _id: (order) => order.userId,
    },
  },
)

OrderTC.addRelation(
  'equipment',
  {
    resolver: EquipmentTC.getResolver('findById'),
    projection: { equipmentId: 1 },
    prepareArgs: {
      _id: (order) => order.equipmentId,
    },
  },
)
