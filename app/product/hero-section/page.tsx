import { HeroParallax } from "@/components/ui/hero-parallax"

const products = [
  {
    title: "CyberInvoice",
    link: "/software-dashboard",
    thumbnail: "/images/cyberinvoice.png",
  },
  {
    title: "CyberLedger",
    link: "/software-dashboard",
    thumbnail: "/images/cyberledger.png",
  },
  {
    title: "CyberPayroll",
    link: "/software-dashboard",
    thumbnail: "/images/cyberpayroll.png",
  },
  {
    title: "CyberProjects",
    link: "/software-dashboard",
    thumbnail: "/images/cyberprojects.png",
  },
  {
    title: "CyberRetail",
    link: "/software-dashboard",
    thumbnail: "/images/cyberretail.png",
  },
  {
    title: "CyberClinic",
    link: "/software-dashboard",
    thumbnail: "/images/cyberclinic.png",
  },
  {
    title: "CyberPharma",
    link: "/software-dashboard",
    thumbnail: "/images/cyberpharma.png",
  },
  {
    title: "CyberDine",
    link: "/software-dashboard",
    thumbnail: "/images/cyberdine.png",
  },
]

export default function HomePage() {
  return (
    <main>
      <HeroParallax products={products} />
    </main>
  )
}