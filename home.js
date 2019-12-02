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

var slideIndex = 1
showSlides(slideIndex)

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
  setTimeout("changeSlide(1)", 8000);
}

function goTo(url) {
  window.location.href = url;
}

function checkTimes() {
	var tokenTimeCheck = firebase.database().ref('/reset times')
	tokenTimeCheck.on('value', function(snapshot) {tokenTimeCheck=snapshot.val()
		Object.keys(tokenTimeCheck).forEach(function(key) {
			if (tokenTimeCheck[key] >= 86400) {
				firebase.database().ref('/reset times/'+key).remove()
				firebase.database().ref('/reset tokens/'+document.getElementById('username')).remove()
			} else {
				if (tokenTimeCheck[key]!="") {
					firebase.database().ref('/reset times/'+key).set(tokenTimeCheck[key]+10)
				}
			}
		})
	})
}
setInterval(checkTimes, 10000)
