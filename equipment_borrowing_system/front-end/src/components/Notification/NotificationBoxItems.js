import React, { useState, useCallback }  from 'react'
import styled from 'styled-components'

import NotificationItem from './NotificationItem'
import data from './data.json'
import { useApp } from "../../context/AppContext";

const ContainerListNotification = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: scroll;
`

/** ========================================================================
 * @name NotificationBoxItems
 * @description แสดงกล่อง Notification ที่รวมรายการ Notification Item ต่าง ๆ ไว้
 * @version
 * ====================================================================== */
const NotificationBoxItems = ({userOrder}) => {
    // console.log("kuyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" + userOrder);
    const { user } = useApp();
    // console.log("jsdofjisdjfosd" + user);
    // const [userOrder, setserOrder] = useState(user.orders);
    // const [userNoti, setUerNoti] = useState(user.notifications);
    // const [orderEq, setOrderEq] = useState(user.orders.equipment);
    
  return (
    <ContainerListNotification>
      { /** ============================================
         * @description วนลูปสร้างกล่อง LastMessage มาแสดง
         * ในตอนนี้ดึงค่าที่ Mock ไว้มาแสดงก่อน
         * // TODO
         * ========================================== */
        data.map(item => {
          const { messageID, unread, name, message, lastUpdated, imageURL } = item

          return (
            <NotificationItem
              key={messageID}
              unread={unread}
              name={name}
              message={message}
              lastUpdated={lastUpdated}
              imageURL={imageURL}
            />
            // key={item.notifications._id}
            //   unread={item.notifications.unread}
            //   name={item.notifications.name}
            //   message={item.notifications.message}
            //   lastUpdated={item.notifications.createdAt}
            //   imageURL={item.orders.equipment.url_pic}
          )
        })
      }
    </ContainerListNotification>
  )
}

export default NotificationBoxItems