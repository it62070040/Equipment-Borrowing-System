import React from "react";
import { Link } from "react-router-dom";
import "./EquipmentTable.css";
// import data from "../../Admin/components/ListData.json"

export default function EquipmentTable({ searchResult }) {
  return (
    <div className="table-container">
      {/* <img style={{ width: "60px", height: "auto"}} src={logo} alt="Logo" /> */}
      <div className="table-header-row-con">
        <ul className="table-header-row">
          <li className="table-header">Title</li>
          <li className="table-header">Amount</li>
          <li className="table-header">Status</li>
        </ul>
      </div>
      {searchResult.map((row, i) => (
        <Link className="eq-link" key={i} to={`/equipmentInfo/${row._id}`}>
          {/* <div className="eq-item-row-con" key={row.name} onClick={() => clickEqCard(row._id)}> */}
          <div className="eq-item-row-con" key={row.name}>
            <div className="eq-item-row">
              <ul className="table-item-row">
                <li className="table-item-img">
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    src={row.url_pic}
                    alt="Logo"
                  />
                  <div className="table-item-title">
                    <h4>{row.name}</h4>
                    <p>{row.description}</p>
                  </div>
                </li>
                <li className="table-item">{row.amount}</li>
                <li
                  className="table-item"
                  style={
                    row.status === "Available"
                      ? { color: "green" }
                      : { color: "gray" }
                  }
                >
                  {row.status}
                </li>
              </ul>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
