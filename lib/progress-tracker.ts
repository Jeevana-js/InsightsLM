interface ProgressUpdate {
  userId: string
  subject: string
  activityType: "quiz" | "lesson" | "homework" | "chat"
  data: {
    score?: number
    duration?: number
    chapterCompleted?: boolean
    quizCompleted?: boolean
  }
}

class ProgressTracker {
  async updateProgress(update: ProgressUpdate): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const response = await fetch("/api/progress/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      })

      const result = await response.json()

      if (result.success && result.user) {
        // Update localStorage with new user data
        localStorage.setItem("user", JSON.stringify(result.user))

        // Dispatch custom event for UI updates
        window.dispatchEvent(
          new CustomEvent("progressUpdated", {
            detail: { user: result.user, subject: update.subject },
          }),
        )
      }

      return result
    } catch (error) {
      console.error("Progress update failed:", error)
      return { success: false, message: "Failed to update progress" }
    }
  }

  async getUserProgress(userId: string): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const response = await fetch(`/api/progress/update?userId=${userId}`)
      const result = await response.json()

      if (result.success && result.user) {
        localStorage.setItem("user", JSON.stringify(result.user))
      }

      return result
    } catch (error) {
      console.error("Failed to get user progress:", error)
      return { success: false, message: "Failed to get progress" }
    }
  }

  // Helper methods for different activities
  async completeQuiz(userId: string, subject: string, score: number, duration: number): Promise<any> {
    return this.updateProgress({
      userId,
      subject,
      activityType: "quiz",
      data: {
        score,
        duration,
        quizCompleted: true,
      },
    })
  }

  async completeLesson(userId: string, subject: string, duration: number): Promise<any> {
    return this.updateProgress({
      userId,
      subject,
      activityType: "lesson",
      data: {
        duration,
        chapterCompleted: true,
      },
    })
  }

  async completeHomework(userId: string, subject: string, duration: number): Promise<any> {
    return this.updateProgress({
      userId,
      subject,
      activityType: "homework",
      data: {
        duration,
      },
    })
  }

  async recordChatSession(userId: string, subject: string, duration: number): Promise<any> {
    return this.updateProgress({
      userId,
      subject,
      activityType: "chat",
      data: {
        duration,
      },
    })
  }

  // Get current user from localStorage
  getCurrentUser(): any {
    try {
      const userData = localStorage.getItem("user")
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("Failed to get current user:", error)
      return null
    }
  }

  // Calculate overall progress across all subjects
  calculateOverallProgress(user: any): number {
    if (!user?.progress) return 0

    const subjects = Object.keys(user.progress)
    if (subjects.length === 0) return 0

    const totalProgress = subjects.reduce((sum, subject) => {
      return sum + (user.progress[subject]?.percentage || 0)
    }, 0)

    return Math.round(totalProgress / subjects.length)
  }

  // Get achievement display names
  getAchievementName(achievementId: string): string {
    const achievements: { [key: string]: string } = {
      first_quiz: "First Quiz",
      week_streak: "7-Day Streak",
      month_streak: "30-Day Streak",
      tamil_master: "Tamil Master",
      english_master: "English Master",
      mathematics_master: "Mathematics Master",
      science_master: "Science Master",
      social_master: "Social Science Master",
      quiz_master: "Quiz Master",
      hour_scholar: "1-Hour Scholar",
      dedicated_learner: "Dedicated Learner",
    }

    return achievements[achievementId] || achievementId
  }

  // Format study time
  formatStudyTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}m`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
    }
  }
}

export const progressTracker = new ProgressTracker()
