import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { FooterNavbar } from "../../components/footer-navbar";

interface UserData {
  id: number;
  language_code: string;
  is_premium?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface ClickProps {
  id: number;
  x: number;
  y: number;
}

export const Earn = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [points, setPoints] = useState(2000000000);
  const [energy, setEnergy] = useState(5000);
  const [click, setClick] = useState<ClickProps[]>([]);

  const pointsAdded = 10;
  const energySubtrated = 10;

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  });

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (energy - energySubtrated < 0) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClick((prev) => [...prev, { id: Date.now(), x, y }]);

    setPoints(points + pointsAdded);

    setEnergy(energy - energySubtrated < 0 ? 0 : energy - energySubtrated);
  };

  const handleAnimationEnd = (id: number) => {
    setClick((prev) => prev.filter((click) => click.id !== id));
  };

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
                {/* <img
                  src={userData.photo_url}
                  width={30}
                  height={30}
                  className="rounded-xl object-cover"
                /> */}
                {userData.photo_url}
              </span>
              <p>{userData.username}</p>
            </div>
          )}
          <nav className="flex flex-row justify-between">
            <div className="flex flex-row gap-1 text-xs font-bold bg-orange-300 p-1 rounded-xl">
              <span>🪙</span>
              <p>{points.toLocaleString()}</p>
            </div>

            <div className="flex flex-row gap-1 text-xs font-bold bg-orange-300 p-1 rounded-xl">
              <span className="">⚡️</span>
              <p>{energy.toLocaleString()}</p>
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

        <div className="h-full flex flex-col w-full justify-center items-center ">
          <button className=" h-full" onPointerDown={handleClick}>
            <img src="/pig.png" width={300} height={300} alt="piggy bank" />
          </button>
          <div>
            {click &&
              click.map((clicker, index) => (
                <button
                  key={index}
                  style={{ left: `${clicker.x - 15}px` }}
                  className="absolute text-6xl opacity-100 clicker top-[40%]"
                  onAnimationEnd={() => handleAnimationEnd(clicker.id)}
                >
                  💰
                </button>
              ))}
          </div>
        </div>
      </div>

      <footer>
        <FooterNavbar />
      </footer>
    </main>
  );
};
