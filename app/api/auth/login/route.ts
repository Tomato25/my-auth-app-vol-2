import { loginSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { createToken, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();


    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        {
          error: "Incorrect credentials",
          details: z.treeifyError(parsed.error),
        },
        { status: 400 }
      );
    }

    const loginData = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: loginData.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });


    if (!existingUser) {
      return Response.json({ error: "Validation failed" }, { status: 400 });
    }

    const isPasswordValid = await verifyPassword(
      loginData.password,
      existingUser.password
    );

    if (isPasswordValid) {
      const token = await createToken({
        userId: existingUser.id,
        email: existingUser.email,
      });

      const { password, ...userWithoutPassword } = existingUser

      return Response.json(
        { user: userWithoutPassword, token: token },
        { status: 200 }
      );
    } else {
      return Response.json({ error: "Validation failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Login error:", error);

    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
