import { authService } from "@/lib/auth-service"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, class: userClass, school } = await req.json()

    if (!name || !email || !password || !userClass || !school) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      )
    }

    const result = await authService.register({
      name,
      email,
      password,
      class: userClass,
      school,
    })

    if (!result.success) {
      return Response.json(result, { status: 400 })
    }

    return Response.json(result, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
