import { createToken, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { redirect } from "next/navigation";
import z, { success } from 'zod'

export async function POST(request: Request) {
  try {
    //get body
    const body = await request.json();

    //validate against zod
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: z.treeifyError(parsed.error),
        },
        { status: 400 }
      );
    }

    const registerData = parsed.data;

    //check if user existst with prisma

    const existingUser = await prisma.user.findUnique({
      where: { email: registerData.email },
    });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(registerData.password);

    const createdUser = await prisma.user.create({
      data: {
        email: registerData.email,
        password: hashedPassword,
        name: registerData.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const token = await createToken({
      userId: createdUser.id,
      email: createdUser.email,
    });

    return Response.json(
      { user: createdUser, token: token, success:true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return Response.json(
                    { error: "User already exists" },
                    { status: 400 }
                )
            }
        }
        
      
        return Response.json(
            { error: "Registration failed" },
            { status: 500 }
        )
    }
}