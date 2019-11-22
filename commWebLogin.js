function signUp() {
  firebase.database().ref('/usernames/""').set("")
  firebase.database().ref('/first names/""').set("")
  firebase.database().ref('/last names/""').set("")
  firebase.database().ref('/emails/""').set("")
  firebase.database().ref('/passwords/""').set("")
  firebase.database().ref('/profile images/""').set("")
  function hash(string) { 
                var hash = 0; 
                if (string.length == 0) return hash; 
                for (i = 0; i < string.length; i++) { 
                    char = string.charCodeAt(i); 
                    hash = ((hash << 5) - hash) + char; 
                    hash = hash & hash; 
                } 
                return hash; 
  }
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
  console.log(usernameExistCheck)
  usernameExistCheck = checkEntry(usernameExistCheck, document.getElementById('username').value);
  alert(usernameExistCheck)
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
  var passwordExistCheck = firebase.database().ref('/usernames');
  passwordExistCheck.on("value", function(snapshot) {
    passwordExistCheck = snapshot.val();
  });
  if (passwordExistCheck[document.getElementById('username').value]==hash(document.getElementById('password').value)) {
        passwordExistCheck=true;
    };
  //if statements
  if (document.getElementById('password').value=="") {
    document.getElementById('passwordError').innerHTML = "The password field can't be blank!"
  } else if (passwordExistCheck==false) {
    document.getElementById('passwordError').innerHTML = "Password incorrect!"
  } else {
    document.getElementById('passwordError').innerHTML = ""
    var passwordField = true;
  };
  if (passwordField==true && usernameField==true) {
    window.location.href = "./dashboard.html";
  }
}
