interface User {
  id: string
  name: string
  email: string
  class: string
  school: string
  avatar: string
  isVerified: boolean
  verificationToken?: string
  resetToken?: string
  resetTokenExpiry?: Date
  loginAttempts: number
  lockUntil?: Date
  createdAt: Date
  lastLogin?: Date
  streak: number
  lastStudyDate?: Date
  totalStudyTime: number // in minutes
  achievements: string[]
  progress: {
    [subject: string]: {
      percentage: number
      chaptersCompleted: number
      totalChapters: number
      quizzesCompleted: number
      totalQuizzes: number
      lastActivity?: Date
    }
  }
}

interface LoginAttempt {
  email: string
  timestamp: Date
  success: boolean
  ip?: string
}

interface StudySession {
  userId: string
  subject: string
  activity: "quiz" | "lesson" | "homework" | "chat"
  duration: number // in minutes
  score?: number
  timestamp: Date
}

class AuthService {
  private users: User[] = []
  private loginAttempts: LoginAttempt[] = []
  private studySessions: StudySession[] = []
  private readonly MAX_LOGIN_ATTEMPTS = 5
  private readonly LOCK_TIME = 30 * 60 * 1000 // 30 minutes

  // Class 10 SSLC subjects with their chapter counts
  private readonly CLASS_10_SUBJECTS = {
    tamil: { name: "Tamil", totalChapters: 10, totalQuizzes: 30 },
    english: { name: "English", totalChapters: 12, totalQuizzes: 36 },
    mathematics: { name: "Mathematics", totalChapters: 8, totalQuizzes: 40 },
    science: { name: "Science", totalChapters: 16, totalQuizzes: 48 },
    social: { name: "Social Science", totalChapters: 24, totalQuizzes: 72 },
  }

  constructor() {
    // Initialize with demo user - all progress starts at zero
    this.users.push({
      id: "demo-user",
      name: "Demo Student",
      email: "student@demo.com",
      class: "10",
      school: "Demo High School",
      avatar: "/placeholder.svg?height=40&width=40&text=D",
      isVerified: true,
      loginAttempts: 0,
      createdAt: new Date(),
      streak: 0, // Start with zero streak
      totalStudyTime: 0,
      achievements: [],
      progress: this.initializeProgress("10"),
    })
  }

