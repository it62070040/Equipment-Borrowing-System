import { NotificationTC } from '../../models/notification'

export const notifications = NotificationTC.getResolver('findMany')
export const notificationId = NotificationTC.getResolver('findById')

