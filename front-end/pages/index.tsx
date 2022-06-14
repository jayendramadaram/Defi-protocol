import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { STATE } from "../typings";

const Home: NextPage = () => {
  const [view, setview] = useState<boolean>(false);
  const LOGGED = useSelector((state: STATE) => state.login.LOGGED);
  const router = useRouter();

  useEffect(() => {
    router.push("/Unauth");
    if (!LOGGED) {
      if (typeof window !== "undefined") {
        router.push("/Unauth");
      }
    } else {
      setview(true);
    }
  }, []);
  return <div className={`${view ? "" : "hidden"}`}>yoo</div>;
};

export default Home;
