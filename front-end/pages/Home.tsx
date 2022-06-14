//@ts-nocheck
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/Login/action";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import USN from "../USN.json";
import PNTOKEN from "../PantherToken.json";
// import detectEthereumProvider from '@metamask/detect-provider';

function Home() {
  const [Account, setAccount] = useState<String>("");
  const [USNC, setUSNC] = useState<Contract>();
  const [PNT, setPNT] = useState<Contract>();
  const dispatch = useDispatch();

  useEffect(() => {
    const { ethereum } = window;
    if (typeof ethereum !== "undefined") {
      if (ethereum.networkVersion !== "3") {
        ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(3) }],
          })
          .catch((err) => {
            if (err.code === 4902) {
              window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainName: "Ropsten Testnet",
                    chainId: Web3.utils.toHex(3),
                    nativeCurrency: {
                      name: "ropsten",
                      decimals: 18,
                      symbol: "ETH",
                    },
                    rpcUrls: [" https://ropsten.infura.io/v3/"],
                  },
                ],
              });
            }
          });
      }

      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          dispatch(LOGIN());
          // console.log(accounts);
          setAccount(accounts[0]);
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Install MetaMask");
    }

    const web3 = new Web3(
      Web3.givenProvider ||
        `https://ropsten.infura.io/v3/${process.env.InfuraID}`
    );

    const USNTOKEN = new web3.eth.Contract(
      USN.abi,
      "0x5Cfb95f9e0d63422724B6ce4eeaba68d289723E2"
    );
    setUSNC(USNTOKEN);

    const PNTTOKEN = new web3.eth.Contract(
      PNTOKEN.abi,
      "0xb6B68F90786712b7f50aF07B10DC3F8C0f713aE4"
    );
    setPNT(PNTTOKEN);

    const getbal = async () => {
      const usnbal = await USNTOKEN.methods.balanceOf(Account).call();
      console.log(usnbal.toString(), "hereeeeeeeeeeeeeee");
    };
    getbal();
  }, []);

  return (
    <div>
      {Account}
      {/* <div>{}</div> */}
    </div>
  );
}

export default Home;
