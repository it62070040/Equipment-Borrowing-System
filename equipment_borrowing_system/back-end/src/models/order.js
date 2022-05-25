import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  equipmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true,
  },
  borrowDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  order_amount: {
    type: Number,
    default: 1,
    required: true,
  },
  borrowstatus: {
    type: String, // Approved, Pending, Unapproved
    default: 'Pending',
  },
  orderstatus: {
    type: String, // Return, Borrow, Cancel
    default: 'Borrow',
  },
  returnstatus: {
    type: String, // Borrowing, Success, Fail
    default: '',
  },
}, {
  timestamps: true,
})
export const OrderModel = model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)
