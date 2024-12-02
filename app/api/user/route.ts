import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const userData = await req.json();

    if (!userData || !userData.id) {
      return Response.json({ error: "Invalid user" });
    }

    let users = await prisma.user.findUnique({
      where: { telegramId: userData.id },
    });

    if (!users) {
      users = await prisma.user.create({
        data: {
          telegramId: userData.id,
          username: userData.username,
          firstname: userData.first_name,
          lastname: userData.last_name,
        },
      });
    }

    console.log(users);

    // return { user: users, status: 200 };

    return { users };
  } catch (error) {
    console.error("Error processing data" + error);
    return { error: "Internal server error" + error };
  }
}
