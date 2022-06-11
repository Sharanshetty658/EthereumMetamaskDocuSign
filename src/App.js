import './App.css';

import { useRef, useState } from 'react';
import { APIClient, Openlaw } from "openlaw";

import ContractForm from './components/Form';



function App() {

  // form information
  const [template,setTemplate] = useState(`**NAME**[[firstname]]`);
  const [parameters,setParameters] = useState({});
  const editableTemplateRef = useRef();

  function onParametersChange(key,value,validationData){
    setParameters({ ...parameters, [key]: value });
  }
  function onTemplateChange(e){
    const { compiledTemplate } = Openlaw.compileTemplate(template);
    const { executionResult, errorMessage } = Openlaw.execute( compiledTemplate, {},{});
    console.log("error is", errorMessage);
    if (!errorMessage){
      setTemplate(e.target.value)
      console.log("changed template:", template);}
  }

  return (
    <>
    <textarea ref={editableTemplateRef} onChange={onTemplateChange}>{template}</textarea>

    <div className="App">
      <ContractForm template={template} onChange={onParametersChange}/>
    </div>
    </>
  );
}

export default App;
