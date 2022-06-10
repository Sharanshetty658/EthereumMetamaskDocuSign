import './App.css';

import { useState } from 'react';
import ContractForm from './components/Form';



function App() {

  // form information
  const [formState,setFormState] = useState();

  return (
    <div className="App">
      <ContractForm stateLift={setFormState}/>
    </div>
  );
}

export default App;
