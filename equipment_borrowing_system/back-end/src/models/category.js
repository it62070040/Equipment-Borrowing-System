import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
})
export const CategoryModel = model('Category', CategorySchema)

export const CategoryTC = composeWithMongoose(CategoryModel)
