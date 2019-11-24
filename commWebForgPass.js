function sendEmail () {
	firebase.database().ref('/usernames/""').set("")
	firebase.database().ref('/first names/""').set("")
	firebase.database().ref('/last names/""').set("")
	firebase.database().ref('/emails/""').set("")
	firebase.database().ref('/passwords/""').set("")
	firebase.database().ref('/profile images/""').set("")
	function checkEntry(dict,entry) {
		for (index in Object.keys(dict)) {
			if (dict[Object.keys(dict)[index]]==entry) {
				var True=true
			}
		}
			if (True==true) {
				return true
			} else {
				return false
			}
		
	}
  //check username field
  var usernameExistCheck = firebase.database().ref('/usernames');
  usernameExistCheck.on("value", function(snapshot) {
    usernameExistCheck = snapshot.val();
  });
  usernameExistCheck = checkEntry(usernameExistCheck, document.getElementById('username').value);
  //if statements
  if (document.getElementById('username').value=="") {
    document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
  } else if (usernameExistCheck==false) {
    document.getElementById('usernameError').innerHTML = "Username incorrect!"
  } else {
    document.getElementById('usernameError').innerHTML = ""
    var usernameField = true;
  };
  //check password field
  var emailExistCheck = firebase.database().ref('/emails');
  emailExistCheck.on("value", function(snapshot) {
    emailExistCheck = snapshot.val();
  });
  emailExistCheck = checkEntry(emailExistCheck, document.getElementById('email').value);
  //if statements
  if (document.getElementById('email').value=="") {
    document.getElementById('emailError').innerHTML = "The email field can't be blank!"
  } else if (emailExistCheck==false) {
    document.getElementById('emailError').innerHTML = "Email incorrect!"
  } else {
    document.getElementById('emailError').innerHTML = ""
    var emailField = true;
  };
  if (emailField==true && usernameField==true) {
  	Email.send({
		Host: "smtp.elasticemail.com",
		Username: 'mtroalson@gmail.com',
		Password: "f5221373-1006-468d-b46d-ce2054fabf3d",
		To: document.getElementById('email').value,
		From: "publiccommserv@gmail.com",
		Subject: "Reset Your Password | PCS Help",
		Body: "And this is the body"
	})
    window.location.href = "./commWebLogin.html";
  }
}
