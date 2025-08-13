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

export default function PDFViewer({ selectedClass, selectedSubject }: PDFViewerProps) {
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
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Social Science Textbook</h1>
          <p className="text-gray-400">Class {selectedClass} • Tamil Nadu State Board</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleZoomOut}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm px-2">{zoom}%</span>
          <Button
            onClick={handleZoomIn}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={openInGoogleDrive} className="bg-green-600 hover:bg-green-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Drive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Textbook Info */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">{textbook.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Pages:</span>
                <span className="text-white">{textbook.pages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Size:</span>
                <span className="text-white">{textbook.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Language:</span>
                <span className="text-white">{textbook.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Publisher:</span>
                <span className="text-white text-sm">{textbook.publisher}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 justify-start bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  History
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 justify-start bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Geography
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 justify-start bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Civics
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 justify-start bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Economics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PDF Viewer */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  {textbook.name}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Online</Badge>
                  <Badge variant="secondary">Class {selectedClass}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <iframe
                  src={textbook.url}
                  className="w-full h-[800px] border-0 rounded-b-lg"
                  title="Social Science Textbook"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Alternative Access Methods */}
          <Card className="bg-gray-800 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Alternative Access Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="h-auto p-4 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <div className="text-center">
                    <Download className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <p className="font-medium">Download PDF</p>
                    <p className="text-xs text-gray-500">Save to device</p>
                  </div>
                </Button>

                <Button
                  onClick={() => window.open("https://tntextbooks.in", "_blank")}
                  variant="outline"
                  className="h-auto p-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <p className="font-medium">Official Source</p>
                    <p className="text-xs text-gray-500">tntextbooks.in</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
