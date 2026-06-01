// import React from 'react'
// import ScrollStack, { ScrollStackItem } from '../../../components/ScrollStack'

// export default function AboutPage() {
//   return (
//     <ScrollStack
//       useWindowScroll
//       mode="animated"
//       className="bg-black text-white"
//       topPaddingClassName="pt-[14vh]"
//       bottomPaddingClassName="pb-[0vh]"
//       itemDistance={100}
//       itemStackDistance={30}
//       stackPosition="10%"
//       scaleEndPosition="7%"
//       baseScale={1}
//       entryScale={1}
//       itemScale={0}
//       rotationAmount={0}
//       blurAmount={0}
//     >
//       <ScrollStackItem
//         itemClassName="sticky top-[10vh] mx-auto !w-[calc(100%_-_142px)] h-90 rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
//       >
//         <div className="flex h-full flex-col justify-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
//           <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
//           <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
//             Our process combines strategy, interface design, and development so each solution feels polished and usable.
//           </p>
//         </div>
//       </ScrollStackItem>

//       <ScrollStackItem
//         itemClassName="sticky top-[15vh] mx-auto !w-[calc(100%_-_102px)] h-90 rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
//       >
//         <div className="flex h-full flex-col justify-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
//           <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
//           <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
//             Our process combines strategy, interface design, and development so each solution feels polished and usable.
//           </p>
//         </div>
//       </ScrollStackItem>

//       {/* <ScrollStackItem
//         itemClassName="sticky top-[25vh] mx-auto w-[calc(90%_-_9px)] min-h-[90vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
//       >
//         <div className="flex h-full flex-col justify-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
//           <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
//           <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
//             Our process combines strategy, interface design, and development so each solution feels polished and usable.
//           </p>
//         </div>
//       </ScrollStackItem> */}
//       <ScrollStackItem
//         itemClassName="sticky top-[20vh] mx-auto !w-[calc(100%_-_82px)] h-90 rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-20 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
//       >
//         <div className="flex h-full flex-col justify-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
//           <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
//           <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
//             Our process combines strategy, interface design, and development so each solution feels polished and usable.
//           </p>
//         </div>
//       </ScrollStackItem>
//       <ScrollStackItem
//         itemClassName="sticky top-[25vh] mx-auto !w-[calc(100%_-_60px)] h-90 rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
//       >
//         <div className="flex h-full flex-col justify-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
//           <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
//           <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
//             Our process combines strategy, interface design, and development so each solution feels polished and usable.
//           </p>
//         </div>
//       </ScrollStackItem>
//        <ScrollStackItem
//         itemClassName="sticky !top-[30vh] mx-auto !w-[calc(100%_-_20px)] h-90 rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
//       >
//         <div className="flex h-full flex-col justify-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
//           <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
//           <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
//             Our process combines strategy, interface design, and development so each solution feels polished and usable.
//           </p>
//         </div>
//       </ScrollStackItem>
      
      
//     </ScrollStack>
//   )
// }

// AboutPage.tsx — pure CSS sticky, no ScrollStack needed
export default function AboutPage() {
  const cards = [
    { top: 50,  width: 'calc(100% - 142px)' },
    { top: 80,  width: 'calc(100% - 112px)' },
    { top: 110,  width: 'calc(100% - 82px)'  },
    { top: 140, width: 'calc(100% - 52px)'  },
    { top: 170, width: 'calc(100% - 22px)'  },
  ]

  return (
    <div className="bg-black text-white">
      <div className="h-[14vh]" />

      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'sticky',
            top: `${c.top}px`,       // ← each card 30px below previous
            width: c.width,
            zIndex: i + 1,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '50px',   // ← scroll distance before next card starts
          }}
          className="h-130 rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 md:p-12 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md"
        >
          <div className="flex h-full flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              What We Do
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">
              Web apps, mobile apps, and software built to scale.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
              Our process combines strategy, interface design, and development
              so each solution feels polished and usable.
            </p>
          </div>
        </div>
      ))}

      <div className="h-[60vh]" />
    </div>
  )
}