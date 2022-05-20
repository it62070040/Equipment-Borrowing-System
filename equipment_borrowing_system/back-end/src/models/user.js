import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const UserSchema = new Schema({
  studentId:{
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin']
  }
  // createdAt: {
  //   type: Date,
  // },
  // updatedAt: {
  //   type: Date,
  // },
}, {
  timestamps: true,
})
UserSchema.plugin(mongooseBcrypt)
export const UserModel = model('User', UserSchema)

export const UserTC = composeWithMongoose(UserModel)
