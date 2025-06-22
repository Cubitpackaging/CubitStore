import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import OpenAI from "openai"

interface OptimizeSEORequest {
  productId: string
  productTitle: string
  currentDescription: string
  productType?: string
  productCollection?: string
}

export const POST = async (
  req: MedusaRequest<OptimizeSEORequest>,
  res: MedusaResponse
) => {
  try {
    const {
      productId,
      productTitle,
      currentDescription,
      productType,
      productCollection
    } = req.body

    if (!process.env.OPENAI_API_KEY) {
      return res.status(400).json({
        error: "OpenAI API key not configured"
      })
    }

    if (!currentDescription) {
      return res.status(400).json({
        error: "Current description is required for SEO optimization"
      })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Create SEO-focused prompt
    const prompt = `Optimize the following product description for SEO while maintaining its quality and readability.

Product: "${productTitle}"
${productType ? `Category: ${productType}` : ""}
${productCollection ? `Collection: ${productCollection}` : ""}

Current Description: "${currentDescription}"

Please rewrite this description to be SEO-optimized by:
- Including relevant keywords naturally
- Improving search engine visibility
- Maintaining readability and engagement
- Adding semantic keywords related to the product category
- Keeping the same length (2-3 sentences)
- Making it more discoverable for search engines
- Ensuring it flows naturally and doesn't sound keyword-stuffed

Return only the optimized description without any additional text or explanations.`

    console.log("🎯 Optimizing SEO for:", productTitle)

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.5, // Lower temperature for more consistent SEO optimization
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.2,
    })

    const optimizedDescription = completion.choices[0]?.text?.trim()

    if (!optimizedDescription) {
      return res.status(500).json({
        error: "Failed to optimize description for SEO"
      })
    }

    console.log("✅ SEO optimization completed successfully")

    res.json({
      optimizedDescription: optimizedDescription,
      originalDescription: currentDescription,
      productId: productId,
      timestamp: new Date().toISOString(),
      seoEnhanced: true
    })

  } catch (error: any) {
    console.error("❌ Error optimizing description for SEO:", error)
    res.status(500).json({
      error: error.message || "Internal server error"
    })
  }
} 