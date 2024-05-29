"user strict";

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// PAGE STAGE /////////////////////////////////////////////////////////////////

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

var projets = document.querySelector('.imgProjets');
if(projets != null || projets != undefined){

// SECTION PROJETS /////////////////////////////////////////////////////////////////

// GSAP animation for imgProjets
const img = gsap.timeline({
  scrollTrigger: {
    // markers: true, // Uncomment for debugging
    trigger: ".imgProjets",
    scrub: true, 
    start: "top 100%",
    end: "+=50%"
  }
}).from(".imgProjets", {
  scale: 0.85, 
  ease: "none"
});

// Pin the .projets section
let pinOptions = ScrollTrigger.create({
  trigger: ".projets",
  pin: true,
  scrub: true,
  start: "top 0%",
  endTrigger: ".section__skills"
});

// Select all .medium__li elements and the .imgProjets element
var li = document.querySelectorAll('.medium__li');
var imgProjets = document.querySelector('.imgProjets');

// Array of image URLs
var imgs = [
  "assets/images/TFA.png",
  "assets/images/dataplay.png",
  "assets/images/RUX.png",
  "assets/images/Iolce.png",
  "assets/images/Helloworld.png"
];

// Function to handle parallax effect
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

// Listen for the scroll event and trigger parallax function
window.addEventListener('scroll', parallax);

// Initial call to set the first image
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
    // pagination: {
    //   el: ".swiper-pagination",
    // },
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

}

// PAGE STAGE ///////////////////////////////////////////////////////////////////////

const videoItems = document.querySelectorAll('.serv__item');

videoItems.forEach(item => {
    const video = item.querySelector('.hover-video');

    item.addEventListener('mouseenter', function () {
        console.log('Mouse entered', video);
        video.muted = false;
        video.play().then(() => {
            console.log('Video is playing with sound.');
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

// CURSOR //////////////////////////////////////////////////////////////////

// const coords = { x: 0, y: 0 };
// const circles = document.querySelectorAll(".circle");

// const colors = [
//   "#C25048"
// ];

// circles.forEach(function (circle, index) {
//   circle.x = 0;
//   circle.y = 0;
//   circle.style.backgroundColor = colors[index % colors.length];
// });

// window.addEventListener("mousemove", function(e){
//   coords.x = e.clientX;
//   coords.y = e.clientY;
  
// });

// function animateCircles() {
  
//   let x = coords.x;
//   let y = coords.y;
  
//   circles.forEach(function (circle, index) {
//     circle.style.left = x - 12 + "px";
//     circle.style.top = y - 12 + "px";
    
//     circle.style.scale = (circles.length - index) / circles.length;
    
//     circle.x = x;
//     circle.y = y;

//     const nextCircle = circles[index + 1] || circles[0];
//     x += (nextCircle.x - x) * 0.3;
//     y += (nextCircle.y - y) * 0.3;
//   });
 
//   requestAnimationFrame(animateCircles);
// }

// animateCircles();

var burgerMenu = document.querySelector('.burger__menu');
var menu = document.querySelector('.menu');

if (burgerMenu) {
    burgerMenu.addEventListener('click', function () {
        this.classList.toggle('designopen');
        menu.classList.toggle('menu--open');
    });
}







