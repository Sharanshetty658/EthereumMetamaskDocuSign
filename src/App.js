import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Templates } from "./utility/templates";
import ContractForm from "./components/Form";
import { ethers } from "ethers";
import { address, abi } from "./utility/smartcontract";
import { sha256 } from "crypto-hash";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Backdrop,
  Button,
  Alert,
} from "@mui/material";
import Preview from "./components/Preview";
import { isValidTemplate } from "./utility/isValid";

const style = {
  margin: "1%",
  padding: "10px",
};

function App() {
  const [template, setTemplate] = useState(Templates.rentalAgreement.txt);
  const [formData, setFormdata] = useState({});
  const [key, setKey] = useState(0);
  const textfieldRef = useRef();
  const [popup, setPopup] = useState(false);
  const [hashed, setHashed] = useState("");
  const [detail, setDetail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [alert, setAlert] = useState(false);

  const handleFileInput = async (e) => {
    const pdf = new FileReader();
    pdf.onload = async () => {
      const tempHash = await sha256(pdf.result);
      setHashed(tempHash);
    };
    pdf.readAsArrayBuffer(e.target.files[0]);
    setPopup(true);
  };

  const formUpdate = (key, value) => {
    setFormdata((prevData) => ({ ...prevData, [key]: value }));
  };

  const CreateContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, provider).connect(
        signer
      );
      const now = new Date().toString();

      const response = await contract.create(
        recipient || "0x0000000000000000000000000000000000000000",
        now,
        now,
        hashed,
        detail
      );
      console.log(response);
      setAlert(true);
    } else {
      alert("Please install MetaMask.");
    }
  };

  const submitTemplate = (e) => {
    e.preventDefault();
    if (isValidTemplate(textfieldRef.current.value)) {
      setTemplate(textfieldRef.current.value);
      setKey((prevKey) => prevKey + 1); // Refresh form
      setFormdata({});
      setAlert(false);
    } else {
      alert("Invalid template format. Use [[Field]] for placeholders.");
    }
  };

  return (
    <>
      <nav style={{ borderBottom: "solid 2px", paddingBottom: "1rem" }}>
        <span>Home</span> | <span>View Deployed Contracts</span>
      </nav>

      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" textAlign="center">
              Editable Template
            </Typography>
            <button onClick={submitTemplate}>Generate Template</button>
            <TextField
              multiline
              fullWidth
              defaultValue={template}
              inputRef={textfieldRef}
              variant="standard"
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={style}>
            <Typography variant="h5" textAlign="center">
              Form
            </Typography>
            <ContractForm template={template} stateLift={formUpdate} key={key} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" textAlign="center">
              Preview
            </Typography>
            <Preview template={template} formData={formData} />
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => setPopup(true)}>
              Send to Blockchain
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Backdrop open={popup} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box sx={{ width: "80%", bgcolor: "white", p: 4 }}>
          <CloseIcon onClick={() => setPopup(false)} />
          <input type="file" onChange={handleFileInput} />
          <TextField
            variant="filled"
            fullWidth
            placeholder="Description of the contract"
            onChange={(e) => setDetail(e.target.value)}
          />
          <TextField
            variant="filled"
            fullWidth
            placeholder="Recipient Address (optional)"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Button variant="contained" onClick={CreateContract}>
            Sign Contract
          </Button>
          {alert && <Alert severity="success">Contract deployed successfully!</Alert>}
        </Box>
      </Backdrop>
    </>
  );
}

export default App;
