"use client"

import { useState } from "react"
import ClassSelection from "@/components/class-selection"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  if (!selectedClass) {
    return <ClassSelection onClassSelect={setSelectedClass} />
  }

  return <Dashboard selectedClass={selectedClass} />
}
