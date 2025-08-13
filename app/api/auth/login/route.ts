import { database } from "@/lib/database"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return Response.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    const user = await database.validateUser(email, password)

    if (!user) {
      return Response.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return Response.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
