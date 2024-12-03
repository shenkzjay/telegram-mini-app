import { prisma } from "@/app/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { telegramId } = await req.json();

    if (!telegramId) {
      return NextResponse.json({ error: "Invalid TelegramId" }, { status: 400 });
    }

    const updatedUsersPoint = await prisma.user.update({
      where: { telegramId },
      data: { point: { increment: 10 } },
    });

    return NextResponse.json({ success: true, points: updatedUsersPoint });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
