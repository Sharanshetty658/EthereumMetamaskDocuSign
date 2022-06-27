import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { address, abi } from "../utility/smartcontract";
import { Link } from "react-router-dom";
import { PendingContractTable } from "../components/PendingcontractTable";
import {SignedContractTable} from "../components/SignedContractTable";
export default function View() {

    const [pending,setPending] = useState();
    const [signed,setSigned] = useState();
    const [user,setUser]= useState();
    const etherscan_link = `https://ropsten.etherscan.io/address/`+address;


    useEffect(()=>{


      async function viewBlockchain() {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setUser(accounts[0]);
          const signer = provider.getSigner();
          const openlawThai = new ethers.Contract(address, abi, provider);
          const openlawThaiSigner = openlawThai.connect(signer);
          let pending_contracts = await openlawThaiSigner.retrievePending();
          let signed_contracts = await openlawThaiSigner.retrieveSigned();

          setPending(pending_contracts);
          setSigned(signed_contracts);

      
        } else {
          alert("install metamask extension!!");
        }
      }


        viewBlockchain();
        

    },[])



    if (typeof pending!=='undefined' && typeof signed !== 'undefined')
    return (
        <>
        <nav
        style={{
          borderBottom: "solid 2px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> | <Link to="/view">view deployed contracts</Link> |{" "}
        <span style={{ float: "right" }}>
          ropsten test network :
          {address}
        </span>
      </nav>

         

          <main> <h2> Deployed at   <a href={etherscan_link}>{address}</a></h2></main>

       


          <h2> Pending Contract</h2>
          { (pending.length === 0 )? <div> No pending Contract </div> : <PendingContractTable contracts={pending} user={user}/>}
          <br/>

          <h2> Completed Contract</h2>
          { (signed.length === 0 )? <div> No complete contract </div> : <SignedContractTable contracts={signed} user={user}/>}
          <br/>
        
            </>
    )

    
}

//<div> User address: {contracts[0][0]} </div>

