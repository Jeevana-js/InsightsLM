"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Save, User, School, GraduationCap, Mail } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: any) => void
}

export default function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    class: "",
    school: "",
    avatar: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const user = localStorage.getItem("user")
      if (user) {
        const parsedUser = JSON.parse(user)
        setUserData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          class: parsedUser.class || "",
          school: parsedUser.school || "",
          avatar: parsedUser.avatar || "",
        })
      }
    }
  }, [isOpen])

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Update localStorage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
      const updatedUser = { ...currentUser, ...userData }
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Call parent callback
      onSave(updatedUser)

      // Close modal
      onClose()
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const classes = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Class ${i + 1}`,
  }))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {userData.name.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
              Student Profile
            </Badge>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class" className="text-gray-300">
                Class
              </Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                <Select value={userData.class} onValueChange={(value) => setUserData({ ...userData, class: value })}>
                  <SelectTrigger className="pl-10 bg-gray-900/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {classes.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value} className="text-white hover:bg-gray-700">
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school" className="text-gray-300">
                School Name
              </Label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="school"
                  type="text"
                  value={userData.school}
                  onChange={(e) => setUserData({ ...userData, school: e.target.value })}
                  className="pl-10 bg-gray-900/50 border-gray-600 text-white"
                  placeholder="Enter your school name"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
