import React, { useState, useEffect, useCallback } from "react";
import "./BorrowedUserTable.css";
import Moment from 'moment';
import { Container, Skeleton } from "@mui/material";
import { gql, useQuery } from '@apollo/client';

const OrderEquipmentId_QUERY = gql`
query($equipmentId: String!) {
	OrderEquipmentId (equipmentId: $equipmentId) {
    userId
    borrowDate
    returnDate
    returnstatus
    user {
      fullname
      studentId
      email
    }
  }
}
`
export default function BorrowedUserTable({ equipment }) {
  const [order, setOrder] = useState([])
  const { loading, error, data, refetch } = useQuery(
    OrderEquipmentId_QUERY,
    { 
      variables: { 
        equipmentId: equipment._id
      },

    })

    useEffect(() => {
      refetch()
      if(loading === false && data){
        setOrder(data.OrderEquipmentId);
      }
    }, [loading, data, refetch])

  
    if (loading) {
      return (
      <Container >
        <Skeleton height={100}/>
        <Skeleton height={200}/>
      </Container>
      );
    }

  const returnData = () => {
    // console.log(Object.keys(order).length === 0)
    return (
      <>
      <div className="borrow-table-header-row-con">
        <ul className="borrow-table-header-row">
          <li className="borrow-table-header">No.</li>
          <li className="borrow-table-header">Name</li>
          <li className="borrow-table-header">Borrow Date</li>
          <li className="borrow-table-header">Return Date</li>
          <li className="borrow-table-header">Return Status</li>
        </ul>
      </div>
      {order.map((row, i) => (
        <div
          className="borrow-row-con"
          key={i}
          //   onClick={() => clickEqCard(row.id)}
        >
          <div className="user-row">
            <ul className="table-user-row">
              <li className="user-table-item">{i + 1}</li>
              <li className="user-table-item">{row.user.fullname}</li>
              <li className="user-table-item">{Moment(row.borrowDate).format('DD/MM/YYYY')}</li>
              <li className="user-table-item">{Moment(row.returnDate).format('DD/MM/YYYY')}</li>
              <li className="user-table-item" style={row.returnstatus === "Success" ? {color: "green"} : row.returnstatus === "Borrowing" ? {color: "gray"} : {color: "grayred"}}>{row.returnstatus}</li>
            </ul>
          </div>
        </div>
      ))}
      </>
      )
    }
    
    return (
      <div className="borrow-table-container">
        {Object.keys(order).length === 0 ? <p>ยังไม่มีข้อมูลการยืม</p> :  returnData()}
      </div>
      
  );
}
