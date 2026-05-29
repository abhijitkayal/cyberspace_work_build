"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

// ─── HeroParallax ─────────────────────────────────────────────────────────────
export const HeroParallax = ({
  products,
  heading,
  subheading,
}: {
  products: Product[];
  heading?: string;
  subheading?: string;
}) => {
  // Auto-pad to 15 products by cycling through the array
  // This ensures all 3 rows (5 cards each) are fully populated
  const padded: Product[] = [];
  while (padded.length < 15) {
    padded.push(...products);
  }
  const safeProducts = padded.slice(0, 15);

  const firstRow  = safeProducts.slice(0, 5);
  const secondRow = safeProducts.slice(5, 10);
  const thirdRow  = safeProducts.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="
        h-[300vh] py-40 overflow-hidden antialiased relative
        flex flex-col self-auto
        [perspective:1000px] [transform-style:preserve-3d]
        bg-black
      "
    >
      <Header heading={heading} subheading={subheading} />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        {/* Row 1 — slides RIGHT on scroll */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              key={product.title + "-r1"}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>

        {/* Row 2 — slides LEFT on scroll */}
        <motion.div className="flex flex-row space-x-20 mb-20">
          {secondRow.map((product) => (
            <ProductCard
              key={product.title + "-r2"}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        {/* Row 3 — slides RIGHT on scroll */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              key={product.title + "-r3"}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── Header ──────────────────────────────────────────────────────────────────
export const Header = ({
  heading,
  subheading,
}: {
  heading?: string;
  subheading?: string;
}) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        {heading ? (
          <span dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, '<br />') }} />
        ) : (
          <>
            The Ultimate <br /> development studio
          </>
        )}
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
        {subheading ??
          'We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.'}
      </p>
    </div>
  );
};

// ─── ProductCard ──────────────────────────────────────────────────────────────
export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>

      {/* Dark overlay on hover */}
      <div className="
        absolute inset-0 h-full w-full
        opacity-0 group-hover/product:opacity-80
        bg-black pointer-events-none
        transition-opacity duration-300
      " />

      {/* Title revealed on hover */}
      <h2 className="
        absolute bottom-4 left-4
        opacity-0 group-hover/product:opacity-100
        text-white font-semibold text-lg
        transition-opacity duration-300
      ">
        {product.title}
      </h2>
    </motion.div>
  );
};