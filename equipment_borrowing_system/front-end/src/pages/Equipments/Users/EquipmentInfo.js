import React, { useState, useEffect, useCallback } from "react";
import EquipmentInfoCard from "./components/Cards/EquipmentInfoCard";
import "./EquipmentInfo.css";
import BorrowedUserTable from "./components/BorrowedUserTable";
import { Container, Skeleton } from "@mui/material";
import { gql, useQuery } from '@apollo/client';

const EQUIPMENTID_QUERY = gql`
query($_id: MongoID!) {
  equipmentId(_id: $_id) {
		_id
    name
    description
    amount
    category
    url_pic
    status
    why_unavailable
  }
}
`

function EquipmentInfo() {
  const splitUrl = window.location.href.split('/')
  const equipmentId = splitUrl[splitUrl.length-1]
  // console.log(equipmentId)
  const [equipment, setEquipment] = useState([]);

    const { loading, data, refetch } = useQuery(
      EQUIPMENTID_QUERY,
      { 
        variables: { 
          _id: equipmentId
        },

      })

      useEffect(() => {
        if(loading === false && data){
          setEquipment(data.equipmentId);
        }
      }, [loading, data])
    
      if (loading) {
        return (
        <Container >
          <Skeleton height={100}/>
          <Skeleton height={200}/>
        </Container>
        );
      }

  return (
    <div className="equipmentInfo">
      <div className="eqIfo-container">
        <EquipmentInfoCard equipment={equipment} refetch={refetch}/>
        <div className="eq-borrowed-name-container">
            <div className="eq-borrowed-name">
                <div className="eq-borrowed-name-header">
                <h3>รายชื่อผู้ยืมอุปกรณ์</h3>
                <BorrowedUserTable equipment={equipment} refetch={refetch}/>
                </div>
                
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default EquipmentInfo;
