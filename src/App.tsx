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
import { Button, Popover } from "antd";
import { UpIcon, UserTie } from "./assets/icons";

function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressCircle = React.useRef<SVGSVGElement>(null);
  const progressContent = React.useRef<HTMLSpanElement>(null);

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
    (window as typeof window & { particlesJS: any }).particlesJS.load(
      "particles",
      "particles.json",
      function () {
        console.log("callback - particles-js config loaded");
      }
    );
    // audioRef.current?.play();
  }, []);

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

    const interval = setInterval(createIcon, 300); // Create a new icon every 300ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="container" className="w-screen h-screen relative">
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
          className="grid place-items-center fixed top-5 left-5  z-[100]"
          icon={<UserTie color="white" />}
        />
      </Popover>
      <div
        id="particles"
        className="top-0 left-0 absolute w-screen h-screen z-30"
      />
      {/* <ThemeController />
       */}
      <div className="wrapper relative w-full h-full flex flex-col z-10">
        {/* <div className="card bg-white/70 shadow-2xl shadow-white/20 p-10 rounded-xl">
          <div className="image bg-white shadow-lg rounded-full p-2">
            <img src="/images/cake.png" alt="cake" className="rounded-full" />
          </div>
          <div className="hub-members"></div>
          <div className="social">
            <div className="socail-icons flex gap-3 my-10 justify-center">
              {socialLinks.map((social) => (
                <a
                  href={social.link}
                  className="icon-wrap bg-white rounded-xl p-1 shadow-lg"
                  title={social.label}
                >
                  <Icon icon={social.icon} height={24} color="grey" />
                </a>
              ))}
            </div>
          </div>
        </div> */}
        <Marquee direction="left">
          {Array.from(new Array(8)).map((_, i) => {
            return (
              <div key={i} className="image-wrap h-[50vh]">
                <img
                  className="h-full brightness-[10%] object-contain"
                  src={`/images/image${i + 1}.jpg`}
                />
              </div>
            );
          })}
        </Marquee>
        <Marquee direction="right">
          {Array.from(new Array(8)).map((_, i) => {
            return (
              <div key={i} className="image-wrap h-[50vh]">
                <img
                  className="h-full brightness-[10%] object-contain"
                  src={`/images/image${i + 1}.jpg`}
                />
              </div>
            );
          })}
        </Marquee>
      </div>

      <div className="music-wrap hidden">
        <audio
          ref={audioRef}
          loop
          src="./olojo-ibi.mp3"
          controls
          autoPlay
        ></audio>
      </div>

      <div className="z-50 max-w-[600px] mx-auto p-4 fixed top-0 left-1/2 -translate-x-1/2 h-screen w-screen flex-col flex">
        <div className="text-xl sm:text-lg md:text-2xl text-center font-black mb-4">
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
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{ enabled: true, prevEl: ".prev", nextEl: ".next" }}
          // pagination={true}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          modules={[Autoplay, Mousewheel, Navigation]}
          className="mySwiper  flex-1 flex-grow m-0"
        >
          {Array.from(new Array(8)).map((_, i) => {
            return (
              <SwiperSlide
                key={i}
                className=" h-full flex items-center justify-center "
              >
                <div
                  key={i}
                  className="image-wrap  relative bg-white w-max max-w-full h-full border-[10px] rounded-3xl overflow-hidden border-solid"
                >
                  <img
                    className="h-full w-auto object-cover"
                    src={`/images/image${i + 1}.jpg`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          className="z-50 overflow-hidden pointer-events-none absolute top-0 left-0 h-full w-full"
          id="icons-container"
        ></div>
        <div className="action absolute flex flex-col gap-3 items-center justify-center top-[20%] right-7 bg-black/60 p-2 px-1 rounded-full z-50">
          <Button
            icon={<UpIcon color="#fff" />}
            shape="circle"
            className="next text-white grid place-items-center p-0"
          />
          <Button
            icon={<UpIcon color="#fff" className="rotate-180" />}
            shape="circle"
            className="prev grid place-items-center p-0"
          />
          <div className="autoplay-progress relative h-10 w-10 flex items-center justify-center font-bold text-white">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <small ref={progressContent}></small>
          </div>
        </div>
        <div className=" z-50 py-4 sm:px-4 w-full text-left text-xs sm:text-sm md:text-base  bg-black/30 text-white">
          Happy birthday to the most amazing brother in the world! OLUWANISHOLA
          AYEOTAN ❤‍🩹 Today marks a special day, a day to celebrate you and all
          the incredible qualities that makes you who you are🫡 I want to take a
          moment to express how grateful I am to have you as my brother. Your
          kindness, empathy, and sense of humor inspire me every day. Your
          unwavering support and guidance have helped shape me into the person I
          am today, and for that, I am forever thankful🙏🏿 On your special day, I
          wish for you to be surrounded by love, laughter, and all your favorite
          things. May your birthday be a reminder of how much you're
          appreciated, admired, and cherished💟🫶 Here's to another incredible
          year of adventures, growth, and making more unforgettable memories! I
          love you, bro, and happy birthday once again🎉❤‍🩹
        </div>
      </div>

      {/* <section className="bottom-nav bottom-0 fixed w-screen py-4 z-10">
        <nav>
          <ul className="nav-links flex gap-4 w-full overflow-auto px-2">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="font-bold bg-white/20 w-max px-4 py-2 rounded-lg shadow-xl min-w-max"
              >
                <a href="#" className="text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section> */}
    </div>
  );
}

export default App;
