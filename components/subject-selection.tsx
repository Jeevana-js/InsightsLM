"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Clock, Target, FileText, ArrowRight, Brain, Zap } from "lucide-react"

interface SubjectSelectionProps {
  selectedClass: string
  onBack: () => void
  onTopicSelect: (subject: string, unit: string, topic: string) => void
  onViewPDF: () => void
}

export default function SubjectSelection({ selectedClass, onBack, onTopicSelect, onViewPDF }: SubjectSelectionProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  // Only Social Science for Class 10 as per Tamil Nadu curriculum
  const subjects = [
    {
      id: "social",
      name: "Social Science",
      description: "History, Geography, Civics, and Economics",
      color: "from-blue-500 to-purple-600",
      icon: "🌍",
      totalLessons: 27,
      estimatedHours: 45,
      difficulty: "Intermediate",
      units: [
        {
          id: "history",
          name: "History",
          description: "World Wars, Indian Independence, and Social Transformation",
          lessons: 10,
          topics: [
            "The World on the Eve of the First World War",
            "The First World War and Its Aftermath",
            "The World Between Two Wars",
            "The Second World War",
            "The World After World War II",
            "Social Transformation in Tamil Nadu",
            "Freedom Struggle in Tamil Nadu",
            "Nationalism in India",
            "The Making of Independent India",
            "India After Independence",
          ],
        },
        {
          id: "geography",
          name: "Geography",
          description: "India's Physical Features, Climate, and Resources",
          lessons: 7,
          topics: [
            "India - Location, Relief and Drainage",
            "Climate, Natural Vegetation, Wildlife and Soil",
            "Agriculture",
            "Water Resources",
            "Mineral and Power Resources",
            "Manufacturing Industries",
            "Tamil Nadu - An Introduction",
          ],
        },
        {
          id: "civics",
          name: "Civics",
          description: "Indian Constitution, Government, and Democracy",
          lessons: 5,
          topics: [
            "Indian Constitution",
            "Central Government",
            "State Government",
            "Local Self Government",
            "India's Foreign Policy",
          ],
        },
        {
          id: "economics",
          name: "Economics",
          description: "Development, Trade, Employment, and Planning",
          lessons: 5,
          topics: [
            "Development and Its Measurement",
            "Globalization and Trade",
            "Food Security",
            "Employment",
            "Economic Planning in India",
          ],
        },
      ],
    },
  ]

  const handleUnitSelect = (subject: string, unit: string, topicId: string) => {
    onTopicSelect(subject, unit, topicId)
  }

  if (selectedSubject) {
    const subject = subjects.find((s) => s.id === selectedSubject)
    if (!subject) return null

    return (
      <div className="space-y-6">
        {/* Subject Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setSelectedSubject(null)} className="text-gray-400 hover:text-white">
              ← Back to Subjects
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-2xl mr-3">{subject.icon}</span>
                {subject.name}
              </h2>
              <p className="text-gray-400">{subject.description}</p>
            </div>
          </div>
          <Button onClick={onViewPDF} className="bg-purple-600 hover:bg-purple-700">
            <FileText className="h-4 w-4 mr-2" />
            View Textbook
          </Button>
        </div>

        {/* Subject Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Total Lessons</p>
                  <p className="text-lg font-bold text-white">{subject.totalLessons}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Est. Hours</p>
                  <p className="text-lg font-bold text-white">{subject.estimatedHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-400">Difficulty</p>
                  <p className="text-lg font-bold text-white">{subject.difficulty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-400">Progress</p>
                  <p className="text-lg font-bold text-white">0%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subject.units.map((unit) => (
            <Card key={unit.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">{unit.name}</CardTitle>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                    {unit.lessons} lessons
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{unit.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={0} className="h-2" />
                <p className="text-sm text-gray-400">0% completed</p>

                {/* Topics List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {unit.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded bg-gray-900/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                      onClick={() => handleUnitSelect(subject.id, unit.id, `${unit.id}-${index + 1}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-300 text-sm">{topic}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => handleUnitSelect(subject.id, unit.id, `${unit.id}-1`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onViewPDF}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Class {selectedClass} Subjects</h2>
        <p className="text-gray-400">Select a subject to start your learning journey</p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedSubject(subject.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{subject.icon}</div>
                  <div>
                    <CardTitle className="text-white text-2xl">{subject.name}</CardTitle>
                    <p className="text-gray-400">{subject.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{subject.totalLessons}</p>
                  <p className="text-xs text-gray-400">Lessons</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{subject.estimatedHours}h</p>
                  <p className="text-xs text-gray-400">Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">0%</p>
                  <p className="text-xs text-gray-400">Progress</p>
                </div>
              </div>
              <Progress value={0} className="h-2 mb-4" />
              <div className="flex space-x-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Help
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  <Zap className="h-4 w-4 mr-2" />
                  Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
