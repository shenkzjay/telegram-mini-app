"use client";

import { useEffect, useState, useRef } from "react";
import { FooterNavbar } from "../footer/footer";
import Image from "next/image";
import SokCoin from "@/app/assets/imgs/coin.png";
import Popcoin from "@/app/assets/imgs/popcoin.png";
import { Modal } from "../footer/modal/modal";
import { Wheel } from "@/app/assets/svgs/wheel";
import { Tick } from "@/app/assets/svgs/tick";
import { Cart } from "@/app/assets/svgs/cart";
import Link from "next/link";
import { WebApp } from "@twa-dev/types";
import { getUsers } from "@/app/actions/user";
import { updatePoints } from "@/app/actions/points";

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

interface TelegramUserData {
  telegramId: number;
  firstname: string;
  lastname: string;
  username: string;
  point: number;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
    };
  }
}

export function Earn() {
  const [userData, setUserData] = useState<TelegramUserData | null>(null);
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(1500);
  const [click, setClick] = useState<ClickProps[]>([]);
  const dailyLoginRef = useRef<HTMLDialogElement | null>(null);
  const [error, setError] = useState("");
  const [dailyStreak] = useState(0);
  const [completedDays] = useState<number[]>([]);
  const [isStreakClaimed, setisStreakClaimed] = useState(false);
  const rewards = [5000, 10000, 25000, 50000, 100000, 250000, 750000];

  // const pointsAdded = 10;
  const energySubtrated = 10;

  console.log(error);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        const initDataUnsafe = tg.initDataUnsafe || {};

        if (initDataUnsafe.user) {
          const res = await getUsers(initDataUnsafe);

          if (!res || !res.users) {
            console.error("Failed to fetch user data");
            return;
          }

          //had to restructure the user object for type safety
          const user: TelegramUserData = {
            telegramId: res.users.telegramId,
            firstname: res.users.firstname || "",
            lastname: res.users.lastname || "",
            username: res.users.username || "",
            point: res.users.point || 0,
          };

          setUserData(user);
          setPoints(user.point);
        }
      } else {
        return console.log("this is error");
      }
    };

    initWebApp();
  }, []);

  const updateEnergy = () => {
    setEnergy((prevEnergy) => {
      const newEnergy = Math.min(prevEnergy + 1, 1500);
      localStorage.setItem("energy", newEnergy.toString());
      localStorage.setItem("lastUpdate", Date.now().toString());
      return newEnergy;
    });
  };

  useEffect(() => {
    const savedEnergy = localStorage.getItem("energy");

    const lastUpdate = localStorage.getItem("lastUpdate");

    if (savedEnergy && lastUpdate) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(lastUpdate, 10)) / 1000); // divide by 1000 to convert elapsed time to seconds

      //i'm calculating the energy gained since the last updare
      //this ensures that energy gained is updated when the app is closed
      //or user navigates to another page
      //the energy limit is capped at 1500
      const updatedEnergy = Math.min(parseInt(savedEnergy, 10) + elapsedSeconds, 1500);

      setEnergy(updatedEnergy);

      localStorage.setItem("energy", updatedEnergy.toString());
    } else if (savedEnergy) {
      setEnergy(parseInt(savedEnergy, 10));
    }

    const interval = setInterval(updateEnergy, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigator.vibrate(100);

    // prevents the energy from going below zero
    if (energy - energySubtrated < 0) {
      return;
    }

    if (!userData) return console.log("no user found");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    //updating the values of x and y coordinate
    //by creating a new array to keep track of previous clicks and new clicks
    setClick((prev) => [...prev, { id: Date.now(), x, y }]);

    //used a conditional statement to set the energy
    //to prevent the energy from displaying negative values
    // setEnergy(energy - energySubtrated < 0 ? 0 : energy - energySubtrated);

    setEnergy((prevEnergy) => {
      const newEnergy = prevEnergy - energySubtrated;
      return Math.max(newEnergy, 0);
    });

    try {
      const data = await updatePoints(userData.telegramId);

      if (data.success) {
        setPoints(data.points);
      }
    } catch (error) {
      setError("An error occurred while increasing points" + error);
    }
  };

  const handleAnimationEnd = (id: number) => {
    setClick((prev) => prev.filter((click) => click.id !== id));
    navigator.vibrate(0);
  };

  // useEffect(() => {
  //   const lastLogin = localStorage.getItem("lastLogin");
  //   const currentDate = new Date();
  //   const modalShownToday = localStorage.getItem("modalShownToday") === "true";
  //   let streakData = JSON.parse(localStorage.getItem("completedDays") || "[]");

  //   if (lastLogin) {
  //     const lastLoginDate = new Date(lastLogin);
  //     const differenceInDays = Math.floor(
  //       (currentDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
  //     );

  //     if (differenceInDays === 1) {
  //       // User logged in on consecutive day
  //       const newStreak = (dailyStreak % 7) + 1;
  //       setDailyStreak(newStreak);
  //     } else if (differenceInDays > 1) {
  //       // User missed a day, reset streak
  //       setDailyStreak(1);
  //       streakData = [1];
  //     }
  //   } else {
  //     // First-time login
  //     setDailyStreak(1);
  //     streakData = [1];
  //   }

  //   if (!streakData.includes(dailyStreak)) {
  //     streakData.push(dailyStreak);
  //   }

  //   // Save current login date
  //   setCompletedDays(streakData);
  //   localStorage.setItem("lastLogin", currentDate.toISOString());

  //   // Open modal only if it hasn't been shown today
  //   if (!modalShownToday) {
  //     handleOpenDailyLoginModal();
  //     localStorage.setItem("modalShownToday", "true");
  //   }

  //   // Reset "modalShownToday" at midnight
  //   const tomorrow = new Date(currentDate);
  //   tomorrow.setDate(tomorrow.getDate() + 1);
  //   tomorrow.setHours(0, 0, 0, 0);
  //   const timeUntilMidnight = tomorrow.getTime() - currentDate.getTime();

  //   const midnightTimeout = setTimeout(() => {
  //     localStorage.removeItem("modalShownToday");
  //   }, timeUntilMidnight);

  //   return () => clearTimeout(midnightTimeout);
  // }, []);

  // const handleOpenDailyLoginModal = () => {
  //   if (dailyLoginRef.current) {
  //     dailyLoginRef.current.showModal();
  //   }
  // };

  const handleClaimReward = () => {
    const currentReward = rewards[dailyStreak - 1] || rewards[rewards.length - 1];

    setPoints((prevPoints) => prevPoints + currentReward);

    dailyLoginRef.current?.close();

    setisStreakClaimed(true);
  };

  console.log({ click, energy, points });

  return (
    <main className="flex flex-col justify-between h-screen ">
      <div className="mx-6 mt-6">
        <header>
          {userData ? (
            <div className="footerbg !rounded-full p-[2px] text-white flex flex-row gap-1 items-center mb-4 w-fit text-xs">
              <span className="w-6 h-6 bg-white rounded-full"></span>
              <p className="px-2">{userData?.username || userData?.firstname}</p>
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
          <button className="tickgroup entryanime grid grid-rows-subgrid p-2 rounded-xl row-span-2 text-xs justify-center bg-[#262626] text-white items-center">
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
