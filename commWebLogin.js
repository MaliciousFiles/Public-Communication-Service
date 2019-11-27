firebase.database().ref('/').on("value", function(snapshot) {
	Object.keys(snapshot.val()).forEach(function(item){
		var temp=snapshot.val()[item]
	})
});
firebase.database().ref('/usernames/""').set("")
firebase.database().ref('/first names/""').set("")
firebase.database().ref('/last names/""').set("")
firebase.database().ref('/emails/""').set("")
firebase.database().ref('/passwords/""').set("")
firebase.database().ref('/profile images/""').set("")
firebase.database().ref('/reset tokens/""').set("")
firebase.database().ref('/reset times/""').set("")
function signUp() {
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
  var userExistCheck = firebase.database().ref('/usernames');
  userExistCheck.on("value", function(snapshot) {
    userExistCheck = snapshot.val();
  });
  userExistCheck = checkEntry(userExistCheck, document.getElementById('username').value);
  var emailExistCheck = firebase.database().ref('/emails');
  emailExistCheck.on("value", function(snapshot) {
	  emailExistCheck = snapshot.val();
  });
  emailExistCheck = checkEntry(emailExistCheck, document.getElementById('username').value);
  if (emailExistCheck || userExistCheck) {
    var usernameExistCheck = true;
	} else {
		var usernameExistCheck = false;
	}
  //if statements
  if (document.getElementById('username').value=="") {
    document.getElementById('usernameError').innerHTML = "The username/email field can't be blank!"
  } else if (usernameExistCheck==false) {
    	document.getElementById('usernameError').innerHTML = "Username/email incorrect!";
  } else {
    document.getElementById('usernameError').innerHTML = ""
    var usernameField = true;
  };
  //check password field
  var passwordExistCheck = firebase.database().ref('/passwords');
  passwordExistCheck.on("value", function(snapshot) {
    passwordExistCheck = snapshot.val();
  });
  if (passwordExistCheck[document.getElementById('username').value]==hash(document.getElementById('password').value)) {
        passwordExistCheck=true;
  } else {
    	passwordExistCheck=false;
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
    window.location.href = "./commWebDashboard.html";
  }
}
function checkTimes() {
	var tokenTimeCheck = firebase.database().ref('/reset times')
	tokenTimeCheck.on('value', function(snapshot) {tokenTimeCheck=snapshot.val()})
	Object.keys(tokenTimeCheck).forEach(function(key) {
		if (tokenTimeCheck[key] >= 86400) {
			firebase.database().ref('/reset times/'+key).remove()
		} else {
			if (tokenTimeCheck[key]!="") {
				firebase.database().ref('/reset times/'+key).set(tokenTimeCheck[key]+1)
			}
		}
	})
}
setInterval(checkTimes, 1000)

