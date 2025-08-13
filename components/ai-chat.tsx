"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User } from "lucide-react"

interface AIChatProps {
  selectedClass: string
  selectedSubject: string | null
}

export default function AIChat({ selectedClass, selectedSubject }: AIChatProps) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant" as const,
      content: selectedSubject
        ? `Hello! I'm your AI tutor for Class ${selectedClass} ${selectedSubject ? selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1) : ""}. I'm here to help you understand concepts, solve problems, and answer any questions you have about your Samacheer Kalvi curriculum. What would you like to learn today?`
        : `Hello! I'm your AI tutor for Class ${selectedClass}. Please select a subject first to get personalized help with your Samacheer Kalvi curriculum.`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !selectedSubject || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          subject: selectedSubject,
          class: selectedClass,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: data.message || "I'm here to help! Could you please rephrase your question?",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQuestions = [
    "Explain this topic in simple terms",
    "Give me practice problems",
    "What are the key points to remember?",
    "How is this used in real life?",
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-900/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">AI Tutor</h2>
            <p className="text-sm text-gray-400">
              Class {selectedClass}{" "}
              {selectedSubject && `• ${selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}`}
            </p>
          </div>
          <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
            Online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="bg-blue-600 p-2 rounded-full">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}

            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>

            {message.role === "user" && (
              <div className="bg-gray-600 p-2 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-800 text-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {selectedSubject && (
        <div className="p-4 border-t border-gray-700 bg-gray-900/30">
          <p className="text-sm text-gray-400 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-900/50">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={selectedSubject ? "Ask me anything about your subject..." : "Please select a subject first"}
            disabled={!selectedSubject || isLoading}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            disabled={!selectedSubject || isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
