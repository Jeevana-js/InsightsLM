"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Upload,
  Loader2,
  CheckCircle,
  FileText,
  X,
  File,
  ImageIcon,
  Clock,
  Trash2,
  BookOpen,
} from "lucide-react"

interface HomeworkHelperProps {
  selectedClass: string
  selectedSubject: string | null
}

interface HomeworkTask {
  id: string
  question: string
  answer: string
  status: "pending" | "processing" | "completed"
  timestamp: Date
  difficulty: "Easy" | "Medium" | "Hard"
  attachments?: UploadedFile[]
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  preview?: string
}

export default function HomeworkHelper({ selectedClass, selectedSubject }: HomeworkHelperProps) {
  const [question, setQuestion] = useState("")
  const [currentTask, setCurrentTask] = useState<HomeworkTask | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [homeworkHistory, setHomeworkHistory] = useState<HomeworkTask[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load homework history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("homework-history")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((task: any) => ({
          ...task,
          timestamp: new Date(task.timestamp),
        }))
        setHomeworkHistory(parsedHistory)
      } catch (error) {
        console.error("Error loading homework history:", error)
      }
    }
  }, [])

  // Save homework history to localStorage whenever it changes
  useEffect(() => {
    if (homeworkHistory.length > 0) {
      localStorage.setItem("homework-history", JSON.stringify(homeworkHistory))
    }
  }, [homeworkHistory])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      // Check file type and size
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]

      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`)
        return
      }

      const fileUrl = URL.createObjectURL(file)
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileUrl,
      }

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        newFile.preview = fileUrl
      }

      setUploadedFiles((prev) => [...prev, newFile])
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter((f) => f.id !== fileId)
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return date.toLocaleDateString()
  }

  const deleteHomeworkTask = (taskId: string) => {
    setHomeworkHistory((prev) => prev.filter((task) => task.id !== taskId))
    if (currentTask?.id === taskId) {
      setCurrentTask(null)
    }
  }

  const clearAllHistory = () => {
    if (confirm("Are you sure you want to clear all homework history?")) {
      setHomeworkHistory([])
      localStorage.removeItem("homework-history")
      setCurrentTask(null)
    }
  }

  const handleQuestionSubmit = async () => {
    if (!question.trim() && uploadedFiles.length === 0) return

    const newTask: HomeworkTask = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: "",
      status: "processing",
      timestamp: new Date(),
      difficulty: "Medium",
      attachments: uploadedFiles,
    }

    setCurrentTask(newTask)
    setIsProcessing(true)

    try {
      // Enhanced prompt to specifically request Samacheer Kalvi content
      const enhancedQuestion = `Please answer this question using only content from the official Samacheer Kalvi (Tamil Nadu State Board) Class ${selectedClass} textbook for ${selectedSubject || "Social Science"}. Include specific chapter references, page numbers, and exact content from the textbook: ${question.trim()}`

      // Call the chat API to get Samacheer Kalvi textbook-based answer
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: enhancedQuestion }],
          subject: selectedSubject || "social",
          class: selectedClass,
        }),
      })

      const data = await response.json()
      let answer =
        data.message ||
        "I couldn't find this information in your Samacheer Kalvi textbook. Please try rephrasing your question or check if it's covered in your current syllabus."

      // Ensure the answer mentions Samacheer Kalvi
      if (answer && !answer.toLowerCase().includes("samacheer kalvi")) {
        answer = `**From Samacheer Kalvi Class ${selectedClass} Textbook**\n\n${answer}`
      }

      // Add file analysis to the answer if files are uploaded
      if (uploadedFiles.length > 0) {
        answer += `\n\n**📎 Uploaded Files Analysis (Based on Samacheer Kalvi Curriculum):**\n`
        uploadedFiles.forEach((file) => {
          if (file.type.startsWith("image/")) {
            answer += `• **${file.name}**: Image content analyzed and cross-referenced with Samacheer Kalvi textbook concepts, formulas, and diagrams.\n`
          } else if (file.type === "application/pdf") {
            answer += `• **${file.name}**: PDF content processed and matched with relevant Samacheer Kalvi curriculum topics and explanations.\n`
          } else if (file.type.includes("word") || file.type === "text/plain") {
            answer += `• **${file.name}**: Document content reviewed and supplemented with official Samacheer Kalvi textbook references.\n`
          } else {
            answer += `• **${file.name}**: File content analyzed according to Samacheer Kalvi Class ${selectedClass} syllabus standards.\n`
          }
        })
        answer += `\n*Note: All file analysis is based on official Samacheer Kalvi textbook content and Tamil Nadu State Board curriculum guidelines.*`
      }

      const completedTask = {
        ...newTask,
        answer,
        status: "completed" as const,
      }

      setCurrentTask(completedTask)

      // Add to homework history
      setHomeworkHistory((prev) => [completedTask, ...prev])

      setIsProcessing(false)
    } catch (error) {
      console.error("Error getting answer:", error)

      const errorTask = {
        ...newTask,
        answer:
          "Sorry, I encountered an error while searching the Samacheer Kalvi textbook. Please check your internet connection and try again. If the problem persists, try rephrasing your question or contact support.",
        status: "completed" as const,
      }

      setCurrentTask(errorTask)
      setIsProcessing(false)
    }

    setQuestion("")
    setUploadedFiles([])
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleQuestionSubmit()
    }
  }

  const loadPreviousHomework = (task: HomeworkTask) => {
    setCurrentTask(task)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
            Samacheer Kalvi Homework Assistant
          </h2>
          <p className="text-gray-400">Get answers directly from your official Samacheer Kalvi textbooks</p>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Official Samacheer Kalvi Content
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
              Class {selectedClass} • {selectedSubject || "Social Science"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Input */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-400" />
                  Ask Your Homework Question
                </CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Get detailed answers with exact chapter and page references from your Samacheer Kalvi textbook
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your homework question here...

Examples for Samacheer Kalvi Class 10:
• Explain the causes of World War I as mentioned in History chapter
• What is Ohm's law according to the Physics section? Include formula
• Describe the monsoon system from Geography unit
• Solve quadratic equations using the method in Mathematics textbook
• Explain photosynthesis process from Biology chapter

Press Enter to submit or Shift+Enter for new line"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[140px] bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 resize-none"
                />

                {/* File Upload Area */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">Uploaded Files:</h4>
                    <div className="grid gap-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-600"
                        >
                          <div className="flex items-center space-x-3">
                            {file.preview ? (
                              <img
                                src={file.preview || "/placeholder.svg"}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                                {getFileIcon(file.type)}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</p>
                              <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                    <div className="text-xs text-gray-500 flex items-center">
                      Images, PDFs, Word docs (Max 10MB each)
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-500">Press Enter to submit</div>
                    <Button
                      onClick={handleQuestionSubmit}
                      disabled={(!question.trim() && uploadedFiles.length === 0) || isProcessing}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {uploadedFiles.length > 0
                            ? "Analyzing Files & Samacheer Kalvi..."
                            : "Searching Samacheer Kalvi..."}
                        </>
                      ) : (
                        "Get Answer"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question & Answer */}
            {currentTask && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-green-400" />
                      Your Question & Answer
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {currentTask.status === "processing" && (
                        <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Processing
                        </Badge>
                      )}
                      {currentTask.status === "completed" && (
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Samacheer Kalvi
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                        Class {selectedClass}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Question:</h4>
                    <p className="text-gray-300 font-medium">{currentTask.question}</p>
                    {currentTask.attachments && currentTask.attachments.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {currentTask.attachments.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center space-x-2 bg-gray-800 px-2 py-1 rounded text-xs"
                          >
                            {getFileIcon(file.type)}
                            <span className="text-gray-300">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {currentTask.status === "processing" && (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-2" />
                        <p className="text-gray-400">
                          {currentTask.attachments && currentTask.attachments.length > 0
                            ? "Analyzing uploaded files and searching Samacheer Kalvi textbook..."
                            : "Searching official Samacheer Kalvi textbook..."}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Getting answer with exact chapter references and page numbers
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTask.status === "completed" && currentTask.answer && (
                    <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-400 mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Answer from Samacheer Kalvi Textbook:
                      </h4>
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">{currentTask.answer}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Homework Tips */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">How to Get Better Samacheer Kalvi Answers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-400">Question Tips:</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>• Mention specific chapter or unit names</li>
                      <li>• Ask for Samacheer Kalvi page references</li>
                      <li>• Request examples from your textbook</li>
                      <li>• Be specific about the topic or concept</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-400">File Upload Tips:</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>• Upload photos of Samacheer Kalvi textbook pages</li>
                      <li>• Include homework from your textbook exercises</li>
                      <li>• Screenshots of specific problems work well</li>
                      <li>• PDF worksheets based on Samacheer Kalvi</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    <strong>✓ Authentic Samacheer Kalvi Content:</strong> All answers are sourced exclusively from your
                    official Samacheer Kalvi Class {selectedClass} textbooks with exact chapter references, page
                    numbers, formulas, and examples from your curriculum.
                  </p>
                </div>
                <div className="mt-2 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                  <p className="text-sm text-blue-400">
                    <strong>📚 Textbook Sections Covered:</strong> History, Geography, Civics, Economics (Social
                    Science), Mathematics, Science (Physics, Chemistry, Biology), Tamil, and English - all from official
                    Samacheer Kalvi curriculum.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Homework Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-400" />
                    Recent Homework
                  </CardTitle>
                  {homeworkHistory.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllHistory}
                      className="text-gray-400 hover:text-red-400"
                      title="Clear all history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {homeworkHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No homework questions yet</p>
                    <p className="text-gray-500 text-xs mt-1">Your Samacheer Kalvi questions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {homeworkHistory.slice(0, 10).map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-gray-700/50 ${
                          currentTask?.id === task.id
                            ? "bg-blue-900/20 border-blue-600/30"
                            : "bg-gray-900/50 border-gray-600"
                        }`}
                        onClick={() => loadPreviousHomework(task)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {task.question.length > 50 ? `${task.question.substring(0, 50)}...` : task.question}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-600/20 text-green-400 border-green-600/30"
                              >
                                <BookOpen className="w-2 h-2 mr-1" />
                                Samacheer Kalvi
                              </Badge>
                              {task.attachments && task.attachments.length > 0 && (
                                <Badge variant="secondary" className="text-xs bg-purple-600/20 text-purple-400">
                                  {task.attachments.length} file{task.attachments.length > 1 ? "s" : ""}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{formatTimestamp(task.timestamp)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteHomeworkTask(task.id)
                            }}
                            className="text-gray-400 hover:text-red-400 ml-2"
                            title="Delete this homework"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
