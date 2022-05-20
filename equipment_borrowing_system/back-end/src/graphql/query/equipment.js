// import { schemaComposer } from 'graphql-compose'

import { EquipmentTC } from '../../models/equipment'

export const equipments = EquipmentTC.getResolver('findMany')
export const equipmentId = EquipmentTC.getResolver('findById')
// export const relatedPosts = schemaComposer.createResolver({
//   name: 'relatedPosts',
//   kind: 'query',
//   type: PostTC.getResolver('findMany').getType(),
//   args: PostTC.getResolver('findMany').getArgType(),
//   resolve: async ({ args }) => {

//     return []
//   },
// })
