// import { Schema } from 'mongoose'

import { EquipmentModel } from '../models/equipment'
import { OrderModel } from '../models/order'
import { UserModel } from '../models/user'
import '../mongoose-connect'

const USERS = [
  {
    studentId: '62070014',
    fullname: 'kanapa',
    email: 'k@gmail.com',
    role: 'user',
  },
  {
    studentId: '62070041',
    fullname: 'chanakarn',
    email: 'k2@gmail.com',
    role: 'user',
  },
  {
    studentId: '62070040',
    fullname: 'chanakan',
    email: 'k3@gmail.com',
    role: 'user',
  },
]

const EQUIPMENTS = {
  name: 'Arduino s3',
  description: 'nothing on you',
  category: 'บลาๆ',
  url_pic: 'https://inwfile.com/s-fp/sxp4qa.jpg',
  status: 'available',
  amount: 10,
}

// const ORDERS = {
//   equipmentId: '628879b8a0c262f70473d010',
//   borrowDate: '2022-10-10T17:00:00.000+00:00',
//   returnDate: '2022-12-10T17:00:00.000+00:00',
//   amount: 2,
//   borrowstatus: 'approved',
//   orderstatus: 'borrow',
//   returnstatus: '',
// }

const main = async () => {
  await EquipmentModel.deleteMany({})
  await OrderModel.deleteMany({})
  await UserModel.deleteMany({})
  await UserModel.create(USERS)
  await EquipmentModel.create(EQUIPMENTS)
  //   await OrderModel.create({ ORDERS, userId: users[0]._id, equipmentId: equipments[0]._id })
  process.exit(0)
}
main().catch(console.error)
