import {
  BentoCard,
  BentoGrid,
} from "@/components/ui/bento-grid"

import {
  FileText,
  Shield,
  Database,
  BarChart3,
} from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="p-20  bg-black">
      <BentoGrid>
        {/* Card 1 */}
        <BentoCard
          name="GST Billing"
          description="Manage invoices and GST billing easily."
          href="/products/gst"
          cta="Learn More"
          Icon={FileText}
          className="md:col-span-2"
          background={
            <div className="h-full w-full bg-cyan-500/10" />
          }
        />

        {/* Card 2 */}
        <BentoCard
          name="Security"
          description="Enterprise-grade protection."
          href="/security"
          cta="Explore"
          Icon={Shield}
          className="md:col-span-1"
          background={
            <div className="h-full w-full bg-purple-500/10" />
          }
        />

        {/* Card 3 */}
        <BentoCard
          name="Database"
          description="Powerful data management tools."
          href="/database"
          cta="View"
          Icon={Database}
          className="md:col-span-1"
          background={
            <div className="h-full w-full bg-emerald-500/10" />
          }
        />

        {/* Card 4 */}
        <BentoCard
          name="Analytics"
          description="Track reports and business growth."
          href="/analytics"
          cta="Get Started"
          Icon={BarChart3}
          className="md:col-span-2"
          background={
            <div className="h-full w-full bg-orange-500/10" />
          }
        />
      </BentoGrid>
    </section>
  )
}