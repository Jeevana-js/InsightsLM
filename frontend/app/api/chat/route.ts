import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, subject, class: selectedClass, textbook } = body

    // Get the backend URL from environment variable
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

    console.log(`Forwarding request to backend: ${backendUrl}/api/chat`)

    // Forward the request to the Python backend
    const backendResponse = await fetch(`${backendUrl}/api/chat`, {
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
      const errorText = await backendResponse.text()
      console.error("Backend API error:", errorText)
      throw new Error(`Backend API request failed: ${backendResponse.status}`)
    }

    const data = await backendResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        message:
          "I'm having trouble accessing the Samacheer Kalvi textbook content right now. This could be because:\n\n1. The backend service is not running\n2. Network connectivity issues\n3. The textbook content is being processed\n\nPlease try again in a moment or check if your question relates to topics covered in the official Samacheer Kalvi textbook.",
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
