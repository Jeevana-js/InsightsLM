"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, BookOpen, FileText, ImageIcon, File, Search, BookMarked } from "lucide-react"

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

interface RelatedChapter {
  title: string
  page?: string
}

interface KeyConcept {
  concept: string
  page?: string
}

export default function HomeworkHelper({ selectedClass, selectedSubject }: HomeworkHelperProps) {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [recentHomework, setRecentHomework] = useState<HomeworkItem[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [relatedChapters, setRelatedChapters] = useState<string[]>([])
  const [keyConcepts, setKeyConcepts] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load recent homework from localStorage
  useEffect(() => {
    const savedHomework = localStorage.getItem("recentHomework")
    if (savedHomework) {
      try {
        const parsed = JSON.parse(savedHomework)
        // Convert string dates back to Date objects
        const homeworkWithDates = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
        setRecentHomework(homeworkWithDates)
      } catch (e) {
        console.error("Failed to parse saved homework", e)
      }
    }
  }, [])

  // Save recent homework to localStorage
  useEffect(() => {
    if (recentHomework.length > 0) {
      localStorage.setItem("recentHomework", JSON.stringify(recentHomework))
    }
  }, [recentHomework])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!question.trim() || !selectedSubject || isLoading) return

    setIsLoading(true)
    setCurrentAnswer("")
    setRelatedChapters([])
    setKeyConcepts([])

    try {
      // Enhanced prompt to specifically request Samacheer Kalvi textbook content in English only
      const enhancedQuestion = `Extract the answer from the official Samacheer Kalvi Class ${selectedClass} ${selectedSubject} textbook for this question: ${question}. Provide the exact content from the textbook with page references in English only.`

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are an advanced Samacheer Kalvi textbook content extractor. Extract and provide answers ONLY from the official Samacheer Kalvi Class ${selectedClass} ${selectedSubject} textbook. IMPORTANT REQUIREMENTS:
              1. Provide answers in ENGLISH ONLY - absolutely NO Tamil text
              2. Extract exact content from the textbook with page references
              3. Include specific chapter names and section references
              4. Use exact definitions, formulas, and explanations as written in the textbook
              5. Format your response with proper headings, bullet points, and paragraphs for readability`,
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

      if (!response.ok) throw new Error("Failed to get response from textbook")

      const data = await response.json()
      const answer = data.message || 
        "I couldn't find this specific content in the Samacheer Kalvi textbook. Please check the chapter or rephrase your question."
      
      // Store related chapters and key concepts if available
      if (data.related_chapters) setRelatedChapters(data.related_chapters)
      if (data.key_concepts) setKeyConcepts(data.key_concepts)

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
        "I'm having trouble accessing the Samacheer Kalvi textbook content right now. Please ensure your question relates to topics covered in the official textbook and try again.",
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
    setRelatedChapters([])
    setKeyConcepts([])
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
    "What is democracy according to the Samacheer Kalvi Civics textbook?",
    "Explain the physical features of India from Geography Chapter 1",
    "What are the causes of World War I mentioned in the History textbook?",
    "Define GDP and its calculation methods from Economics textbook",
    "Describe the Indian Constitution features from Civics Chapter 1",
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Samacheer Kalvi Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Official Textbook Content Extractor • Class {selectedClass} {selectedSubject && `• ${selectedSubject}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400"
            >
              <Search className="h-3 w-3 mr-1" />
              English Only
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
                  <BookMarked className="h-5 w-5 text-blue-600" />
                  <span>Extract Answer from Samacheer Kalvi Textbook</span>
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
                        ? `Ask any question from your Class ${selectedClass} ${selectedSubject} Samacheer Kalvi textbook...

Examples:
• "What is the definition of democracy from Chapter 1?"
• "Explain the water cycle from Geography textbook"
• "List the causes of World War I from History Chapter 1"
• "What is GDP? Explain its calculation methods"
• "Describe India's physical features from the textbook"`
                        : "Please select a subject first to extract content from the Samacheer Kalvi textbook"
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
                    onClick={handleSubmit
