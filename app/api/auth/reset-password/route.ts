import { authService } from "@/lib/auth-service"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email, token, newPassword } = await req.json()

    if (email && !token && !newPassword) {
      // Request password reset
      const result = await authService.requestPasswordReset(email)
      return Response.json(result)
    } else if (token && newPassword) {
      // Reset password with token
      const result = await authService.resetPassword(token, newPassword)

      if (!result.success) {
        return Response.json(result, { status: 400 })
      }

      return Response.json(result)
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid request parameters",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Password reset error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
