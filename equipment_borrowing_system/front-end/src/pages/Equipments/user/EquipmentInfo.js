import React from "react";
import EquipmentInfoCard from "../../../components/Cards/EquipmentInfoCard";
import "./EquipmentInfo.css";
import BorrowedUserTable from "./components/BorrowedUserTable"

function EquipmentInfo() {
    const user = [
        {
            "id": 1,
            "firstName": "ชนากานต์",
            "lastName": "ประสมแก้ว",
            "borrowDate": "09/22/22",
            "returnDate": "09/30/22",
            "returnStatus": "Success"

        },
        {
            "id": 2,
            "firstName": "ทวีวัฒน์",
            "lastName": "ศรีเมฆ",
            "borrowDate": "09/22/22",
            "returnDate": "09/30/22",
            "returnStatus": "Pending"

        }
    ]
  return (
    <div className="equipmentInfo">
      <div className="eqIfo-container">
        <EquipmentInfoCard />
        <div className="eq-borrowed-name-container">
            <div className="eq-borrowed-name">
                <div className="eq-borrowed-name-header">
                <h3>รายชื่อผู้ยืมอุปกรณ์</h3>
                <BorrowedUserTable user={user}/>
                </div>
                
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default EquipmentInfo;
