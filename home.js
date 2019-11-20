window.onscroll = function() {
  if windowpageYOffset >= 1166 {
    document.getElementById('navBar').style.top = "0px";
  } else {
    document.getElementById('navBar').style.top = "-50px";
  };
}
