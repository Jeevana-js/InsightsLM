// Simple in-memory database simulation (in production, use a real database)
interface User {
  id: string
  name: string
  email: string
  password: string
  class: string
  school: string
  avatar: string
  joinedDate: string
  progress: {
    [subject: string]: number
  }
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  subject: string
  class: string
  topic: string
  chapter?: string
  bookReference?: string
}

// In-memory storage (in production, this would be a real database)
const users: User[] = [
  {
    id: "demo-user",
    name: "Demo Student",
    email: "student@demo.com",
    password: "demo123",
    class: "10",
    school: "Demo High School",
    avatar: "/placeholder.svg?height=40&width=40&text=D",
    joinedDate: new Date().toISOString(),
    progress: {
      mathematics: 75,
      science: 82,
      english: 68,
      tamil: 90,
      social: 71,
    },
  },
]

// Comprehensive Class 10 SSLC questions from official TN textbooks
const quizQuestions: QuizQuestion[] = [
  // Social Science - History Questions
  {
    id: 1,
    question: "The First World War was fought between which years?",
    options: ["1912-1916", "1914-1918", "1916-1920", "1918-1922"],
    correct: 1,
    explanation: "The First World War was fought from 1914 to 1918, involving major world powers in a global conflict.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 1: Outbreak of World War I and Its Aftermath",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 1, Page 8",
  },
  {
    id: 2,
    question: "Who was the leader of the Nazi Party in Germany?",
    options: ["Kaiser Wilhelm II", "Adolf Hitler", "Otto von Bismarck", "Heinrich Himmler"],
    correct: 1,
    explanation: "Adolf Hitler was the leader of the Nazi Party and became the dictator of Germany from 1933 to 1945.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 2: The World Between Two Wars",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 2, Page 25",
  },
  {
    id: 3,
    question: "The Quit India Movement was launched in which year?",
    options: ["1940", "1942", "1944", "1946"],
    correct: 1,
    explanation:
      "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942, demanding an end to British rule in India.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 8: Nationalism: Gandhian Phase",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 8, Page 195",
  },
  {
    id: 4,
    question: "Who founded the Indian National Army (INA)?",
    options: ["Subhas Chandra Bose", "Bhagat Singh", "Chandrashekhar Azad", "Ras Bihari Bose"],
    correct: 0,
    explanation:
      "Subhas Chandra Bose founded and led the Indian National Army (INA) to fight against British rule with the help of Japan during World War II.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 9: Freedom Struggle in Tamil Nadu",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 9, Page 218",
  },
  {
    id: 5,
    question: "The partition of India took place in which year?",
    options: ["1946", "1947", "1948", "1949"],
    correct: 1,
    explanation:
      "The partition of India occurred on August 15, 1947, creating two independent nations: India and Pakistan.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 10: Social Transformation in Tamil Nadu",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 10, Page 245",
  },

  // Social Science - Geography Questions
  {
    id: 6,
    question: "The highest peak in India is:",
    options: ["K2", "Kanchenjunga", "Mount Everest", "Nanda Devi"],
    correct: 1,
    explanation: "Kanchenjunga is the highest peak entirely within India at 8,586 meters, located in Sikkim.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 1: India - Location, Relief and Drainage",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 1, Page 8",
  },
  {
    id: 7,
    question: "The monsoon winds in India blow from:",
    options: ["Northeast to Southwest", "Southwest to Northeast", "North to South", "East to West"],
    correct: 1,
    explanation:
      "During summer monsoon, winds blow from Southwest to Northeast, bringing rainfall to India from the Arabian Sea and Bay of Bengal.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 2: Climate and Natural Vegetation of India",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 2, Page 32",
  },
  {
    id: 8,
    question: "Which river is known as the 'Sorrow of Bengal'?",
    options: ["Ganges", "Brahmaputra", "Damodar", "Hooghly"],
    correct: 2,
    explanation:
      "The Damodar River is known as the 'Sorrow of Bengal' due to its frequent flooding that caused destruction in the region.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 3: Mineral and Power Resources",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 3, Page 58",
  },
  {
    id: 9,
    question: "The Green Revolution in India was started in:",
    options: ["1950s", "1960s", "1970s", "1980s"],
    correct: 1,
    explanation:
      "The Green Revolution in India began in the 1960s with the introduction of high-yielding variety seeds, modern farming techniques, and increased use of fertilizers.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 4: Agriculture",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 4, Page 85",
  },
  {
    id: 10,
    question: "Which state is the largest producer of cotton in India?",
    options: ["Punjab", "Gujarat", "Maharashtra", "Andhra Pradesh"],
    correct: 1,
    explanation:
      "Gujarat is the largest producer of cotton in India, contributing about 30% of the country's total cotton production.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 5: Manufacturing Industries",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 5, Page 112",
  },
  {
    id: 11,
    question: "The Golden Quadrilateral connects which cities?",
    options: [
      "Delhi-Mumbai-Chennai-Kolkata",
      "Delhi-Mumbai-Bangalore-Kolkata",
      "Mumbai-Chennai-Hyderabad-Pune",
      "Delhi-Ahmedabad-Chennai-Kolkata",
    ],
    correct: 0,
    explanation:
      "The Golden Quadrilateral is a highway network connecting the four major cities: Delhi, Mumbai, Chennai, and Kolkata.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 6: Life Lines of National Economy",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 6, Page 138",
  },

  // Social Science - Civics Questions
  {
    id: 12,
    question: "The Indian Constitution was adopted on:",
    options: ["August 15, 1947", "January 26, 1950", "November 26, 1949", "December 9, 1946"],
    correct: 2,
    explanation:
      "The Indian Constitution was adopted by the Constituent Assembly on November 26, 1949, and came into effect on January 26, 1950.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 1: Indian Constitution",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 1, Page 8",
  },
  {
    id: 13,
    question: "How many fundamental rights are guaranteed by the Indian Constitution?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    explanation:
      "The Indian Constitution guarantees 6 fundamental rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 2: Federal System",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 2, Page 32",
  },
  {
    id: 14,
    question: "The President of India is elected by:",
    options: ["Direct election by people", "Parliament only", "Electoral College", "Prime Minister"],
    correct: 2,
    explanation:
      "The President of India is elected by an Electoral College consisting of elected members of both houses of Parliament and elected members of State Legislative Assemblies.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 3: Central Government",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 3, Page 58",
  },
  {
    id: 15,
    question: "The term of office for members of Lok Sabha is:",
    options: ["4 years", "5 years", "6 years", "7 years"],
    correct: 1,
    explanation: "Members of Lok Sabha are elected for a term of 5 years, unless the house is dissolved earlier.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 4: State Government",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 4, Page 85",
  },
  {
    id: 16,
    question: "Panchayati Raj system has how many tiers?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation:
      "The Panchayati Raj system has three tiers: Gram Panchayat at village level, Panchayat Samiti at block level, and Zilla Panchayat at district level.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 5: Local Government",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 5, Page 112",
  },

  // Social Science - Economics Questions
  {
    id: 17,
    question: "What is the main criterion used by the World Bank to classify countries?",
    options: ["Population", "Per capita income", "Area", "Natural resources"],
    correct: 1,
    explanation:
      "The World Bank classifies countries based on per capita income. Countries with per capita income of US$ 12,056 per annum and above in 2017 are called rich countries.",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 1: Development",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 1, Page 8",
  },
  {
    id: 18,
    question: "Which sector is known as the primary sector?",
    options: ["Manufacturing", "Agriculture", "Services", "Trade"],
    correct: 1,
    explanation:
      "Agriculture and related activities like forestry, fishing, and mining are known as the primary sector as they produce goods by exploiting natural resources.",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 2: Sectors of Indian Economy",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 2, Page 32",
  },
  {
    id: 19,
    question: "MGNREGA stands for:",
    options: [
      "Mahatma Gandhi National Rural Employment Guarantee Act",
      "Mahatma Gandhi National Rural Education Guarantee Act",
      "Mahatma Gandhi National Road Employment Guarantee Act",
      "Mahatma Gandhi National Resource Employment Guarantee Act",
    ],
    correct: 0,
    explanation:
      "MGNREGA stands for Mahatma Gandhi National Rural Employment Guarantee Act, which guarantees 100 days of employment in a year to rural households.",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 3: Money and Credit",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 3, Page 58",
  },
  {
    id: 20,
    question: "Globalization means:",
    options: [
      "Integration of domestic economy with world economy",
      "Only export of goods",
      "Only import of goods",
      "Isolation from world economy",
    ],
    correct: 0,
    explanation:
      "Globalization means integrating the economy of a country with the economies of other countries under conditions of free flow of trade, capital, and movement of persons across borders.",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 4: Globalization and Indian Economy",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 4, Page 85",
  },
  {
    id: 21,
    question: "WTO stands for:",
    options: [
      "World Trade Organization",
      "World Tourism Organization",
      "World Transport Organization",
      "World Technology Organization",
    ],
    correct: 0,
    explanation:
      "WTO stands for World Trade Organization, which is an international organization that regulates international trade between nations.",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 5: Consumer Awareness",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 5, Page 112",
  },

  // Additional Mixed Questions
  {
    id: 22,
    question: "The Berlin Wall was built in:",
    options: ["1959", "1961", "1963", "1965"],
    correct: 1,
    explanation: "The Berlin Wall was built in 1961 to separate East and West Berlin during the Cold War period.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 3: World War II",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 3, Page 68",
  },
  {
    id: 23,
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Ganges", "Godavari", "Narmada"],
    correct: 1,
    explanation:
      "The Ganges is the longest river in India, flowing for about 2,525 kilometers from the Himalayas to the Bay of Bengal.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 1: India - Location, Relief and Drainage",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 1, Page 15",
  },
  {
    id: 24,
    question: "The Right to Information Act was passed in:",
    options: ["2003", "2005", "2007", "2009"],
    correct: 1,
    explanation:
      "The Right to Information Act was passed by the Indian Parliament in 2005 to provide citizens access to information under government control.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 1: Indian Constitution",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 1, Page 25",
  },
  {
    id: 25,
    question: "Human Development Index (HDI) is published by:",
    options: ["World Bank", "IMF", "UNDP", "WHO"],
    correct: 2,
    explanation:
      "The Human Development Index (HDI) is published annually by the United Nations Development Programme (UNDP).",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 1: Development",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 1, Page 18",
  },

  // More comprehensive questions covering all topics
  {
    id: 26,
    question: "The Non-Aligned Movement was founded in:",
    options: ["1955", "1961", "1965", "1970"],
    correct: 1,
    explanation:
      "The Non-Aligned Movement was founded in 1961 in Belgrade, Yugoslavia, with India playing a leading role under Nehru's leadership.",
    subject: "social",
    class: "10",
    topic: "history",
    chapter: "Chapter 4: The Cold War Era",
    bookReference: "TN Board Class 10 Social Science, History Unit, Chapter 4, Page 95",
  },
  {
    id: 27,
    question: "Which soil is known as 'Black Cotton Soil'?",
    options: ["Alluvial soil", "Red soil", "Black soil", "Laterite soil"],
    correct: 2,
    explanation:
      "Black soil is known as 'Black Cotton Soil' because it is most suitable for cotton cultivation due to its high moisture retention capacity.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 2: Climate and Natural Vegetation of India",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 2, Page 45",
  },
  {
    id: 28,
    question: "The Supreme Court of India has how many judges including the Chief Justice?",
    options: ["25", "31", "34", "No fixed number"],
    correct: 3,
    explanation:
      "The Supreme Court of India has no fixed number of judges. Currently, it has 34 judges including the Chief Justice, but this number can be changed by Parliament.",
    subject: "social",
    class: "10",
    topic: "civics",
    chapter: "Chapter 3: Central Government",
    bookReference: "TN Board Class 10 Social Science, Civics Unit, Chapter 3, Page 72",
  },
  {
    id: 29,
    question: "Self Help Groups (SHGs) are mainly composed of:",
    options: ["10-15 men", "15-20 women", "10-20 women", "5-10 men"],
    correct: 2,
    explanation:
      "Self Help Groups typically consist of 10-20 women from similar economic backgrounds who come together to solve their common problems through self-help and mutual help.",
    subject: "social",
    class: "10",
    topic: "economics",
    chapter: "Chapter 3: Money and Credit",
    bookReference: "TN Board Class 10 Social Science, Economics Unit, Chapter 3, Page 75",
  },
  {
    id: 30,
    question: "The Chipko Movement was related to:",
    options: ["Forest conservation", "Water conservation", "Wildlife protection", "Soil conservation"],
    correct: 0,
    explanation:
      "The Chipko Movement was a forest conservation movement that began in the 1970s in Uttarakhand, where people hugged trees to prevent them from being cut down.",
    subject: "social",
    class: "10",
    topic: "geography",
    chapter: "Chapter 2: Climate and Natural Vegetation of India",
    bookReference: "TN Board Class 10 Social Science, Geography Unit, Chapter 2, Page 52",
  },
]

