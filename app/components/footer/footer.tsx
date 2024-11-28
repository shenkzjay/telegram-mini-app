"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const FooterNavbar = () => {
  const pathname = usePathname();
  return (
    <section className="relative w-full  ">
      <nav className="flex flex-row py-6 fixed bottom-0 w-full">
        <ul className="flex flex-row text-xs footerbg rounded-xl text-white w-full mx-6">
          {/* <li className="p-4 hover:bg-[#333333] active:bg-[#333] w-full rounded-xl text-center cursor-pointer"> */}
          {/* <a href="/earn">Earn</a> */}
          <Link
            href="/earn"
            className={` ${
              pathname === "/earn" ? "footerbg font-bold" : ""
            } p-3 m-1 flex justify-center items-center w-full`}
          >
            Earn
          </Link>
          {/* </li> */}
          {/* <li className="p-4 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer"> */}
          {/* <a href="/task">Task</a> */}
          <Link
            href="/task"
            className={` ${
              pathname === "/task" ? "footerbg font-bold" : ""
            } p-3 m-1 flex justify-center items-center w-full`}
          >
            Task
          </Link>
          {/* </li> */}
          {/* <li className="p-4 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer"> */}
          {/* <a href="/wallet">Wallet</a> */}
          <Link
            href="/wallet"
            className={` ${
              pathname === "/wallet" ? "footerbg font-bold" : ""
            } p-3 m-1 flex justify-center items-center w-full`}
          >
            Wallet
          </Link>
          {/* </li> */}
          {/* <li className="p-4 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer"> */}
          {/* <a href="/friends">Friends</a> */}
          <Link
            href="/friends"
            className={`  ${
              pathname === "/friends" ? "footerbg font-bold" : ""
            } p-3 m-1 flex justify-center items-center w-full`}
          >
            Friends
          </Link>
          {/* </li> */}
        </ul>
      </nav>
    </section>
  );
};
