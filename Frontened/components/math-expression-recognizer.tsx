"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Calculator, X, RefreshCw, ChevronDown, ChevronUp, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import MathIllustration from "@/components/math-illustration"

type RecognitionResult = {
  expression: string
  solution: string | number
  steps?: string[]
  latex?: string
}

export default function MathExpressionRecognizer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [showSteps, setShowSteps] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
    }
  }

  const processImage = () => {
    if (!selectedImage) return

    setIsProcessing(true)

    // Simulate API call to process the image
    setTimeout(() => {
      // Mock result - in a real app, this would come from your AI model
      const mockResult: RecognitionResult = {
        expression: "3x^2 + 4x - 5 = 0",
        solution: "x = -2 ± √19/3",
        latex: "3x^2 + 4x - 5 = 0",
        steps: [
          "Start with the quadratic equation: $3x^2 + 4x - 5 = 0$",
          "Apply the quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
          "Substitute $a=3$, $b=4$, and $c=-5$",
          "Calculate: $x = \\frac{-4 \\pm \\sqrt{16 - 4 \\cdot 3 \\cdot (-5)}}{2 \\cdot 3}$",
          "Simplify: $x = \\frac{-4 \\pm \\sqrt{16 + 60}}{6}$",
          "Simplify further: $x = \\frac{-4 \\pm \\sqrt{76}}{6}$",
          "Final answer: $x = \\frac{-4 \\pm 2\\sqrt{19}}{6} = \\frac{-2 \\pm \\sqrt{19}}{3}$",
        ],
      }

      setResult(mockResult)
      setIsProcessing(false)
    }, 2000)
  }

  const resetAll = () => {
    setSelectedImage(null)
    setResult(null)
  }

  const calculatorTypes = [
    {
      title: "Algebra Solver",
      icon: <Calculator className="h-6 w-6 text-blue-500" />,
      description: "Solve equations and expressions",
    },
    {
      title: "Geometry Solver",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-orange-500"
        >
          <polygon points="3 6 21 6 12 18"></polygon>
        </svg>
      ),
      description: "Calculate areas and properties",
    },
    {
      title: "Calculus Solver",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-green-500"
        >
          <path d="M2 12h20M2 12c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>
        </svg>
      ),
      description: "Derivatives and integrals",
    },
  ]

  return (
    <>
      <header className="w-full bg-white py-4 px-6 flex justify-between items-center z-10 relative rounded-b-lg shadow-md mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-600">MathSolve.AI</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
            Algebra
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
            Geometry
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
            Calculus
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
            Statistics
          </a>
        </nav>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
          LOG IN
        </Button>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 relative z-10">
        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Math Expression Recognition</h1>
              <p className="text-lg text-gray-600 mb-6">
                Upload a handwritten math equation, and our AI will recognize and solve it instantly!
              </p>
              <div className="hidden md:block">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Equation
                </Button>
                <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="flex justify-center">
              <MathIllustration />
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card
            className={cn(
              "border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex flex-col items-center justify-center bg-white",
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200",
              isProcessing ? "opacity-50" : "",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full max-w-md h-64 mb-4">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Uploaded math expression"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetAll} disabled={isProcessing}>
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                  <Button onClick={processImage} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-4 w-4 mr-2" />
                        Recognize & Solve
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 mx-auto text-blue-400 mb-4" />
                <p className="text-gray-500 mb-2">No image file is chosen.</p>
                <p className="text-sm text-gray-400 mb-6">Drag and drop an image here, or click the button below</p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => document.getElementById("file-upload-2")?.click()}
                >
                  Choose a file to upload
                </Button>
                <input
                  id="file-upload-2"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </Card>

          {result && (
            <Card className="p-6 border-blue-100 bg-white rounded-xl shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Recognition Result</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSteps(!showSteps)} className="text-blue-600">
                  {showSteps ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Hide Steps
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show Steps
                    </>
                  )}
                </Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Recognized Expression:</p>
                  <div className="p-3 bg-gray-50 rounded-md mt-1 font-mono text-lg border border-gray-100">
                    {result.expression}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Solution:</p>
                  <div className="p-3 bg-gray-50 rounded-md mt-1 font-mono text-lg border border-gray-100">
                    {result.solution}
                  </div>
                </div>

                {showSteps && result.steps && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Solution Steps:</p>
                    <div className="p-3 bg-gray-50 rounded-md mt-1 border border-gray-100">
                      <ol className="list-decimal list-inside space-y-2">
                        {result.steps.map((step, index) => (
                          <li key={index} className="text-gray-700">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Math Solvers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {calculatorTypes.map((calc, index) => (
              <Card key={index} className="p-6 bg-white hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    {calc.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{calc.title}</h3>
                  <p className="text-gray-500 text-sm">{calc.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 px-6 text-center text-sm relative z-10 mt-8">
        <p className="text-gray-600">© 2025 MathSolve.AI - Handwritten Math Expression Recognition</p>
      </footer>

      <Toaster />
    </>
  )
}

