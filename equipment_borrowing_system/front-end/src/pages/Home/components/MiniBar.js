import React, { useState, useEffect} from "react";
import { Box, Grid, Skeleton, Container } from "@mui/material";
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
  const [order, setOrder] = useState([]);
  const { loading, data, refetch } = useQuery(ORDER_QUERY);

  useEffect(() => {
    refetch();
    if (data) {
      const neworder = data.Orders;
      setOrder(
        neworder.filter(
          (item) =>
            item.borrowstatus === "Approved" || item.borrowstatus === "Pending"
        ).sort((a,b)=>a.createdAt-b.createdAt)
      );
      // console.log(data.Orders);
    }
  }, [ data, order, refetch ]);

  // const handleClick = (value) => {
  //   setClick(value);
  //   if (value === "Borrow") {
  //     const filorder = order.filter((item) => item.orderstatus === "Borrow");
  //     setOrder(filorder);
  //   } else if (value === "Return") {
  //     const filorder = order.filter((item) => item.orderstatus === "Return");
  //     setOrder(filorder);
  //   }
  // };
  if (loading) {
    return (
    <Container >
      <Skeleton height={100}/>
      <Skeleton height={200}/>
    </Container>
    );
  }

  return (
    <div style={{ width: "100%", padding: "0px 70px 30px 70px" }}>
      <Box>
        <Grid
          container
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="15px"
          padding="10px 20px"
        >
          <div>
            <h1>All Borrow Order</h1>
          </div>
        </Grid>

       { order.length === 0 ?
        <div className="no-order-container" style={{textAlign: "center", color: "white", paddingTop: "30px"}}>
          <h2>No Borrow Order Found</h2>
        </div>
        :
        <Box
          className="table"
          sx={{
            p: 1,
            mt: 2,
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "100%",
            maxHeight: "100vh",
            overflowY: "scroll",
          }}
        >
          <CardTable data={order} refetch={refetch} />
        </Box>
        }
      </Box>
    </div>
  );
}
