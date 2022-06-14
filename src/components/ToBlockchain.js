import { Paper } from "@mui/material";
const ToBlockchain = ({ SignedBy }) => {
  console.log("signedBy", SignedBy);
  return (
    <>
      <Paper elevation={3} fullWidth={true}>
        <hr />
        Signed by ETH ACCOUNT: {SignedBy}
        <br /> Contract hash: _____
        <br />
        Signed Date_____ <br /> Contract Detail :_______
        <br /> Contract address: _______
        <hr />
      </Paper>
    </>
  );
};

export default ToBlockchain;
