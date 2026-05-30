// // app/page.tsx  (or wherever your home route lives)
// import { HeroParallax } from "@/components/ui/hero-parallax";

// const products = [
//   {
//     title: "CyberInvoice",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberLedger",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberPayroll",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberProjects",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberRetail",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberClinic",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberPharma",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
//   {
//     title: "CyberDine",
//     link: "/software-dashboard",
//     thumbnail: "/Screenshot 2026-05-29 100006.png",
//   },
// ];

// export default function HomePage() {
//   return (
//     <main>
//       <HeroParallax
//         products={products}
//         heading={"The AI-first\nCode Editor"}
//         subheading="Build software faster in an editor designed for pair-programming with AI."
//       />
//     </main>
//   );
// }


"use client";
import React from "react";
import { HeroParallax } from "../../../components/ui/hero-parallax";

export default function Page() {
  return <HeroParallax products={products} />;
}
const products = [
  {
    title: "Moonbeam",
    link: "/products/clinic",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Cursor",
    link: "/products/hrms",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Rogue",
    link: "/products/gst&billing",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },

  {
    title: "Editorially",
    link: "/products/pharmacy",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Editrix AI",
    link: "/products/project",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Pixel Perfect",
    link: "/products/resturant",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },

  {
    title: "Algochurn",
    link: "/products/store",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Aceternity UI",
    link: "/products/tally",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
];
