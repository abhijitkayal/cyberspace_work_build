// "use client"

// import { useState, useEffect, useCallback, useRef } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Home, User, Calendar, CreditCard, Menu, X, Sun, Moon, ChevronDown, Settings2, Info, Phone, Contact, Wrench } from "lucide-react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import { motion, AnimatePresence } from "framer-motion"
// import { useTheme } from "next-themes"
// import { IoReorderThree } from "react-icons/io5"
// import { IoMailOutline } from "react-icons/io5"
// import { XMarkIcon } from "@heroicons/react/24/outline"
// import { HomeIcon, Cog6ToothIcon, InformationCircleIcon, PhoneIcon } from "@heroicons/react/24/solid"
// import { signOut, useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"

// import { HoverBorderGradient } from "./ui/hover-border-gradient"
// import {
//   FaLaptopCode, FaMobileAlt, FaCode, FaPalette, FaBullhorn,
//   FaBrush, FaBrain, FaPhoneAlt, FaEnvelope, FaWhatsapp,
//   FaInstagram, FaLinkedin, FaFacebookF,
// } from "react-icons/fa"
// import { SiGoogleanalytics } from "react-icons/si"
// import SiteNav from "./nav-animation"

// // ─── Rainbow border animation styles ──────────────────────────────────────────
// const RAINBOW_STYLES = `
//   /* The second border line that sits below every white border */
 
//   /* ── Dropdown ────────────────────────────────────────────────────────────── */
//   .sparkle-nav__dropdown {
//     position: fixed;
//     top: 65px;
//     left: 60px;
//     right: 0;
//     width: 80vw;
//     background: #000000;
//     backdrop-filter: blur(40px);
//     -webkit-backdrop-filter: blur(40px);
//     border-top: 1px solid rgba(0,255,252,0.15);
//     border-bottom: 1px solid rgba(0,255,252,0.10);
//     box-shadow: 0 30px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,255,255,0.05);
//     z-index: 9999;
//     padding: 28px 48px 32px;
//     display: grid;
//     grid-template-columns: repeat(4,1fr);
//     gap: 4px;
//     border-radius: 20px;
//     animation: dropdownFadeIn 0.18s ease forwards;
//     overflow: hidden;
//   }
//   .sparkle-nav__dropdown::before {
//     content:''; position:absolute; top:0; left:0;
//     width:300px; height:300px;
//     transform:translate(-128px,-128px);
//     background:radial-gradient(circle,#06b6d4 0%,transparent 100%);
//     filter:blur(160px); opacity:0.6; pointer-events:none; z-index:0;
//   }
//   .sparkle-nav__dropdown::after {
//     content:''; position:absolute; bottom:0; right:0;
//     width:300px; height:300px;
//     transform:translate(128px,128px);
//     background:radial-gradient(circle,#6366f1 0%,transparent 100%);
//     filter:blur(160px); opacity:0.6; pointer-events:none; z-index:0;
//   }
//   @keyframes dropdownFadeIn {
//     from { opacity:0; transform:translateY(-6px); }
//     to   { opacity:1; transform:translateY(0);    }
//   }
//   .sparkle-nav__dropdown-item {
//     display:flex; flex-direction:row; align-items:flex-start; gap:14px;
//     padding:18px 16px; border-radius:10px; text-decoration:none; color:white;
//     transition:background 0.18s ease; border:1px solid transparent;
//     position:relative; z-index:1;
//   }
//   .sparkle-nav__dropdown-item:hover {
//     background:rgba(0,255,252,0.05);
//     border-color:rgba(0,255,252,0.12);
//   }
//   .sparkle-nav__dropdown-icon {
//     flex-shrink:0; display:inline-flex; align-items:center; justify-content:center;
//     width:42px; height:42px;
//     background:rgba(0,255,252,0.08);
//     border-radius:8px; border:1px solid rgba(0,255,252,0.18);
//   }
//   .sparkle-nav__dropdown-icon svg { width:22px; height:22px; color:#00BCD4; stroke:#00BCD4; }
//   .sparkle-nav__dropdown-text  { display:flex; flex-direction:column; gap:4px; }
//   .sparkle-nav__dropdown-name  { font-size:14px; font-weight:700; color:#fff; letter-spacing:0.01em; line-height:1.3; }
//   .sparkle-nav__dropdown-subtext { font-size:12px; color:#00BCD4; line-height:1.5; font-weight:400; opacity:0.85; }
//   .nav-left-slice-bg { clip-path: path('M0 0 H50 V64 C25 64 25 40 0 40 Z'); }
//   .nav-right-slice-bg { clip-path: path('M0 0 H50 V40 C25 40 25 64 0 64 Z'); }
//   @keyframes pulseGlowRing {
//     0%, 100% { transform: translateY(-4px) scale(0.75); opacity: 0.7; filter: blur(10px); }
//     50% { transform: translateY(-4px) scale(0.75); opacity: 1; filter: blur(15px); }
//   }
//   .animate-pulseGlowRing { animation: pulseGlowRing 1.8s ease-in-out infinite; }
//   .pulseGlowRingBackdrop {
//     background: conic-gradient(from 0deg, #0ea5e9, #06b6d4, #0ea5e9);
//     filter: blur(16px);
//     opacity: 0.9;
//     z-index: -1;
//     transform: translateY(-8px);
//     pointer-events: none;
//   }
//   @media (prefers-reduced-motion: reduce) {
//     .animate-pulseGlowRing { animation: none; opacity: 0.8; filter: blur(16px); }
//   }
// `

// // ─── Sub-components ────────────────────────────────────────────────────────────

