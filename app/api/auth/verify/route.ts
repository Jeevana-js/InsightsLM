import { authService } from "@/lib/auth-service"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Verification token is required",
        },
        { status: 400 },
      )
    }

    const result = await authService.verifyEmail(token)

    if (!result.success) {
      return Response.json(result, { status: 400 })
    }

    return Response.json(result)
  } catch (error) {
    console.error("Email verification error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
