import { useDispatch } from "react-redux";
import Link from "next/link";
import React, { useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import toast, { Toaster } from "react-hot-toast";
import { LOGIN } from "../redux/Login/action";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    web3: any;
  }
}
function Unauth() {
  const dispatch = useDispatch();

  const WalletConnet = async () => {
    const { ethereum } = window;
    if (typeof ethereum !== "undefined") {
      toast.promise(
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            dispatch(LOGIN());
            console.log(accounts);
          })
          .catch((err) => alert(err.message)),
        {
          loading: "Connecting ....",
          success: <b>PERFECT</b>,
          error: <b>Try reConnect or [restart browser]</b>,
        }
      );
    } else {
      alert("Install MetaMask");
    }
  };
  // const notify = () =>;

  return (
    <div className='xxs:h-screen w-screen  bgimage flex items-center justify-center overflow-y-scroll'>
      <div className='stuff max-w-4xl mx-8  space-y-8'>
        <div className='text-4xl font-mono'>Guidlines</div>
        <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300'></div>
        <div>
          <div className='text-2xl font-mono'>How to use</div>
          <ol className='list-disc pl-8 space-y-3'>
            <li>
              This Dapp is A defi protocol for Staking crypto assets , Lending
              and borrowing protocol , yield farming , flash loans
            </li>
            <li>
              To start Staking Your assets Go down here and connect your Wallet
              preferablly METAMASK
            </li>

            <div className='space-x-5 justify-around '>
              {" "}
              <li
                className='list-none items-center justify-center stuf mt-5'
                onClick={WalletConnet}
              >
                <button>Connect Your MetaMASK</button>
              </li>
              <li
                className='list-none items-center justify-center stuf mt-5'
                // onClick={WalletConnet}
              >
                <button>
                  <Link href={"/Home"}>Start here And Earn APR</Link>
                </button>
              </li>
              <li
                className='list-none items-center justify-center stuf mt-5'
                // onClick={WalletConnet}
              >
                <Link href={"/otherProjects"}> View Other Projects</Link>
              </li>
            </div>

            <li className=' list-disc space-x-2 flex'>
              If already you are connected No issues in any case Head over to{" "}
              {"   "}
              __Home__ {"  "} Make sure you are on Ropsten Testnet and well
              funded wallet
            </li>
            <li>
              Once you are in Ropsten testnet and if you have Near Stable token
              [USN] in your wallet you are good to go. Else no issue i have
              enabled mint-on-Demand feature so get free USN noww
            </li>
            <li>
              Once you have some USN you can stake USN and earn rewards in form
              of OUR PNT token Once done with stuff you can unstake
            </li>
          </ol>
        </div>
        <div>
          <div className='text-2xl font-mono'>Under Construction</div>
          <ol className='list-disc pl-8 space-y-3'>
            <li>Lending and Borrowing mechanism</li>
            <li>YEILD FARMING / LIQUIDITY MINING</li>
            {/* <li>
              <a href={"/"}>HOME</a>
            </li> */}
          </ol>
        </div>
      </div>
      <Toaster position='bottom-left' reverseOrder={false} />
    </div>
  );
}

export default Unauth;
