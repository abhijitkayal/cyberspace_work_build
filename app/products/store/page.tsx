import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
title: "CyberRetail: Retail Shop Billing & Inventory Software | Cyberspace Works",

  description:
    "Scale your retail business with CyberRetail. Pair high-velocity POS billing with automated inventory alerts, multi-location tracking, and deep sales analytics dashboards.",

  keywords: [
    "store management system",
    "retail billing software",
    "shop POS application",
    "retail inventory management",
    "barcode billing tool",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberretail-store-management-system",
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