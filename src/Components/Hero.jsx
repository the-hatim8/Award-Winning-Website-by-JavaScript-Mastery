import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 ">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;

// --------------------------------------------------------------------------Chat gpt Code for Animate First then Play video

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import { TiLocationArrow } from "react-icons/ti";
// import { useEffect, useRef, useState } from "react";

// import Button from "./Button";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [hasClicked, setHasClicked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [loadedVideos, setLoadedVideos] = useState(0);

//   const totalVideos = 4;
//   const currentVdRef = useRef(null);
//   const nextVdRef = useRef(null);

//   const handleVideoLoad = () => {
//     setLoadedVideos((prev) => prev + 1);
//   };

//   useEffect(() => {
//     if (loadedVideos === totalVideos - 1) {
//       setLoading(false);
//     }
//   }, [loadedVideos]);

//   const handleMiniVdClick = () => {
//     setHasClicked(true);

//     // Start animations
//     const timeline = gsap.timeline({
//       onComplete: () => {
//         // Once animation completes, update video index
//         setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
//         nextVdRef.current.play(); // Play the next video after animation
//       },
//     });

//     // Animate the current video out
//     timeline.to("#current-video", {
//       scale: 0,
//       duration: 1,
//       ease: "power1.inOut",
//       onComplete: () => {
//         // Pause the current video when it's out
//         currentVdRef.current.pause();
//       },
//     });

//     // Animate the next video in
//     timeline.fromTo(
//       "#next-video",
//       { scale: 0, visibility: "visible" },
//       { scale: 1, duration: 1, ease: "power1.inOut" }
//     );
//   };

//   useEffect(() => {
//     // Set up scroll animations for the video frame
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//       borderRadius: "0% 0% 40% 10%",
//     });

//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0% 0% 0% 0%",
//       ease: "power1.inOut",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   }, []);

//   const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

//   return (
//     <div className="relative h-dvh w-screen overflow-x-hidden">
//       {loading && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
//           {/* Loading Animation */}
//           <div className="three-body">
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//           </div>
//         </div>
//       )}

//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
//       >
//         <div>
//           {/* Mini Video Preview */}
//           <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
//             <div
//               onClick={handleMiniVdClick}
//               className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
//             >
//               <video
//                 ref={nextVdRef}
//                 src={getVideoSrc((currentIndex % totalVideos) + 1)}
//                 loop
//                 muted
//                 id="next-video"
//                 className="size-64 origin-center scale-150 object-cover object-center"
//                 onLoadedData={handleVideoLoad}
//               />
//             </div>
//           </div>

//           {/* Current Video */}
//           <video
//             ref={currentVdRef}
//             src={getVideoSrc(currentIndex)}
//             autoPlay
//             loop
//             muted
//             id="current-video"
//             className="absolute-center z-20 size-64 object-cover object-center"
//             onLoadedData={handleVideoLoad}
//           />
//         </div>

//         <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
//           G<b>A</b>MING
//         </h1>

//         <div className="absolute left-0 top-0 z-40 size-full">
//           <div className="mt-24 px-5 sm:px-10">
//             <h1 className="special-font hero-heading text-blue-100">
//               redefi<b>n</b>e
//             </h1>

//             <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
//               Enter the Metagame Layer <br /> Unleash the Play Economy
//             </p>

//             <Button
//               id="watch-trailer"
//               title="Watch trailer"
//               leftIcon={<TiLocationArrow />}
//               containerClass="bg-yellow-300 flex-center gap-1"
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
//         G<b>A</b>MING
//       </h1>
//     </div>
//   );
// };

// export default Hero;

// ---------------------------------------------------------------------------Default Code my Hand Written

// import React, { useEffect, useRef, useState } from "react";
// import Button from "./Button";
// import { TiLocationArrow } from "react-icons/ti";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger)

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [hasClicked, setHasClicked] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadedVideos, setLoadedVideos] = useState(0);

//   const totalVideos = 4;

//   const nextVideoRef = useRef(null);

//   const handleVideoLoad = () => {
//     setLoadedVideos((prev) => prev + 1);
//   };

//   const upComingVideoIndex = (currentIndex % totalVideos) + 1;

//   const HandleMiniVdClick = () => {
//     setHasClicked(true);

//     setCurrentIndex(upComingVideoIndex);
//   };

//   useEffect(()=>{
//     if(loadedVideos === totalVideos -1){
//         setIsLoading(false);
//     }
//   }, [loadedVideos])

//   useGSAP(
//     () => {
//       if (hasClicked) {
//         gsap.set("#next-video", { visibility: "visible" });

//         gsap.to("#next-video", {
//           transformOrigin: "center center",
//           scale: 1,
//           width: "100%",
//           height: "100%",
//           duration: 1,
//           ease: "power1.inOut",
//           onStart: () => nextVideoRef.current.play(),
//         });

//         gsap.from("#current-video", {
//           transformOrigin: "center center",
//           scale: 0,
//           duration: 1.5,
//           ease: "power1.inOut",
//         });
//       }
//     },
//     { dependencies: [currentIndex], revertOnUpdate: true }
//   );

//   useGSAP(() => {
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
//       borderRadius: "0 0 40% 10%",
//     });

//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0 0 0 0",
//       ease: "power1.inOut",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   });

//   const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

//   return (
//     <div className="relative h-dvh w-screen overflow-x-hidden ">
//       {isLoading && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50" >
//           <div className="three-body">
//             <div className="three-body__dot" ></div>
//             <div className="three-body__dot" ></div>
//             <div className="three-body__dot" ></div>
//           </div>
//         </div>
//       )}
//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
//       >
//         <div>
//           <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg ">
//             <div
//               onClick={HandleMiniVdClick}
//               className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 "
//             >
//               <video
//                 ref={nextVideoRef}
//                 src={getVideoSrc(upComingVideoIndex)}
//                 loop
//                 muted
//                 id="current-video"
//                 className="size-64 origin-center scale-150 object-cover object-center "
//                 onLoadedData={handleVideoLoad}
//               />
//             </div>
//           </div>

//           <video
//             ref={nextVideoRef}
//             src={getVideoSrc(currentIndex)}
//             loop
//             muted
//             id="next-video"
//             className="absolute-center invisible absolute z-20 size-64 object-cover object-center "
//             onLoadedData={handleVideoLoad}
//           />

//           <video
//             src={getVideoSrc(
//               currentIndex === totalVideos - 1 ? 1 : currentIndex
//             )}
//             autoPlay
//             loop
//             muted
//             className="absolute left-0 top-0 size-full object-cover object-center"
//             onLoadedData={handleVideoLoad}
//           />
//         </div>
//         <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">
//           G<b>a</b>ming
//         </h1>

//         <div className="absolute left-0 top-0 z-40 size-full">
//           <div className="m5-24 px-5 sm:px-10">
//             <h1 className="special-font hero-heading text-blue-100 ">
//               redefi<b>n</b>e
//             </h1>
//             <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
//               Enter The MetaGame Layer <br /> Unleash the Play Economy{" "}
//             </p>
//             <Button
//               id="watch-trailer"
//               title="Watch Trailer"
//               leftIcon={<TiLocationArrow />}
//               containerClass="!bg-yellow-300 flex-center gap-1"
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black ">
//         G<b>a</b>ming
//       </h1>
//     </div>
//   );
// };

// export default Hero;
