import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title:
    "CyberProjects: Enterprise Project Management Software | Cyberspace Works",

  description:
    " Centralize your team's workflows using CyberProjects. Plan project timelines, track task dependencies, and collaborate seamlessly across your organization in one unified hub.",

  keywords: [
    "project management software",
    "team collaboration tool",
    "task management platform",
    "workflow tracking app",
    "enterprise project planner",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberprojects-project-management-software",
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