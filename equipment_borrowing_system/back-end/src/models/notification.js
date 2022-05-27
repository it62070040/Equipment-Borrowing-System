import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  unread: {
    type: String, // true, false
    required: true,
    default: 'true',
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

export const NotificationModel = model('Notification', NotificationSchema)

export const NotificationTC = composeWithMongoose(NotificationModel)
