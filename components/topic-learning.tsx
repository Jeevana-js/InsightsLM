"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle, FileText, Lightbulb, Target, ArrowRight, Eye } from "lucide-react"
import { textbookService } from "@/lib/textbook-service"
import type { LessonContent } from "@/lib/textbook-data"

interface TopicLearningProps {
  selectedClass: string
  selectedSubject: string | null
  selectedUnit: string | null
  selectedTopic: string | null
  onTopicSelect: (topic: string) => void
  onViewPDF: () => void
}

export default function TopicLearning({
  selectedClass,
  selectedSubject,
  selectedUnit,
  selectedTopic,
  onTopicSelect,
  onViewPDF,
}: TopicLearningProps) {
  const [lessons, setLessons] = useState<LessonContent[]>([])
  const [selectedLesson, setSelectedLesson] = useState<LessonContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({})
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    loadLessons()
    // Reset progress to 0% when subject or unit changes
    setProgress({})
  }, [selectedSubject, selectedUnit])

  useEffect(() => {
    if (selectedTopic && lessons.length > 0) {
      const lesson = lessons.find((l) => l.id === selectedTopic)
      if (lesson) {
        setSelectedLesson(lesson)
        setActiveTab("content")
      }
    }
  }, [selectedTopic, lessons])

  const loadLessons = async () => {
    if (!selectedSubject || !selectedUnit) return

    setLoading(true)
    try {
      const content = await textbookService.getTextbookContent(selectedSubject, selectedUnit)
      setLessons(content.lessons)
    } catch (error) {
      console.error("Error loading lessons:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLessonSelect = (lesson: LessonContent) => {
    setSelectedLesson(lesson)
    onTopicSelect(lesson.id)
    setActiveTab("content")
  }

  const markAsComplete = (lessonId: string) => {
    setProgress((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  const getCompletionPercentage = () => {
    if (lessons.length === 0) return 0
    const completed = Object.values(progress).filter(Boolean).length
    return Math.round((completed / lessons.length) * 100)
  }

  const getCompletedCount = () => {
    return Object.values(progress).filter(Boolean).length
  }

  if (!selectedSubject || !selectedUnit) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md">
          <CardHeader className="text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-white">Select a Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-center">
              Please select a unit from the Subjects tab to view lessons and start learning.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white font-medium">Loading lessons...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Unit Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">{selectedUnit}</h2>
          <p className="text-gray-400">
            {lessons.length} lessons • {getCompletedCount()} completed
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Progress</p>
            <p className="text-lg font-bold text-white">{getCompletionPercentage()}%</p>
          </div>
          <Button onClick={onViewPDF} className="bg-purple-600 hover:bg-purple-700">
            <FileText className="h-4 w-4 mr-2" />
            View Textbook
          </Button>
        </div>
      </div>

      <Progress value={getCompletionPercentage()} className="h-2" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Lessons Overview
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
            Lesson Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className={`bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer ${
                  progress[lesson.id] ? "border-green-500 bg-green-900/10" : ""
                }`}
                onClick={() => handleLessonSelect(lesson)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${
                          progress[lesson.id] ? "bg-green-600" : "bg-blue-600"
                        }`}
                      >
                        {progress[lesson.id] ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{lesson.title}</CardTitle>
                        <p className="text-sm text-gray-400">
                          {lesson.chapter} • {lesson.pageReference}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {progress[lesson.id] && (
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Completed</Badge>
                      )}
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">{lesson.summary}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                      {lesson.keyPoints.length} key points
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLessonSelect(lesson)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        {progress[lesson.id] ? "Review" : "Study"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewPDF()
                        }}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content">
          {selectedLesson ? (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white">{selectedLesson.title}</CardTitle>
                      <p className="text-gray-400 mt-1">
                        {selectedLesson.chapter} • {selectedLesson.pageReference}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => markAsComplete(selectedLesson.id)}
                        className={
                          progress[selectedLesson.id]
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }
                      >
                        {progress[selectedLesson.id] ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Target className="h-4 w-4 mr-2" />
                            Mark Complete
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={onViewPDF}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View in Textbook
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                      Lesson Content
                    </h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <p className="text-gray-300 leading-relaxed">{selectedLesson.content}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                      Key Points
                    </h3>
                    <div className="space-y-2">
                      {selectedLesson.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-gray-900/50 p-3 rounded-lg">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-300 flex-1">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-500" />
                      Summary
                    </h3>
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-green-100">{selectedLesson.summary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Select a Lesson</h3>
              <p className="text-gray-400 mb-4">Choose a lesson from the overview to start learning</p>
              <Button onClick={() => setActiveTab("overview")} className="bg-blue-600 hover:bg-blue-700">
                View Lessons
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
