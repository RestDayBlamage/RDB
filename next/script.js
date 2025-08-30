
//------------------------------------------------------------------------------------------------------------   

const scrollProgress = document.getElementById('scroll-progress');
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});
 
//------------------------------------------------------------------------------------------------------------ 

const lenis = new Lenis({
  duration: 1.5, 
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
	direction: 'vertical', 
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 1.5,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

<!-- Theme switcher -->

  // on click of the theme switcher, set local storage item and update CSS
let myTimeout;
$('.button.aperture').on('click', function() {
  clearTimeout(myTimeout);
  $('html').addClass('transition');
  myTimeout = setTimeout(() => {
  	$('html').removeClass('transition');
  }, 750);
  $('html').toggleClass('light-mode');
  if ($('html').hasClass('light-mode')) {
		localStorage.setItem('light-mode', 'true');
  } else {
  	localStorage.removeItem('light-mode');
  }
});

$( document ).ready(function() {
  if ($('html').hasClass('light-mode')) {
    $('.f-light').removeClass('hide');
    $('.f-dark').addClass('hide');
  } else {
    $('.f-light').addClass('hide');
    $('.f-dark').removeClass('hide');
  }
});

// Page transition script © Code by T.RICKS, https://www.tricksdesign.com/
function internalLink(myLink) {
    return (myLink.host == window.location.host);
}
$('a').each(function() {
  if (internalLink(this) && (this).href.indexOf('#') === -1) {
  $(this).click(function(e){
  e.preventDefault();
  var moduleURL = jQuery(this).attr("href");
  setTimeout( function() { window.location = moduleURL }, 1000 );
  // Class that has page out interaction tied to click
  $('.page-transition').click();
});
    }
});

function ready( callback ) {
  if (document.readyState!='loading') callback();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') callback();
  });
}
function addNoReferrerNoOpener() {
  var selector = '[target="_blank"]';
  var externalLinks = document.querySelectorAll( selector );
  for( var i in externalLinks) {
    externalLinks[i].rel = 'noreferrer noopener';
  }
}
ready( function() {
	addNoReferrerNoOpener();
});

Webflow.push(function() {
    $('#copyright').text(new Date().getFullYear());
});

  // Code by T.RICKS, https://www.tricksdesign.com/
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), { rotationX: -90, duration: 0.8, ease: "power2.out", stagger: { amount: 0.8 } });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

//------------------------------------------------------------------------------------------------------------

		
        function toggleBar() {
            const bar = document.getElementById("slideUpBar");
            bar.classList.toggle("show");
        }
		
				
//------------------------------------------------------------------------------------------------------------