  async register(userData: {
    name: string
    email: string
    password: string
    class: string
    school: string
  }): Promise<{ success: boolean; user?: User; message?: string; verificationToken?: string }> {
    try {
      // Validate input
      const validation = this.validateRegistrationData(userData)
      if (!validation.isValid) {
        return { success: false, message: validation.message }
      }

      // Check if user already exists
      const existingUser = this.users.find((u) => u.email === userData.email)
      if (existingUser) {
        return { success: false, message: "User with this email already exists" }
      }

      // Generate verification token
      const verificationToken = this.generateToken()

      // Create new user with zero progress and streak
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        class: userData.class,
        school: userData.school,
        avatar: `/placeholder.svg?height=40&width=40&text=${userData.name.charAt(0)}`,
        isVerified: false,
        verificationToken,
        loginAttempts: 0,
        createdAt: new Date(),
        streak: 0, // Start with zero streak
        totalStudyTime: 0,
        achievements: [],
        progress: this.initializeProgress(userData.class),
      }

      this.users.push(newUser)

      // In a real app, send verification email here
      console.log(`Verification token for ${userData.email}: ${verificationToken}`)

      return {
        success: true,
        user: this.sanitizeUser(newUser),
        message: "Registration successful. Please verify your email.",
        verificationToken, // In production, don't return this
      }
    } catch (error) {
      return { success: false, message: "Registration failed. Please try again." }
    }
  }

  async login(
    email: string,
    password: string,
    ip?: string,
  ): Promise<{ success: boolean; user?: User; message?: string }> {
    try {
      // Record login attempt
      this.recordLoginAttempt(email, false, ip)

      // Find user
      const user = this.users.find((u) => u.email === email)
      if (!user) {
        return { success: false, message: "Invalid email or password" }
      }

      // Check if account is locked
      if (this.isAccountLocked(user)) {
        const lockTimeRemaining = this.getLockTimeRemaining(user)
        return {
          success: false,
          message: `Account is locked. Try again in ${Math.ceil(lockTimeRemaining / 60000)} minutes.`,
        }
      }

      // Validate password (in demo, we'll use simple validation)
      const isValidPassword = this.validatePassword(email, password)
      if (!isValidPassword) {
        user.loginAttempts += 1
        if (user.loginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
          user.lockUntil = new Date(Date.now() + this.LOCK_TIME)
        }
        return { success: false, message: "Invalid email or password" }
      }

      // Check if email is verified
      if (!user.isVerified) {
        return {
          success: false,
          message: "Please verify your email before logging in. Check your inbox for verification link.",
        }
      }

      // Successful login - update streak
      this.updateStreak(user)
      user.loginAttempts = 0
      user.lockUntil = undefined
      user.lastLogin = new Date()
      this.recordLoginAttempt(email, true, ip)

      return {
        success: true,
        user: this.sanitizeUser(user),
        message: "Login successful",
      }
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." }
    }
  }

  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    const user = this.users.find((u) => u.verificationToken === token)
    if (!user) {
      return { success: false, message: "Invalid verification token" }
    }

    user.isVerified = true
    user.verificationToken = undefined

    return { success: true, message: "Email verified successfully. You can now log in." }
  }

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string; resetToken?: string }> {
    const user = this.users.find((u) => u.email === email)
    if (!user) {
      // Don't reveal if email exists
      return { success: true, message: "If the email exists, a reset link has been sent." }
    }

    const resetToken = this.generateToken()
    user.resetToken = resetToken
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // In a real app, send reset email here
    console.log(`Reset token for ${email}: ${resetToken}`)

    return {
      success: true,
      message: "Password reset link has been sent to your email.",
      resetToken, // In production, don't return this
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const user = this.users.find((u) => u.resetToken === token)
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return { success: false, message: "Invalid or expired reset token" }
    }

    const passwordValidation = this.validatePasswordStrength(newPassword)
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.message }
    }

    // In a real app, hash the password here
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    user.loginAttempts = 0
    user.lockUntil = undefined

    return { success: true, message: "Password reset successfully. You can now log in." }
  }

  async updateProgress(
    userId: string,
    subject: string,
    activityType: "quiz" | "lesson" | "homework" | "chat",
    data: {
      score?: number
      duration?: number
      chapterCompleted?: boolean
      quizCompleted?: boolean
    },
  ): Promise<{ success: boolean; message: string; user?: User }> {
    const user = this.users.find((u) => u.id === userId)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    if (!this.CLASS_10_SUBJECTS[subject as keyof typeof this.CLASS_10_SUBJECTS]) {
      return { success: false, message: "Invalid subject" }
    }

    const subjectInfo = this.CLASS_10_SUBJECTS[subject as keyof typeof this.CLASS_10_SUBJECTS]

    // Initialize subject progress if not exists
    if (!user.progress[subject]) {
      user.progress[subject] = {
        percentage: 0,
        chaptersCompleted: 0,
        totalChapters: subjectInfo.totalChapters,
        quizzesCompleted: 0,
        totalQuizzes: subjectInfo.totalQuizzes,
      }
    }

    const subjectProgress = user.progress[subject]

    // Update based on activity type
    if (data.chapterCompleted) {
      subjectProgress.chaptersCompleted = Math.min(subjectProgress.chaptersCompleted + 1, subjectProgress.totalChapters)
    }

    if (data.quizCompleted) {
      subjectProgress.quizzesCompleted = Math.min(subjectProgress.quizzesCompleted + 1, subjectProgress.totalQuizzes)
    }

    // Calculate percentage based on chapters and quizzes completed
    const chapterProgress = (subjectProgress.chaptersCompleted / subjectProgress.totalChapters) * 60 // 60% weight for chapters
    const quizProgress = (subjectProgress.quizzesCompleted / subjectProgress.totalQuizzes) * 40 // 40% weight for quizzes
    subjectProgress.percentage = Math.round(chapterProgress + quizProgress)
    subjectProgress.lastActivity = new Date()

    // Update total study time
    if (data.duration) {
      user.totalStudyTime += data.duration
    }

    // Record study session
    this.studySessions.push({
      userId,
      subject,
      activity: activityType,
      duration: data.duration || 0,
      score: data.score,
      timestamp: new Date(),
    })

    // Update streak
    this.updateStreak(user)

    // Check for achievements
    this.checkAchievements(user, subject, activityType, data)

    return {
      success: true,
      message: "Progress updated successfully",
      user: this.sanitizeUser(user),
    }
  }

  private updateStreak(user: User): void {
    const today = new Date()
    const todayStr = today.toDateString()

    if (!user.lastStudyDate) {
      // First time studying
      user.streak = 1
      user.lastStudyDate = today
      return
    }

    const lastStudyStr = user.lastStudyDate.toDateString()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toDateString()

    if (lastStudyStr === todayStr) {
      // Already studied today, no change
      return
    } else if (lastStudyStr === yesterdayStr) {
      // Studied yesterday, increment streak
      user.streak += 1
      user.lastStudyDate = today
    } else {
      // Gap in studying, reset streak
      user.streak = 1
      user.lastStudyDate = today
    }
  }

  private checkAchievements(user: User, subject: string, activityType: string, data: any): void {
    const achievements = []

    // First quiz achievement
    if (activityType === "quiz" && !user.achievements.includes("first_quiz")) {
      achievements.push("first_quiz")
      user.achievements.push("first_quiz")
    }

    // Study streak achievements
    if (user.streak === 7 && !user.achievements.includes("week_streak")) {
      achievements.push("week_streak")
      user.achievements.push("week_streak")
    }

    if (user.streak === 30 && !user.achievements.includes("month_streak")) {
      achievements.push("month_streak")
      user.achievements.push("month_streak")
    }

    // Subject completion achievements
    const subjectProgress = user.progress[subject]
    if (subjectProgress?.percentage >= 100 && !user.achievements.includes(`${subject}_master`)) {
      achievements.push(`${subject}_master`)
      user.achievements.push(`${subject}_master`)
    }

    // Quiz master achievements
    if (data.score >= 90 && !user.achievements.includes("quiz_master")) {
      achievements.push("quiz_master")
      user.achievements.push("quiz_master")
    }

    // Study time achievements
    if (user.totalStudyTime >= 60 && !user.achievements.includes("hour_scholar")) {
      // 1 hour
      achievements.push("hour_scholar")
      user.achievements.push("hour_scholar")
    }

    if (user.totalStudyTime >= 600 && !user.achievements.includes("dedicated_learner")) {
      // 10 hours
      achievements.push("dedicated_learner")
      user.achievements.push("dedicated_learner")
    }
  }

  async getUserProgress(userId: string): Promise<{ success: boolean; user?: User; message?: string }> {
    const user = this.users.find((u) => u.id === userId)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    return {
      success: true,
      user: this.sanitizeUser(user),
    }
  }

  async getStudySessions(userId: string, limit = 10): Promise<StudySession[]> {
    return this.studySessions
      .filter((session) => session.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  private validateRegistrationData(data: any): { isValid: boolean; message?: string } {
    if (!data.name || data.name.trim().length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters long" }
    }

    if (!this.isValidEmail(data.email)) {
      return { isValid: false, message: "Please enter a valid email address" }
    }

    const passwordValidation = this.validatePasswordStrength(data.password)
    if (!passwordValidation.isValid) {
      return passwordValidation
    }

    if (!data.class || data.class !== "10") {
      return { isValid: false, message: "Only Class 10 students are currently supported" }
    }

    if (!data.school || data.school.trim().length < 2) {
      return { isValid: false, message: "School name is required" }
    }

    return { isValid: true }
  }

  private validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
    if (!password || password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" }
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: "Password must contain at least one lowercase letter" }
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: "Password must contain at least one uppercase letter" }
    }

    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: "Password must contain at least one number" }
    }

    return { isValid: true }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private validatePassword(email: string, password: string): boolean {
    // Demo validation - in production, compare with hashed password
    if (email === "student@demo.com" && password === "demo123") {
      return true
    }
    // For other users, implement proper password hashing comparison
    return false
  }

  private isAccountLocked(user: User): boolean {
    return user.lockUntil ? user.lockUntil > new Date() : false
  }

  private getLockTimeRemaining(user: User): number {
    if (!user.lockUntil) return 0
    return Math.max(0, user.lockUntil.getTime() - Date.now())
  }

  private recordLoginAttempt(email: string, success: boolean, ip?: string): void {
    this.loginAttempts.push({
      email,
      timestamp: new Date(),
      success,
      ip,
    })

    // Keep only last 1000 attempts
    if (this.loginAttempts.length > 1000) {
      this.loginAttempts = this.loginAttempts.slice(-1000)
    }
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  private initializeProgress(classLevel: string): { [subject: string]: any } {
    if (classLevel === "10") {
      const progress: { [subject: string]: any } = {}

      // Initialize all subjects with zero progress
      Object.entries(this.CLASS_10_SUBJECTS).forEach(([subject, info]) => {
        progress[subject] = {
          percentage: 0,
          chaptersCompleted: 0,
          totalChapters: info.totalChapters,
          quizzesCompleted: 0,
          totalQuizzes: info.totalQuizzes,
        }
      })

      return progress
    }
    return {}
  }

  private sanitizeUser(user: User): User {
    const { verificationToken, resetToken, resetTokenExpiry, ...sanitizedUser } = user
    return sanitizedUser
  }

  // Admin methods for monitoring
  getLoginAttempts(email?: string): LoginAttempt[] {
    if (email) {
      return this.loginAttempts.filter((attempt) => attempt.email === email)
    }
    return this.loginAttempts
  }

  getUserStats(): { totalUsers: number; verifiedUsers: number; lockedUsers: number } {
    return {
      totalUsers: this.users.length,
      verifiedUsers: this.users.filter((u) => u.isVerified).length,
      lockedUsers: this.users.filter((u) => this.isAccountLocked(u)).length,
    }
  }

  getSubjects(): typeof this.CLASS_10_SUBJECTS {
    return this.CLASS_10_SUBJECTS
  }
}

export const authService = new AuthService()
