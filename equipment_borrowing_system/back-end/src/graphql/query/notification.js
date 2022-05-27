import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { NotificationTC } from '../../models/notification'

export const notifications = NotificationTC.getResolver('findMany')
export const notificationId = NotificationTC.getResolver('findById')

