import { NotificationTC } from '../../models/notification'

export const createNotification = NotificationTC.getResolver('createOne')
export const updateNotificationId = NotificationTC.getResolver('updateById')
