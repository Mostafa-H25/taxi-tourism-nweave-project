import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import * as _ from "lodash";
import hoverEffect from "hover-effect";

/**
 * Configurations /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

// Register Scroll Trigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis();

function raf(time: unknown) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Configure Lenis with GSAP Scroll Trigger
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Resize Window
function onWindowResize() {
  location.reload();
}
const debouncedResize = _.debounce(onWindowResize, 500);
addEventListener("resize", debouncedResize);

/**
 * Navigation Bar /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const menuButton = document.querySelector(
  ".menu-button-wrapper"
) as HTMLDivElement;

const menuPage = document.querySelector(".menu-page") as HTMLElement;
const navigationPageLinks = Array.from(
  document.querySelectorAll(
    ".menu-page > .menu-container > .content > .navigation-list > .navigation-link"
  )
) as HTMLAnchorElement[];

const menuPageTl = gsap.timeline({ paused: true, reversed: true });

menuPageTl
  .to(menuPage, { opacity: 1, pointerEvents: "auto" })
  .to(menuPage.querySelector(".transition-page"), {
    clipPath: `circle(300% at 0% 0%)`,
    duration: 0.2,
    ease: "power2",
  })
  .to(menuPage.querySelector(".transition-page"), {
    clipPath: `circle(300% at 100% 100%)`,
    duration: 0.2,
    ease: "power2",
  })
  .to(menuPage.querySelector(".transition-page"), {
    clipPath: `circle(0% at 100% 100%)`,
    ease: "power2",
  })
  .from(
    ".menu-container > .logo",
    {
      y: "-100vh",
      rotateX: 90,
      duration: 0.5,
    },
    "<"
  )
  .from(
    ".navigation-link",
    {
      x: "-100vw",
      stagger: 0.2,
    },
    "<"
  );

const menuButtonTl = gsap.timeline({ paused: true, reversed: true });

menuButtonTl
  .to(
    menuButton.querySelector("#Layer1"),
    { attr: { d: "M15,15 C15,15,20,25,25,25 S35,15,35,15" } },
    0
  )
  .to(
    menuButton.querySelector("#Layer2"),
    { attr: { d: "M15,35 C15,35,20,25,25,25 S35,35,35,35" } },
    0
  )
  .to(
    menuButton.querySelector("#Layer3"),
    { scaleX: 0, transformOrigin: "50% 50%" },
    0
  )
  .to(menuButton.querySelector("#Layer1"), {
    attr: { d: "M15,15 C15,15,25,25,25,25 S35,15,35,15" },
    duration: 0.1,
  })
  .to(
    menuButton.querySelector("#Layer2"),
    { attr: { d: "M15,35 C15,35,25,25,25,25 S35,35,35,35" }, duration: 0.1 },
    "<"
  );

menuButton.addEventListener("click", () => {
  const navbarLinks = document.querySelector(
    "header > nav > .navbar-center"
  ) as HTMLDivElement;
  let navbarLinksAnimation = gsap.fromTo(
    navbarLinks,
    {
      opacity: 1,
      scale: 1,
      transformOrigin: "left center",
    },
    {
      opacity: 0,
      scale: 0,
    }
  );

  const navbarThemeButton = document.querySelector(
    "header > nav > .navbar-left > .theme-button-wrapper"
  ) as HTMLButtonElement;
  const navbarThemeButtonAnimation = gsap.fromTo(
    navbarThemeButton,
    {
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
    },
    {
      opacity: 0,
      scale: 0,
    }
  );

  const navbarGetTaxiButton = document.querySelector(
    "header > nav > .navbar-left > .get-taxi"
  ) as HTMLButtonElement;
  const navbarGetTaxiButtonAnimation = gsap.fromTo(
    navbarGetTaxiButton,
    {
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
    },
    {
      opacity: 0,
      scale: 0,
    }
  );

  navigationPageLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      menuButtonTl.reverse();
      menuPageTl.reverse();
      if (innerWidth >= 480) {
        if (innerWidth >= 811) {
          navbarLinksAnimation.reverse();
        }
        navbarThemeButtonAnimation.reverse();
        navbarGetTaxiButtonAnimation.reverse();
      }
    });
  });

  if (menuButtonTl.reversed()) {
    menuButtonTl.play();
    menuPageTl.play();
    if (innerWidth >= 480) {
      if (innerWidth >= 811) {
        navbarLinksAnimation.play();
      }
      navbarThemeButtonAnimation.play();
      navbarGetTaxiButtonAnimation.play();
    }
  } else {
    menuButtonTl.reverse();
    menuPageTl.reverse();
    if (innerWidth >= 480) {
      if (innerWidth >= 811) {
        navbarLinksAnimation.reverse();
      }
      navbarThemeButtonAnimation.reverse();
      navbarGetTaxiButtonAnimation.reverse();
    }
  }
});

// const chars =
//   "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";

// const menuNavigationLinks = Array.from(
//   document.querySelectorAll(
//     ".menu-page > .navigation-list > .navigation-link > a"
//   )
// ) as HTMLAnchorElement[];

// menuNavigationLinks.forEach((link) => {
//   link.addEventListener("mouseover", (e) => {
//     let iteration = 0;
//     const interval = setInterval(() => {
//       link.innerText = link.innerText
//         .split("")
//         .map((letter, index) => {
//           if (index < iteration) {
//             return link.getAttribute("data-value")![index];
//           }
//           return chars[Math.floor(Math.random() * (chars.length - 1))];
//         })
//         .join("");
//       if (iteration >= link.getAttribute("data-value")!.length)
//         clearInterval(interval);
//       iteration += 1 / 3;
//     }, 30);
//   });
// });

/**
 * Hero /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const mm = gsap.matchMedia();
const title = document.querySelector(".enchanted") as HTMLSpanElement;
const heroOutro = document.querySelector(".hero-outro") as HTMLElement;

title.addEventListener("click", () => {
  lenis.scrollTo(heroOutro, { duration: 3 });
});
mm.add(
  { isMobile: `(max-width:767px)`, isLaptop: `(min-width:768px)` },
  (context) => {
    let { isMobile } = context.conditions as gsap.Conditions;
    const heroIntroTl = gsap.timeline({});

    onload = () => {
      heroIntroTl
        .from(".background-img", {
          scale: 4,
        })
        .from("header", {
          opacity: 0,
          rotateX: 90,
          transformOrigin: "top",
          duration: 0.5,
        })
        .from(".hero-heading > div > h1", {
          opacity: 0,
          yPercent: 100,
          duration: 0.5,
        })
        .from(".booking-card", {
          opacity: 0,
          xPercent: -100,
          transformOrigin: "left",
          duration: 0.5,
        });
    };

    const heroOutroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-outro",
        end: "end end",
      },
    });

    heroOutroTl
      .to(".background-img", {
        height: "100%",
        borderRadius: 12,
        duration: 2,
        ease: "power2.out",
      })
      .to(".hero-heading", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-heading",
          scrub: true,
          start: "top top",
        },
      })
      .to(".hero-footer", {
        y: isMobile ? "34vh" : "28vh",
        width: "76%",
        scrollTrigger: {
          trigger: ".hero-outro",
          scrub: true,
          end: "end end",
        },
      })
      .to(".hero-intro > .image-wrapper", {
        y: "180%",
        width: "76%",
        height: "52%",
        scrollTrigger: {
          trigger: ".hero-outro",
          scrub: true,
          end: "end end",
        },
      })
      .to(".image-darken", {
        keyframes: {
          opacity: [1, 0, 0, 1],
          rotateX: [0, 0, 180, 180],
        },
        scrollTrigger: {
          trigger: ".hero-outro",
          scrub: true,
          end: "end end",
        },
      })
      .to(
        ".booking-card-wrapper",
        {
          width: "88%",
          y: isMobile ? "92vh" : "84vh",
          scrollTrigger: {
            trigger: ".hero-outro",
            scrub: true,
            end: "end end",
          },
        },
        "<"
      )
      .to(".hero", {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          scrub: true,
          start: "bottom bottom",
          end: "bottom top",
        },
      });
  }
);

/**
 * Page Two /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const svgPath = document.querySelectorAll(
  ".hieroglyphs-strip > svg > path"
) as NodeListOf<SVGPathElement>;

svgPath.forEach((path) => {
  path.style.strokeDasharray = `${path.getTotalLength()}`;
  path.style.strokeDashoffset = `${path.getTotalLength()}`;
  path.style.setProperty(
    "--hieroglyphic-letter-random-timing",
    `${Math.random() * 5}s`
  );
  path.style.setProperty(
    "--hieroglyphic-letter-random-delay",
    `${Math.random() * 5}s`
  );
});

mm.add(
  {
    isMobile: `(max-width:480px)`,
    isTablet: `(min-width:481px)`,
    isLaptop: `(min-width:812px)`,
  },
  (context) => {
    let { isLaptop } = context.conditions as gsap.Conditions;
    const pageTwoTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page-two",
      },
    });

    pageTwoTl
      .set(".enchanting-tapestry > .content-wrapper > h3", {
        x: "58%",
        y: "400%",
      })
      .set(".page-two > .background", { height: "100%" })
      .from(".page-two > .background", {
        xPercent: -150,
        duration: 1,
      })
      .to(".page-two > .background", {
        height: "72%",
      })
      .from(".enchanting-tapestry > .content-wrapper > h3", {
        keyframes: {
          x: ["58%", "0%", "0%"],
          y: ["140%", "140%", "0%"],
          opacity: [0, 1, 1],
          easeEach: "power2.inOut",
        },
        duration: 1.5,
      })
      .from(
        ".enchanting-tapestry > .content-wrapper > p",
        {
          opacity: 0,
        },
        "-=0.5"
      )
      .fromTo(
        ".enchanting-tapestry > .image-wrapper",
        {
          y: "100%",
          x: "-100%",
          opacity: 0,
          ease: "power2.inOut",
        },
        {
          y: 0,
          x: isLaptop ? "-100%" : "0%",
          opacity: 1,
          ease: "power2.inOut",
        },
        "<"
      )
      .from(
        ".enchanting-tapestry > .hieroglyphs-strip",
        {
          yPercent: -100,
          opacity: 0,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(".page-two > .background > svg", {
        keyframes: {
          x: ["-100%", "-50%", "24%", "100%", "200%"],
          y: ["100%", "-50%", "-124%", "-156%", "-200%"],
          rotateZ: [-48, -24, -12, -24, -48, -64],
          scale: [0.1, 1, 1, 1, 0.6, 0.4],
        },
        scrollTrigger: {
          trigger: ".page-three",
          scrub: true,
          toggleActions: "play reverse play reverse",
          start: "-50% bottom",
          end: "top center",
        },
      });
  }
);

/**
 * Page Three /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const locationPhotoWrapper = document.querySelectorAll(
  ".work-photo-item"
) as NodeListOf<HTMLDivElement>;
locationPhotoWrapper.forEach(
  (wrapper, index) =>
    (wrapper.style.zIndex = `${locationPhotoWrapper.length - index}`)
);

const pageThreeTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-three",
  },
});

gsap.set(".work-photo-item", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
});
const anim = gsap.to(".work-photo-item:not(:last-child)", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  stagger: 0.5,
  ease: "none",
});

ScrollTrigger.create({
  trigger: ".splitter",
  start: "top top",
  end: "bottom bottom",
  scrub: 1,
  animation: anim,
});

const companyLogos = gsap.utils.toArray(
  ".trusted-company-list > .company > .company-logo"
) as HTMLImageElement[];
const trustedByImageWrapper = document.querySelector(
  ".trusted-by > .image-wrapper"
) as HTMLDivElement;

let imageHoverAnimation = new hoverEffect({
  parent: trustedByImageWrapper,
  intensity: 0.3,
  image1: "images/nile.jpg",
  image2: "images/nile-2.jpg",
  displacementImage: "images/noise-map.png",
});

pageThreeTl.from(".trusted-by-wrapper > .background", { xPercent: 100 });
companyLogos.forEach((logo, index) => {
  pageThreeTl.fromTo(
    logo,
    {
      yPercent: 150,
      duration: 0.05,
      ease: "power4.out",
      delay: index * 0.025,
    },
    {
      yPercent: 0,
    }
  );
});

/**
 * Page Four /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const pageFourTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-four",
  },
});
pageFourTl
  .to(".page-four > .main > .main-heading", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".page-four > .main > .sub-heading > .image-wrapper",
      scrub: true,
      start: "top 25%",
      end: "bottom 75%",
    },
  })
  .to(".page-four > .main > .sub-heading > .image-wrapper", {
    scale: 0.68,
    transformOrigin: "top center",
    scrollTrigger: {
      trigger: ".page-four > .main > .sub-heading > .image-wrapper",
      scrub: true,
      start: "top bottom",
      end: "center 60%",
    },
  });

/**
 * Page Five /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const slider = document.querySelector(
  ".team-wrapper > .slider"
) as HTMLDivElement;

const sliderTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-five",
    pin: true,
    scrub: true,
    start: "top top",
    end: `${slider.offsetWidth} bottom`,
  },
});

sliderTl.to(slider, { xPercent: -75 });

/**
 * Button /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const btns = document.querySelectorAll(
  ".button"
) as NodeListOf<HTMLButtonElement>;

if (btns.length) {
  btns.forEach((btn) => {
    // Button Rotate
    btn.addEventListener("mousemove", (e: MouseEvent) => {
      let rect = btn.getBoundingClientRect();
      let rotateX = -(e.clientY - rect.y - rect.height / 2) / 2;
      let rotateY = (e.clientX - rect.x - rect.width / 2) / 10;
      btn.style.transform = `perspective(100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `perspective(100px) rotateX(0deg) rotateY(0deg)`;
    });

    const btnBackground = btn.querySelector(
      ".button-bg"
    ) as HTMLSpanElement | null;

    if (btnBackground) {
      // Button Hover
      btn.addEventListener("mouseenter", (e: MouseEvent) => {
        let rect = btn.getBoundingClientRect();
        let y = e.clientY - rect.top;
        let x = e.clientX - rect.left;
        let shiftX = (x / rect.width) * 200 - 100;
        let shiftY = (y / rect.height) * 200 - 100;
        btnBackground.animate(
          [
            { transform: `translate(${shiftX}%, ${shiftY}%)` },
            { transform: `translate(0%, 0%)` },
          ],
          {
            duration: 200,
            easing: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
          }
        );
      });
      btn.addEventListener("mouseleave", (e: MouseEvent) => {
        let rect = btn.getBoundingClientRect();
        let y = e.clientY - rect.top;
        let x = e.clientX - rect.left;
        let shiftX = (x / rect.width) * 200 - 100;
        let shiftY = (y / rect.height) * 200 - 100;
        btnBackground.animate(
          [
            { transform: `translate(0%, 0%)` },
            { transform: `translate(${shiftX}%, ${shiftY}%)` },
          ],
          {
            duration: 200,
            easing: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
          }
        );
      });
    }
  });
}

/**
 * Cursor /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

const cursor = document.querySelector(".cursor") as HTMLDivElement;

const mouse = {
  x: 0,
  y: 0,
};

addEventListener("mousemove", (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  cursor.style.left = `${mouse.x}px`;
  cursor.style.top = `${mouse.y}px`;
  cursor.style.transform = `translate(-50%, -50%)`;
});

//Cursor Update
const cursorZ = document.querySelectorAll(".cursor-scale-z");
const cursorM = document.querySelectorAll(".cursor-scale-m");
const cursorL = document.querySelectorAll(".cursor-scale-l");

cursorZ.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-zero");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-zero");
  });
});

cursorM.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-medium");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-medium");
  });
});

cursorL.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-large");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-large");
  });
});

/**
 * Theme Button /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

// const toggleTheme = document.querySelector(
//   ".theme-button-wrapper"
// ) as HTMLDivElement;

// // Check Theme Preferences on window load
// addEventListener("load", () => {
//   if (
//     localStorage.getItem("theme") === "dark" ||
//     matchMedia("(prefers-color-schema: dark)").matches
//   ) {
//     toggleTheme.firstElementChild?.classList.add("theme-button-dark");
//     document.documentElement.classList.add("dark");
//     localStorage.setItem("theme", "dark");
//   }
// });

// // Toggle Theme Preference
// toggleTheme.addEventListener("click", () => {
//   if (toggleTheme.firstElementChild?.classList.contains("theme-button-dark")) {
//     toggleTheme.firstElementChild?.classList.remove("theme-button-dark");
//     document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", "light");
//   } else {
//     toggleTheme.firstElementChild?.classList.add("theme-button-dark");
//     document.documentElement.classList.add("dark");
//     localStorage.setItem("theme", "dark");
//   }
// });
