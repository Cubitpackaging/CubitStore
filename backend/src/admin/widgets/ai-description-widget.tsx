import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Button, Textarea, Badge } from "@medusajs/ui"
import { useState } from "react"

// Arrow function component as required by Medusa v2
const AIDescriptionWidget = ({ data }: any) => {
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [showPromptEditor, setShowPromptEditor] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")

  // Get product data safely
  const product = data || {}
  const productId = product.id
  const productTitle = product.title || "Unknown Product"
  const hasDescription = product.description && product.description.length > 0

  // Default prompt template
  const defaultPrompt = `Write a compelling and professional product description for "{productTitle}".

{productFeatures}

The description should be:
- 2-3 sentences long
- Engaging and sales-focused
- Highlight key benefits and features
- Professional tone suitable for e-commerce
- Include emotional appeal and value proposition
- Ready for immediate use

Do not include pricing information or availability details.`

  const handleGenerateDescription = async () => {
    if (!productId) {
      setError("Product ID not available")
      return
    }

    setIsGenerating(true)
    setError("")
    
    try {
      const response = await fetch("/admin/ai/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          productTitle: productTitle,
          productSubtitle: product.subtitle || "",
          productMaterial: product.material || "",
          productType: product.type?.value || "",
          productCollection: product.collection?.title || "",
          currentDescription: product.description || "",
          customPrompt: customPrompt || defaultPrompt // Send custom prompt
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to generate description: ${response.statusText}`)
      }

      const result = await response.json()
      setGeneratedDescription(result.description)
      setShowPreview(true)
    } catch (err: any) {
      setError(err.message || "Failed to generate description")
    } finally {
      setIsGenerating(false)
    }
  }

  const resetPrompt = () => {
    setCustomPrompt(defaultPrompt)
  }

  const togglePromptEditor = () => {
    if (!showPromptEditor && !customPrompt) {
      setCustomPrompt(defaultPrompt)
    }
    setShowPromptEditor(!showPromptEditor)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription)
      alert("Description copied to clipboard! You can now paste it in the description field above.")
    } catch (err) {
      console.error("Failed to copy to clipboard:", err)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Heading level="h2">🤖 AI Description Generator</Heading>
            <Text className="text-ui-fg-subtle">
              Generate AI-powered descriptions for "{productTitle}"
            </Text>
          </div>
          <Badge color={hasDescription ? "green" : "orange"}>
            {hasDescription ? "Has Description" : "No Description"}
          </Badge>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-ui-bg-field border border-ui-border-error rounded text-ui-fg-error">
            <Text>{error}</Text>
          </div>
        )}

        {/* Prompt Editor Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Text className="font-medium">🎯 AI Prompt</Text>
            <div className="flex gap-2">
              <Button
                onClick={togglePromptEditor}
                variant="secondary"
                size="small"
              >
                {showPromptEditor ? "Hide Prompt" : "Edit Prompt"}
              </Button>
              {showPromptEditor && (
                <Button
                  onClick={resetPrompt}
                  variant="secondary"
                  size="small"
                >
                  Reset to Default
                </Button>
              )}
            </div>
          </div>
          
          {showPromptEditor && (
            <div className="mb-4">
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={8}
                placeholder="Enter your custom prompt here..."
                className="w-full mb-2"
              />
              <Text className="text-xs text-ui-fg-subtle">
                💡 Use {`{productTitle}`} and {`{productFeatures}`} as placeholders
              </Text>
            </div>
          )}
        </div>

        {/* Current Description Preview */}
        {hasDescription && (
          <div className="mb-6">
            <Text className="font-medium mb-2">📄 Current Description:</Text>
            <div className="p-3 bg-ui-bg-field border rounded text-sm max-h-20 overflow-y-auto">
              {product.description}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="mb-6">
          <Button
            onClick={handleGenerateDescription}
            disabled={isGenerating}
            variant="primary"
            className="w-full"
          >
            {isGenerating ? "🔄 Generating..." : hasDescription ? "🔄 Regenerate Description" : "✨ Generate Description"}
          </Button>
        </div>

        {/* Generated Description Preview */}
        {showPreview && generatedDescription && (
          <div className="mb-6 p-4 border rounded-lg bg-ui-bg-subtle">
            <div className="flex items-center justify-between mb-3">
              <Text className="font-medium">📝 Generated Description:</Text>
              <Badge color="blue">AI Generated</Badge>
            </div>
            
            <Textarea
              value={generatedDescription}
              onChange={(e) => setGeneratedDescription(e.target.value)}
              rows={4}
              placeholder="AI generated description will appear here..."
              className="w-full mb-3"
            />
            
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="primary"
                size="small"
              >
                📋 Copy to Clipboard
              </Button>
              
              <Button
                onClick={() => setShowPreview(false)}
                variant="secondary"
                size="small"
              >
                ❌ Close
              </Button>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="p-3 bg-ui-bg-field border rounded">
          <Text className="font-medium text-ui-fg-base mb-2">💡 Quick Tips:</Text>
          <div className="text-xs text-ui-fg-subtle space-y-1">
            <Text>• Edit the prompt above to customize AI output style</Text>
            <Text>• Generated descriptions can be edited before copying</Text>
            <Text>• Use descriptive product titles for better AI results</Text>
          </div>
        </div>
      </div>
    </Container>
  )
}

// Widget configuration - using correct zone syntax
export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default AIDescriptionWidget 