// "use client"

// import { Check } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
// import { useState } from 'react'

// const plans = [
//   {
//     name: 'Basic',
//     description: 'Perfect for getting started with essential components',
//     monthlyPrice: 0,
//     yearlyPrice: 0,
//     features: [
//       'Access to 50+ free components',
//       'Basic dashboard templates',
//       'Community support',
//       'GitHub repository access',
//       'Documentation and guides'
//     ],
//     cta: 'Place Order',
//     popular: false
//   },
//   {
//     name: 'Bussiness',
//     description: 'For developers who need premium templates and components',
//     monthlyPrice: 19,
//     yearlyPrice: 15,
//     features: [
//       'Premium template collection',
//       'Advanced dashboard layouts',
//       'Priority support',
//       'Commercial use license',
//       'Early access to new releases',
//       'Figma design files',
//       'Custom component requests',
//       'Direct developer access',
//       'Exclusive design resources'
//     ],
//     cta: 'Place Order',
//     popular: true,
//     includesPrevious: 'All Free features, plus'
//   },
//   {
//     name: 'Lifetime',
//     description: 'One-time payment for lifetime access to everything',
//     monthlyPrice: "Custom Payment",
//     yearlyPrice: "Custom Payment",
//     features: [
//       'Lifetime updates and support',
//       'Private Discord channel',
//       'No recurring fees ever',
//       'Future template access',
//       'VIP support priority',
//       'Exclusive beta features'
//     ],
//     cta: 'Contact Us',
//     popular: false,
//     includesPrevious: 'All Pro features, plus'
//   }
// ]

// export function PricingSection() {
//   // const [isYearly, setIsYearly] = useState(false)

//   const [billing, setBilling] = useState("monthly")

//   return (
//     <section id="pricing" className="py-24 sm:py-32 bg-muted/40">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="mx-auto max-w-2xl text-center mb-12">
//           <Badge variant="outline" className="mb-4">Pricing Plans</Badge>
//           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
//             Choose your plan
//           </h2>
//           <p className="text-lg text-muted-foreground mb-8">
//             Start building with our free components or upgrade to Pro for access to premium templates and advanced features.
//           </p>

//           {/* Billing Toggle */}
//           <div className="flex items-center justify-center mb-2">
//             <ToggleGroup
//               type="single"
//               value={billing}
// onValueChange={(value) => {
//   if (value) setBilling(value)
// }}
//               className="bg-secondary text-secondary-foreground border-none rounded-full p-1 cursor-pointer shadow-none"
//             >
//               <ToggleGroupItem
//                 value="monthly"
//                 className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 !rounded-full data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
//               >
//                 Monthly
//               </ToggleGroupItem>
//               <ToggleGroupItem
//                 value="yearly"
//                 className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 !rounded-full data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
//               >
//                 Annually
//               </ToggleGroupItem>
//               <ToggleGroupItem
//                 value="lifetime"
//                 className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 !rounded-full data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
//               >
//                 Lifetime
//               </ToggleGroupItem>
//             </ToggleGroup>
//           </div>

//           <p className="text-sm text-muted-foreground">
//             <span className="text-primary font-semibold">Save 20%</span> On Annual Billing
//           </p>
//         </div>

//         {/* Pricing Cards */}
//         <div className="mx-auto max-w-6xl">
//           <div className="rounded-xl border">
//             <div className="grid lg:grid-cols-3">
//               {plans.map((plan, index) => (
//                 <div
//                   key={index}
//                   className={`p-8 grid grid-rows-subgrid row-span-4 gap-6 ${
//                     plan.popular
//                       ? 'my-2 mx-4 rounded-xl bg-card border-transparent shadow-xl ring-1 ring-foreground/10 backdrop-blur'
//                       : ''
//                   }`}
//                 >
//                   {/* Plan Header */}
//                   <div>
//                     <div className="text-lg font-medium tracking-tight mb-2">{plan.name}</div>
//                     <div className="text-muted-foreground text-balance text-sm">{plan.description}</div>
//                   </div>

//                   {/* Pricing */}
//                   <div>
//                     <div className="text-4xl font-bold mb-1">
//                       {billing === 'Lifetime' ? (
//                         `$${plan.monthlyPrice}`
//                       ) : plan.name === 'Free' ? (
//                         '$0'
//                       ) : (
//                         `$${
//   billing === "yearly"
//     ? plan.yearlyPrice
//     : plan.monthlyPrice
// }`
//                       )}
//                     </div>
//                     <div className="text-muted-foreground text-sm">
//                       {plan.name === 'Lifetime' ? 'One-time payment' : 'Per month'}
//                     </div>
//                   </div>