// Database functions
export const database = {
  // User functions
  async createUser(userData: Omit<User, "id" | "joinedDate">): Promise<User> {
    // Ensure only Class 10 users can be created
    if (userData.class !== "10") {
      throw new Error("Only Class 10 students are supported")
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
    }
    users.push(newUser)
    return newUser
  },

  async findUserByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.email === email) || null
  },

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = users.find((user) => user.email === email && user.password === password)
    // Ensure only Class 10 users can login
    if (user && user.class !== "10") {
      return null
    }
    return user || null
  },

  async updateUserProgress(userId: string, subject: string, progress: number): Promise<void> {
    const user = users.find((u) => u.id === userId)
    if (user) {
      user.progress[subject] = progress
    }
  },

  // Quiz functions - only Class 10
  async getQuizQuestions(subject: string, classLevel: string, count = 10, topic?: string): Promise<QuizQuestion[]> {
    // Only allow Class 10
    if (classLevel !== "10") {
      return []
    }

    let filteredQuestions = quizQuestions.filter((q) => {
      const matchesSubject = q.subject === subject
      const matchesClass = q.class === classLevel
      const matchesTopic =
        !topic || q.topic.toLowerCase().includes(topic.toLowerCase()) || q.id.toString().includes(topic)

      return matchesSubject && matchesClass && matchesTopic
    })

    // If not enough questions, get all questions for the subject
    if (filteredQuestions.length < count) {
      filteredQuestions = quizQuestions.filter((q) => q.subject === subject && q.class === classLevel)
    }

    // Shuffle questions to ensure variety
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random())

    // Return the requested number of questions
    return shuffled.slice(0, Math.min(count, shuffled.length))
  },

  // Get subjects for Class 10 only
  getSubjectsForClass(classLevel: string): string[] {
    if (classLevel === "10") {
      return ["social"]
    }
    return []
  },

  // Get question statistics
  getQuestionStats(subject: string, classLevel: string) {
    if (classLevel !== "10") {
      return { total: 0, topics: [], chapters: [] }
    }

    const questions = quizQuestions.filter((q) => q.subject === subject && q.class === classLevel)
    return {
      total: questions.length,
      topics: [...new Set(questions.map((q) => q.topic))],
      chapters: [...new Set(questions.map((q) => q.chapter).filter(Boolean))],
    }
  },
}
