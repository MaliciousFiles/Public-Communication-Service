document.getElementsByClassName('navBar')[0].style.top = "-999px";
window.onscroll = function() {
  if (window.pageYOffset > 500) {
    document.getElementsByClassName('navBar')[0].style.top = "0px";
  } else {
    document.getElementsByClassName('navBar')[0].style.top = "-999px";
  };
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
sleep(12000).then(() => {
    if window.pageYOffset < 500 {
      window.scrollTo(0,500);
    };
});

var slideIndex = 1
showSlide(slideIndex)

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function setSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("slideDot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
