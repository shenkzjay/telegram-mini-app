"use client";

import { useEffect, useState, useRef } from "react";
import { FooterNavbar } from "../footer/footer";
import Image from "next/image";
// import Pig from "@/app/assets/imgs/pig.png";
import SokCoin from "@/app/assets/imgs/coin.png";
import Popcoin from "@/app/assets/imgs/popcoin.png";
import { Modal } from "../footer/modal/modal";
import { Wheel } from "@/app/assets/svgs/wheel";
import { Tick } from "@/app/assets/svgs/tick";
import { Cart } from "@/app/assets/svgs/cart";
import Link from "next/link";

export interface UserData {
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

export function Earn() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(1500);
  const [click, setClick] = useState<ClickProps[]>([]);
  const dailyLoginRef = useRef<HTMLDialogElement | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isStreakClaimed, setisStreakClaimed] = useState(false);
  const rewards = [5000, 10000, 25000, 50000, 100000, 250000, 750000];

  console.log(isStreakClaimed);

  const pointsAdded = 10;
  const energySubtrated = 10;

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setUserData(WebApp.initDataUnsafe.user as UserData);
      }
    };

    initWebApp();
  }, [setUserData, userData]);

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.vibrate(100);

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
    navigator.vibrate(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 1500));
    }, 1000);

    const lastLogin = Number(localStorage.getItem("lastlogin"));
    const currentDate = new Date().getTime();
    const modalShownToday = localStorage.getItem("modalShownToday") === "true";
    let streakData = JSON.parse(localStorage.getItem("completedDays") || "[]");

    console.log({ currentDate, lastLogin });

    if (lastLogin) {
      const lastLoginDate = new Date(lastLogin).getTime();
      const differenceInDays = Math.floor((currentDate - lastLoginDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 1) {
        // Increment streak if logged in after exactly one day

        setDailyStreak((prevStreak) => prevStreak + 1);
        if (!streakData.includes(dailyStreak)) {
          streakData.push(dailyStreak); // Add new streak day
          // setisStreakClaimed(false);
        }
      } else if (differenceInDays > 1) {
        // Reset streak if more than one day has passed
        setDailyStreak(1);
        streakData = [1]; // Reset streak data to day 1
      }
    } else {
      // First-time login
      setDailyStreak(1);
      streakData = [1];
    }

    // Save updated streak data to localStorage
    setCompletedDays(streakData);
    localStorage.setItem("lastLogin", `${currentDate}`);
    localStorage.setItem("completedDays", JSON.stringify(streakData));

    // Open modal only if it hasn't been shown today
    if (!modalShownToday) {
      handleOpenDailyLoginModal();
      localStorage.setItem("modalShownToday", "true");
    }
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(completedDays);

  const handleOpenDailyLoginModal = () => {
    if (dailyLoginRef.current) {
      dailyLoginRef.current.showModal();
    }
  };

  const handleClaimReward = () => {
    const currentReward = rewards[dailyStreak - 1] || rewards[rewards.length - 1];

    setPoints((prevPoints) => prevPoints + currentReward);

    dailyLoginRef.current?.close();

    setisStreakClaimed(true);
  };

  return (
    <main className="flex flex-col justify-between h-screen ">
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
          {userData ? (
            <div className="footerbg !rounded-full p-[2px] text-white flex flex-row gap-1 items-center mb-4 w-fit text-xs">
              <span className="w-6 h-6 bg-white rounded-full"></span>
              <p className="px-2">{userData?.username}</p>
              <p>lv1</p>
            </div>
          ) : (
            <div className=" footerbg !rounded-full p-[2px] text-white flex flex-row gap-1 items-center mb-4 w-fit text-xs">
              <span className="w-6 h-6 bg-white rounded-full"></span>
              <p className="px-2 ">Shenkz</p>
              <p>lv1</p>
            </div>
          )}
          <nav className="flex flex-row justify-between">
            <div className="entryanime  flex flex-row gap-1 text-base font-bold footerbg p-1 rounded-xl text-white">
              <span>🪙</span>
              <p>{points.toLocaleString()}</p>
            </div>

            <div className="relative entryanime flex flex-row gap-1 text-xs items-center font-bold footerbg p-2 rounded-xl text-white">
              <span
                className={`absolute top-1.5 left-1 rounded-[5px] ${
                  energy <= 600
                    ? "bg-red-400/40"
                    : energy <= 1200
                    ? "bg-yellow-400/40"
                    : "bg-green-400/40"
                } w-[90%] h-2/3 flex -z-10`}
                style={{ width: `${(energy / 1500) * 100 - 10}%` }}
              ></span>
              <span className="">⚡️</span>
              <p>{energy.toLocaleString()}/1500</p>
            </div>
          </nav>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(10px,1fr))] gap-4 mt-4 justify-center item-center">
          <button
            onClick={handleOpenDailyLoginModal}
            className="tickgroup entryanime grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-xs justify-center bg-[#262626] text-white items-center"
          >
            <span className="text-center text-3xl grid justify-center">
              <Tick />
            </span>
            <p>Daily login</p>
          </button>
          <div className="entryanime grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-xs justify-center bg-[#262626] text-white">
            <span className="text-center text-3xl grid justify-center">
              <Wheel />
            </span>
            <p>Lucky code</p>
          </div>
          <Link
            href="/market"
            className="entryanime grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-xs justify-center bg-[#262626] text-white"
          >
            <span className="text-center text-3xl grid justify-center">
              <Cart />
            </span>
            <p>Marketplace</p>
          </Link>
        </div>

        {/* POPOVERS */}

        <div className="h-full flex flex-col w-full justify-center items-center mt-6">
          <button className=" h-full active:scale-95" onPointerDown={handleClick}>
            <Image
              src={SokCoin}
              alt="pig image"
              width={200}
              height={200}
              priority
              className="w-full h-full object-contain"
            />
          </button>
          <div>
            {click &&
              click.map((clicker, index) => (
                <button
                  key={index}
                  style={{ left: `${clicker.x - 15}px` }}
                  className="absolute text-6xl opacity-100 clicker top-[40%] text-white"
                  onAnimationEnd={() => handleAnimationEnd(clicker.id)}
                >
                  <Image
                    src={Popcoin}
                    width={100}
                    height={100}
                    alt="coin illustration"
                    priority
                    className="w-24 h-24"
                  />
                </button>
              ))}
          </div>
        </div>
      </div>

      <footer className="">
        <FooterNavbar />
      </footer>
      <Modal ref={dailyLoginRef}>
        <section className="">
          <div className="flex flex-col justify-center w-full items-center text-white">
            <h3>Daily reward</h3>
            <div>
              <span>coin bounce</span>
            </div>
          </div>
          <div className=" grid grid-cols-[repeat(auto-fit,minmax(70px,1fr))] gap-1 h-full p-6 w-[85vw] md:w-[20vw] text-white">
            {Array.from({ length: 7 }, (_, index) => {
              return (
                <span
                  key={index}
                  className={`grid grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center `}
                >
                  <span>Day {index + 1}</span>
                  {completedDays.includes(index + 1) ? <span>✅</span> : <span>🪙</span>}
                  <p>{rewards[index]}k</p>
                </span>
              );
            })}
            {/* <span className="grid grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center">
              <span>Day 2</span>
              <span>🪙</span>
              <p>10k</p>
            </span>
            <span className="grid grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center">
              <span>Day 3</span>
              <span>🪙</span>
              <p>25k</p>
            </span>
            <span className="grid grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center">
              <span>Day 4</span>
              <span>🪙</span>
              <p>50K</p>
            </span>
            <span className="grid grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center">
              <span>Day 5</span>
              <span>🪙</span>
              <p>100k</p>
            </span>
            <span className="grid grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center">
              <span>Day 6</span>
              <span>🪙</span>
              <p>250k</p>
            </span>
            <span className="grid col-span-3 grid-rows-subgrid row-span-3 p-2 footerbg text-sm font-semibold justify-center">
              <span>Day 7</span>
              <span>🪙</span>
              <p>1M</p>
            </span> */}
          </div>
          <div className="flex justify-center items-center m-6">
            {!isStreakClaimed && (
              <button
                onClick={handleClaimReward}
                className="flex w-full justify-center items-center font-bold  py-2 px-4 bg-orange-500 rounded-xl text-white"
              >
                Claim {rewards[dailyStreak - 1] || rewards[rewards.length - 1]}k coins
              </button>
            )}
          </div>
        </section>
      </Modal>
    </main>
  );
}
