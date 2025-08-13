"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { School, Calendar, Trophy, Target, Clock, LogOut, Settings, Award } from "lucide-react"
import SettingsModal from "./settings-modal"

interface UserData {
  id: string
  name: string
  email: string
  class: string
  school: string
  avatar: string
  joinedDate: string
  progress: {
    [subject: string]: number
  }
}

interface UserProfileProps {
  onLogout: () => void
}

export default function UserProfile({ onLogout }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [])

  const handleSettingsUpdate = (updatedUser: UserData) => {
    setUserData(updatedUser)
  }

  const getUserData = () => {
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      const classNumber = Number.parseInt(userData.class)

      const subjects = [
        { name: "Tamil", progress: userData.progress.tamil || 0, color: "bg-red-500" },
        { name: "English", progress: userData.progress.english || 0, color: "bg-blue-500" },
        { name: "Mathematics", progress: userData.progress.mathematics || 0, color: "bg-green-500" },
      ]

      // Add subjects based on class
      if (classNumber <= 10) {
        subjects.push(
          { name: "Science", progress: userData.progress.science || 0, color: "bg-purple-500" },
          { name: "Social Science", progress: userData.progress.social || 0, color: "bg-orange-500" },
        )
      } else {
        subjects.push(
          { name: "Physics", progress: userData.progress.physics || 0, color: "bg-indigo-500" },
          { name: "Chemistry", progress: userData.progress.chemistry || 0, color: "bg-pink-500" },
          { name: "Biology", progress: userData.progress.biology || 0, color: "bg-emerald-500" },
        )
      }

      return { userData, subjects }
    }
    return { userData: null, subjects: [] }
  }

  const { userData: storedUserData, subjects } = getUserData()

  if (!storedUserData) return null

  const averageProgress = Math.round(
    Object.values(storedUserData.progress).reduce((sum, progress) => sum + progress, 0) /
      Object.values(storedUserData.progress).length,
  )

  const totalQuizzes = 45
  const completedQuizzes = Math.round((averageProgress / 100) * totalQuizzes)
  const studyStreak = 12

  const achievements = [
    { name: "First Quiz", description: "Completed your first quiz", earned: true },
    { name: "Study Streak", description: "7 days of continuous learning", earned: true },
    {
      name: "Math Master",
      description: "Scored 90+ in Mathematics",
      earned: storedUserData.progress.mathematics >= 90,
    },
    { name: "All Rounder", description: "70+ in all subjects", earned: averageProgress >= 70 },
  ]

  return (
    <>
      <div className="relative">
        {/* Profile Button */}
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800/50"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={storedUserData.avatar || "/placeholder.svg"} alt={storedUserData.name} />
            <AvatarFallback className="bg-blue-600 text-white">{storedUserData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block">{storedUserData.name}</span>
        </Button>

        {/* Profile Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 z-50">
            <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={storedUserData.avatar || "/placeholder.svg"} alt={storedUserData.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {storedUserData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg">{storedUserData.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{storedUserData.email}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <School className="h-4 w-4" />
                    <span>Class {storedUserData.class}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{studyStreak} day streak</span>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Overall Progress</span>
                    <span className="text-white font-medium">{averageProgress}%</span>
                  </div>
                  <Progress value={averageProgress} className="h-2" />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <Trophy className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                    <div className="text-white font-semibold">{achievements.filter((a) => a.earned).length}</div>
                    <div className="text-gray-400 text-xs">Achievements</div>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <Target className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <div className="text-white font-semibold">{completedQuizzes}</div>
                    <div className="text-gray-400 text-xs">Quizzes Done</div>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <div className="text-white font-semibold">24h</div>
                    <div className="text-gray-400 text-xs">Study Time</div>
                  </div>
                </div>

                {/* Subject Progress */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">Subject Progress</h4>
                  {subjects.slice(0, 3).map((subject) => (
                    <div key={subject.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{subject.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${subject.color}`}
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                        <span className="text-white font-medium w-8">{subject.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Achievements */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">Recent Achievements</h4>
                  <div className="space-y-1">
                    {achievements
                      .filter((a) => a.earned)
                      .slice(0, 2)
                      .map((achievement) => (
                        <div key={achievement.name} className="flex items-center space-x-2 text-sm">
                          <Award className="h-3 w-3 text-yellow-500" />
                          <span className="text-gray-300">{achievement.name}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2 border-t border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSettingsOpen(true)
                      setIsOpen(false)
                    }}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogout}
                    className="flex-1 border-red-600/50 text-red-400 hover:bg-red-600/20 bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Overlay */}
        {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onSave={handleSettingsUpdate} />
    </>
  )
}
