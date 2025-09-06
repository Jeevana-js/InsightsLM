
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ZoomIn, ZoomOut, ExternalLink, BookOpen, Search } from "lucide-react"

interface PDFViewerProps {
  selectedClass: string
  selectedSubject: string | null
}

function PDFViewer({ selectedClass, selectedSubject }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100)

  const textbook = {
    id: "official",
    name: "Official TN Board Social Science",
    description: "Tamil Nadu State Board Class 10 Social Science Textbook",
    url: "https://drive.google.com/file/d/1OD8Qe3VDQ4IE6mQIpiCHZ7-mgSf7didZ/preview",
    downloadUrl: "https://drive.google.com/file/d/1OD8Qe3VDQ4IE6mQIpiCHZ7-mgSf7didZ/view",
    pages: "420 pages",
    size: "15.2 MB",
    language: "English",
    publisher: "Tamil Nadu Textbook Corporation",
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  const handleDownload = () => {
    window.open(textbook.downloadUrl, "_blank")
  }

  const openInGoogleDrive = () => {
    window.open("https://drive.google.com/file/d/1OD8Qe3VDQ4IE6mQIpiCHZ7-mgSf7didZ/view", "_blank")
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Social Science Textbook</h1>
          <p className="text-muted-foreground">Class {selectedClass} • Tamil Nadu State Board</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleZoomOut}
            variant="outline"
            size="sm"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm px-2">{zoom}%</span>
          <Button
            onClick={handleZoomIn}
            variant="outline"
            size="sm"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={openInGoogleDrive} variant="secondary">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Drive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Textbook Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{textbook.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pages:</span>
                <span>{textbook.pages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>{textbook.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language:</span>
                <span>{textbook.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Publisher:</span>
                <span className="text-right">{textbook.publisher}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PDF Viewer */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  {textbook.name}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Class {selectedClass}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <iframe
                  src={textbook.url}
                  className="w-full h-[80vh] border-0 rounded-b-lg"
                  title="Social Science Textbook"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


export default function TextbooksPage() {
    return <PDFViewer selectedClass="10" selectedSubject="social-science" />
}
