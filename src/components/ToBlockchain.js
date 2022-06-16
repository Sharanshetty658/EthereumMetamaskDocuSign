import { Box, Paper } from "@mui/material";
const ToBlockchain = ({ SignedBy }) => {
  console.log("signedBy", SignedBy);
  return (
    <>
    <Box sx={{width:0.7,textAlign:"center"}}>
      <Paper elevation={3}>
        <hr />
        Signed by ETH ACCOUNT: {SignedBy}
        <br /> Contract hash: _____
        <br />
        Signed Date_____ <br /> Contract Detail :_______
        <br /> Contract address: _______
        <hr />
      </Paper>
      </Box>
    </>
  );
};

export default ToBlockchain;