//                   {/* CTA Button */}
//                   <div>
//                     <Button
//                       className={`w-full cursor-pointer my-2 ${
//                         plan.popular
//                           ? 'shadow-md border-[0.5px] border-white/25 shadow-black/20 bg-primary ring-1 ring-primary/15 text-primary-foreground hover:bg-primary/90'
//                           : 'shadow-sm shadow-black/15 border border-transparent bg-background ring-1 ring-foreground/10 hover:bg-muted/50'
//                       }`}
//                       variant={plan.popular ? 'default' : 'secondary'}
//                     >
//                       {plan.cta}
//                     </Button>
//                   </div>

//                   {/* Features */}
//                   <div>
//                     <ul role="list" className="space-y-3 text-sm">
//                       {plan.includesPrevious && (
//                         <li className="flex items-center gap-3 font-medium">
//                           {plan.includesPrevious}:
//                         </li>
//                       )}
//                       {plan.features.map((feature, featureIndex) => (
//                         <li key={featureIndex} className="flex items-center gap-3">
//                           <Check className="text-muted-foreground size-4 flex-shrink-0" strokeWidth={2.5} />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Enterprise Note */}
//         <div className="mt-16 text-center">
//           <p className="text-muted-foreground">
//             Need custom components or have questions? {' '}
//             <Button variant="link" className="p-0 h-auto cursor-pointer" asChild>
//               <a href="#contact">
//                 Contact our team
//               </a>
//             </Button>
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Drawer } from "@base-ui/react/drawer"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const plans = [
  {
    name: "Basic",
    description: "Perfect for getting started with essential components",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Access to 50+ free components",
      "Basic dashboard templates",
      "Community support",
      "GitHub repository access",
      "Documentation and guides",
    ],
    cta: "Place Order",
    popular: false,
  },
  {
    name: "Bussiness",
    description:
      "For developers who need premium templates and components",
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      "Premium template collection",
      "Advanced dashboard layouts",
      "Priority support",
      "Commercial use license",
      "Early access to new releases",
      "Figma design files",
      "Custom component requests",
      "Direct developer access",
      "Exclusive design resources",
    ],
    cta: "Place Order",
    popular: true,
    includesPrevious: "All Free features, plus",
  },
  {
    name: "Lifetime",
    description:
      "One-time payment for lifetime access to everything",
    monthlyPrice: "Custom Payment",
    yearlyPrice: "Custom Payment",
    features: [
      "Lifetime updates and support",
      "Private Discord channel",
      "No recurring fees ever",
      "Future template access",
      "VIP support priority",
      "Exclusive beta features",
    ],
    cta: "Contact Us",
    popular: false,
    includesPrevious: "All Pro features, plus",
  },
]

