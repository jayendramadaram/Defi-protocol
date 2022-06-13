import Link from "next/link";
import React from "react";

function Unauth() {
  return (
    <div className='xxs:h-screen w-screen  bgimage flex items-center justify-center overflow-y-scroll'>
      <div className='stuff max-w-4xl mx-8  space-y-8'>
        <div className='text-4xl font-mono'>Guidlines</div>
        <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300'></div>
        <div>
          <div className='text-2xl font-mono'>How to use</div>
          <ol className='list-disc pl-8'>
            <li>
              This Dapp is A defi protocol for Staking crypto assets , Lending
              and borrowing protocol , yield farming , flash loans
            </li>
            <li>
              To start Staking Your assets Go down here and connect your Wallet
              preferablly METAMASK
            </li>
            <li className='list-none items-center justify-center stuf mt-5'>
              <button>Connect Your MetaMASK</button>
            </li>
            <li className='flex list-disc space-x-2'>
              <div>
                If already you are connected No issues Head over to{"   "}
              </div>
              <Link className='underline-offset-4 ml-2' href={"/"}>
                <div className='underline'> __Home__</div>
              </Link>
              <div></div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Unauth;
