import React, { useCallback } from "react";
import "./BorrowedUserTable.css";


export default function BorrowedUserTable({ user }) {
  //   const clickEqCard = useCallback(
  //     (id) => (window.location.href =`/equipmentInfo/${id}`, { equipmentId: id }),
  //     []
  //   );

  return (
    <div className="borrow-table-container">
      <div className="borrow-table-header-row-con">
        <ul className="borrow-table-header-row">
          <li className="borrow-table-header">No.</li>
          <li className="borrow-table-header">Name</li>
          <li className="borrow-table-header">Borrow Date</li>
          <li className="borrow-table-header">Return Date</li>
          <li className="borrow-table-header">Return Status</li>
        </ul>
      </div>
      {user.map((row, i) => (
        <div
          className="borrow-row-con"
          key={row.id}
          //   onClick={() => clickEqCard(row.id)}
        >
          <div className="user-row">
            <ul className="table-user-row">
              <li className="user-table-item">{i + 1}</li>
              <li className="user-table-item">{row.firstName} {row.lastName}</li>
              <li className="user-table-item">{row.borrowDate}</li>
              <li className="user-table-item">{row.returnDate}</li>
              <li className="user-table-item" style={row.returnStatus === "Success" ? {color: "green"} : row.returnStatus === "Failed" ? {color: "red"} : {color: "gray"}}>{row.returnStatus}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
