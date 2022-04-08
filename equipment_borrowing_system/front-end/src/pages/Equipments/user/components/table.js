import * as React from "react";

import logo from "../../../../assets/EQ-logo.png";

import "./table.css";

function createData(name, title, amount, status) {
  return { name, title, amount, status };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function BasicTable() {
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
      {rows.map((row) => (
      <div className="eq-item-row-con" key={row.name}>
        <div className="eq-item-row">
        <ul className="table-item-row">
          <li className="table-item-img">
            <img style={{ width: "70px", height: "auto"}} src={logo} alt="Logo" />
            <div className="table-item-title">
              <h4>{row.name}</h4>
              <p >{row.name}</p>

            </div>
            
          </li>
          <li className="table-item">{row.title}</li>
          <li className="table-item">{row.amount}</li>
        </ul>
         
        </div>
      </div>
      ))}
    </div>
  );
}
