import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json(
      { error: "Missing or invalid authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  const payload = await verifyToken(token);

  if (!payload) {
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  const userId = payload.userId;

  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!userData) {
        return Response.json(
            {error: "User not found"},
            {status: 404}
        )
    }

    return Response.json({ user: userData }, { status: 200 });

  } catch (error) {

    console.error("Database error", error)

    return Response.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
