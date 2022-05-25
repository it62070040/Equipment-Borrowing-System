import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const UserSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
}, {
  timestamps: true,
})
UserSchema.plugin(mongooseBcrypt)
export const UserModel = model('User', UserSchema)

export const UserTC = composeWithMongoose(UserModel)
