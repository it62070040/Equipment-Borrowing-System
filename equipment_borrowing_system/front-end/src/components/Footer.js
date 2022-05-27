import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          mt: 8,
          backgroundColor: "#1e1e1e",
        }}
      >
        <Container style={{ color: "white" }}>
            Faculty of Information Technology<br />
            King Mongkut's Institute of Technology Ladkrabang<br />
            1, Chalong Krung 1, Ladkrabang, Bangkok 10520 <br />
            +66 (0)2723 4900 +66 (0) 2723 4910
        </Container>
      </Box>
    </>
  );
}

export default Footer;
