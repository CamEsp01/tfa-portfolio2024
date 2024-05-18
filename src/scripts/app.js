"user strict";

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SECTION PROJETS /////////////////////////////////////////////////////////////////

const img = gsap.timeline({
    scrollTrigger: {
      // markers: true,
      trigger: ".imgProjets",
      scrub: true, 
      start: "top 100%",
      end: "+=50%"
    }
  })
  
  .from(".imgProjets", {
    scale: 0.85, 
    ease: "none"
  })
  
  
  let pinOptions = ScrollTrigger.create({
    trigger: ".projets",
    pin: true,
    scrub: true,
    trigger: ".projets",
    start: "top 0%",
    endTrigger: ".section__skills",
  });
  
  var li = document.querySelectorAll('.medium__li');
  var imgProjets = document.querySelector('.imgProjets');
  
  var imgs = [
    "../assets/images/TFA.png",
    "../assets/images/RUX.png",
    "../assets/images/Iolce.png",
    "../assets/images/Helloworld.png",
  ]
  
  function parallax(){
      var scrollTop = window.scrollY;    
      var optionsElPositionX = pinOptions.start;
      var liSize = 300;
      var min = optionsElPositionX
      var max = optionsElPositionX + li.length * liSize;
  
      if(scrollTop >= min && scrollTop <= max){
        var activeIndex = Math.abs(Math.ceil((scrollTop - optionsElPositionX -liSize) / liSize));
        var active = document.querySelector(".active");
        active.classList.remove("active");
        li[activeIndex].classList.add("active");
  
        imgProjets.style.backgroundImage = "url('" + imgs[activeIndex] + "')";
      }    
  }
  
  window.addEventListener('scroll', parallax);

// PAGE STAGE /////////////////////////////////////////////////////////////////

//   $(function () {

// 	'use strict';


// 	//Lenis Smooth scroll
// 	const lenis = new Lenis({
// 		duration: 1.2,
// 	});
// 	function raf(time) {
// 		lenis.raf(time)
// 		requestAnimationFrame(raf)
// 	}

// 	requestAnimationFrame(raf)

// 	//Integration Lenis on GSAP ScrollTrigger
// 	lenis.on('scroll', ScrollTrigger.update)

// 	gsap.ticker.add((time) => {
// 		lenis.raf(time * 1000)
// 	})

// 	//Create animation
// 	function scrollTrig() {

// 		gsap.registerPlugin(ScrollTrigger);

// 		let gsapAnim = gsap.utils.toArray('.gsap__anim');
// 		gsapAnim.forEach(section => {
// 			gsap.to(section, {
// 				scrollTrigger: {
// 					trigger: section,
// 					start: 'bottom bottom',
// 					end: 'bottom top',
// 					scrub: true,
// 					snap: true
// 				},
// 				yPercent: 100,
// 				ease: 'none'
// 			});
// 		});

	
// 	}
// 	scrollTrig();


// });
