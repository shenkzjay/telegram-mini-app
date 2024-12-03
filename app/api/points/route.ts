import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { telegramId } = await req.json();

    console.log(telegramId);

    if (!telegramId) {
      return NextResponse.json({ error: "Invalid TelegramId" }, { status: 400 });
    }

    const updatedUsersPoint = await prisma.user.update({
      where: { telegramId },
      data: { point: { increment: 10 } },
    });

    console.log(updatedUsersPoint);

    return NextResponse.json({ success: true, points: updatedUsersPoint.point });
  } catch (error: unknown) {
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}
