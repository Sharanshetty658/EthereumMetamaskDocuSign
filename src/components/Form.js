import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useEffect, useState } from "react";
import "openlaw-elements/dist/openlaw-elements.min.css";

const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");
apiClient.login("simbadinosour@gmail.com", "Openlaw129");

/*
function create_contract(template){
  const { executionResult, errorMessage } = Openlaw.execute(
    compiledTemplate,
    {},
    {}
  );
  const variables = Openlaw.getExecutedVariables(executionResult, {});
  const parameters = {};
  
  if (errorMessage) {
    console.error("Openlaw Execution Error:", errorMessage);
  }
}
*/

const ContractForm = ({ template , onChange }) => {
  console.log("form inside template",template);
  const { compiledTemplate } = Openlaw.compileTemplate(template);
  const { executionResult, errorMessage } = Openlaw.execute( compiledTemplate, {},{});
  const variables = Openlaw.getExecutedVariables(executionResult, {});
  const { agreement } = Openlaw.getAgreements(executionResult)[0];
  const [params, setParams] = useState({});
  const [txt, setTxt] = useState(Openlaw.renderForPreview(agreement,{},{}));


  useEffect(() => {
    let { executionResult, errorMessage } = Openlaw.execute(compiledTemplate,{},params);
 
    const variables = Openlaw.getExecutedVariables(executionResult, {});
    const { agreement } = Openlaw.getAgreements(executionResult)[0];
    setTxt(Openlaw.renderForPreview(agreement, {}, {}));
  });

  function onChangeFunction(key,value,validationData)
  {
      setParams({ ...params, [key]: value });
  }

  return (
    <>
      <OpenLawForm
        apiClient={apiClient}
        executionResult={executionResult}
        parameters={params}
        onChangeFunction={onChangeFunction}
        openLaw={Openlaw}
        variables={variables}
      />
      <div dangerouslySetInnerHTML={{ __html: txt }} />
    </>
  );
};

export default ContractForm;
