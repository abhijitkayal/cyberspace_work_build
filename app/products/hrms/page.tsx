import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
 title: "CyberPayroll: Automated HRMS & Payroll Software | Cyberspace Works",

  description:
    "Simplify your human resources operations with CyberPayroll. Automate complex salary calculations, manage employee attendance, and generate compliant payslips effortlessly.",

  keywords: [
    "HR management software",
    "automated payroll system",
    "HRMS platform",
    "employee attendance tracker",
    "salary slip generator",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberpayroll-hr-management-software",
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