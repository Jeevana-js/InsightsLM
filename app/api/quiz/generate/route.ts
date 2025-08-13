import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, class: classLevel, count = 10, topic } = body

    // Validate required fields
    if (!subject || !classLevel) {
      return NextResponse.json({ error: "Subject and class are required" }, { status: 400 })
    }

    // Only allow Class 10
    if (classLevel !== "10") {
      return NextResponse.json({ error: "Only Class 10 is supported" }, { status: 400 })
    }

    // Get quiz questions from database
    const questions = await database.getQuizQuestions(subject, classLevel, count, topic)

    if (questions.length === 0) {
      return NextResponse.json({ error: "No questions found for the specified criteria" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      questions,
      metadata: {
        subject,
        class: classLevel,
        topic: topic || "All Topics",
        count: questions.length,
        timeLimit: questions.length * 60, // 1 minute per question
      },
    })
  } catch (error) {
    console.error("Error generating quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