// const MobileThemeToggle = () => {
//   const { theme, setTheme, resolvedTheme } = useTheme()
//   const [mounted, setMounted] = useState(false)
//   useEffect(() => setMounted(true), [])
//   if (!mounted) return <div className="w-9 h-9" />
//   const isDark = theme === "dark" || resolvedTheme === "dark"
//   return (
//     <button
//       onClick={() => setTheme(isDark ? "light" : "dark")}
//       className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-cyan-400/10 transition-colors text-white hover:text-cyan-400"
//       aria-label="Toggle theme"
//     >
//       {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//     </button>
//   )
// }

// const NavLink = ({ href, icon: Icon, label, active }: {
//   href: string; icon: React.ElementType; label: string; active: boolean
// }) => (
//   <Link
//     href={href}
//     aria-current={active ? "page" : undefined}
//     className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap
//       ${active ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
//   >
//     <Icon className={`w-4 h-4 transition-colors ${active ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`} />
//     <span>{label}</span>
//   </Link>
// )

// // ─── Navbar ────────────────────────────────────────────────────────────────────

// const Navbar = ({ className, ...props }: { className?: string; [key: string]: unknown }) => {
//   const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)
//   const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false)
//   const [openDropdown, setOpenDropdown]         = useState<string | null>(null)
//   const pathname       = usePathname()
//   const router = useRouter()
//   const { status } = useSession()
//   const isAuthenticated = status === "authenticated"
//   const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
//   const isActive = (href: string) => pathname === href

//   const items    = { left: [{ label: "Services", href: "/services", icon: Wrench }, { label: "About", href: "/about-us", icon: Info }], right: [] }
//   const navitems = { left: [{ label: "Contact", href: "/contact-us", icon: Contact }], right: [] }

//   const socialLinks1 = [
//     { name: "Call",      icon: <FaPhoneAlt />, link: "tel:7980715765" },
//     { name: "Mail",      icon: <FaEnvelope />, link: "mailto:cyberspaceworksofficial@gmail.com" },
//     { name: "WhatsApp",  icon: <FaWhatsapp />, link: "https://wa.me/7980715765" },
//   ]
//   const socialLinks2 = [
//     { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/cyberspaceworks" },
//     { name: "LinkedIn",  icon: <FaLinkedin />,  link: "https://www.linkedin.com/company/cyberspace-works" },
//     { name: "Facebook",  icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=100086774724799" },
//   ]

//   const services = [
//     { name: "AI & Intelligent Systems", icon: <FaBrain />,           subtext: "Automation, ML & LLM solutions",  href: "/services/ai-intelligent-systems" },
//     { name: "Web Development",          icon: <FaLaptopCode />,       subtext: "Custom, scalable web apps",       href: "/services/web-development" },
//     { name: "App Development",          icon: <FaMobileAlt />,        subtext: "iOS & Android native solutions",  href: "/services/app-development" },
//     { name: "Software Development",     icon: <FaCode />,             subtext: "Tailored enterprise solutions",   href: "/services/software-development" },
//     { name: "UI/UX Design",             icon: <FaPalette />,          subtext: "Designs that convert users",      href: "/services/ui-ux-design" },
//     { name: "Graphic Design",           icon: <FaBrush />,            subtext: "Creative branding visuals",       href: "/services/graphic-design" },
//     { name: "Digital Marketing",        icon: <FaBullhorn />,         subtext: "Boost your brand visibility",     href: "/services/digital-marketing" },
//     { name: "Research & Analytics",     icon: <SiGoogleanalytics />,  subtext: "Data-driven insights",            href: "/services/research-and-analytics" },
//   ]

//   const handleDropdownClose = () => {
//     if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
//     closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
//   }

//   useEffect(() => {
//     const handleClickOrTouchOutside = (event: MouseEvent | TouchEvent) => {
//       const leftMenu = document.querySelector(".left-menu-container-mobile")
//       const rightMenu = document.querySelector(".right-menu-container-mobile")
//       const leftButton = document.querySelector(".left-hamburger")
//       const rightButton = document.querySelector(".right-hamburger")

//       if (
//         !leftMenu?.contains(event.target as Node) &&
//         !rightMenu?.contains(event.target as Node) &&
//         !leftButton?.contains(event.target as Node) &&
//         !rightButton?.contains(event.target as Node)
//       ) {
//         setIsLeftMenuOpen(false)
//         setIsRightMenuOpen(false)
//       }
//     }

//     const handleScroll = () => {
//       setIsLeftMenuOpen(false)
//       setIsRightMenuOpen(false)
//     }

//     document.addEventListener("mousedown", handleClickOrTouchOutside)
//     document.addEventListener("touchstart", handleClickOrTouchOutside)
//     window.addEventListener("scroll", handleScroll)

