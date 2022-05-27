// import { Schema } from 'mongoose'

import { CategoryModel } from '../models/category'
import { EquipmentModel } from '../models/equipment'
import { NotificationModel } from '../models/notification'
import { OrderModel } from '../models/order'
import { UserModel } from '../models/user'
import '../mongoose-connect'

const USERS = [
  {
    studentId: 'admin1',
    fullname: 'Admin',
    email: 'ebsystem.adm@gmail.com',
    role: 'admin',
    // roles: {Admin : 5150},
  },
]

const CATEGORYS = [
  {
    category: 'Electronics',
  },
  {
    category: 'Arduino',
  },
  {
    category: 'Tools',
  },
  {
    category: 'Furnitures',
  },
  {
    category: 'Recreations',
  },
]

const EQUIPMENTS = [
  {
    name: 'เมาส์มีสาย (Wired Mouse)',
    description: 'เมาส์ สีดำ MD Tech MD-17',
    category: 'Electronics',
    url_pic: 'https://aumento.officemate.co.th/media/catalog/product/O/F/OFM4005413.jpg?imwidth=640',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'คีย์บอร์ดมีสาย (Wired Keyboard)',
    description: 'Primaxx KB-509 คีย์บอร์ดมีสาย',
    category: 'Electronics',
    url_pic: 'https://cf.shopee.co.th/file/d94f1429b7a4404b93e578724c3b6bf5',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'หูฟังพร้อมไมโครโฟน (Stereo Headset)',
    description: 'Audio Technica หูฟัง รุ่น ATH-770XCOM Stereo Headset',
    category: 'Electronics',
    url_pic: 'https://f.btwcdn.com/store-30005/product/d0d8e521-fc57-0d15-cd52-602f858f4d2b.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'ไมโครโฟนไร้สาย (Wireless Microphone)',
    description: 'Boya BY-WFM12 VHF Wireless Microphone',
    category: 'Electronics',
    url_pic: 'https://www.digital2home.com/wp-content/uploads/2019/10/Boya-BY-WFM12-warranty-01.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'เมาส์ปากกา (Pen Mouse)',
    description: 'XPPen Star G430S เมาส์ปากกา ขนาด 4x3 นิ้ว แรงกด 8192 ระดับ',
    category: 'Electronics',
    url_pic: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2022/01/Product/xp-pen-star-g430s-pen-mouse-01.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'เมาส์ไร้สาย (Wireless Mouse)',
    description: 'LOGITECH M221 WIRELESS SILENT (BLACK)',
    category: 'Electronics',
    url_pic: 'https://www.jib.co.th/img_master/product/original/20180712130913_25451_11963954.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'กล้องเว็บแคม (Webcam)',
    description: 'Webcam FULL HD 1080p กล้องเว็บแคม ยี่ห้อ ASHU รุ่น H800',
    category: 'Electronics',
    url_pic: 'https://inwfile.com/s-fy/fravkl.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'สาย HDMI',
    description: 'สาย HDMI V1.4 3 เมตร UNITEK Y-C139M',
    category: 'Electronics',
    url_pic: 'https://aumento.officemate.co.th/media/catalog/product/4/0/4006668.jpg?imwidth=640',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'โทรโข่ง (Megaphone)',
    description: 'TOA Hand Grip Megaphone โทรโข่งแบบมือถือ รุ่น ER-3215',
    category: 'Electronics',
    url_pic: 'http://ustatic.priceza.com/img/productgroup/320592-1-l.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'Ultrasonic Distance Sensor (HC-SR04)',
    description: 'เซนเซอร์ Ultrasonic Module HC-SR04+ Distance Ultrasonic Sensor',
    category: 'Arduino',
    url_pic: 'https://cdn.sparkfun.com//assets/parts/1/3/5/0/8/15569-Ultrasonic_Distance_Sensor_-_HC-SR04-01a.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'Sound Sensor',
    description: 'Sound Sensor Module 3 pin Voice Sound Detection Sensor Amplifier LM393 Electret Microphone DIY Kit',
    category: 'Arduino',
    url_pic: 'https://lzd-img-global.slatic.net/g/p/ef10c69885cfb37f30812c16e87e46d6.jpg_720x720q80.jpg_.webp',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'Infrared barrier Sensor',
    description: 'เซนเซอร์ตรวจจับเส้น เดินตามเส้น Infrared barrier module / obstacle avoidance car obstacle avoidance sensor',
    category: 'Arduino',
    url_pic: 'https://inwfile.com/s-dw/38j35e.png',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'Breadboard 830H',
    description: 'Breadboard บอร์ดทดลอง 830 รู MB-102 MB102 Arduino',
    category: 'Arduino',
    url_pic: 'https://lzd-img-global.slatic.net/g/p/mdc/63fd45a95b4623f6cd18928136961d38.jpg_720x720q80.jpg_.webp',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'USB Cable',
    description: 'สาย mophie USB-A พร้อมหัวต่อ Lightning (3 ม.)',
    category: 'Arduino',
    url_pic: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/HN862?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1562973642996',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'LED Light 5 mm.',
    description: 'หลอด LED 5 mm light emitting diode สี เหลือง ขาว น้ำเงิน เขียว แดง',
    category: 'Arduino',
    url_pic: 'https://cf.shopee.co.th/file/adc812a9fc162bf5ed74a7543bd6f991',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'F-F Jumper',
    description: 'Jumper wires, F-F, 10 cm',
    category: 'Arduino',
    url_pic: 'https://nettigo.eu/system/images/2580/original.JPG?1510148513',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'M-M Jumper',
    description: 'Jumper wires, M-M, 10 cm',
    category: 'Arduino',
    url_pic: 'https://nettigo.eu/system/images/2586/original.JPG?1510149243',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'M-F Jumper',
    description: 'Jumper wires, M-F, 10 cm',
    category: 'Arduino',
    url_pic: 'https://inwfile.com/s-dx/7pgyt8.png',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'กรรไกร (Scissors)',
    description: 'กรรไกร 6นิ้ว สก๊อตช์ Multi Purpose 1426',
    category: 'Tools',
    url_pic: 'https://aumento.officemate.co.th/media/catalog/product/O/F/OFM2071800.jpg?imwidth=640',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'เครื่องเจาะกระดาษ (Paper Puncher)',
    description: 'เครื่องเจาะกระดาษ ตราช้าง DP-600',
    category: 'Tools',
    url_pic: 'https://www.goodchoiz.com/content/images/thumbs/0042973_%E0%B8%B7%E0%B9%88-%E0%B9%89-dp600-%E0%B8%B5.jpeg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'Pointer',
    description: 'Pointer Wireless (รีโมทควบคุมคำสั่งไร้สาย) Presenter HP',
    category: 'Tools',
    url_pic: 'https://www.jib.co.th/img_master/product/original/2018071715132230628_1.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'เครื่องคิดเลข (Calculator)',
    description: 'เครื่องคิดเลข Casio รุ่น FX-991EX สีดำ',
    category: 'Tools',
    url_pic: 'https://d1mqjpb51un8dw.cloudfront.net/catalog/product/5/0/5037589-e1.jpg',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'เก้าอี้จัดเลี้ยง (Stack Chair)',
    description: 'เก้าอี้จัดเลี้ยง ITK TK-66 สีดำ',
    category: 'Furnitures',
    url_pic: 'https://cdn.homepro.co.th/ART_IMAGE/10/423/1042355/447x447/10072021_1042355$Imagec2.jpg',
    status: 'Available',
    amount: 20,
  },
  {
    name: 'โต๊ะพับอเนกประสงค์ (Seminar Folding Table)',
    description: 'โต๊ะพับอเนกประสงค์ รุ่นเซมินาร์ ขนาด 150 X 60 ซม. - สีขาว',
    category: 'Furnitures',
    url_pic: 'https://media.indexlivingmall.com/media/catalog/product/1/2/120021094_op1_Seminar_150cm_WT_2.JPG',
    status: 'Available',
    amount: 5,
  },

  {
    name: 'ปลั๊กไฟ (Power Strip)',
    description: 'ปลั๊กไฟ(มอก.) 4 ช่อง ยาว 3 เมตร สีขาว โตชิโน ET-914',
    category: 'Electronics',
    url_pic: 'https://aumento.officemate.co.th/media/catalog/product/O/F/OFM8003580.jpg?imwidth=640',
    status: 'Available',
    amount: 10,
  },
  {
    name: 'กลองสันทนาการ',
    description: 'กลองสันทนาการ Triplesix',
    category: 'Recreations',
    url_pic: 'https://www.geyemusic.net/wp-content/uploads/2020/02/spd_20190129181753_b2-300x300.jpg',
    status: 'Available',
    amount: 2,
  },
  {
    name: 'ขาตั้งกลองทอมบ้า',
    description: 'ขาตั้งกลองทอมบ้า CMC 601',
    category: 'Recreations',
    url_pic: 'https://www.musicarms.net/wp-content/uploads/2019/01/%E0%B8%82%E0%B8%B2%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%AD%E0%B8%A1%E0%B8%9A%E0%B9%89%E0%B8%B2-CMC-601.jpg',
    status: 'Available',
    amount: 2,
  },
  {
    name: 'แทมโบริน (Tambourine)',
    description: 'แทมบูริน Tambourine Hi Hat ไม้แท้ Hi Hat Double Tambourine Drum',
    category: 'Recreations',
    url_pic: 'https://248652-1140738-1-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/03/KD019-020-1.jpg',
    status: 'Available',
    amount: 10,
  },

]

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
  await NotificationModel.deleteMany({})
  await OrderModel.deleteMany({})
  await UserModel.deleteMany({})
  await CategoryModel.deleteMany({})
  await EquipmentModel.deleteMany({})

  await UserModel.create(USERS)
  await CategoryModel.create(CATEGORYS)
  await EquipmentModel.create(EQUIPMENTS)
  //   await OrderModel.create({ ORDERS, userId: users[0]._id, equipmentId: equipments[0]._id })
  process.exit(0)
}
main().catch(console.error)
