import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { address, abi } from "../utility/smartcontract";
import { Link } from "react-router-dom";
import { ContractTable } from "../components/contractTable";
export default function View() {

    const [contracts,setContracts] = useState();
    const etherscan_link = `https://ropsten.etherscan.io/address/`+address;
    useEffect(()=>{

      async function viewBlockchain() {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

         console.log("address seek",address)
          const openlawThai = new ethers.Contract(address, abi, provider);
          const openlawThaiSigner = openlawThai.connect(signer);
          console.log("before retrieve")
          let contracts = await openlawThaiSigner.retrieveAll();
          console.log("this is contract",contracts)
         // let storing = await openlawThaiSigner.store(now.toString(),hashed, detail);
         // setMsg(ans);
          setContracts(contracts);
          console.log(contracts);
        } else {
          alert("install metamask extension!!");
        }
      }


        viewBlockchain();
        console.log("useeffect loop",contracts);


    },[])




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
          Smart Contract address (ropsten test network) :
          "0xcb51e09ba325d43123d2fed346150afbfcf64dbf"
        </span>
      </nav>

        <main> <h2> Deployed Contract</h2></main>
        <div> Deployed on ropsten test network at : <a href={etherscan_link}>{address}</a> </div> <br/>
          <div> User address: {contracts[0][0]} </div>
          <br/>
        <ContractTable contracts={contracts}/>
            </>
    )
}