export function PricingSection() {
  const [billing, setBilling] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  businessName: "",
  description: "",
})
const handleSubmit = async () => {
  try {
    const response = await fetch("/api/place-order", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...formData,
        planName: selectedPlan?.name,
      }),
    })

    const data = await response.json()

    if (data.success) {
      alert("Order Submitted Successfully")

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        businessName: "",
        description: "",
      })
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Pricing Plans
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Choose your plan
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Start building with our free components or upgrade to
            Pro for access to premium templates and advanced
            features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-2">
            <ToggleGroup
              type="single"
              value={billing}
              onValueChange={(value) => {
                if (value) setBilling(value)
              }}
              className="bg-secondary text-secondary-foreground border-none rounded-full p-1 cursor-pointer shadow-none"
            >
              <ToggleGroupItem
                value="monthly"
                className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 !rounded-full data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
              >
                Monthly
              </ToggleGroupItem>

              <ToggleGroupItem
                value="yearly"
                className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 !rounded-full data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
              >
                Annually
              </ToggleGroupItem>

              <ToggleGroupItem
                value="lifetime"
                className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 !rounded-full data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
              >
                Lifetime
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">
              Save 20%
            </span>{" "}
            On Annual Billing
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border">
            <div className="grid lg:grid-cols-3">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`p-8 grid grid-rows-subgrid row-span-4 gap-6 ${
                    plan.popular
                      ? "my-2 mx-4 rounded-xl bg-card border-transparent shadow-xl ring-1 ring-foreground/10 backdrop-blur"
                      : ""
                  }`}
                >
                  {/* Plan Header */}
                  <div>
                    <div className="text-lg font-medium tracking-tight mb-2">
                      {plan.name}
                    </div>

                    <div className="text-muted-foreground text-balance text-sm">
                      {plan.description}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="text-4xl font-bold mb-1">
                      {plan.name === "Lifetime"
                        ? `${plan.monthlyPrice}`
                        : `${
                            billing === "yearly"
                              ? `$${plan.yearlyPrice}`
                              : `$${plan.monthlyPrice}`
                          }`}
                    </div>

                    <div className="text-muted-foreground text-sm">
                      {plan.name === "Lifetime"
                        ? "One-time payment"
                        : "Per month"}
                    </div>
                  </div>

                  {/* Drawer */}
                  <Drawer.Root swipeDirection="right">
                    <Drawer.Trigger asChild>
                      <Button
                        onClick={() => setSelectedPlan(plan)}
                        className={`w-full cursor-pointer my-2 ${
                          plan.popular
                            ? "shadow-md border-[0.5px] border-white/25 shadow-black/20 bg-primary ring-1 ring-primary/15 text-primary-foreground hover:bg-primary/90"
                            : "shadow-sm shadow-black/15 border border-transparent bg-background ring-1 ring-foreground/10 hover:bg-muted/50"
                        }`}
                        variant={
                          plan.popular ? "default" : "secondary"
                        }
                      >
                        {plan.cta}
                      </Button>
                    </Drawer.Trigger>

                    <Drawer.Portal>
                      <Drawer.Backdrop className="fixed inset-0 bg-black/50 z-50" />

                      <Drawer.Viewport className="fixed inset-0 z-50 flex justify-end">
                        <Drawer.Popup className="h-full w-full max-w-md bg-background border-l shadow-2xl">
                          <Drawer.Content className="h-full p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <Drawer.Title className="text-2xl font-bold">
                                  {selectedPlan?.name} Plan
                                </Drawer.Title>

                                <Drawer.Description className="text-muted-foreground mt-1">
                                  Complete your purchase
                                </Drawer.Description>
                              </div>

                              <Drawer.Close asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                >
                                  Close
                                </Button>
                              </Drawer.Close>
                            </div>

                            {/* <div className="space-y-6">
                              <div className="rounded-xl border p-4">
                                <h3 className="font-semibold mb-2">
                                  Selected Plan
                                </h3>

                                <p className="text-sm text-muted-foreground mb-4">
                                  {selectedPlan?.description}
                                </p>

                                <div className="text-3xl font-bold">
                                  {selectedPlan?.name ===
                                  "Lifetime"
                                    ? `${selectedPlan?.monthlyPrice}`
                                    : billing === "yearly"
                                    ? `$${selectedPlan?.yearlyPrice}`
                                    : `$${selectedPlan?.monthlyPrice}`}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">
                                  Features Included
                                </h4>

                                <ul className="space-y-3">
                                  {selectedPlan?.features?.map(
                                    (
                                      feature: string,
                                      i: number
                                    ) => (
                                      <li
                                        key={i}
                                        className="flex items-center gap-3 text-sm"
                                      >
                                        <Check className="size-4 text-primary" />
                                        {feature}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <Button className="w-full">
                                Continue Payment
                              </Button>
                            </div> */}
                            <div className="space-y-3">
  <input
    type="text"
    placeholder="Your Name"
    value={formData.name}
    onChange={(e) =>
      setFormData({
        ...formData,
        name: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-3 bg-background"
  />

  <input
    type="email"
    placeholder="Email Address"
    value={formData.email}
    onChange={(e) =>
      setFormData({
        ...formData,
        email: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-3 bg-background"
  />

  <input
    type="text"
    placeholder="Phone Number"
    value={formData.phone}
    onChange={(e) =>
      setFormData({
        ...formData,
        phone: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-3 bg-background"
  />

  <input
    type="text"
    placeholder="Business Name"
    value={formData.businessName}
    onChange={(e) =>
      setFormData({
        ...formData,
        businessName: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-3 bg-background"
  />

  <textarea
    placeholder="Address"
    value={formData.address}
    onChange={(e) =>
      setFormData({
        ...formData,
        address: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-3 bg-background min-h-[100px]"
  />

  <textarea
    placeholder="Project Description"
    value={formData.description}
    onChange={(e) =>
      setFormData({
        ...formData,
        description: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-3 bg-background min-h-[120px]"
  />

  <Button
    onClick={handleSubmit}
    className="w-full"
  >
    Submit Order
  </Button>
</div>
                          </Drawer.Content>
                        </Drawer.Popup>
                      </Drawer.Viewport>
                    </Drawer.Portal>
                  </Drawer.Root>

                  {/* Features */}
                  <div>
                    <ul role="list" className="space-y-3 text-sm">
                      {plan.includesPrevious && (
                        <li className="flex items-center gap-3 font-medium">
                          {plan.includesPrevious}:
                        </li>
                      )}

                      {plan.features.map(
                        (feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-3"
                          >
                            <Check
                              className="text-muted-foreground size-4 flex-shrink-0"
                              strokeWidth={2.5}
                            />

                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need custom components or have questions?{" "}
            <Button
              variant="link"
              className="p-0 h-auto cursor-pointer"
              asChild
            >
              <a href="#contact">Contact our team</a>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}