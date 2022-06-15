import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AbiItem } from "web3-utils";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/Login/action";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import USN from "../USN.json";
import PNTOKEN from "../PantherToken.json";
import LPOOl from "../LPOOL.json";
import { useRouter } from "next/router";
import { TbLetterM } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
// import detectEthereumProvider from '@metamask/detect-provider';
// require("dotenv").config();
function Home() {
  const [Account, setAccount] = useState<String>("");
  const [USNC, setUSNC] = useState<Contract>();
  const [PNT, setPNT] = useState<Contract>();
  const [LPOL, setLPOOL] = useState<Contract>();
  const [USNbal, setUSNbal] = useState<string>("");
  const [PNTbal, setPNTbal] = useState<string>();
  const [StakingBalance, setStakingBalance] = useState<string>();
  const [WEB3, setWEBB3] = useState<any>();
  const [USNCOUNT, SetUSNCOUNT] = useState<string>();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const START = async () => {
      let SeletedA;
      const { ethereum } = window;
      if (typeof ethereum !== "undefined") {
        window.web3 = new Web3(ethereum as any);
        /*
      request change network to ropsten
       */
        if (ethereum.networkVersion !== "3") {
          await ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(3) }],
            })
            .catch((err) => {
              if (err.code === 4902) {
                ethereum.request({
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
              } else {
                alert("CONNECT YOUR WALLET OR HEAD OVER TO /Unauth");
              }
            });
        }

        /*get accounts */
        const accounts: any = await ethereum.request({
          method: "eth_requestAccounts",
        });

        dispatch(LOGIN());
        if (accounts) {
          setAccount(accounts[0]);
          SeletedA = accounts[0];
        } else {
          alert("Unable to connect");
        }
        // alert(
        //   `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_InfuraID}`
        // );

        var web3 = new Web3(
          new Web3.providers.HttpProvider(
            `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_InfuraID}`
          )
        );
        setWEBB3(web3);

        const PNTTOKEN = new web3.eth.Contract(
          PNTOKEN.abi as AbiItem[],
          "0x7b23EB0326a4b77D1d22A37C8Bcf30A5573eC747"
        );

        setPNT(PNTTOKEN);
        const USNTOKEN = new web3.eth.Contract(
          USN.abi as AbiItem[],
          "0x7Cc3D492A7181Cc0753754E9948270178a298970"
        );

        setUSNC(USNTOKEN);

        const lpool = new web3.eth.Contract(
          LPOOl.abi as AbiItem[],
          "0x54C413630385Ba4e44e5Da23bE3c91577789f1B0"
        );

        setLPOOL(lpool);
        let USNBAL = await USNTOKEN.methods.balanceOf(SeletedA).call();
        setUSNbal(Web3.utils.fromWei(USNBAL, "ether"));

        let PNTBAL = await PNTTOKEN.methods.balanceOf(SeletedA).call();
        setPNTbal(Web3.utils.fromWei(PNTBAL, "ether"));

        let StakingBal = await lpool.methods.StakingRecord(SeletedA).call();
        setStakingBalance(StakingBal);
      } else {
        router.push("/Unauth");
      }
    };
    START();
    // LogSTUFF();
  }, []);
  // 100000000000000000000;

  const LogSTUFF = () => {
    console.log({
      Account,
      USNC,
      PNT,
      LPOL,
      USNbal,
      PNTbal,
      StakingBalance,
    });
  };
  const RELOAD = () => {
    router.reload();
  };

  const MINTTOKS = () => {
    toast.promise(
      window.web3.eth
        .sendTransaction({
          from: Account,
          data: USNC?.methods.MintMore().encodeABI(), // deploying a contracrt
          to: "0x7Cc3D492A7181Cc0753754E9948270178a298970",
        })
        .then(function (receipt: any) {
          console.log(receipt, "brooooo");
          USNC?.methods
            .balanceOf(Account)
            .call()
            .then((USNBAL: any) => {
              setUSNbal(Web3.utils.fromWei(USNBAL, "ether"));
            });
          // alert("SUCCESSS");
        }),
      {
        loading: "Minting ....",
        success: <b>PERFECT Minted NEW</b>,
        error: <b>Mint Failed 😔 Try Externally</b>,
      }
    );
  };

  const handleinput = (e: ChangeEvent<HTMLInputElement>) => {
    var val = parseInt(e.target.value);
    if (val > parseInt(USNbal)) {
      val = parseInt(USNbal);
    } else if (val < 0 || val == NaN) {
      val = 0;
    }
    SetUSNCOUNT(val.toString());
  };
  const STARTSTAKE = () => {
    if (!USNCOUNT) {
      alert("ENTER AMOUNT");
      return;
    }
    toast.promise(
      window.web3.eth
        .sendTransaction({
          from: Account,
          data: LPOL?.methods
            .Stake(Web3.utils.toWei(USNCOUNT, "ether"))
            .encodeABI(), // deploying a contracrt
          to: "0x54C413630385Ba4e44e5Da23bE3c91577789f1B0",
        })
        .then(function (receipt: any) {
          console.log(receipt, "brooooo");
          // alert("SUCCESSS");
          USNC?.methods
            .balanceOf(Account)
            .call()
            .then((USNBAL: any) => {
              setUSNbal(Web3.utils.fromWei(USNBAL, "ether"));
            });

          LPOL?.methods
            .StakingRecord(Account)
            .call()
            .then((StakingBal: any) => {
              setStakingBalance(Web3.utils.fromWei(StakingBal, "ether"));
            });
        }),
      {
        loading: "STAKING ....",
        success: <b>PERFECT ASSETS STAJKED</b>,
        error: <b>ERROR ... Report @jayendra__02 [igram]</b>,
      }
    );
  };

  const STAKE = () => {
    if (!USNCOUNT || USNCOUNT == "0" || !USNbal) {
      alert("ENTER AMOUNT");
      return;
    } else if (parseInt(USNCOUNT) > parseInt(USNbal)) {
      alert("You Dont Have Enough USN");
      return;
    } else {
      toast.promise(
        window.web3.eth
          .sendTransaction({
            from: Account,
            data: USNC?.methods
              .approve(
                "0x54C413630385Ba4e44e5Da23bE3c91577789f1B0",
                Web3.utils.toWei(USNCOUNT, "ether")
              )
              .encodeABI(), // deploying a contracrt
            to: "0x7Cc3D492A7181Cc0753754E9948270178a298970",
          })
          .then(function (receipt: any) {
            console.log(receipt, "brooooo");
            STARTSTAKE();
          }),
        {
          loading: "APPROVING ....",
          success: <b>PERFECT ASSETS APPROVED</b>,
          error: <b>ERROR ... Report @jayendra__02 [igram]</b>,
        }
      );
    }
  };

  const UNSTAKE = () => {
    if (!StakingBalance || StakingBalance == "0") {
      alert("please STAKE to UNSTAKE");
      return;
    }
    toast.promise(
      window.web3.eth
        .sendTransaction({
          from: Account,
          data: LPOL?.methods.Unstake().encodeABI(), // deploying a contracrt
          to: "0x54C413630385Ba4e44e5Da23bE3c91577789f1B0",
        })
        .then(function (receipt: any) {
          console.log(receipt, "brooooo");
          // STARTSTAKE();
          USNC?.methods
            .balanceOf(Account)
            .call()
            .then((USNBAL: any) => {
              setUSNbal(Web3.utils.fromWei(USNBAL, "ether"));
            });
          LPOL?.methods
            .StakingRecord(Account)
            .call()
            .then((StakingBal: any) => {
              setStakingBalance(Web3.utils.fromWei(StakingBal, "ether"));
            });
        }),
      {
        loading: "UNSTAKING ....",
        success: <b>PERFECT ASSETS UNSTAKED...</b>,
        error: <b>ERROR ... Report @jayendra__02 [igram]</b>,
      }
    );
  };

  return (
    <div className='bgimage overflow-hidden'>
      <div className='xxs:h-screen w-screen  space-y-7  items-center justify-center overflow-y-hidden md:overflow-y-hidden overflow-x-hidden '>
        <nav className='stof w-screen sticky top-0 overflow-hidden items-center'>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 items-center'>
            <div className=' flex items-center justify-between h-7'>
              <Image src={"/LOGO.png"} width={70} height={70} />
              <div className='flex list-none space-x-5'>
                <li>
                  <button onClick={LogSTUFF}>STAKING</button>
                </li>
                <li>
                  <Link href={"http://jayendramadara.c1.biz/cmso.html"}>
                    LENDING
                  </Link>
                </li>
                <li>
                  <Link href={"http://jayendramadara.c1.biz/cmso.html"}>
                    BORROW
                  </Link>
                </li>
                <li>
                  <Link href={"/otherProjects"}>OTHER PROJECTS</Link>
                </li>
              </div>
              <div className='flex'>
                <div className='stff1' onClick={() => RELOAD()}>
                  RELOAD
                </div>
                <div className='sttf1'>STAKING BALANCE : {StakingBalance}</div>
              </div>
            </div>
          </div>
        </nav>
        <div className='flex items-center justify-center'>
          {" "}
          <div className='stuff max-w-4xl mx-8  space-y-8 '>
            <div className='text-4xl font-mono'>
              Welcome To Staking Protocol
            </div>
            <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300'></div>
            <div>
              {/* <div className='text-2xl font-mono'>STATS</div> */}
              <ol
                className={`list-none pl-8  ${
                  USNbal == "0" ? "space-y-3" : "flex"
                } items-center space-x-4`}
              >
                <li className='stuf flex items-center'>
                  TOTAL PNT BALANCE : {PNTbal}
                </li>
                {USNbal == "0" ? (
                  <li>
                    + WEll It LOOKS You Dont have Any USN No Worries u Cant Mint
                    From Below +
                  </li>
                ) : (
                  <li className='stuf mt-0'>Total USN balance : {USNbal}</li>
                )}
              </ol>
            </div>
            <div className='w-md grid grid-cols-10'>
              <input
                type='number'
                className='stff bg-transparent outline-none w-full col-span-7'
                value={USNCOUNT}
                onChange={(e) => handleinput(e)}
                min='0'
                max={`${USNbal}`}
              />
              <div className='sttf inline-flex col-span-3 w-full items-center space-x-3 displa'>
                <Image
                  src={"/USN.png"}
                  className='rounded-full'
                  height={40}
                  width={40}
                />{" "}
                <span>USN</span>
              </div>
            </div>
            <div className='p-5  grid grid-cols-10'>
              <button className='stff col-span-5' onClick={() => STAKE()}>
                STAKEEE
              </button>
              <button className='sttf col-span-5' onClick={() => UNSTAKE()}>
                UNSTAKE
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type='button'
        className='fixed bottom-5 right-5 inline-block  rounded-full bg-green-500 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg '
        onClick={() => MINTTOKS()}
      >
        <TbLetterM className='h-8 w-8' />
      </button>
      <Toaster position='bottom-left' reverseOrder={false} />
    </div>
  );
}

export default Home;
