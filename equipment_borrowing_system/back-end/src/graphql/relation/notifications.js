import { NotificationTC } from '../../models/notification'
import { UserTC } from '../../models/user'

NotificationTC.addRelation(
  'user',
  {
    resolver: UserTC.getResolver('findById'),
    projection: { userId: 1 },
    prepareArgs: {
      _id: (noti) => noti.userId,
    },
  },
)
