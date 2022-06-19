import "./App.css";
import { useEffect, useRef, useState } from "react";
import { APIClient, Openlaw } from "openlaw";
import { Link, Outlet } from "react-router-dom";
import { Templates } from "./utility/templates";
import ContractForm from "./components/Form";
import { ethers } from "ethers";
import {address,abi} from "./utility/smartcontract"
import {
  Grid,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Preview from "./components/Preview";
import { convertTemplateToHTML } from "./utility/toHTML";
import { isValidTemplate } from "./utility/isValid";
import { Container } from "@mui/system";
import ToBlockchain from "./components/ToBlockchain";
const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");

const style = {
  margin: "1%",
  padding: "10px",
};

function App() {
  const [template, setTemplate] = useState(Templates[0].txt);
  const [formData, setFormdata] = useState({});
  const [key, setKey] = useState(0);
  const textfieldRef = useRef();
  const [eth_address, setEthaddress] = useState("");
  const [popup, setPopup] = useState(false);
  const [message,setMessage] = useState("");
  const formUpdate = (key, value, validationData) => {
    setFormdata({ ...formData, [key]: value });
    //console.log(formData)
  };

  useEffect(()=>{

    const connectToMetamask = async () => {
      if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const accounts = await provider.send("eth_requestAccounts", []);

        setEthaddress(accounts[0]);
        console.log("set address = ",eth_address);
    } else console.log("please install Metamask")
  }

  connectToMetamask();

},[]);


  async function sendToBlockchain() {
    if (window.ethereum) {
   
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      //const accounts = await provider.send("eth_requestAccounts", []);
      //console.log(accounts)
      //setEthaddress(accounts[0]);
      //console.log("address", eth_address);
      const signer = provider.getSigner()
      const openlawThai = new ethers.Contract(address, abi, provider);
      const openlawThaiSigner = openlawThai.connect(signer)
      let ans = await openlawThai.wave();
      setMessage(ans);
      //console.log("WTF");
      console.log(message);

    } else {
      alert("install metamask extension!!");
    }
    setPopup(true);
  }

  function submitTemplate(e) {
    e.preventDefault();
    setKey(key + 1);
    setFormdata({});

    if (isValidTemplate(textfieldRef.current.value))
      setTemplate(textfieldRef.current.value);
    else
      alert(
        "INVALID TEMPLATE , need 2 square bracket for the Field you want, for example [[Price]]"
      );
  }

  function downloadPDF(e) {
    e.preventDefault();
    const pdf = {
      content: template,
      title: Templates[0].title,
      parameters: formData,
      paragraphs: {},
      templates: {},
    };
    apiClient.downloadAsPdf(pdf);
  }
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 2px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> | <Link to="/contracts">view contracts</Link> |{" "}
      </nav>
      <Outlet />

      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              Editable Template
            </Typography>
            <button onClick={submitTemplate}> Generate new template. </button>{" "}
            <hr />
            <TextField
              id="standard-multiline-static"
              multiline
              fullWidth
              defaultValue={template}
              variant="standard"
              inputRef={textfieldRef}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              UserInput
            </Typography>
            <hr />
            <ContractForm
              template={template}
              stateLift={formUpdate}
              key={key}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              Preview
            </Typography>{" "}
            <button onClick={downloadPDF}> Download PDF</button>
            <button onClick={sendToBlockchain}>
        {" "}
        SIGNED with metamask and SEND to blockchain
      </button>
            <hr />
            <Preview template={template} formData={formData} />
          </Box>
        </Grid>
      </Grid>


      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={popup}
        onClick={() => setPopup(false)}
      >
        <ToBlockchain SignedBy={eth_address} />
      </Backdrop>
    </>
  );
}

export default App;
