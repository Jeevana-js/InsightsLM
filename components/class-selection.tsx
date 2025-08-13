"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap } from "lucide-react"

interface ClassSelectionProps {
  onClassSelect: (className: string) => void
}

export default function ClassSelection({ onClassSelect }: ClassSelectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Welcome to Class 10</h3>
        <p className="text-gray-400">Access your Samacheer Kalvi Class 10 curriculum with AI-powered learning</p>
      </div>

      <div className="flex justify-center">
        <Card
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-200 hover:scale-105 cursor-pointer group max-w-sm"
          onClick={() => onClassSelect("10")}
        >
          <CardHeader className="pb-3 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-white text-2xl">Class 10</CardTitle>
            <p className="text-gray-400 text-sm">SSLC - Secondary School Leaving Certificate</p>
          </CardHeader>
          <CardContent className="pt-0 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center text-gray-400 text-sm">
                <BookOpen className="h-4 w-4 mr-2" />5 Core Subjects
              </div>
              <div className="text-xs text-gray-500">Tamil • English • Mathematics • Science • Social Science</div>
              <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                <p className="text-blue-400 text-xs font-medium">✨ New 2024-25 Syllabus</p>
                <p className="text-gray-400 text-xs mt-1">Official TN Textbooks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <div className="mt-12 text-center">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800/30 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Official Textbooks</h4>
            <p className="text-gray-400 text-sm">
              Access official Samacheer Kalvi textbooks from tntextbooks.in for the 2024-25 academic year
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Board Exam Ready</h4>
            <p className="text-gray-400 text-sm">
              Comprehensive preparation for Tamil Nadu State Board SSLC examinations
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">AI-Powered Learning</h4>
            <p className="text-gray-400 text-sm">
              Interactive AI tutor trained on your exact curriculum and textbook content
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
