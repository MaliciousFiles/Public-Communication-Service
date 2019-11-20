document.getElementsByClassName('navBar')[0].style.top = "-999px";
window.onscroll = function() {
  if (window.pageYOffset > 500) {
    document.getElementsByClassName('navBar')[0].style.top = "0px";
  } else {
    document.getElementsByClassName('navBar')[0].style.top = "-999px";
  };
}
