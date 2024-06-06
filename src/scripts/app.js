"user strict";

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// LENIS SCROLL /////////////////////////////////////////////////////////////////

$(function () {

	//Lenis Smooth scroll
	const lenis = new Lenis({
		duration: 1.2,
	});
	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)

	//Integration Lenis on GSAP ScrollTrigger
	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000)
	})
});

// BURGER MENU ////////////////////////////////////////////////////////////////////

var burgerMenu = document.querySelector('.burger__menu');
var menu = document.querySelector('.menu');

if (burgerMenu) {
    burgerMenu.addEventListener('click', function () {
        this.classList.toggle('designopen');
        menu.classList.toggle('menu--open');
    });
}

var projets = document.querySelector('.imgProjets');
if(projets != null || projets != undefined){

// SECTION PROJETS /////////////////////////////////////////////////////////////////

const img = gsap.timeline({
  scrollTrigger: {
    trigger: ".imgProjets",
    scrub: true, 
    start: "top 100%",
    end: "+=50%"
  }
}).from(".imgProjets", {
  scale: 0.85, 
  ease: "none"
});

let pinOptions = ScrollTrigger.create({
  trigger: ".projets",
  pin: true,
  scrub: true,
  start: "top 0%",
  endTrigger: ".section__skills"
});

var li = document.querySelectorAll('.medium__li');
var imgProjets = document.querySelector('.imgProjets');

var imgs = [
  "assets/images/TFA.png",
  "assets/images/dataplay.png",
  "assets/images/RUX.png",
  "assets/images/Iolce.png",
  "assets/images/Helloworld.png"
];

function parallax() {
  var scrollTop = window.scrollY;    
  var optionsElPositionX = pinOptions.start;
  var liSize = 300;
  var min = optionsElPositionX;
  var max = optionsElPositionX + li.length * liSize;

  if(scrollTop >= min && scrollTop <= max) {
    var activeIndex = Math.abs(Math.ceil((scrollTop - optionsElPositionX - liSize) / liSize));
    var active = document.querySelector(".medium__li.active");
    if (active) active.classList.remove("active");
    li[activeIndex].classList.add("active");

    imgProjets.style.backgroundImage = "url('" + imgs[activeIndex] + "')";
    imgProjets.innerHTML = `<a href="${li[activeIndex].querySelector('a').href}" target="_blank" style="display:block; width:100%; height:100%;"></a>`;
  }
}

window.addEventListener('scroll', parallax);

parallax();

// SWIPER SECTION AFTER EFFECTS //////////////////////////////////////////
  
window.addEventListener('scroll', parallax);

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
});

// SVG CIRCLE ///////////////////////////////////////////////////////////////////////

var path = document.querySelector(".path");
console.log("Longueur du path : " + path.getTotalLength());

gsap.registerPlugin(ScrollTrigger);

const containers = document.querySelectorAll(".projets__container");

containers.forEach(container => {
  const path = container.querySelector(".path");
  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    scrollTrigger: {
      trigger: container.querySelector(".title--med__align"),
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none none",
    }
  });
});

// AFFICHAGE VIDEOS SWIPER ////////////////////////////////////////////////////////

var modal = document.getElementById("videoModal");
var modalVideo = document.getElementById("modalVideo");
var closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll('.swiper-slide').forEach(function (slide) {
  slide.addEventListener('click', function () {
    var videoSrc = slide.getAttribute('data-video');
    modalVideo.src = videoSrc;
    modal.style.display = "block";
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
  modalVideo.src = "";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
};

// ANIM TITLE BIG /////////////////////////////////////////////////////////////////////

if (window.matchMedia("(min-width: 768px)").matches) {

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pad__title",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});

tl.from(".title--big span", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power4.out",
  stagger: 0.3
})
.to(".title--big span", {
  duration: 1,
  rotation: 360,
  scale: 1.2,
  color: "#203030",
  stagger: 0.3
})
.to(".title--big span", {
  duration: 1,
  scale: 1,
  color: "#AB463F",
  stagger: 0.3
});
}
}

// ANIM PAGE STAGE ///////////////////////////////////////////////////////////////////s

gsap.registerPlugin(ScrollTrigger);

function scrollTrig() {

    let gsapAnim = gsap.utils.toArray('.gsap__anim');
    gsapAnim.forEach(section => {
        gsap.fromTo(section, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top center',
                scrub: true,
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            ease: 'power2.out'
        });
    });
}

scrollTrig();

// ANIM HOVER VIDEOS ///////////////////////////////////////////////////////////////////////

const videoItems = document.querySelectorAll('.serv__item');

videoItems.forEach(item => {
  const video = item.querySelector('.hover-video');

  video.muted = true;

  item.addEventListener('mouseenter', function () {
    console.log('Mouse entered', video);
    video.currentTime = 0; // Rembobiner la vidéo au début à chaque hover
    video.play().then(() => {
      video.muted = false;
      console.log('Video is playing.');
    }).catch((error) => {
      console.error('Error playing video:', error);
    });
  });

  item.addEventListener('mouseleave', function () {
    console.log('Mouse left', video);
    video.muted = true;
    video.pause();
    video.currentTime = 0;
  });
});

// ANIM GSAP IMG ///////////////////////////////////////////////////////////////////

var Animation = document.querySelectorAll('.gri4');
Animation.forEach(function (element) {
  gsap.from(element, {
    opacity: 0,
    x: -150,
    duration: 2, 
    ease: "power2.out", 
    scrollTrigger: {
      trigger: element,
      start: 'top 80%', 
      end: 'bottom 100%',
      scrub: true
    }
  });
});

// ANIM GSAP TEXTES /////////////////////////////////////////////////////////////////

gsap.utils.toArray('.skills__para__flex').forEach((element) => {
  gsap.fromTo(element, 
    { opacity: 0,
      y: 50
    }, 
    {
      opacity: 1, 
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 40%',  
        scrub: true
      }
    }
  );
});











