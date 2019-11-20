window.onscroll = function() {
  if windowpageYOffset >= 1165.5px {
    document.getElementById('navBar').style.top = "0px";
  } else {
    document.getElementById('navBar').style.top = "-50px";
  };
}
