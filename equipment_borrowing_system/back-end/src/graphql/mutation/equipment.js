import { EquipmentTC } from '../../models/equipment'

export const createEquipment = EquipmentTC.getResolver('createOne')
export const updateEquipmentId = EquipmentTC.getResolver('updateById')
export const deleteEquipmentId = EquipmentTC.getResolver('removeById')
