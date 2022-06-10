import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useState } from 'react';
//import "openlaw-elements/dist/openlaw-elements.min.css";

const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");
apiClient.login("simbadinosour@gmail.com", "Openlaw129");
const { compiledTemplate } = Openlaw.compileTemplate(
  "**Name**: [[First Name]] [[Last Name]]"
);
const params = {"First Name": "Taro", "Last Name":"chanatrutipan"};
const { executionResult, errorMessage } = Openlaw.execute(
  compiledTemplate,
  {},
  params
);
const variables = Openlaw.getExecutedVariables(executionResult, {});
const parameters = {};

if (errorMessage) {
  console.error("Openlaw Execution Error:", errorMessage);
}



const ContractForm = ({stateLift})=>{
    const [params,setParams] = useState({});
    const [txt,setTxt]= useState("");
    const onChange = (key, value, validationData) => {
        //console.log("KEY:", key, "VALUE:", value, "VALIDATION:", validationData);
        //console.log("before",params);
        setParams({...params,[key]:value});
       // console.log("after",params)
       renderContract();
    }
    function renderContract(){
        let { executionResult, errorMessage } = Openlaw.execute(
            compiledTemplate,
            {},
            params
          );
          const variables = Openlaw.getExecutedVariables(executionResult, {});
          const { agreement } = Openlaw.getAgreements(executionResult)[0];
          setTxt(Openlaw.renderForPreview(agreement, {}, {}));
    }
    return (
        <>
    <OpenLawForm
    apiClient={apiClient}
    executionResult={executionResult}
    parameters={params}
    onChangeFunction={onChange}
    openLaw={Openlaw}
    variables={variables}
    />
    <div dangerouslySetInnerHTML={{__html:txt}} />
  </>
  )
}

export default ContractForm;