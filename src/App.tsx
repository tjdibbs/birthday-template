import React from "react";
import Marquee from "react-fast-marquee";

// Import Swiper React components
// import type SwiperT from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import { Avatar, Button, Popover } from "antd";
import { UpIcon, UserTie } from "./assets/icons";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressCircle = React.useRef<SVGSVGElement>(null);
  const progressContent = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);

  const onAutoplayTimeLeft = (_swiper: any, time: number, progress: number) => {
    progressCircle.current?.style?.setProperty(
      "--progress",
      String(1 - progress)
    );

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  React.useEffect(() => {
    if (open) {
      (window as typeof window & { particlesJS: any }).particlesJS.load(
        "particles",
        "particles.json",
        function () {
          console.log("callback - particles-js config loaded");
        }
      );
    }
  }, [open]);

  React.useEffect(() => {
    const iconsContainer = document.getElementById("icons-container")!;
    const icons = [
      "❤️",
      "😍",
      "🎂",
      "🎁",
      "🎉",
      "🎊",
      "🎈",
      "✨",
      "🎆",
      "🎇",
      "🥳",
    ];

    function createIcon() {
      const iconElement = document.createElement("div");
      iconElement.classList.add("icon");
      iconElement.textContent = icons[Math.floor(Math.random() * icons.length)];
      iconElement.style.left = Math.random() * 100 + "vw";
      iconElement.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2s to 5s duration
      iconsContainer.appendChild(iconElement);

      setTimeout(() => {
        iconElement.remove();
      }, 5000); // Remove the icon after 5s
    }

    if (open) {
      const interval = setInterval(createIcon, 300); // Create a new icon every 300ms

      return () => {
        clearInterval(interval);
      };
    }
  }, [open]);

  const data = Array.from(new Array(9))
    .map((_, i) => [`image${i + 1}.jpg`, `video${i + 1}.mp4`])
    .flat();

  return (
    <div id="container" className="w-screen h-screen overflow-hidden relative">
      <AnimatePresence>
        {!open && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed bg-white left-0 h-screen w-screen top-0 z-[1000] grid place-items-center place-content-center gap-4"
          >
            <Avatar size={100} src="/images/image3.jpg" />
            <p className="text-black font-black">Omowonula Adesoro </p>
            <div className="text-gray-600 font-bold">Happy Birthday </div>

            <Button
              className=" py-0 font-bold "
              type="primary"
              onClick={() => {
                setOpen(true);
                audioRef.current?.play();
              }}
            >
              Open View
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <Popover
        content={
          <div>
            <p>Built with love by Timi James</p>

            <a target="_blank" href="https://www.timijames.com/about-me">
              See Profile
            </a>
          </div>
        }
      >
        <Button
          shape="circle"
          size="large"
          className="grid place-items-center bg-transparent fixed top-1 left-5  z-[100]"
          icon={<UserTie color="white" />}
        />
      </Popover>

      <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
        <div
          id="particles"
          className="top-0 left-0 absolute w-screen h-screen z-30"
        />
        {/* <ThemeController />
         */}
        <div className="wrapper relative w-full h-full flex flex-col z-10">
          <Marquee direction="left">
            {data.map((path, i) => {
              const isImage = path.includes("image");
              const src = isImage ? "/images/" + path : "/videos/" + path;
              return (
                <div key={i} className="image-wrap h-[50vh]">
                  {isImage ? (
                    <img
                      className="h-full brightness-[10%] object-contain"
                      src={src}
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      controls
                      className="h-full brightness-[10%] object-cover"
                      src={src}
                    />
                  )}
                </div>
              );
            })}
          </Marquee>
          <Marquee direction="right">
            {data.map((path, i) => {
              const isImage = path.includes("image");
              const src = isImage ? "/images/" + path : "/videos/" + path;
              return (
                <div key={i} className="image-wrap h-[50vh]">
                  {isImage ? (
                    <img
                      className="h-full brightness-[10%] object-contain"
                      src={src}
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      controls
                      className="h-full brightness-[10%] object-cover"
                      src={src}
                    />
                  )}
                </div>
              );
            })}
          </Marquee>
        </div>

        <div className="music-wrap hidden">
          <audio
            ref={audioRef}
            onLoadedMetadata={console.log}
            onLoadedData={console.log}
            loop
            autoPlay
            src="./olojo-ibi.mp3"
            controls
          ></audio>
        </div>

        <div className="z-50 no-scrollbar max-w-[600px] mx-auto p-4 fixed top-0 left-1/2 -translate-x-1/2 h-full overflow-auto w-screen flex-col flex">
          <div className="text-xl sm:text-lg md:text-2xl text-center font-black mb-4 mt-2">
            Happy Birthday!
          </div>

          <Swiper
            // effect={"cube"}
            grabCursor={true}
            mousewheel={true}
            direction="vertical"
            // cubeEffect={{
            //   shadow: true,
            //   slideShadows: true,
            //   shadowOffset: 20,
            //   shadowScale: 0.94,
            // }}
            loop
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            navigation={{ enabled: true, prevEl: ".prev", nextEl: ".next" }}
            // pagination={true}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            modules={[Autoplay, Mousewheel, Navigation]}
            className="mySwiper min-h-[70vh]  m-0"
          >
            {data.map((path, i) => {
              const isImage = path.includes("image");
              const src = isImage ? "/images/" + path : "/videos/" + path;
              return (
                <SwiperSlide
                  key={i}
                  className=" flex h-full items-center justify-center "
                >
                  <div
                    key={i}
                    className="image-wrap h-full relative bg-white w-max max-w-full border-[10px] rounded-3xl overflow-hidden border-solid"
                  >
                    {isImage ? (
                      <img
                        className="h-full max-w-full w-[600px] object-cover"
                        src={src}
                      />
                    ) : (
                      <video
                        autoPlay
                        loop
                        muted
                        controls
                        className="h-full max-w-full w-[600px] object-cover"
                        src={src}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
            {/* {Array.from(new Array(9)).map((_, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className=" flex h-full items-center justify-center "
                >
                  <div
                    key={i}
                    className="image-wrap h-full relative bg-white w-max max-w-full border-[10px] rounded-3xl overflow-hidden border-solid"
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      controls
                      className="h-full max-w-full w-[600px] object-cover"
                      src={`/videos/video${i + 1}.mp4`}
                    />
                  </div>
                </SwiperSlide>
              );
            })} */}
          </Swiper>
          <div
            className="z-50 overflow-hidden pointer-events-none absolute top-0 left-0 h-full w-full"
            id="icons-container"
          ></div>
          <div className="action absolute flex flex-col gap-3 items-center justify-center top-[20%] right-7 bg-black/60 p-2 px-1 rounded-full z-50">
            <Button
              icon={<UpIcon color="#fff" />}
              shape="circle"
              className="next text-white bg-transparent grid place-items-center p-0"
            />
            <Button
              icon={<UpIcon color="#fff" className="rotate-180" />}
              shape="circle"
              className="prev grid place-items-center bg-transparent p-0"
            />
            <div className="autoplay-progress relative h-10 w-10 flex items-center justify-center font-bold text-white">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <small ref={progressContent}></small>
            </div>
          </div>
          <div className=" z-50 py-4 sm:px-4 w-full text-left text-xs sm:text-sm md:text-base  bg-black/30 text-white">
            Happy birthday to the most amazing person, Omowonuola Adesoro! 🎉❤️
            Today is a special day, a day to celebrate you and all the
            incredible qualities that make you who you are. 🫡 I want to take a
            moment to express how grateful I am to have you in my life. Your
            kindness, empathy, and sense of humor inspire me. 🙏🏿 On your special
            day, I wish for you to be surrounded by love, laughter, and all your
            favorite things. May your birthday be a reminder of how much you're
            appreciated, admired, and cherished. 💟🫶 Here's to another
            incredible year of adventures, growth, and making more unforgettable
            memories! Happy birthday once again, Ayomi! 🎉❤️ I love you Ayomi ❤️
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
