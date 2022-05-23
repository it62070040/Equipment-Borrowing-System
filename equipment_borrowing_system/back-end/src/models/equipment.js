import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const EquipmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  url_pic: {
    type: String,
    required: true,
  },
  status: {
    type: String, // available, unavailable
    required: true,
  },
  why_unavailable: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
  },
})
export const EquipmentModel = model('Equipment', EquipmentSchema)

export const EquipmentTC = composeWithMongoose(EquipmentModel)
