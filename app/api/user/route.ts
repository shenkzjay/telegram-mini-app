import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const userData = await req.json();

    if (!userData || !userData.id) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    let users = await prisma.user.findUnique({
      where: { telegramId: userData.id },
    });

    if (!users) {
      users = await prisma.user.create({
        data: {
          telegramId: userData.id || null,
          username: userData.username || null,
          firstname: userData.first_name || null,
          lastname: userData.last_name || null,
        },
      });
    }

    console.log({ users });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error processing data" + error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
