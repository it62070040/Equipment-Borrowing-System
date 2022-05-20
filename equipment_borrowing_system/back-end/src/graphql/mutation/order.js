import { OrderTC } from '../../models/order'

export const createOrder = OrderTC.getResolver('createOne')
export const updateOrderId = OrderTC.getResolver('updateById')
