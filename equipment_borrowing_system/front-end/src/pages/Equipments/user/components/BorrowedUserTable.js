import React, { useCallback } from "react";
import "./BorrowedUserTable.css";


export default function BorrowedUserTable({ user }) {
  //   const clickEqCard = useCallback(
  //     (id) => (window.location.href =`/equipmentInfo/${id}`, { equipmentId: id }),
  //     []
  //   );

  return (
    <div className="table-container">
      <div className="table-header-row-con">
        <ul className="table-header-row">
          <li className="table-header">No.</li>
          <li className="table-header">Name</li>
          <li className="table-header">Borrow Date</li>
          <li className="table-header">Return Date</li>
          <li className="table-header">Return Status</li>
        </ul>
      </div>
      {user.map((row, i) => (
        <div
          className="user-row-con"
          key={row.id}
          //   onClick={() => clickEqCard(row.id)}
        >
          <div className="user-row">
            <ul className="table-user-row">
              <li className="table-item">{i + 1}</li>
              <li className="table-item">{row.firstName} {row.lastName}</li>
              <li className="table-item">{row.borrowDate}</li>
              <li className="table-item">{row.returnDate}</li>
              <li className="table-item" style={row.returnStatus === "Success" ? {color: "green"} : row.returnStatus === "Failed" ? {color: "red"} : {color: "gray"}}>{row.returnStatus}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
