import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: "CyberLedger: Business Accounting & Ledger Software | Cyberspace Works",

  description:
    "Maintain perfect financial clarity with CyberLedger. Track cash flow, manage double-entry bookkeeping, and generate instant balance sheets and profit & loss reports.",

  keywords: [
    "business accounting software",
    "digital ledger app",
    "financial auditing tool",
    "corporate bookkeeping system",
    "profit and loss tracker",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberledger-accounting-software",
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