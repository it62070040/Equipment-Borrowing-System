import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { CategoryTC } from '../../models/category'

export const categorys = CategoryTC.getResolver('findMany')
export const categoryId = CategoryTC.getResolver('findById')
