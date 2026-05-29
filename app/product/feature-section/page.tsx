import {
  BentoCard,
  BentoGrid,
} from "@/components/ui/bento-grid"

import {
  FileText,
  Shield,
  Database,
} from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="container mx-auto py-20">
      <BentoGrid>
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

        <BentoCard
          name="Database"
          description="Powerful data management tools."
          href="/database"
          cta="View"
          Icon={Database}
          className="md:col-span-3"
          background={
            <div className="h-full w-full bg-emerald-500/10" />
          }
        />
      </BentoGrid>
    </section>
  )
}