// "use client";

// import dynamic from "next/dynamic";
// import styled from "styled-components";
// import Image from "next/image";

// // Make Loader client-only to prevent SSR mismatch
// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader">
//         <div className="box">
//           <div className="logo">
//             <Image
//               src="/logo2.png"
//               alt="Logo"
//               width={180}
//               height={70}
//               priority
//             />
//           </div>
//         </div>
//         <div className="box" />
//         <div className="box" />
//         <div className="box" />
//         <div className="box" />
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .loader {
//     --size: 250px;
//     --duration: 2s;
//     --background: linear-gradient(
//       0deg,
//        rgba(40, 40, 40, 0.8) 0%,
      
//   rgba(70, 70, 70, 0.7) 100%
//     );
//     height: var(--size);
//     aspect-ratio: 1;
//     position: relative;
//   }

//   .loader .box {
//     position: absolute;
//     background: var(--background);
//     border-radius: 50%;
//     border-top: 1px solid rgba(100, 100, 100, 1);
//     box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
//     backdrop-filter: blur(5px);
//     animation: ripple var(--duration) infinite ease-in-out;
//   }

//   .loader .box:nth-child(1) {
//     inset: 40%;
//     z-index: 99;
//   }
//   .loader .box:nth-child(2) {
//     inset: 30%;
//     z-index: 98;
//     border-color: rgba(100, 100, 100, 0.8);
//     animation-delay: 0.2s;
//   }
//   .loader .box:nth-child(3) {
//     inset: 20%;
//     z-index: 97;
//     border-color: rgba(100, 100, 100, 0.6);
//     animation-delay: 0.4s;
//   }
//   .loader .box:nth-child(4) {
//     inset: 10%;
//     z-index: 96;
//     border-color: rgba(100, 100, 100, 0.4);
//     animation-delay: 0.6s;
//   }
//   .loader .box:nth-child(5) {
//     inset: 0%;
//     z-index: 95;
//     border-color: rgba(100, 100, 100, 0.2);
//     animation-delay: 0.8s;
//   }

//   .loader .logo {
//     position: absolute;
//     inset: 0;
//     display: grid;
//     place-content: center;
//     padding: 20%;
//   }

//   @keyframes ripple {
//     0% {
//       transform: scale(1);
//       box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
//     }
//     50% {
//       transform: scale(1.3);
//       box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px -0px;
//     }
//     100% {
//       transform: scale(1);
//       box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
//     }
//   }
// `;

// export default dynamic(() => Promise.resolve(Loader), { ssr: false });



"use client";

import Image from "next/image";

const BOXES = [
  { inset: "40%", zIndex: 99, delay: "0s",   opacity: 1   },
  { inset: "30%", zIndex: 98, delay: "0.2s", opacity: 0.8 },
  { inset: "20%", zIndex: 97, delay: "0.4s", opacity: 0.6 },
  { inset: "10%", zIndex: 96, delay: "0.6s", opacity: 0.4 },
  { inset: "0%",  zIndex: 95, delay: "0.8s", opacity: 0 },
];

export default function Loader() {
  return (
    <>
      <style>{`
        .loader {
          --size: 250px;
          --duration: 2s;
          height: var(--size);
          aspect-ratio: 1;
          position: relative;
        }

        .loader-box {
          position: absolute;
          background: linear-gradient(
            0deg,
            rgba(40, 40, 40, 0.8) 0%,
            rgba(70, 70, 70, 0.7) 100%
          );
          border-radius: 50%;
          border-top: 1px solid;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px 0px;
          backdrop-filter: blur(5px);
          will-change: transform;
          animation: ripple var(--duration) infinite ease-in-out;
          animation-delay: var(--delay);
          inset: var(--inset);
          z-index: var(--z);
          border-color: rgba(100, 100, 100, var(--border-opacity));
        }

        .loader-logo {
          position: absolute;
          inset: 0;
          display: grid;
          place-content: center;
          padding: 20%;
        }

        @keyframes ripple {
          0%, 100% {
            transform: scale(1);
            box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px 0px;
          }
          50% {
            transform: scale(1.3);
            box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px 0px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-box {
            animation: none;
          }
        }
      `}</style>

      <div className="loader">
        {BOXES.map(({ inset, zIndex, delay, opacity }, i) => (
          <div
            key={i}
            className="loader-box"
            style={{
              "--inset": inset,
              "--z": zIndex,
              "--delay": delay,
              "--border-opacity": opacity,
            }}
          >
            {i === 0 && (
              <div className="loader-logo">
                <Image
                  src="/logo2.png"
                  alt="Logo"
                  width={180}
                  height={70}
                  priority
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}