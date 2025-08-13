import { database } from "@/lib/database"

export async function POST(req: Request) {
  try {
    const { name, email, password, class: userClass, school } = await req.json()

    if (!name || !email || !password || !userClass || !school) {
      return Response.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await database.findUserByEmail(email)
    if (existingUser) {
      return Response.json({ success: false, message: "User with this email already exists" }, { status: 409 })
    }

    // Create initial progress based on class
    const subjects = database.getSubjectsForClass(userClass)
    const initialProgress: { [key: string]: number } = {}
    subjects.forEach((subject) => {
      initialProgress[subject] = 0
    })

    const newUser = await database.createUser({
      name,
      email,
      password,
      class: userClass,
      school,
      avatar: `/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`,
      progress: initialProgress,
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return Response.json({
      success: true,
      user: userWithoutPassword,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
