"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, Zap, GraduationCap } from "lucide-react"
import ClassSelection from "@/components/class-selection"
import Dashboard from "@/components/dashboard"
import UserProfile from "@/components/user-profile"

export default function HomePage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const user = localStorage.getItem("user")

      if (!authStatus) {
        router.push("/login")
      } else if (user) {
        const userData = JSON.parse(user)
        const userClass = Number.parseInt(userData.class)

        // Only allow Class 10
        if (userClass !== 10) {
          alert("This platform is currently available only for Class 10 SSLC students.")
          localStorage.removeItem("user")
          localStorage.removeItem("isAuthenticated")
          router.push("/login")
          return
        }

        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (selectedClass) {
    return <Dashboard selectedClass={selectedClass} onBack={() => setSelectedClass(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">InsightsLM</h1>
                <p className="text-sm text-gray-400">Class 10 SSLC • Tamil Nadu State Board</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserProfile onLogout={handleLogout} />
              <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                2024-25 Syllabus
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Master Class 10 SSLC with AI</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive AI-powered learning platform for Tamil Nadu State Board Class 10 SSLC. Get personalized study
            assistance with official textbooks, generate practice quizzes, and ace your board exams.
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
              Official TN Textbooks
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
              SSLC Exam Ready
            </Badge>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-600/30">
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader>
              <Brain className="h-8 w-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">AI Study Assistant</CardTitle>
              <CardDescription className="text-gray-400">
                Interactive AI tutor trained on official Samacheer Kalvi textbooks for all 5 SSLC subjects
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader>
              <Zap className="h-8 w-8 text-green-400 mb-2" />
              <CardTitle className="text-white">SSLC Practice Quizzes</CardTitle>
              <CardDescription className="text-gray-400">
                AI-generated practice questions based on your Class 10 syllabus and past exam patterns
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader>
              <FileText className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Official Textbooks</CardTitle>
              <CardDescription className="text-gray-400">
                Access official TN Board textbooks (2024-25) with interactive PDF viewer and search
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Class Selection */}
        <ClassSelection onClassSelect={setSelectedClass} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 InsightsLM. Built for Tamil Nadu Class 10 SSLC students.</p>
            <p className="text-sm mt-1">Official textbooks sourced from tntextbooks.in</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
