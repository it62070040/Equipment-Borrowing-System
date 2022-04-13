import React from 'react'
import EquipmentInfoCard from '../../../components/Cards/EquipmentInfoCard';
import "./EquipmentInfo.css"

function EquipmentInfo() {
    return(
        <div className="equipmentInfo">
            <div className="eqIfo-container">
                <div className="eq-Info">
                    <div className="eq-info-body">
                        < EquipmentInfoCard />
                    </div>
                </div>
                <div className="eq-borrowed-name">
                    <h3>รายชื่อผู้ยืมอุปกรณ์</h3>
                </div>
            </div>
        </div>
    )

}

export default EquipmentInfo;