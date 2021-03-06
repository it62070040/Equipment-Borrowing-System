import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Button, Container, Skeleton } from "@mui/material";
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
  const [click, setClick] = useState("Borrow");
  const [order, setOrder] = useState([]);
  const { loading, data, refetch } = useQuery(ORDER_QUERY);

  useEffect(() => {
    refetch()
    if (loading === false && data) {
      const neworder = data.Orders;
      setOrder(neworder.filter((item) => item.orderstatus === click).sort((a,b)=>a.createdAt-b.createdAt));
      // console.log(data.Orders);
    }
  }, [loading, data, order, click, refetch]);

  if (loading) {
    return (
    <Container >
      <Skeleton height={100}/>
      <Skeleton height={200}/>
    </Container>
    );
  }

  const handleClick = (value) => {
    setClick(value);
    if (value === "Borrow") {
      const filorder = order.filter((item) => item.orderstatus === "Borrow");
      setOrder(filorder);
    } else if (value === "Return") {
      const filorder = order.filter((item) => item.orderstatus === "Return");
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
                color: click === "Borrow" ? "rgb(231 198 252)" : "#000",
                textDecoration: click === "Borrow" ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="Borrow"
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
                color: click === "Return" ? "rgb(231 198 252)" : "#000",
                textDecoration: click === "Return" ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="Return"
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
