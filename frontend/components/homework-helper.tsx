"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Upload, BookOpen, Clock, CheckCircle, FileText, ImageIcon, File } from "lucide-react"

interface HomeworkHelperProps {
  selectedClass: string
  selectedSubject: string | null
}

interface HomeworkItem {
  id: string
  question: string
  answer: string
  timestamp: Date
  subject: string
  files?: File[]
}

export default function HomeworkHelper({ selectedClass, selectedSubject }: HomeworkHelperProps) {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [recentHomework, setRecentHomework] = useState<HomeworkItem[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!question.trim() || !selectedSubject || isLoading) return

    setIsLoading(true)
    setCurrentAnswer("")

    try {
      // Enhanced prompt to specifically request Samacheer Kalvi content
      const enhancedQuestion = `Please answer this question using only content from the official Samacheer Kalvi Class ${selectedClass} ${selectedSubject} textbook. Include specific chapter references, page numbers, and exact content from the textbook: ${question}`

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a Samacheer Kalvi textbook expert. Answer questions using only official Samacheer Kalvi Class ${selectedClass} ${selectedSubject} textbook content. Always mention "Samacheer Kalvi" in your response and provide specific chapter and page references where possible.`,
            },
            {
              role: "user",
              content: enhancedQuestion,
            },
          ],
          subject: selectedSubject,
          class: selectedClass,
          textbook: "samacheer-kalvi",
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      const answer =
        data.message ||
        "I'm here to help with your Samacheer Kalvi textbook questions! Could you please rephrase your question?"

      setCurrentAnswer(answer)

      // Add to recent homework
      const newHomework: HomeworkItem = {
        id: Date.now().toString(),
        question,
        answer,
        timestamp: new Date(),
        subject: selectedSubject,
        files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      }

      setRecentHomework((prev) => [newHomework, ...prev.slice(0, 4)])
    } catch (error) {
      setCurrentAnswer(
        "I apologize, but I'm having trouble accessing the Samacheer Kalvi textbook content right now. Please try again later or check if your question relates to topics covered in the current Samacheer Kalvi syllabus.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setQuestion("")
    setCurrentAnswer("")
    setUploadedFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type === "application/pdf") return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const exampleQuestions = [
    "Explain the concept of democracy from Samacheer Kalvi Class 10 Civics Chapter 1",
    "What are the main features of Indian Constitution according to Samacheer Kalvi textbook?",
    "Describe the water cycle as explained in Samacheer Kalvi Geography textbook",
    "Solve this quadratic equation using the method from Samacheer Kalvi Mathematics Chapter 3",
    "Explain photosynthesis process from Samacheer Kalvi Biology textbook with diagram",
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="p-6 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Samacheer Kalvi Homework Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Class {selectedClass} {selectedSubject && `• ${selectedSubject}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400"
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Official Samacheer Kalvi Content
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="homework" className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="homework">Ask Question</TabsTrigger>
            <TabsTrigger value="recent">Recent Homework</TabsTrigger>
          </TabsList>

          <TabsContent value="homework" className="flex-1 overflow-auto p-6 space-y-6">
            {/* Question Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span>Ask Your Samacheer Kalvi Question</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    ref={textareaRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      selectedSubject
                        ? `Ask any question about your Class ${selectedClass} ${selectedSubject} Samacheer Kalvi textbook...

Examples:
• "Explain the concept from Chapter 2, Page 45"
• "What is the formula for... from the textbook?"
• "Describe the diagram on Page 67"
• "Give me practice problems from Chapter 5"`
                        : "Please select a subject first to get help with your Samacheer Kalvi homework"
                    }
                    disabled={!selectedSubject || isLoading}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                {/* File Upload Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload Files (Optional)
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="text-xs"
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Add Files
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            {getFileIcon(file)}
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearAll}
                    disabled={isLoading}
                    className="text-sm bg-transparent"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedSubject || isLoading || !question.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching Samacheer Kalvi Textbook...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Get Answer
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Answer Section */}
            {currentAnswer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Answer from Samacheer Kalvi Textbook</span>
                    <Badge variant="outline" className="ml-auto">
                      Class {selectedClass}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                      {currentAnswer}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1">
                        Authentic Samacheer Kalvi Content
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        All answers are sourced from official Samacheer Kalvi textbooks with page references and chapter
                        details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-1">Complete Subject Coverage</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        History, Geography, Civics, Economics, Mathematics, Science - all Samacheer Kalvi subjects
                        covered.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Example Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {exampleQuestions.slice(0, 3).map((example, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start h-auto p-3 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      onClick={() => setQuestion(example)}
                    >
                      <span className="truncate">{example}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Homework</h3>
                <Badge variant="outline">{recentHomework.length} questions</Badge>
              </div>

              {recentHomework.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No Recent Homework</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Your recent Samacheer Kalvi homework questions will appear here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {recentHomework.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              >
                                <BookOpen className="h-3 w-3 mr-1" />
                                Samacheer Kalvi
                              </Badge>
                              <Badge variant="outline">{item.subject}</Badge>
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{item.question}</h4>
                            <p className="text-xs text-gray-500">
                              {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {item.answer.length > 200 ? `${item.answer.substring(0, 200)}...` : item.answer}
                          </div>
                        </div>
                        {item.files && item.files.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-gray-500 mb-2">Attached files:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                >
                                  {getFileIcon(file)}
                                  <span>{file.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="mt-3 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setQuestion(item.question)
                              setCurrentAnswer(item.answer)
                            }}
                            className="text-xs"
                          >
                            View Full Answer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
