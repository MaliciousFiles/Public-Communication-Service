window.onscroll = function() {
  if windowpageYOffset >= 200vh {
    document.getElementById('navBar').style.top = "0px";
  } else {
    document.getElementById('navBar').style.top = "-50px";
  };
}
