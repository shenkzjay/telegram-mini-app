"use client";

import { useEffect, useState } from "react";
// import WebApp from "@twa-dev/sdk";
import { ReferralSystem } from "../components/pages/friends";
import { UserData } from "../components/pages/earn";

export default function Friends() {
  const [initData, setInitData] = useState("");
  const [startParams, setStartParams] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setStartParams(WebApp.initDataUnsafe.start_param || "");
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || "");
        setUserData(WebApp.initDataUnsafe.user as UserData);
      }
    };

    initWebApp();
  }, []);
  return (
    <main className="bg-[#1a1a1a] flex flex-col h-screen w-full justify-between">
      <h2 className="text-slate-400 font-bold mx-6 pt-6">{userData?.username ?? "Shenkz-coin"}</h2>

      <ReferralSystem initData={initData} startParams={startParams} userId={userId} />
    </main>
  );
}
