import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { address, abi } from "../utility/smartcontract";
import { Link } from "react-router-dom";
export default function View() {

    const [contracts,setContracts] = useState();

    useEffect(()=>{
        viewBlockchain();
    },[])

    async function viewBlockchain() {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const openlawThai = new ethers.Contract(address, abi, provider);
          //const openlawThaiSigner = openlawThai.connect(signer);
          let contracts = await openlawThai.retrieveAll();
         // let storing = await openlawThaiSigner.store(now.toString(),hashed, detail);
         // setMsg(ans);
          setContracts(contracts);
          console.log(contracts);
        } else {
          alert("install metamask extension!!");
        }
      }


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

        <main> <h2> see contract history</h2></main>
        </>
    )
}