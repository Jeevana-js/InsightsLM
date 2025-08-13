"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Brain, FileText, PenTool, Zap } from "lucide-react"
import SubjectSelection from "@/components/subject-selection"
import AIChat from "@/components/ai-chat"
import QuizGenerator from "@/components/quiz-generator"
import PDFViewer from "@/components/pdf-viewer"
import HomeworkHelper from "@/components/homework-helper"
import TopicLearning from "@/components/topic-learning"

interface DashboardProps {
  selectedClass: string
  onBack: () => void
}

type ActiveTab = "subjects" | "chat" | "quiz" | "pdf" | "homework" | "topic-learning"

export default function Dashboard({ selectedClass, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("subjects")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [quizTopic, setQuizTopic] = useState<string | null>(null)

  const tabs = [
    { id: "subjects" as ActiveTab, name: "Subjects", icon: BookOpen },
    { id: "chat" as ActiveTab, name: "AI Tutor", icon: Brain },
    { id: "quiz" as ActiveTab, name: "Quizzes", icon: Zap },
    { id: "pdf" as ActiveTab, name: "Textbooks", icon: FileText },
    { id: "homework" as ActiveTab, name: "Homework", icon: PenTool },
  ]

  const handleTopicSelect = (subject: string, unit: string, topic: string) => {
    setSelectedSubject(subject)
    setSelectedUnit(unit)
    setSelectedTopic(topic)
    setActiveTab("topic-learning")
  }

  const handleStartQuiz = (topic: string) => {
    setQuizTopic(topic)
    setActiveTab("quiz")
  }

  const handleViewPDF = () => {
    setSelectedSubject("social")
    setActiveTab("pdf")
  }

  const handleBackToClasses = () => {
    setSelectedSubject(null)
    setSelectedUnit(null)
    setSelectedTopic(null)
    setQuizTopic(null)
    setActiveTab("subjects")
    onBack()
  }

  const handleBackToSubjects = () => {
    setSelectedUnit(null)
    setSelectedTopic(null)
    setActiveTab("subjects")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToClasses}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Classes
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Class {selectedClass} Dashboard</h1>
                <p className="text-sm text-gray-400">
                  {selectedSubject &&
                    selectedUnit &&
                    `${selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} - ${selectedUnit.charAt(0).toUpperCase() + selectedUnit.slice(1)} • `}
                  Samacheer Kalvi Curriculum
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 p-4 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === tab.id
                      ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {tab.name}
                </Button>
              )
            })}
          </nav>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "subjects" && (
            <div className="p-6">
              <SubjectSelection
                selectedClass={selectedClass}
                onBack={handleBackToClasses}
                onTopicSelect={handleTopicSelect}
                onViewPDF={handleViewPDF}
              />
            </div>
          )}
          {activeTab === "topic-learning" && selectedTopic && (
            <div className="p-6">
              <TopicLearning
                selectedClass={selectedClass}
                selectedSubject={selectedSubject}
                selectedUnit={selectedUnit}
                selectedTopic={selectedTopic}
                onTopicSelect={(topic) => setSelectedTopic(topic)}
                onViewPDF={handleViewPDF}
              />
            </div>
          )}
          {activeTab === "chat" && (
            <div className="h-full">
              <AIChat selectedClass={selectedClass} selectedSubject={selectedSubject} />
            </div>
          )}
          {activeTab === "quiz" && (
            <div className="h-full">
              <QuizGenerator
                selectedClass={selectedClass}
                selectedSubject={selectedSubject}
                selectedTopic={quizTopic}
              />
            </div>
          )}
          {activeTab === "pdf" && (
            <div className="h-full">
              <PDFViewer selectedClass={selectedClass} selectedSubject={selectedSubject} />
            </div>
          )}
          {activeTab === "homework" && (
            <div className="p-6">
              <HomeworkHelper selectedClass={selectedClass} selectedSubject={selectedSubject} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
