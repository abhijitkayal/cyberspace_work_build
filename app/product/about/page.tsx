import React from 'react'
import ScrollStack, { ScrollStackItem } from '../../../components/ScrollStack'

export default function AboutPage() {
  return (
    <ScrollStack
      useWindowScroll
      mode="animated"
      className="bg-black text-white"
      topPaddingClassName="pt-[14vh]"
      bottomPaddingClassName="pb-[26vh]"
      itemDistance={100}
      itemStackDistance={100}
      stackPosition="10%"
      scaleEndPosition="7%"
      baseScale={1}
      entryScale={1}
      itemScale={0}
      rotationAmount={0}
      blurAmount={0}
    >
      <ScrollStackItem
        itemClassName="sticky top-[10vh] mx-auto !w-[calc(100%_-_142px)] min-h-[40vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
      >
        <div className="flex h-full flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Our process combines strategy, interface design, and development so each solution feels polished and usable.
          </p>
        </div>
      </ScrollStackItem>

      <ScrollStackItem
        itemClassName="sticky top-[20vh] mx-auto !w-[calc(100%_-_102px)] min-h-[40vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
      >
        <div className="flex h-full flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Our process combines strategy, interface design, and development so each solution feels polished and usable.
          </p>
        </div>
      </ScrollStackItem>

      {/* <ScrollStackItem
        itemClassName="sticky top-[25vh] mx-auto w-[calc(90%_-_9px)] min-h-[90vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
      >
        <div className="flex h-full flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Our process combines strategy, interface design, and development so each solution feels polished and usable.
          </p>
        </div>
      </ScrollStackItem> */}
      <ScrollStackItem
        itemClassName="sticky top-[30vh] mx-auto !w-[calc(100%_-_82px)] min-h-[40vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-20 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
      >
        <div className="flex h-full flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Our process combines strategy, interface design, and development so each solution feels polished and usable.
          </p>
        </div>
      </ScrollStackItem>
      <ScrollStackItem
        itemClassName="sticky top-[40vh] mx-auto !w-[calc(100%_-_60px)] min-h-[40vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
      >
        <div className="flex h-full flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Our process combines strategy, interface design, and development so each solution feels polished and usable.
          </p>
        </div>
      </ScrollStackItem>
       <ScrollStackItem
        itemClassName="sticky top-[40vh] mx-auto !w-[calc(100%_-_20px)] min-h-[40vh] rounded-[2rem] border border-fuchsia-400/30 bg-fuchsia-500/15 p-8 shadow-[0_0_40px_rgba(217,70,239,0.12)] backdrop-blur-md transition-transform duration-1000 ease-out md:p-12"
      >
        <div className="flex h-full flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">What We Do</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Web apps, mobile apps, and software built to scale.</h2>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Our process combines strategy, interface design, and development so each solution feels polished and usable.
          </p>
        </div>
      </ScrollStackItem>
      
      
    </ScrollStack>
  )
}