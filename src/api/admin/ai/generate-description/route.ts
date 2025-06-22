import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { IProductModuleService } from "@medusajs/types"
import { Modules } from "@medusajs/utils"
import OpenAI from "openai"

interface GenerateDescriptionRequest {
  productId: string
  productTitle: string
  productSubtitle?: string
  productMaterial?: string
  productType?: string
  productCollection?: string
  currentDescription?: string
  customPrompt?: string
}

export const POST = async (
  req: MedusaRequest<GenerateDescriptionRequest>,
  res: MedusaResponse
) => {
  try {
    const {
      productId,
      productTitle,
      productSubtitle,
      productMaterial,
      productType,
      productCollection,
      currentDescription,
      customPrompt
    } = req.body

    if (!process.env.OPENAI_API_KEY) {
      return res.status(400).json({
        error: "OpenAI API key not configured"
      })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Build product features array
    const productFeatures = [
      productSubtitle,
      productMaterial,
      productType,
      productCollection,
    ].filter(Boolean)

    // Use custom prompt if provided, otherwise use default
    let prompt = customPrompt || `Write a compelling and professional product description for "{productTitle}".

{productFeatures}

The description should be:
- 2-3 sentences long
- Engaging and sales-focused
- Highlight key benefits and features
- Professional tone suitable for e-commerce
- Include emotional appeal and value proposition
- Ready for immediate use

Do not include pricing information or availability details.`

    // Replace placeholders in the prompt
    prompt = prompt.replace(/{productTitle}/g, productTitle)
    prompt = prompt.replace(/{productFeatures}/g, 
      productFeatures.length > 0 
        ? `Product features: ${productFeatures.join(", ")}`
        : ""
    )

    // Add current description if available
    if (currentDescription && !prompt.includes("Current description")) {
      prompt += `\n\nCurrent description (for reference): ${currentDescription}`
    }

    console.log("🤖 Generating description for:", productTitle)

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 250,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    })

    const generatedDescription = completion.choices[0]?.text?.trim()

    if (!generatedDescription) {
      return res.status(500).json({
        error: "Failed to generate description"
      })
    }

    console.log("✅ Generated description successfully")

    return res.json({
      description: generatedDescription,
      productId: productId,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error("❌ Error generating description:", error)
    return res.status(500).json({
      error: error.message || "Internal server error"
    })
  }
} 