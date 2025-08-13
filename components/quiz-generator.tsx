"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Clock,
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  ChevronRight,
  ChevronLeft,
  Award,
  TrendingUp,
  BookOpen,
  FileText,
} from "lucide-react"

interface QuizGeneratorProps {
  selectedClass: string
  selectedSubject: string | null
  selectedTopic: string | null
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

interface QuizResult {
  score: number
  totalQuestions: number
  timeSpent: number
  correctAnswers: number
  incorrectAnswers: number
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[]
}

export default function QuizGenerator({ selectedClass, selectedSubject, selectedTopic }: QuizGeneratorProps) {
  const [quizPhase, setQuizPhase] = useState<"setup" | "taking" | "results">("setup")
  const [selectedQuizSubject, setSelectedQuizSubject] = useState(selectedSubject || "")
  const [selectedQuizTopic, setSelectedQuizTopic] = useState(selectedTopic || "")
  const [difficulty, setDifficulty] = useState("medium")
  const [questionCount, setQuestionCount] = useState("10")
  const [timeLimit, setTimeLimit] = useState("15")

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const subjects = [
    { id: "history", name: "History" },
    { id: "geography", name: "Geography" },
    { id: "civics", name: "Civics" },
    { id: "economics", name: "Economics" },
  ]

  const topics = {
    history: [
      "Outbreak of World War I and Its Aftermath",
      "The World between two World Wars",
      "World War II",
      "The World after World War II",
      "Social and Religious Reform Movements in the 19th Century",
      "Early Revolts against British Rule in Tamil Nadu",
      "Anti-Colonial Movements and the Birth of Nationalism",
      "Nationalism: Gandhian Phase",
      "Freedom Struggle in Tamil Nadu",
      "Social Transformation in Tamil Nadu",
    ],
    geography: [
      "India - Location, Relief and Drainage",
      "Climate and Natural Vegetation of India",
      "Agriculture",
      "Water Resources",
      "Mineral and Power Resources",
      "Manufacturing Industries",
      "Tamil Nadu - An Introduction",
    ],
    civics: [
      "Indian Constitution",
      "Central Government",
      "State Government",
      "Local Self Government",
      "India's Foreign Policy",
    ],
    economics: [
      "Development and Its Measurement",
      "Globalization and Trade",
      "Food Security",
      "Employment",
      "Economic Planning in India",
    ],
  }

  const sampleQuestions: Question[] = [
    {
      id: "hist_1",
      question: "What was the immediate cause of World War I?",
      options: [
        "Assassination of Archduke Franz Ferdinand",
        "German invasion of Belgium",
        "Sinking of Lusitania",
        "Russian Revolution",
      ],
      correctAnswer: 0,
      explanation:
        "The assassination of Archduke Franz Ferdinand of Austria-Hungary by a Serbian nationalist in Sarajevo on June 28, 1914, was the immediate trigger that led to World War I.",
      difficulty: "medium",
      topic: "Outbreak of World War I and Its Aftermath",
    },
    {
      id: "hist_2",
      question: "Which treaty ended World War I?",
      options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Vienna", "Treaty of Berlin"],
      correctAnswer: 0,
      explanation:
        "The Treaty of Versailles, signed on June 28, 1919, officially ended World War I between Germany and the Allied Powers.",
      difficulty: "easy",
      topic: "Outbreak of World War I and Its Aftermath",
    },
    {
      id: "hist_3",
      question: "Who founded the Brahmo Samaj?",
      options: ["Dayananda Saraswati", "Raja Ram Mohan Roy", "Keshab Chandra Sen", "Ishwar Chandra Vidyasagar"],
      correctAnswer: 1,
      explanation:
        "Raja Ram Mohan Roy founded the Brahmo Samaj in 1828 as a socio-religious reform movement in Bengal.",
      difficulty: "medium",
      topic: "Social and Religious Reform Movements in the 19th Century",
    },
    {
      id: "geo_1",
      question: "Which river is known as the 'Sorrow of Bengal'?",
      options: ["Ganga", "Brahmaputra", "Damodar", "Hooghly"],
      correctAnswer: 2,
      explanation:
        "The Damodar River was known as the 'Sorrow of Bengal' due to its frequent floods that caused widespread destruction.",
      difficulty: "medium",
      topic: "India - Location, Relief and Drainage",
    },
    {
      id: "geo_2",
      question: "What type of climate does most of India experience?",
      options: ["Tropical monsoon", "Mediterranean", "Continental", "Desert"],
      correctAnswer: 0,
      explanation:
        "Most of India experiences a tropical monsoon climate characterized by seasonal winds, moderate to high temperatures, and distinct wet and dry seasons.",
      difficulty: "easy",
      topic: "Climate and Natural Vegetation of India",
    },
    {
      id: "civ_1",
      question: "How many fundamental rights are guaranteed by the Indian Constitution?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation:
        "The Indian Constitution guarantees 6 fundamental rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
      difficulty: "medium",
      topic: "Indian Constitution",
    },
    {
      id: "civ_2",
      question: "Who is the head of the Central Government in India?",
      options: ["President", "Prime Minister", "Chief Justice", "Speaker of Lok Sabha"],
      correctAnswer: 1,
      explanation:
        "The Prime Minister is the head of the Central Government in India and leads the Council of Ministers.",
      difficulty: "easy",
      topic: "Central Government",
    },
    {
      id: "eco_1",
      question: "What does GDP stand for?",
      options: [
        "Gross Domestic Product",
        "General Development Program",
        "Global Development Policy",
        "Government Development Plan",
      ],
      correctAnswer: 0,
      explanation:
        "GDP stands for Gross Domestic Product, which measures the total value of all goods and services produced within a country's borders in a specific time period.",
      difficulty: "easy",
      topic: "Development and Its Measurement",
    },
    {
      id: "eco_2",
      question: "Which organization regulates international trade?",
      options: ["IMF", "World Bank", "WTO", "UN"],
      correctAnswer: 2,
      explanation:
        "The World Trade Organization (WTO) is the international organization that regulates and facilitates international trade between nations.",
      difficulty: "medium",
      topic: "Globalization and Trade",
    },
    {
      id: "eco_3",
      question: "What is the full form of MGNREGA?",
      options: [
        "Mahatma Gandhi National Rural Employment Guarantee Act",
        "Mahatma Gandhi National Rural Education Guarantee Act",
        "Mahatma Gandhi National Resource Employment Guarantee Act",
        "Mahatma Gandhi National Rural Empowerment Guarantee Act",
      ],
      correctAnswer: 0,
      explanation:
        "MGNREGA stands for Mahatma Gandhi National Rural Employment Guarantee Act, which guarantees 100 days of employment to rural households.",
      difficulty: "hard",
      topic: "Employment",
    },
  ]

  // Timer effect
  useEffect(() => {
    if (quizPhase === "taking" && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (quizPhase === "taking" && timeRemaining === 0) {
      handleSubmitQuiz()
    }
  }, [quizPhase, timeRemaining])

  const generateQuiz = () => {
    let filteredQuestions = sampleQuestions

    if (selectedQuizSubject && selectedQuizSubject !== "all") {
      filteredQuestions = filteredQuestions.filter(
        (q) =>
          q.topic.toLowerCase().includes(selectedQuizSubject.toLowerCase()) ||
          q.id.startsWith(selectedQuizSubject.substring(0, 3)),
      )
    }

    if (selectedQuizTopic && selectedQuizTopic !== "all") {
      filteredQuestions = filteredQuestions.filter((q) => q.topic === selectedQuizTopic)
    }

    if (difficulty !== "all") {
      filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty)
    }

    // Shuffle and select questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffled.slice(0, Number.parseInt(questionCount))

    setQuestions(selectedQuestions)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTimeRemaining(Number.parseInt(timeLimit) * 60) // Convert minutes to seconds
    setQuizPhase("taking")
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleSubmitQuiz = () => {
    const startTime = Number.parseInt(timeLimit) * 60
    const timeSpent = startTime - timeRemaining

    let correctCount = 0
    const answers = questions.map((question) => {
      const selectedAnswer = selectedAnswers[question.id] ?? -1
      const isCorrect = selectedAnswer === question.correctAnswer
      if (isCorrect) correctCount++

      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect,
      }
    })

    const result: QuizResult = {
      score: Math.round((correctCount / questions.length) * 100),
      totalQuestions: questions.length,
      timeSpent,
      correctAnswers: correctCount,
      incorrectAnswers: questions.length - correctCount,
      answers,
    }

    setQuizResult(result)
    setQuizPhase("results")
  }

  const resetQuiz = () => {
    setQuizPhase("setup")
    setQuestions([])
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTimeRemaining(0)
    setQuizResult(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (quizPhase === "setup") {
    return (
      <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Generator</h1>
            <p className="text-gray-400">Test your knowledge with AI-generated questions</p>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="w-6 h-6 mr-2 text-blue-400" />
                Quiz Setup
              </CardTitle>
              <CardDescription className="text-gray-400">Configure your quiz settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Subject</label>
                  <Select value={selectedQuizSubject} onValueChange={setSelectedQuizSubject}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Topic</label>
                  <Select value={selectedQuizTopic} onValueChange={setSelectedQuizTopic}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Topics</SelectItem>
                      {selectedQuizSubject &&
                        selectedQuizSubject !== "all" &&
                        topics[selectedQuizSubject as keyof typeof topics]?.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Difficulty</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Number of Questions</label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Time Limit</label>
                  <Select value={timeLimit} onValueChange={setTimeLimit}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="5">5 Minutes</SelectItem>
                      <SelectItem value="10">10 Minutes</SelectItem>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="20">20 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={generateQuiz}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-2"
                  disabled={!selectedQuizSubject}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">Practice Mode</p>
                <p className="text-sm text-gray-400">Learn from explanations</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">Timed Quiz</p>
                <p className="text-sm text-gray-400">Challenge yourself</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">Track Progress</p>
                <p className="text-sm text-gray-400">Monitor improvement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (quizPhase === "taking") {
    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quiz Header */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`${
                      currentQuestion.difficulty === "easy"
                        ? "bg-green-600"
                        : currentQuestion.difficulty === "medium"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    } text-white`}
                  >
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span className={`font-mono ${timeRemaining < 60 ? "text-red-400" : "text-white"}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
              <CardDescription className="text-gray-400">Topic: {currentQuestion.topic}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full text-left justify-start p-4 h-auto border-gray-600 hover:bg-gray-700 ${
                    selectedAnswers[currentQuestion.id] === index
                      ? "bg-blue-600/20 border-blue-600 text-blue-400"
                      : "bg-gray-700/50 text-gray-300"
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`w-8 h-8 p-0 ${
                    index === currentQuestionIndex
                      ? "bg-blue-600 border-blue-600 text-white"
                      : selectedAnswers[questions[index].id] !== undefined
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-600 text-gray-400"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                className="bg-green-600 hover:bg-green-700"
                disabled={Object.keys(selectedAnswers).length === 0}
              >
                Submit Quiz
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (quizPhase === "results" && quizResult) {
    return (
      <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Results Header */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
            <CardContent className="p-8 text-center text-white">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
              <p className="text-blue-100 mb-6">Here's how you performed</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{quizResult.score}%</p>
                  <p className="text-sm text-blue-100">Overall Score</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{quizResult.correctAnswers}</p>
                  <p className="text-sm text-blue-100">Correct Answers</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{quizResult.incorrectAnswers}</p>
                  <p className="text-sm text-blue-100">Incorrect Answers</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{formatTime(quizResult.timeSpent)}</p>
                  <p className="text-sm text-blue-100">Time Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Accuracy</span>
                      <span className="text-white">{quizResult.score}%</span>
                    </div>
                    <Progress value={quizResult.score} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Grade</p>
                    <Badge
                      className={`${
                        quizResult.score >= 90
                          ? "bg-green-600"
                          : quizResult.score >= 80
                            ? "bg-blue-600"
                            : quizResult.score >= 70
                              ? "bg-yellow-600"
                              : quizResult.score >= 60
                                ? "bg-orange-600"
                                : "bg-red-600"
                      } text-white`}
                    >
                      {quizResult.score >= 90
                        ? "Excellent (A+)"
                        : quizResult.score >= 80
                          ? "Very Good (A)"
                          : quizResult.score >= 70
                            ? "Good (B)"
                            : quizResult.score >= 60
                              ? "Average (C)"
                              : "Needs Improvement (D)"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizResult.score >= 80 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">Strong conceptual understanding</span>
                    </div>
                  )}
                  {quizResult.timeSpent < Number.parseInt(timeLimit) * 60 * 0.8 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">Good time management</span>
                    </div>
                  )}
                  {quizResult.correctAnswers > quizResult.incorrectAnswers && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">Consistent performance across topics</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizResult.score < 70 && <div className="text-sm text-gray-300">• Review fundamental concepts</div>}
                  {quizResult.incorrectAnswers > 0 && (
                    <div className="text-sm text-gray-300">• Focus on incorrect topics below</div>
                  )}
                  <div className="text-sm text-gray-300">• Practice more questions</div>
                  <div className="text-sm text-gray-300">• Use AI tutor for clarifications</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Detailed Results</CardTitle>
              <CardDescription className="text-gray-400">Review your answers and explanations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = quizResult.answers.find((a) => a.questionId === question.id)
                  const isCorrect = userAnswer?.isCorrect || false

                  return (
                    <div key={question.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                            Q{index + 1}
                          </Badge>
                          <Badge className={isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                            {isCorrect ? "Correct" : "Incorrect"}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`${
                              question.difficulty === "easy"
                                ? "bg-green-600"
                                : question.difficulty === "medium"
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                            } text-white`}
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="text-white font-medium mb-3">{question.question}</h3>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-600/20 border-green-600 text-green-400"
                                : userAnswer?.selectedAnswer === optionIndex && !isCorrect
                                  ? "bg-red-600/20 border-red-600 text-red-400"
                                  : "bg-gray-700/50 border-gray-600 text-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                              {userAnswer?.selectedAnswer === optionIndex && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-400" />
                              )}
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-300 mb-1">Explanation:</p>
                        <p className="text-sm text-gray-400">{question.explanation}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Quiz
            </Button>
            <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Save Results
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
