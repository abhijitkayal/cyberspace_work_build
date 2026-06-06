import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
    title: "CyberPharma: Pharmacy Billing & Inventory Software | Cyberspace Works",

  description:
    "Take control of your medical retail store with CyberPharma. Track drug batch numbers, manage inventory expiry alerts, and generate tax-compliant digital invoices instantly.",

  keywords: [
    "pharmacy management system",
    "pharmacy billing software",
    "medical store stock tracker",
    "chemist inventory app",
    "pharmaceutical retail software",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberpharma-pharmacy-management-system",
  },
  // openGraph: {
  //   title: 'ShadcnStore - Modern Admin Dashboard Template',
  //   description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui.',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'ShadcnStore - Modern Admin Dashboard Template',
  //   description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui.',
  // },
}

export default function LandingPage() {
  return <LandingPageContent />
}