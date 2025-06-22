import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { IProductModuleService } from "@medusajs/types"
import { Modules } from "@medusajs/utils"
import OpenAI from "openai"

// Set to false to disable automatic description generation
const AUTO_GENERATE_DESCRIPTIONS = process.env.AUTO_GENERATE_DESCRIPTIONS === "true"

export default async function productDescriptionSubscriber({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  
  // Skip if auto-generation is disabled
  if (!AUTO_GENERATE_DESCRIPTIONS) {
    console.log("🔇 Auto-generation disabled. Use admin panel to generate descriptions.")
    return
  }

  const productModuleService: IProductModuleService = container.resolve(
    Modules.PRODUCT
  )

  const product = await productModuleService.retrieveProduct(data.id)

  // Only generate description if it's empty or null
  if (!product.description || product.description.trim() === "") {
    try {
      const description = await generateProductDescription(product)
      
      await productModuleService.updateProducts(data.id, {
        description: description,
      })

      console.log(`✅ Auto-generated description for product: ${product.title}`)
    } catch (error) {
      console.error(`❌ Failed to auto-generate description for product ${product.title}:`, error)
    }
  }
}

async function generateProductDescription(product: any): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured")
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Create a detailed prompt based on product information
  const productFeatures = [
    product.subtitle,
    product.material,
    product.type?.value,
    product.collection?.title,
  ].filter(Boolean) // Remove null/undefined values

  const prompt = `Write a compelling and professional product description for "${product.title}".
  
  ${productFeatures.length > 0 ? `Product features: ${productFeatures.join(", ")}` : ""}
  
  The description should be:
  - 2-3 sentences long
  - Engaging and sales-focused
  - Highlight key benefits
  - Professional tone
  - Ready for e-commerce use
  
  Do not include pricing information.`

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  return completion.choices[0]?.text?.trim() || "No description generated"
}

export const config: SubscriberConfig = {
  event: "product.created",
} 