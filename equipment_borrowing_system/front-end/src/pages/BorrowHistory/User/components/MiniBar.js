import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Button, Container, Skeleton } from "@mui/material";
import "./MiniBar.css";
import CardTable from "./CardTable";
import { gql, useQuery } from "@apollo/client";
import { useApp } from '../../../../context/AppContext'

const ORDER_QUERY = gql`
  query ($_id: MongoID!) {
    userId(_id: $_id) {
      _id
      orders {
        _id
        equipmentId
        borrowDate
        returnDate
        order_amount
        borrowstatus
        orderstatus
        returnstatus
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
  }
`;

export default function MiniBar() {
  const [click, setClick] = useState("Borrow");
  const [order, setOrder] = useState([]);
  const { user } = useApp()
  const { loading, data, refetch } = useQuery(ORDER_QUERY, {
    variables: {
      _id: user._id,
    },
  });

  useEffect(() => {
    refetch()
    if (loading === false && data) {
      const neworder = data.userId.orders;
      setOrder(neworder.filter((item) => item.orderstatus === click));
      // console.log(data.userId);
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
    } else if (value === "Cancel") {
      const filorder = order.filter((item) => item.orderstatus === "Cancel");
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
          <Grid>
            <Button
              variant="text"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textTransform: "none",
                color: click === "Cancel" ? "rgb(231 198 252)" : "#000",
                textDecoration: click === "Cancel" ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="Cancel"
            >
              Cancel
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
