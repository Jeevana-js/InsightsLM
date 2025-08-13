import { authService } from "@/lib/auth-service"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { userId, subject, activityType, data } = await req.json()

    if (!userId || !subject || !activityType) {
      return Response.json(
        {
          success: false,
          message: "User ID, subject, and activity type are required",
        },
        { status: 400 },
      )
    }

    const result = await authService.updateProgress(userId, subject, activityType, data || {})

    if (!result.success) {
      return Response.json(result, { status: 400 })
    }

    return Response.json(result)
  } catch (error) {
    console.error("Progress update error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return Response.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 },
      )
    }

    const result = await authService.getUserProgress(userId)

    if (!result.success) {
      return Response.json(result, { status: 404 })
    }

    return Response.json(result)
  } catch (error) {
    console.error("Get progress error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
