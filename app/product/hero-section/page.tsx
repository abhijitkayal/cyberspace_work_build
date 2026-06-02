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
    title: "CyberClinic",
    link: "/products/clinic",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberPayroll",
    link: "/products/hrms",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberInvoice",
    link: "/products/gst&billing",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },

  {
    title: "CyberPharma",
    link: "/products/pharmacy",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberProjects",
    link: "/products/project",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberDine",
    link: "/products/resturant",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },

  {
    title: "CyberRetail",
    link: "/products/store",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberLedger",
    link: "/products/tally",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberPayroll",
    link: "/products/hrms",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberClinic",
    link: "/products/clinic",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberInvoice",
    link: "/products/gst&billing",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },

  {
    title: "CyberDine",
    link: "/products/resturant",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberPharma",
    link: "/products/pharmacy",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberLedger",
    link: "/products/tally",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberRetail",
    link: "/products/store",
    thumbnail:
      "/Screenshot 2026-05-29 100006.png",
  },
];
