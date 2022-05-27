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
            คณะเทคโนโลยีสารสนเทศ<br />
            สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เลขที่ 1<br />
            ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520 <br />
            +66 (0)2723 4900 +66 (0) 2723 4910
        </Container>
      </Box>
    </>
  );
}

export default Footer;
