"use server";

import { prisma } from "../lib/prisma";
import { WebApp } from "@twa-dev/types";
import { unstable_cache } from "next/cache";
export function getUsers(userData: WebApp["initDataUnsafe"]) {
  return unstable_cache(
    async () => {
      try {
        if (!userData || !userData.user?.id) {
          return { error: "Invalid user" };
        }

        let users = await prisma.user.findUnique({
          where: { telegramId: userData.user.id },
        });

        if (!users) {
          users = await prisma.user.create({
            data: {
              telegramId: (userData?.user.id || null) as number,
              username: (userData?.user.username || null) as string,
              firstname: userData?.user.first_name || null,
              lastname: userData?.user.last_name || null,
            },
          });
        }

        console.log(users);

        return { users, status: 200 };
      } catch (error) {
        console.error("Error processing data" + error);
        return { error: "Internal server error", status: 500 };
      }
    },
    ["usersId", userData.user?.id.toString() as string],
    { tags: ["telegramUsers"], revalidate: 3600 }
  )();
}
