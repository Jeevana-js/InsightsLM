import {
  textbookData,
  getSubjectData,
  getUnitData,
  getLessonData,
  searchLessons,
  type LessonContent,
} from "./textbook-data"

export interface TextbookContent {
  subject: string
  unit?: string
  lessons: LessonContent[]
  totalLessons: number
}

export interface SearchResult {
  lessons: LessonContent[]
  totalResults: number
}

export class TextbookService {
  private static instance: TextbookService
  private cache: Map<string, any> = new Map()

  static getInstance(): TextbookService {
    if (!TextbookService.instance) {
      TextbookService.instance = new TextbookService()
    }
    return TextbookService.instance
  }

  async getTextbookContent(subject: string, unit?: string): Promise<TextbookContent> {
    const cacheKey = `${subject}-${unit || "all"}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const subjectData = getSubjectData(subject)
      if (!subjectData) {
        throw new Error(`Subject ${subject} not found`)
      }

      let lessons: LessonContent[] = []

      if (unit) {
        const unitData = getUnitData(subject, unit)
        if (unitData) {
          lessons = unitData.lessons
        }
      } else {
        // Get all lessons from all units
        Object.values(subjectData.units).forEach((unitData) => {
          lessons.push(...unitData.lessons)
        })
      }

      const result: TextbookContent = {
        subject,
        unit,
        lessons,
        totalLessons: lessons.length,
      }

      this.cache.set(cacheKey, result)
      return result
    } catch (error) {
      console.error("Error getting textbook content:", error)
      throw error
    }
  }

  async getLessonContent(subject: string, unit: string, lessonId: string): Promise<LessonContent | null> {
    const cacheKey = `lesson-${subject}-${unit}-${lessonId}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const lesson = getLessonData(subject, unit, lessonId)
      if (lesson) {
        this.cache.set(cacheKey, lesson)
      }
      return lesson
    } catch (error) {
      console.error("Error getting lesson content:", error)
      return null
    }
  }

  async searchContent(query: string, subject?: string): Promise<SearchResult> {
    const cacheKey = `search-${query}-${subject || "all"}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const lessons = searchLessons(query, subject)
      const result: SearchResult = {
        lessons,
        totalResults: lessons.length,
      }

      this.cache.set(cacheKey, result)
      return result
    } catch (error) {
      console.error("Error searching content:", error)
      return { lessons: [], totalResults: 0 }
    }
  }

  getSubjects(): string[] {
    return Object.keys(textbookData)
  }

  getUnits(subject: string): string[] {
    const subjectData = getSubjectData(subject)
    return subjectData ? Object.keys(subjectData.units) : []
  }

  getSubjectInfo(subject: string) {
    const subjectData = getSubjectData(subject)
    if (!subjectData) return null

    const units = Object.entries(subjectData.units).map(([key, unit]) => ({
      id: key,
      name: unit.name,
      lessonCount: unit.lessons.length,
    }))

    return {
      name: subjectData.name,
      units,
      totalLessons: units.reduce((sum, unit) => sum + unit.lessonCount, 0),
    }
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const textbookService = TextbookService.getInstance()
