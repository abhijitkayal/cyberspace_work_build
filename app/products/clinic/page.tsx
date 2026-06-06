import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: "CyberClinic: Smart Clinic Management & EMR Software | Cyberspace Works",

  description:
    "Streamline patient care with CyberClinic. Securely manage electronic medical records (EMR), automate doctor scheduling, and generate rapid digital prescriptions and billing.",

  keywords: [
    "clinic management system",
    "doctor EMR software",
    "patient scheduling software",
    "digital prescription app",
    "healthcare practice management",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberclinic-clinic-management-system",
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