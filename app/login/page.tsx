"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Mail, Lock, User, School, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    class: "10", // Default to Class 10
    school: "",
  })

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (data.success) {
        // Check if user is Class 10
        if (data.user.class !== "10") {
          alert("This platform is currently available only for Class 10 SSLC students.")
          return
        }

        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("isAuthenticated", "true")
        router.push("/")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          class: signupData.class,
          school: signupData.school,
        }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("isAuthenticated", "true")
        router.push("/")
      } else {
        alert(data.message || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 p-3 rounded-lg inline-block mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">InsightLM</h1>
          <p className="text-gray-400">AI-powered Class 10 SSLC preparation</p>
          <div className="flex justify-center space-x-2 mt-2">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
              Tamil Nadu State Board
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
              2024-25 Syllabus
            </Badge>
          </div>
        </div>

        {/* Login/Signup Tabs */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
              <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-white text-center">Welcome Back!</CardTitle>
                <p className="text-gray-400 text-center text-sm">Sign in to continue your SSLC preparation</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-blue-400 hover:text-blue-300 text-sm">
                      Forgot your password?
                    </Button>
                  </div>
                </form>

                {/* Demo Login */}
                <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-2">Demo Account (Class 10):</p>
                  <p className="text-gray-300 text-xs">Email: student@demo.com</p>
                  <p className="text-gray-300 text-xs">Password: demo123</p>
                  <Button
                    onClick={() => {
                      setLoginData({ email: "student@demo.com", password: "demo123" })
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-2 border-blue-600/50 text-blue-400 hover:bg-blue-600/20"
                  >
                    Use Demo Account
                  </Button>
                </div>
              </CardContent>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-white text-center">Join Class 10 SSLC!</CardTitle>
                <p className="text-gray-400 text-center text-sm">Create your account for SSLC preparation</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class" className="text-gray-300">
                        Class
                      </Label>
                      <Select
                        value={signupData.class}
                        onValueChange={(value) => setSignupData({ ...signupData, class: value })}
                      >
                        <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                          <SelectValue placeholder="Class 10" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="10" className="text-white hover:bg-gray-700">
                            Class 10 (SSLC)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school" className="text-gray-300">
                        School
                      </Label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="school"
                          type="text"
                          placeholder="School name"
                          value={signupData.school}
                          onChange={(e) => setSignupData({ ...signupData, school: e.target.value })}
                          className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-10 pr-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                {/* Class 10 Info */}
                <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-2">🎯 Class 10 SSLC Features:</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Official TN Board textbooks (2024-25)</li>
                    <li>• AI tutor for all 5 subjects</li>
                    <li>• SSLC exam preparation</li>
                    <li>• Interactive quizzes and practice</li>
                  </ul>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            By continuing, you agree to our{" "}
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto text-sm">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto text-sm">
              Privacy Policy
            </Button>
          </p>
          <p className="text-gray-500 text-xs mt-2">Currently supporting Class 10 SSLC students only</p>
        </div>
      </div>
    </div>
  )
}
