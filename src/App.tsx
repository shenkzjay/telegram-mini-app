import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

import "./App.css";

interface UserData {
  id: number;
  language_code: string;
  is_premium?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  });

  return (
    <main className="flex flex-col justify-between h-screen bg-[#1a1a1a]">
      <div className="mx-6 mt-6">
        {/* {userData && (
          <ul>
            <li>
              <img src={userData.photo_url} width={100} height={100} alt={userData.photo_url} />
            </li>
            <li>ID: {userData.id}</li>
            <li>first_name: {userData.first_name}</li>
            <li>last_name: {userData.last_name}</li>
            <li>language_code: {userData.language_code}</li>
            <li>username: {userData.username}</li>
            <li>is_premium: {userData.is_premium ? "YES" : "NO"}</li>
          </ul>
        )} */}
        <header>
          {userData && (
            <div className="text-slate-400 flex flex-row gap-2 items-center mb-6">
              <span>
                <img
                  src={userData.photo_url}
                  width={50}
                  height={50}
                  className="rounded-xl object-cover"
                />
              </span>
              <p>{userData.username}</p>
            </div>
          )}
          <nav className="flex flex-row justify-between">
            <div className="flex flex-row gap-1 text-xs font-bold bg-orange-300 p-1 rounded-xl">
              <span>🪙</span>
              <p>2,000,000,000</p>
            </div>

            <div className="flex flex-row gap-1 text-xs font-bold bg-orange-300 p-1 rounded-xl">
              <span>🪙</span>
              <p>2,000,000,000</p>
            </div>
          </nav>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(10px,1fr))] gap-4 mt-10">
          <div className=" grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-sm justify-center bg-[#262626] text-gray-400">
            <span className="text-center text-3xl">✅</span>
            <p>Daily login</p>
          </div>
          <div className=" grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-sm justify-center bg-[#262626] text-gray-400">
            <span className="text-center text-3xl">🎡</span>
            <p>Lucky code</p>
          </div>
          <div className=" grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-sm justify-center bg-[#262626] text-gray-400">
            <span className="text-center text-3xl">🔮</span>
            <p>Airdrop</p>
          </div>
        </div>

        <div className="h-full pt-10 flex flex-col w-full justify-center items-center ">
          <button className="active:scale-95 h-full">
            <img src="/pig.png" width={300} height={300} alt="piggy bank" />
          </button>
        </div>
      </div>

      <footer>
        <nav className="py-2">
          <ul className="flex flex-row mx-6 text-xs bg-[#262626] p-2 gap-2 rounded-xl text-gray-400">
            <li className="p-2 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
              Earn
            </li>
            <li className="p-2 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
              Task
            </li>
            <li className="p-2 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
              Wallet
            </li>
            <li className="p-2 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
              Friends
            </li>
          </ul>
        </nav>
      </footer>
    </main>
  );
}

export default App;
