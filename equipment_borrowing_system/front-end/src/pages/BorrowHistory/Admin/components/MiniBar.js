import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Button } from "@mui/material";
import "./MiniBar.css";
import CardTable from "./CardTable";
import { gql, useQuery } from "@apollo/client";

const ORDER_QUERY = gql`
query {
  Orders {
    _id
    orderstatus
    borrowstatus
    returnstatus
    borrowDate
    returnDate
    order_amount
    equipmentId
    userId
    user {
      studentId
      fullname
    }
    equipment {
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
`;

export default function MiniBar() {
  const [click, setClick] = useState("borrow");
  const [order, setOrder] = useState([]);
  const { loading, error, data, refetch } = useQuery(ORDER_QUERY);

  useEffect(() => {
    if (loading === false && data) {
      const neworder = data.Orders;
      setOrder(neworder.filter((item) => item.orderstatus === click));
      console.log(data.Orders);
    }
  }, [loading, data, order, click]);

  if (loading) {
    return <h4>Loading...</h4>;
  }
  if (error) {
    return <h4> Error: {error.message}</h4>;
  }

  const handleClick = (value) => {
    setClick(value);
    if (value === "borrow") {
      const filorder = order.filter((item) => item.orderstatus === "borrow");
      setOrder(filorder);
    } else if (value === "return") {
      const filorder = order.filter((item) => item.orderstatus === "return");
      setOrder(filorder);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <Button
              variant="text"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textTransform: "none",
                color: click === "borrow" ? "#2196F3" : "#000",
                textDecoration: click === "borrow" ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="borrow"
            >
              Borrow
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="text"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textTransform: "none",
                color: click === "return" ? "#2196F3" : "#000",
                textDecoration: click === "return" ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="return"
            >
              Return
            </Button>
          </Grid>
        </Grid>
        <Box
          className="table"
          sx={{
            p: 1,

            mt: 4,
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <CardTable data={order} refetch={refetch} />
        </Box>
      </Box>
    </div>
  );
}
