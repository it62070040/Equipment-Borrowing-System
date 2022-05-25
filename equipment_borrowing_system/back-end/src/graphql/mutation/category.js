import { CategoryTC } from '../../models/category'

export const createCategory = CategoryTC.getResolver('createOne')
export const updateCategoryId = CategoryTC.getResolver('updateById')
