"use client";

import { useEffect, useState } from "react";

import WebApp from "@twa-dev/sdk";
import { FooterNavbar } from "../footer/footer";

interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParams: string;
}

export function ReferralSystem({ userId, startParams }: ReferralSystemProps) {
  const [referrals, setReferrals] = useState<string[]>([]);

  const [initWebAppData, setInitWebAppData] = useState<typeof WebApp | null>(null);

  const [referredBy, setReferredBy] = useState<string | null>(null);

  useEffect(() => {}, []);

  const INVITE_URL = "http://t.me/shenkzbot/sokcoin";

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitWebAppData(WebApp);
      }
    };

    const checkReferral = async () => {
      if (startParams && userId) {
        try {
          const response = await fetch("http://localhost:3003/referrals", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ userId, referralId: startParams }),
          });

          if (!response.ok) {
            throw new Error("Failed to save referrals");
          }
        } catch (error) {
          console.error("Error saving referrals:" + error);
        }
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3003/referrals?userId=${userId}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch referrals");
          }

          const data = await response.json();

          console.log({ data });

          setReferrals(data.referrals);
          setReferredBy(data.referredBy);
        } catch (error) {
          console.error("Error fetching referrals" + error);
        }
      }
    };
    initWebApp();
    checkReferral();
    fetchReferrals();
  }, [userId, startParams]);

  const handleInviteFriend = () => {
    const inviteLink = `${INVITE_URL}?startpp=${userId}`;
    const shareText = `Join me on the awesome telegram mini app`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(shareText)}`;

    try {
      const utils = initWebAppData;
      if (utils && utils?.openTelegramLink) {
        utils?.openTelegramLink(fullUrl);
      } else {
        // Fallback to opening the link directly
        window.open(fullUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing invite link:", error);
      alert("Unable to share the link. Please try copying it manually.");
    }
  };

  const handleCopyLink = () => {
    const invitelink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(invitelink);
    alert("invite link copied to clipboard");
  };

  return (
    <section className="flex flex-col h-screen w-full justify-between">
      <div className="mx-6">
        <div className="flex flex-col gap-6 text-slate-400">
          {referredBy && <h3>You were referred by {referredBy}</h3>}
          <div className="flex flex-col gap-6 mt-6">
            <button onClick={handleInviteFriend} className="bg-[#262626] py-2 px-4 rounded-xl">
              Invite Friend
            </button>
            <button onClick={handleCopyLink} className="bg-[#262626] py-2 px-4 rounded-xl">
              📋 Copy invite link
            </button>
          </div>
        </div>

        {referrals.length > 0 && (
          <div className="mt-12">
            <h2 className="text-slate-400">Your referrals</h2>
            <ul>
              {referrals.map((referral, index) => (
                <li key={index} className="bg-[#333] text-slate-400 p-2 mb-2 rounded">
                  user {referral}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <FooterNavbar />
    </section>
  );
}
