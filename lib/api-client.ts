export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export class APIClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL = "http://localhost:5000", timeout = 10000) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            error: "Request timeout",
          }
        }

        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: false,
        error: "Unknown error occurred",
      }
    }
  }

  async get<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data: any): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new APIClient()
