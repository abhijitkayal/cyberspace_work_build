import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
 title: "CyberDine: Advanced Restaurant Management Software | Cyberspace Works",

  description:
    "Optimize your kitchen, billing, and seating workflows with CyberDine. A comprehensive restaurant management and POS system built for cloud kitchens, cafes, and fine dining.",

  keywords: [
    "restaurant management system",
    "restaurant POS software",
    "cloud kitchen billing software",
    "table management tool",
    "cafe billing app",
    "Cyberspace Works",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberdine-restaurant-management-system",
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