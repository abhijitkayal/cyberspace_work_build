// app/page.tsx  (or wherever your home route lives)
import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  {
    title: "CyberInvoice",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberLedger",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberPayroll",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberProjects",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberRetail",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberClinic",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberPharma",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
  {
    title: "CyberDine",
    link: "/software-dashboard",
    thumbnail: "/Screenshot 2026-05-29 100006.png",
  },
];

export default function HomePage() {
  return (
    <main>
      <HeroParallax
        products={products}
        heading={"The AI-first\nCode Editor"}
        subheading="Build software faster in an editor designed for pair-programming with AI."
      />
    </main>
  );
}