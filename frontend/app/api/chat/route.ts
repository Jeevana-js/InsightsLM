import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, subject, class: selectedClass, textbook } = body

    // Forward the request to the Python backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        subject,
        class: selectedClass,
        textbook: textbook || "samacheer-kalvi",
      }),
    })

    if (!backendResponse.ok) {
      throw new Error("Backend API request failed")
    }

    const data = await backendResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        message: "I'm having trouble accessing the Samacheer Kalvi textbook content right now. Please try again later.",
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