//     return () => {
//       document.removeEventListener("mousedown", handleClickOrTouchOutside)
//       document.removeEventListener("touchstart", handleClickOrTouchOutside)
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const resetQuoteForm = useCallback(() => {
//     setIsServicesOpenMobile(false)
//   }, [])

//   return (
//     <>
//       {/* ── Global styles (rainbow + dropdown) ── */}
//       <style jsx global>{RAINBOW_STYLES}</style>
//       <div className="hidden lg:block">
//         <SiteNav />
//       </div>
//       <header className={cn("hidden lg:flex fixed top-0 inset-x-0 z-1001 h-16 px-0", className)} {...props}>

//         {/* ── Left sidebar ── */}
//         <div className="rainbow-line-host flex-1 h-10 bg-black  z-20 relative min-w-0">
//           <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
//             <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//             <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//           </svg>
//           <div className="hidden lg:flex space-x-6 font-bold px-6 py-1  rounded-xl shadow-xl items-center backdrop-blur-sm absolute left-6 top-1/2 -translate-y-1/2">
//             <div className="flex items-center space-x-5">
//               {socialLinks1.map(item => (
//                 <div key={item.name} className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
//                   <Link href={item.link} className="text-cyan-400 text-xl hover:text-cyan-600 cursor-pointer size-5">
//                     {item.icon}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Notch (3 slices) ── */}
//         <div className="flex h-16 relative z-10 shrink-0 -ml-px">

//           {/* Left corner slice */}
//           <div className="w-12.5 h-full relative shrink-0  rainbow-line-host">
//             <div className="nav-left-slice-bg absolute inset-0 bg-black  " />
//             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
//               <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//               <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//             </svg>
//           </div>

//           {/* Center slice */}
//           <div className="flex-1 h-full relative min-w-0 -ml-px">
//             <div className="rainbow-line-host absolute inset-0 bg-black ">
//               <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
//                 <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//                 <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//               </svg>
//             </div>

//             {/* Content */}
//             <div className="relative w-full h-full flex items-center justify-between px-4 md:px-8">

//               {/* Desktop left nav */}
//               <div className="hidden md:flex items-center gap-8 shrink-0">
//                 <nav className="flex items-center gap-8 text-white">
//                   {items.left.map(item => {
//                     if (item.label === "Services") {
//                       return (
//                         <div
//                           key={item.label}
//                           className="relative"
//                           onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
//                           onMouseLeave={handleDropdownClose}
//                         >
//                           <Link
//                             href={item.href}
//                             aria-current={isActive(item.href) ? "page" : undefined}
//                             className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap
//                               ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
//                           >
//                             <item.icon className={`w-4 h-4 transition-colors ${isActive(item.href) ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`} />
//                             <span>{item.label}</span>
//                             <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
//                           </Link>

//                           {openDropdown === item.label && (
//                             <div
//                               className="sparkle-nav__dropdown"
//                               onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
//                               onMouseLeave={handleDropdownClose}
//                             >
//                               {services.map(sub => (
//                                 <Link key={sub.name} href={sub.href} className="sparkle-nav__dropdown-item">
//                                   {sub.icon && <span className="sparkle-nav__dropdown-icon">{sub.icon}</span>}
//                                   <span className="sparkle-nav__dropdown-text">
//                                     <span className="sparkle-nav__dropdown-name">{sub.name}</span>
//                                     {sub.subtext && <span className="sparkle-nav__dropdown-subtext">{sub.subtext}</span>}
//                                   </span>
//                                 </Link>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       )
//                     }
//                     return <NavLink key={item.label} {...item} active={isActive(item.href)} />
//                   })}
//                 </nav>
//               </div>

//               {/* Desktop logo */}
//               <div className="hidden md:flex shrink-0 items-center justify-center px-4">
//                 <Link href="/" className="transition-opacity hover:opacity-80">
//                   <Image src="/logo2.png" alt="Logo" width={64} height={64} className="h-16 w-16" />
//                 </Link>
//               </div>

//               {/* Desktop right nav */}
//               <div className="hidden md:flex items-center gap-5 shrink-0 text-white ml-auto">
//                 <nav className="flex items-center gap-8">
//                   {navitems.left.map(item => (
//                     <NavLink key={item.label} {...item} active={isActive(item.href)} />
//                   ))}
//                 </nav>
//                 <HoverBorderGradient
//                   style={{ background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", border: "none", color: "#fff", fontWeight: "600" }}
//                   className="shrink-0 ml-2"
//                 >
//                   Quick Enquiry
//                 </HoverBorderGradient>
//               </div>

//               {/* Mobile: hamburger */}
//               <button
//                 className="md:hidden mb-1 p-1 text-white hover:text-cyan-400 transition-colors"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//               </button>

//               {/* Mobile: logo */}
//               <div className="md:hidden flex-1 flex justify-center shrink-0 mx-2 mt-1">
//                 <Link href="/" className="transition-opacity hover:opacity-80">
//                   <Image src="/logo/bg-less.png" alt="Logo" width={32} height={32} className="h-8 w-auto dark:invert" />
//                 </Link>
//               </div>

//               {/* Mobile: theme toggle */}
//               <div className="md:hidden flex items-center gap-2 mb-1">
//                 <MobileThemeToggle />
//               </div>
//             </div>
//           </div>

//           {/* Right corner slice */}
//           <div className="w-12.5 h-full relative shrink-0  -ml-px rainbow-line-host">
//             <div className="nav-right-slice-bg absolute inset-0 bg-black " />
//             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
//               <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//               <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//             </svg>
//           </div>
//         </div>

//         {/* ── Right sidebar ── */}
//         <div className="rainbow-line-host flex-1 h-10 bg-black  z-20 relative min-w-0 -ml-px">
//           <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
//             <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//             <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.2} strokeWidth={0.5} className="text-foreground" />
//           </svg>
//           <div className="hidden lg:flex space-x-6 font-bold px-6 py-1 rounded-xl shadow-xl items-center backdrop-blur-sm absolute right-6 top-1/2 -translate-y-1/2">
//             <div className="flex items-center space-x-5">
//               {socialLinks2.map(item => (
//                 <div key={item.name} className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
//                   <Link href={item.link} className="text-cyan-400 text-xl hover:text-cyan-600 cursor-pointer size-5">
//                     {item.icon}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       </header>

//       {/* ── Mobile hamburger menus ── */}
//       <div
//         className="lg:hidden flex items-center left-hamburger fixed left-8 z-50 group bg-black/30 border border-white/10 shadow-xl rounded-md"
//         onMouseEnter={() => {
//           setIsLeftMenuOpen(true)
//           setIsRightMenuOpen(false)
//         }}
//       >
//         <button className="text-3xl text-cyan-400" aria-label="Open left menu" title="Open left menu">
//           <IoReorderThree />
//         </button>
//       </div>

//       <div
//         className="lg:hidden flex items-center right-hamburger fixed right-8 z-50 group bg-black/30 border border-white/10 shadow-xl rounded-md"
//         onClick={() => {
//           setIsRightMenuOpen(!isRightMenuOpen)
//           setIsLeftMenuOpen(false)
//         }}
//       >
//         <button className="text-3xl text-cyan-400" aria-label="Toggle social media menu" title="Toggle social media menu">
//           <IoReorderThree />
//         </button>
//       </div>

//       <div className={`lg:hidden left-menu-container-mobile fixed top-0 left-0 h-full w-64 bg-black/90 border-r border-cyan-400/20 backdrop-blur-xl transform transition-transform duration-300 z-9999 ${
//         isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"
//       }`}>
//         <div className="flex flex-col p-6 space-y-6 text-white">
//           <div className="flex flex-col items-start space-y-2">
//             <Link href="/" onClick={() => setIsLeftMenuOpen(false)}>
//               <Image src="/logo2.png" alt="Logo" width={180} height={70} className="w-32 h-auto" />
//             </Link>
//             <p className="text-sm text-gray-300">
//               Cyberspace Works - Website, Software, App Developer | Digital Marketing | Graphics Design | UI/UX | Research & Analysis
//             </p>
//             <p className="text-gray-400 flex items-start gap-2 mt-3">
//               <Cog6ToothIcon className="text-cyan-400 mt-1" />
//               <a href="tel:+917980715765" className="hover:underline leading-snug pl-6">+91 7980715765</a>
//             </p>
//             <p className="text-gray-400 flex items-start gap-2 mt-3">
//               <IoMailOutline className="text-cyan-400 mt-1 size-5" />
//               <a href="mailto:cyberspaceworksofficial@gmail.com" className="hover:underline leading-snug text-center">
//                 cyberspaceworksofficial@<br />gmail.com
//               </a>
//             </p>
//             <p className="text-gray-400 flex items-start gap-2 mt-3">
//               <PhoneIcon className="text-cyan-400 mt-1 size-12" />
//               <a href="https://maps.app.goo.gl/QABsaPuw5qL3BwRa7" className="hover:underline leading-snug text-center">
//                 Kolkata 19, Krishna Chatterjee Ln, Bally, Howrah, West Bengal 711201
//               </a>
//             </p>
//           </div>
//           <div className="mt-auto space-y-2">
//             {!isAuthenticated && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsLeftMenuOpen(false)
//                   resetQuoteForm()
//                 }}
//                 className="w-full flex items-center justify-center gap-1 px-4 py-1 text-cyan-100 border border-cyan-500/40 rounded-full transition-all duration-300 hover:bg-cyan-500/10"
//               >
//                 Quick Enquiry
//               </button>
//             )}

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className="flex items-center justify-center gap-1 px-4 py-1 text-black bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,0,0,0.6)]"
//                   onClick={() => setIsLeftMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLeftMenuOpen(false)
//                     signOut({ callbackUrl: "/login" })
//                   }}
//                   className="w-full flex items-center justify-center gap-1 px-4 py-1 text-cyan-100 border border-cyan-500/40 rounded-full transition-all duration-300 hover:bg-cyan-500/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 href="/login"
//                 className="flex items-center justify-center gap-1 px-4 py-1 text-black bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,0,0,0.6)]"
//                 onClick={() => setIsLeftMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className={`lg:hidden right-menu-container-mobile fixed top-0 right-0 h-full w-64 bg-black/90 border-l border-cyan-400/20 backdrop-blur-xl transform transition-transform duration-300 z-9999 ${
//         isRightMenuOpen ? "translate-x-0" : "translate-x-full"
//       }`}>
//         <div className="flex flex-col p-6 space-y-4 text-white">
//           {/* Social Media Group 1 */}
//           <div>
//             <h3 className="text-sm font-semibold text-cyan-400 mb-3">Contact</h3>
//             <div className="space-y-2">
//               {socialLinks1.map((item) => (
//                 <Link key={item.name} href={item.link} className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
//                   <span className="text-cyan-400 text-base">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="h-px bg-cyan-400/20 my-2"></div>

//           {/* Social Media Group 2 */}
//           <div>
//             <h3 className="text-sm font-semibold text-cyan-400 mb-3">Follow Us</h3>
//             <div className="space-y-2">
//               {socialLinks2.map((item) => (
//                 <Link key={item.name} href={item.link} className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
//                   <span className="text-cyan-400 text-base">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Mobile menu overlay ── */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-x-0 top-16 z-40 bg-neutral-50 dark:bg-neutral-900 border-b border-foreground/5 p-4 md:hidden shadow-lg"
//           >
//             <nav className="flex flex-col gap-2">
//               {[...items.left, ...items.right].map(item => (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   aria-current={isActive(item.href) ? "page" : undefined}
//                   className={`group flex items-center gap-3 p-3 rounded-lg transition-colors
//                     ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400 hover:bg-foreground/5"}`}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <item.icon className={`w-5 h-5 transition-colors ${isActive(item.href) ? "text-cyan-400" : "text-white/80 group-hover:text-cyan-400"}`} />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               ))}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// export default Navbar




"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Calendar, CreditCard, Menu, X, Sun, Moon, ChevronDown, Settings2, Info, Phone, Contact, Wrench, ChefHat, Pill, Stethoscope, IdCardLanyard, NotebookTabs, SquareKanban, ReceiptIndianRupee, ShoppingBag, Package, Building2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { IoReorderThree } from "react-icons/io5"
import { IoMailOutline } from "react-icons/io5"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { HomeIcon, Cog6ToothIcon, InformationCircleIcon, PhoneIcon } from "@heroicons/react/24/solid"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { HoverBorderGradient } from "./ui/hover-border-gradient"
import {
  FaLaptopCode, FaMobileAlt, FaCode, FaPalette, FaBullhorn,
  FaBrush, FaBrain, FaPhoneAlt, FaEnvelope, FaWhatsapp,
  FaInstagram, FaLinkedin, FaFacebookF,
} from "react-icons/fa"
import { SiGoogleanalytics } from "react-icons/si"
import SiteNav from "./nav-animation"
import SparkleNavbar from "./lightswind/sparkle-navbar"
// import { usePathname } from 'next/navigation'

// ─── Rainbow border animation styles ──────────────────────────────────────────
const RAINBOW_STYLES = `
  .sparkle-nav__dropdown {
    position: fixed;
    top: 65px;
    left: 14vw;
    right: 0;
    width: 70vw;
    background: #000000;
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-top: 1px solid rgba(0,255,252,0.15);
    border-bottom: 1px solid rgba(0,255,252,0.10);
    box-shadow: 0 30px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,255,255,0.05);
    z-index: 9999;
    padding: 28px 48px 32px;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 4px;
    border-radius: 20px;
    animation: dropdownFadeIn 0.18s ease forwards;
    overflow: hidden;
  }
  .sparkle-nav__dropdown::before {
    content:''; position:absolute; top:0; left:0;
    width:300px; height:300px;
    transform:translate(-128px,-128px);
    background:radial-gradient(circle,#06b6d4 0%,transparent 100%);
    filter:blur(160px); opacity:0.6; pointer-events:none; z-index:0;
  }
  .sparkle-nav__dropdown::after {
    content:''; position:absolute; bottom:0; right:0;
    width:300px; height:300px;
    transform:translate(128px,128px);
    background:radial-gradient(circle,#6366f1 0%,transparent 100%);
    filter:blur(160px); opacity:0.6; pointer-events:none; z-index:0;
  }
  @keyframes dropdownFadeIn {
    from { opacity:0; transform:translateY(-6px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  .sparkle-nav__dropdown-item {
    display:flex; flex-direction:row; align-items:flex-start; gap:14px;
    padding:18px 16px; border-radius:10px; text-decoration:none; color:white;
    transition:background 0.18s ease; border:1px solid transparent;
    position:relative; z-index:1;
  }
  .sparkle-nav__dropdown-item:hover {
    background:rgba(0,255,252,0.05);
    border-color:rgba(0,255,252,0.12);
  }
  .sparkle-nav__dropdown-icon {
    flex-shrink:0; display:inline-flex; align-items:center; justify-content:center;
    width:42px; height:42px;
    background:rgba(0,255,252,0.08);
    border-radius:8px; border:1px solid rgba(0,255,252,0.18);
  }
  .sparkle-nav__dropdown-icon svg { width:22px; height:22px; color:#00BCD4; stroke:#00BCD4; }
  .sparkle-nav__dropdown-text  { display:flex; flex-direction:column; gap:4px; }
  .sparkle-nav__dropdown-name  { font-size:14px; font-weight:700; color:#fff; letter-spacing:0.01em; line-height:1.3; }
  .sparkle-nav__dropdown-subtext { font-size:12px; color:#00BCD4; line-height:1.5; font-weight:400; opacity:0.85; }
  .nav-left-slice-bg { clip-path: path('M0 0 H55 V63 C25 64 23 38 -7 40 Z'); }
  .nav-right-slice-bg { clip-path: path('M0 0 H51 V41 C27 45 35 65 -9 64 Z'); }
  @keyframes pulseGlowRing {
    0%, 100% { transform: translateY(-4px) scale(0.75); opacity: 0.7; filter: blur(10px); }
    50% { transform: translateY(-4px) scale(0.75); opacity: 1; filter: blur(15px); }
  }
  .animate-pulseGlowRing { animation: pulseGlowRing 1.8s ease-in-out infinite; }
  .pulseGlowRingBackdrop {
    background: conic-gradient(from 0deg, #0ea5e9, #06b6d4, #0ea5e9);
    filter: blur(16px);
    opacity: 0.9;
    z-index: -1;
    transform: translateY(-8px);
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-pulseGlowRing { animation: none; opacity: 0.8; filter: blur(16px); }
  }
`

// ─── Sub-components ────────────────────────────────────────────────────────────

const MobileThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />
  const isDark = theme === "dark" || resolvedTheme === "dark"
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-cyan-400/10 transition-colors text-white hover:text-cyan-400"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

const NavLink = ({ href, icon: Icon, label, active }: {
  href: string; icon: React.ElementType; label: string; active: boolean
}) => (
  <Link
    href={href}
    aria-current={active ? "page" : undefined}
    className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap
      ${active ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
  >
    <Icon className={`w-4 h-4 transition-colors ${active ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`} />
    <span>{label}</span>
  </Link>
)

// ─── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = ({ className, ...props }: { className?: string; [key: string]: unknown }) => {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // ── Notch measurement state ──
  const [notchMetrics, setNotchMetrics] = useState<{
    left: number; right: number; vw: number
  } | null>(null)
  const notchRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
  const router = useRouter()
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isActive = (href: string) => pathname === href

 const hideNavbar = pathname?.startsWith("/dashboard") || pathname===("/schedule") || pathname===("/login");



  const items    = { left: [{ label: "About", href: "/about-us", icon: Building2 }, { label: "Services", href: "/services", icon: Info }], right: [] }
  const navitems = { left: [{ label: "Product", href: "#products", icon: Package },{ label: "Contact", href: "/contact-us", icon: Contact }], right: [] }

  const socialLinks1 = [
    { name: "Call",     icon: <FaPhoneAlt />, link: "tel:7980715765" },
    { name: "Mail",     icon: <FaEnvelope />, link: "mailto:cyberspaceworksofficial@gmail.com" },
    { name: "WhatsApp", icon: <FaWhatsapp />, link: "[wa.me](https://wa.me/7980715765)" },
  ]
  const socialLinks2 = [
    { name: "Instagram", icon: <FaInstagram />, link: "[instagram.com](https://www.instagram.com/cyberspaceworks)" },
    { name: "LinkedIn",  icon: <FaLinkedin />,  link: "[linkedin.com](https://www.linkedin.com/company/cyberspace-works)" },
    { name: "Facebook",  icon: <FaFacebookF />, link: "[facebook.com](https://www.facebook.com/profile.php?id=100086774724799)" },
  ]

  const headerQuickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us" },
    { label: "Features", href: "/features" },
  ]
   const headerQuickLinks2 = [
    { label: "Pricing", href: "/" },
    { label: "Faq", href: "/about-us" },
    { label: "Contact", href: "/features" },
  ]

  const services = [
    { name: "AI & Intelligent Systems", icon: <FaBrain />,          subtext: "Automation, ML & LLM solutions", href: "/services/ai-intelligent-systems" },
    { name: "Web Development",          icon: <FaLaptopCode />,      subtext: "Custom, scalable web apps",      href: "/services/web-development" },
    { name: "App Development",          icon: <FaMobileAlt />,       subtext: "iOS & Android native solutions", href: "/services/app-development" },
    { name: "Software Development",     icon: <FaCode />,            subtext: "Tailored enterprise solutions",  href: "/services/software-development" },
    { name: "UI/UX Design",             icon: <FaPalette />,         subtext: "Designs that convert users",     href: "/services/ui-ux-design" },
    { name: "Graphic Design",           icon: <FaBrush />,           subtext: "Creative branding visuals",      href: "/services/graphic-design" },
    { name: "Digital Marketing",        icon: <FaBullhorn />,        subtext: "Boost your brand visibility",    href: "/services/digital-marketing" },
    { name: "Research & Analytics",     icon: <SiGoogleanalytics />, subtext: "Data-driven insights",           href: "/services/research-and-analytics" },
  ]
    const products = [
    { name: "CyberPayroll", icon: <IdCardLanyard />,          subtext: "Smart HR Management Software.", href: "/software-dashboard" },
    { name: "CyberDine",          icon: <ChefHat />,      subtext: "A Robust Restaurant Management System.",      href: "/software-dashboard" },
    { name: "CyberPharma",          icon: <Pill />,       subtext: "Smart Medicine & Pharmacy Management System.", href: "/software-dashboard" },
    { name: "CyberClinic",     icon: <Stethoscope />,            subtext: "Smart & Robust Patient Management Solution.",  href: "/software-dashboard" },
    { name: "CyberRetail",             icon: <ShoppingBag />,         subtext: "A Robust Store Management Software.",     href: "/software-dashboard" },
    { name: "CyberLedger",           icon: <NotebookTabs />,           subtext: "Smart Tally Software.",      href: "/software-dashboard" },
    { name: "CyberInvoice",        icon: <ReceiptIndianRupee />,        subtext: "Simplifying GST, Billing & Business Accounting.",    href: "/software-dashboard" },
    { name: "CyberProjects",     icon: <SquareKanban />, subtext: "A Robust Project Management Software",           href: "/software-dashboard" },
  ]

  const handleDropdownClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
  }

  // ── Measure notch DOM position and keep it in sync ──
  useEffect(() => {
    const measure = () => {
      if (!notchRef.current) return
      const rect = notchRef.current.getBoundingClientRect()
      const vw   = window.innerWidth
      const left = Math.round(rect.left + window.scrollX)
      const right = Math.round(rect.right + window.scrollX)
      setNotchMetrics({ left, right, vw })
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (notchRef.current) ro.observe(notchRef.current)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  useEffect(() => {
    const handleClickOrTouchOutside = (event: MouseEvent | TouchEvent) => {
      const leftMenu   = document.querySelector(".left-menu-container-mobile")
      const rightMenu  = document.querySelector(".right-menu-container-mobile")
      const leftButton = document.querySelector(".left-hamburger")
      const rightButton = document.querySelector(".right-hamburger")

      if (
        !leftMenu?.contains(event.target as Node) &&
        !rightMenu?.contains(event.target as Node) &&
        !leftButton?.contains(event.target as Node) &&
        !rightButton?.contains(event.target as Node)
      ) {
        setIsLeftMenuOpen(false)
        setIsRightMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setIsLeftMenuOpen(false)
      setIsRightMenuOpen(false)
    }

    document.addEventListener("mousedown", handleClickOrTouchOutside)
    document.addEventListener("touchstart", handleClickOrTouchOutside)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousedown", handleClickOrTouchOutside)
      document.removeEventListener("touchstart", handleClickOrTouchOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const resetQuoteForm = useCallback(() => {
    setIsServicesOpenMobile(false)
  }, [])


  if (hideNavbar) {
    return null;
  }



  return (
    <>
      <style jsx global>{RAINBOW_STYLES}</style>

      <header className={cn("hidden lg:flex fixed top-0 inset-x-0 z-[1001] h-16 px-0 overflow-visible", className)} {...props}>

        {/* ── SVG animation — rendered as sibling inside header, absolutely positioned ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {notchMetrics && (
            <SiteNav
              notchLeft={notchMetrics.left-60}
              notchRight={notchMetrics.right+63}
              viewportWidth={notchMetrics.vw}
            />
          )}
        </div>

        {/* ── Left sidebar ── */}
        <div className="rainbow-line-host flex-1 h-10 z-20 relative min-w-0">
          <svg className="absolute bg-black inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
          </svg>
          <div className={`hidden lg:flex flex-col items-center gap-3 font-bold px-6 py-1 rounded-xl shadow-xl absolute left-6 top-1/2 -translate-y-1/2 ${ pathname.startsWith('/software-dashboard') ? '' : ''}`}>
            <div className="flex items-center justify-center space-x-5 w-full">
              {socialLinks1.map(item => (
                <div key={item.name} className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
                  <Link href={item.link} className="text-cyan-400 text-xl hover:text-cyan-600 cursor-pointer size-5">
                    {item.icon}
                  </Link>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* ── Notch (3 slices) — attach ref to center slice ── */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">

          {/* Left corner slice */}
          <div className="w-[50px] h-full relative shrink-0 rainbow-line-host">
            <div className="nav-left-slice-bg absolute inset-0 bg-black" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
            </svg>
          </div>

          {/* Center slice — REF attached here for measurement */}
          <div ref={notchRef} className="flex-1 h-full relative min-w-0 -ml-px">
            <div className="rainbow-line-host absolute inset-0 bg-black">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
                <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative w-full h-full flex items-center justify-between px-4 md:px-8">

              {/* Desktop left nav */}
              <div className="hidden md:flex items-center gap-8 shrink-0">
                <nav className="flex items-center gap-8 text-white">
                  {items.left.map(item => {
                    if (item.label === "Services") {
                      return (
                        <div
                          key={item.label}
                          className="relative"
                          onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                          onMouseLeave={handleDropdownClose}
                        >
                          <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap
                              ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
                          >
                            <item.icon className={`w-4 h-4 transition-colors ${isActive(item.href) ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`} />
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                          </Link>

                          {openDropdown === item.label && (
                            <div
                              className="sparkle-nav__dropdown"
                              onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                              onMouseLeave={handleDropdownClose}
                            >
                              {services.map(sub => (
                                <Link key={sub.name} href={sub.href} className="sparkle-nav__dropdown-item">
                                  {sub.icon && <span className="sparkle-nav__dropdown-icon">{sub.icon}</span>}
                                  <span className="sparkle-nav__dropdown-text">
                                    <span className="sparkle-nav__dropdown-name">{sub.name}</span>
                                    {sub.subtext && <span className="sparkle-nav__dropdown-subtext">{sub.subtext}</span>}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }
                    return <NavLink key={item.label} {...item} active={isActive(item.href)} />
                  })}
                </nav>
              </div>

              {/* Desktop logo */}
              <div className="hidden md:flex shrink-0 items-center justify-center px-4">
                <Link href="/" className="transition-opacity hover:opacity-80">
                  <Image src="/logo2.png" alt="Logo" width={64} height={64} className="h-16 w-16" />
                </Link>
              </div>

              {/* Desktop right nav */}
              <div className="hidden md:flex items-center gap-5 shrink-0 text-white ml-auto">
                <nav className="flex items-center gap-8">
                  {/* {navitems.left.map(item => (
                    
                    <NavLink key={item.label} {...item} active={isActive(item.href)} />
                    
                  ))} */}
                  {navitems.left.map(item => {
                    if (item.label === "Product") {
                      return (
                        <div
                          key={item.label}
                          className="relative"
                          onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                          onMouseLeave={handleDropdownClose}
                        >
                          <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap
                              ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
                          >
                            <item.icon className={`w-4 h-4 transition-colors ${isActive(item.href) ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}`} />
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                          </Link>

                          {openDropdown === item.label && (
                            <div
                              className="sparkle-nav__dropdown"
                              onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setOpenDropdown(item.label) }}
                              onMouseLeave={handleDropdownClose}
                            >
                              {products.map(sub => (
                                <Link key={sub.name} href={sub.href} className="sparkle-nav__dropdown-item">
                                  {sub.icon && <span className="sparkle-nav__dropdown-icon">{sub.icon}</span>}
                                  <span className="sparkle-nav__dropdown-text">
                                    <span className="sparkle-nav__dropdown-name">{sub.name}</span>
                                    {sub.subtext && <span className="sparkle-nav__dropdown-subtext">{sub.subtext}</span>}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }
                    return <NavLink key={item.label} {...item} active={isActive(item.href)} />
                  })}
                </nav>
                {/* <HoverBorderGradient
                  style={{ background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", border: "none", color: "#fff", fontWeight: "600" }}
                  className="shrink-0 ml-2"
                >
                  Quick Enquiry
                </HoverBorderGradient> */}
              </div>

              {/* Mobile: hamburger */}
              <button
                className="md:hidden mb-1 p-1 text-white hover:text-cyan-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Mobile: logo */}
              <div className="md:hidden flex-1 flex justify-center shrink-0 mx-2 mt-1">
                <Link href="/" className="transition-opacity hover:opacity-80">
                  <Image src="/logo/bg-less.png" alt="Logo" width={32} height={32} className="h-8 w-auto dark:invert" />
                </Link>
              </div>

              {/* Mobile: theme toggle */}
              <div className="md:hidden flex items-center gap-2 mb-1">
                <MobileThemeToggle />
              </div>
            </div>
          </div>

          {/* Right corner slice */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px rainbow-line-host">
            <div className="nav-right-slice-bg absolute inset-0 bg-black" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
            </svg>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="rainbow-line-host flex-1 h-10 bg-black z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0} strokeWidth={0} className="text-foreground" />
          </svg>
          <div className={`hidden lg:flex flex-col items-center gap-3 font-bold px-6 py-1 rounded-xl shadow-xl absolute right-6 top-1/2 -translate-y-1/2 ${pathname.startsWith('/software-dashboard') ? '' : ''}`}>
            <div className="flex items-center justify-center space-x-5 w-full">
              {socialLinks2.map(item => (
                <div key={item.name} className="flex flex-col items-center justify-center w-10 h-7" title={item.name}>
                  <Link href={item.link} className="flex h-full w-full items-center justify-center text-cyan-400 text-xl hover:text-cyan-600 cursor-pointer leading-none">
                    {item.icon}
                  </Link>
                </div>
              ))}
            </div>
           {/* {pathname === "/software-dashboard" && (
  <div className="border-t border-cyan-400/20 pt-2 flex justify-center">
  <SparkleNavbar
  color="#22d3ee"
  items={[
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "Faq",
      href: "#faq",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ]}
/>
  </div>
)} */}
          </div>
        </div>

      </header>

      {/* ── Mobile hamburger menus ── */}
      <div
        className="lg:hidden flex items-center left-hamburger fixed left-8 z-50 group bg-black/30 border border-white/10 shadow-xl rounded-md"
        onMouseEnter={() => {
          setIsLeftMenuOpen(true)
          setIsRightMenuOpen(false)
        }}
      >
        <button className="text-3xl text-cyan-400" aria-label="Open left menu" title="Open left menu">
          <IoReorderThree />
        </button>
      </div>

      <div
        className="lg:hidden flex items-center right-hamburger fixed right-8 z-50 group bg-black/30 border border-white/10 shadow-xl rounded-md"
        onClick={() => {
          setIsRightMenuOpen(!isRightMenuOpen)
          setIsLeftMenuOpen(false)
        }}
      >
        <button className="text-3xl text-cyan-400" aria-label="Toggle social media menu" title="Toggle social media menu">
          <IoReorderThree />
        </button>
      </div>

      <div className={`lg:hidden left-menu-container-mobile fixed top-0 left-0 h-full w-64 bg-black/90 border-r border-cyan-400/20 backdrop-blur-xl transform transition-transform duration-300 z-[9999] ${
        isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col p-6 space-y-6 text-white">
          <div className="flex flex-col items-start space-y-2">
            <Link href="/" onClick={() => setIsLeftMenuOpen(false)}>
              <Image src="/logo2.png" alt="Logo" width={180} height={70} className="w-32 h-auto" />
            </Link>
            <p className="text-sm text-gray-300">
              Cyberspace Works - Website, Software, App Developer | Digital Marketing | Graphics Design | UI/UX | Research & Analysis
            </p>
            <p className="text-gray-400 flex items-start gap-2 mt-3">
              <Cog6ToothIcon className="text-cyan-400 mt-1" />
              <a href="tel:+917980715765" className="hover:underline leading-snug pl-6">+91 7980715765</a>
            </p>
            <p className="text-gray-400 flex items-start gap-2 mt-3">
              <IoMailOutline className="text-cyan-400 mt-1 size-5" />
              <a href="mailto:cyberspaceworksofficial@gmail.com" className="hover:underline leading-snug text-center">
                cyberspaceworksofficial@<br />gmail.com
              </a>
            </p>
            <p className="text-gray-400 flex items-start gap-2 mt-3">
              <PhoneIcon className="text-cyan-400 mt-1 size-12" />
              <a href="[maps.app.goo.gl](https://maps.app.goo.gl/QABsaPuw5qL3BwRa7)" className="hover:underline leading-snug text-center">
                Kolkata 19, Krishna Chatterjee Ln, Bally, Howrah, West Bengal 711201
              </a>
            </p>
          </div>
          <div className="mt-auto space-y-2">
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setIsLeftMenuOpen(false)
                  resetQuoteForm()
                }}
                className="w-full flex items-center justify-center gap-1 px-4 py-1 text-cyan-100 border border-cyan-500/40 rounded-full transition-all duration-300 hover:bg-cyan-500/10"
              >
                Quick Enquiry
              </button>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-1 px-4 py-1 text-black bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,0,0,0.6)]"
                  onClick={() => setIsLeftMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsLeftMenuOpen(false)
                    signOut({ callbackUrl: "/login" })
                  }}
                  className="w-full flex items-center justify-center gap-1 px-4 py-1 text-cyan-100 border border-cyan-500/40 rounded-full transition-all duration-300 hover:bg-cyan-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-1 px-4 py-1 text-black bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,0,0,0.6)]"
                onClick={() => setIsLeftMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`lg:hidden right-menu-container-mobile fixed top-0 right-0 h-full w-64 bg-black/90 border-l border-cyan-400/20 backdrop-blur-xl transform transition-transform duration-300 z-[9999] ${
        isRightMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col p-6 space-y-4 text-white">
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 mb-3">Contact</h3>
            <div className="space-y-2">
              {socialLinks1.map((item) => (
                <Link key={item.name} href={item.link} className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
                  <span className="text-cyan-400 text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="h-px bg-cyan-400/20 my-2"></div>
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 mb-3">Follow Us</h3>
            <div className="space-y-2">
              {socialLinks2.map((item) => (
                <Link key={item.name} href={item.link} className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
                  <span className="text-cyan-400 text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-neutral-50 dark:bg-neutral-900 border-b border-foreground/5 p-4 md:hidden shadow-lg"
          >
            <nav className="flex flex-col gap-2">
              {[...items.left, ...items.right].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`group flex items-center gap-3 p-3 rounded-lg transition-colors
                    ${isActive(item.href) ? "text-cyan-400" : "text-white hover:text-cyan-400 hover:bg-foreground/5"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive(item.href) ? "text-cyan-400" : "text-white/80 group-hover:text-cyan-400"}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

