import "./App.css";

import { useRef, useState } from "react";
import { APIClient, Openlaw } from "openlaw";
import { Link, Outlet } from "react-router-dom";

import ContractForm from "./components/Form";

const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");
//apiClient.login("simbadinosour@gmail.com", "Openlaw129");

function App() {
  // form information
  const [template, setTemplate] = useState(`**NAME**[[firstname]] [[dog]]`);
  const [parameters, setParameters] = useState({});
  const templateRef = useRef();
  function onParametersChange(key, value, validationData) {
    setParameters({ ...parameters, [key]: value });
  }
  function submitTemplate(e) {
    e.preventDefault();
    setTemplate(templateRef.current.value);
  }
  function downloadPDF(e) {
    e.preventDefault();
    const pdf = {
      content: template,
      title: "DOG TEMPLATE",
      parameters: {},
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
    <Outlet/>
      <textarea rows={10} cols={50} ref={templateRef} defaultValue={template} />
      <button onClick={submitTemplate}> submit template </button>
      <button onClick={downloadPDF}> Download PDF</button>

      <div className="App">
        <ContractForm template={template} onChange={onParametersChange} />
      </div>
    </>
  );
}

export default App;
