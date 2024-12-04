"use server";

import { prisma } from "../lib/prisma";
import { revalidateTag } from "next/cache";

export async function updatePoints(telegramId: number) {
  try {
    console.log(telegramId);

    if (!telegramId) {
      return { error: "Invalid TelegramId", status: 400 };
    }

    const updatedUsersPoint = await prisma.user.update({
      where: { telegramId },
      data: { point: { increment: 10 } },
    });

    console.log(updatedUsersPoint);

    revalidateTag("points");

    return { success: true, points: updatedUsersPoint.point };
  } catch (error: unknown) {
    return { error: `Internal server error: ${error}`, status: 500 };
  }
}
