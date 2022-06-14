import "./App.css";
import { useRef, useState } from "react";
import { APIClient, Openlaw } from "openlaw";
import { Link, Outlet } from "react-router-dom";
import { Templates } from "./utility/templates";
import ContractForm from "./components/Form";
import { Grid, TextField, Box, Typography } from "@mui/material";
import Preview from "./components/Preview";
import { convertTemplateToHTML } from "./utility/toHTML";
import { isValidTemplate } from "./utility/isValid";
import { Container } from "@mui/system";

const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");

const style = {
  border: 3,
  borderRadius: 2,
  borderColor: "#ffaa00",
  margin: "1%",
  padding: "10px",
};

function App() {
  const [template, setTemplate] = useState(Templates[0].txt);
  const [formData, setFormdata] = useState({});
  const [key,setKey] = useState(0);
  const textfieldRef = useRef();
  const formUpdate = (key, value, validationData) => {
    setFormdata({ ...formData, [key]: value });
    //console.log(formData)
  };

  function submitTemplate(e) {
    e.preventDefault();
   setKey(key+1);

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
            <ContractForm template={template} stateLift={formUpdate}  key={key} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              Preview
            </Typography>{" "}
            <button onClick={downloadPDF}> Download PDF</button>
            <hr />
            <Preview template={template} formData={formData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
