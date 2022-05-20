import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const OrderSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  equipments: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  timestamp: {
    type: Date,
  },
  amount:{
    type: Number
  },
  borrowstatus:{
    type: String,//approve, pending, not approve
  },
  orderstatus:{
    type: String//return, borrow, cancel
  },
  returnstatus:{
    type: String//pending, success, fail
  }
})
export const OrderModel = model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)
