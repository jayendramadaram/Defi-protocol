import Link from "next/link";
import React, { useEffect } from "react";

const otherProjects = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen space-y-3 bgimage'>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://nft-site-jayendramadaram.vercel.app/"}>
          META WAIFUS
        </Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://medium-clone-two-vert.vercel.app/"}>
          MEDIUM CLONE
        </Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://github.com/jayendramadaram?tab=repositories"}>
          REPOS
        </Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://www.instagram.com/jayendra__02"}>INSTAGRAM</Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://twitter.com/jayendra__02"}>TWITTER</Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://www.linkedin.com/in/jayendra-madharam-961922200/"}>
          LINKEDIN
        </Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"https://github.com/jayendramadaram/"}>GITHUB</Link>
      </div>
      <div className=' px-7 py-2 border  rounded-lg cursor-pointer stiff'>
        <Link href={"mailto:dimebeatengreen8@gmail.com"}>EMAIL</Link>
      </div>
    </div>
  );
};

export default otherProjects;
