import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'
import EmptyNotification from './EmptyNotification'
import NotificationBoxItems from './NotificationBoxItems'
import data1 from './data.json'
import { gql, useQuery } from '@apollo/client';
import { useApp } from "../../context/AppContext";

const USERNOTI_QUERY = gql`
query($_id: MongoID!) {
	userId (_id: $_id) {
		_id
    notifications {
      _id
      name
      message
      unread
      createdAt
    }
		orders{
      equipmentId
      borrowDate
      returnDate
      borrowstatus
      orderstatus
      returnstatus
      equipment{
        _id
        name
        description
        category
        url_pic
        status
        amount
        why_unavailable  
      }
    }
	}
}
`


const ContainerNotificationList = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  min-width: 450px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 8px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(calc(100% + 24px)) translateX(10%);
  z-index: 1;
  background: padding-box white;
  transition: all 0.222s linear 0s;
  &.active{
    opacity: 1;
    pointer-events: all;
    transform: translateY(calc(100% + 12px)) translateX(10%);
  }
`

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #dddfe2;
  padding-bottom: 10px;
  padding: 10px;
`

const LinkButton = styled.a`
  font-size: 0.8em;
  font-family: Sarabun;
  color: #1d2637;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const Arrow = styled.div`
  top: 0px;
  right: 59px;
  transform: translate(-50%, -100%);
  clip: rect(0px, 18px, 14px, -4px);
  position: absolute;
  ::after {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    transform: rotate(45deg) translate(6px, 6px);
    box-shadow: rgba(0, 0, 0, 0.44) -1px -1px 1px -1px;
    background: rgb(255, 255, 255);
  }
`

const HeaderList = styled.h5`
  margin: 0;
  font-size: 0.8em;
  font-weight: bold;
  font-family: SarabunBold;
`

const ContainerBody = styled.div`
  &.emptyNotification {
    display: flex;
    justify-content: center;
    color: rgba(20, 27, 38, 0.20);
  }
`

const ContainerFooter = styled(ContainerHeader)``

/** ==================================================================
 * @name NotificationList
 * @description แสดงกล่อง Notification ที่มีส่วน Header, Body, Footer
 * @param active - ถ้าหากเป็น true จะแสดงกล่องในส่วนนี้ขึ้นมา
 * @version
 * ================================================================ */

const NotificationList = ({ active, userId }) => {
    const { user } = useApp();
    // console.log(user._id)
    // const [userNoti, setUserNoti] = useState([]);
    // const [userOrder, setUserOrder] = useState([]);
      

  return (
    <ContainerNotificationList className={active ? 'active': null}>
      <ContainerHeader>
        <HeaderList>Notification</HeaderList>
        {/* <LinkButton onClick={() => console.log('Make all as read')}>
          ทำเครื่องหมายว่าอ่านแล้ว
        </LinkButton> */}
      </ContainerHeader>

      <ContainerBody className={data1.length > 0 ? null : 'emptyNotification'}>
        { /** ==========================================================
           * @description ถ้าหากไม่มีข้อมูลจะแสดง EmptyNotification Component
           * ======================================================== */
           data1.length < 1
            ? <EmptyNotification label='ไม่มีการแจ้งเตือน' />
            // : <NotificationBoxItems userOrder={userOrder} />
            : <NotificationBoxItems />
        }
      </ContainerBody>

      { /** ======================================================
         * @description ถ้าหากไม่มีข้อมูล ให้ไม่แสดงอ่านข้อความทั้งหมดด้านล่าง
         * ==================================================== */
         data1.length > 0 &&
        <ContainerFooter>
          <LinkButton>
            อ่านข้อความทั้งหมด
          </LinkButton>
        </ContainerFooter>
      }

      <Arrow />
    </ContainerNotificationList>
  )
}

export default NotificationList