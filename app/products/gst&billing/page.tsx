import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
   title: "CyberInvoice: GST Billing & Invoicing Software | Cyberspace Works",

  description:
    "Create professional, tax-compliant invoices in seconds with CyberInvoice. Automate GST calculations, track outstanding client dues, and manage business bills smoothly.",

  keywords: [
    "GST billing software",
    "tax invoice generator",
    "small business invoicing app",
    "client billing software",
    "automated receipt maker",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberinvoice-gst-billing-software",
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