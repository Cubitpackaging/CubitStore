import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"

// Custom CubitStore Header Widget
const CubitHeaderWidget = () => {
  return (
    <Container className="p-4 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="flex items-center gap-3">
        <img 
          src="/cubit-logo-light.png" 
          alt="CubitStore" 
          className="h-8 w-auto"
          onError={(e) => {
            // Fallback if logo file not found
            e.currentTarget.style.display = 'none'
          }}
        />
        <div>
          <Heading level="h2" className="text-white font-bold">
            CubitStore Admin
          </Heading>
          <p className="text-blue-100 text-sm">
            Smart B2B Packaging Platform
          </p>
        </div>
      </div>
    </Container>
  )
}

// Configure the widget
export const config = defineWidgetConfig({
  zone: "dashboard.before"
})

export default CubitHeaderWidget 