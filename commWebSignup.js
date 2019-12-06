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
firebase.database().ref('/UIDs/""').set("")
function checkForEntry() {
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
	function writeToDatabase(path,username,value) {
		firebase.database().ref(path+'/'+username).set(value);
	}
	function validateEmail(email) 
	{
		var re = /\S+@\S+\.\S+/;
   		return re.test(email);
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
	function getUid() {
		var uid=""
        var uidCheck = firebase.database().ref('/UIDs').on('value', function(snapshot) {
			for (var i=0;i<20;i++) {
				uid+=String(~~(Math.random() * 10))
			}
		})
    	return uid
    }
	//Start checks for username field
	//look for username
	var userCheck = firebase.database().ref('/usernames');
	userCheck.on("value", function(snapshot) {
		userCheck = snapshot.val();
	});
	//if statements
	var userField = false
	if (document.getElementById('username').value=="") {
		document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
	} else if (checkEntry(userCheck, document.getElementById('username').value)==true) {
		document.getElementById('usernameError').innerHTML = "That username is already registered!"
	} else {
		document.getElementById('usernameError').innerHTML = ""
		userField = true
	};
	//start checks for first name field
	//if statements
	var firstNameField = false
	if (document.getElementById('firstName').value=="") {
		document.getElementById('firstNameError').innerHTML = "The first name field can't be blank!"
	} else {
		document.getElementById('firstNameError').innerHTML = ""
		firstNameField = true
	};
	//start checks for last name field
	//if statements
	var lastNameField = false
	if (document.getElementById('lastName').value=="") {
		document.getElementById('lastNameError').innerHTML = "The last name field can't be blank!"
	} else {
		document.getElementById('lastNameError').innerHTML = ""
		lastNameField = true
	};
	//start checks for email field
	//look for email name
	var emailCheck = firebase.database().ref('/emails');
	emailCheck.on("value", function(snapshot) {
		emailCheck = snapshot.val();
	});
	//if statements
	var emailField = false
	if (document.getElementById('email').value=="") {
		document.getElementById('emailError').innerHTML = "The email field can't be blank!"
	} else if ((validateEmail(document.getElementById('email').value)==false)) {
		document.getElementById('emailError').innerHTML = "Please enter a valid email!"
	} else if (checkEntry(emailCheck, document.getElementById('email').value)==true) {
		document.getElementById('emailError').innerHTML = "That email is already registered!"
	} else {
		document.getElementById('emailError').innerHTML = ""
		emailField = true
	};
	//start checks for password field
	//if statements
	var passwordField = false
	if (document.getElementById('password').value=="") {
		document.getElementById('passwordError').innerHTML = "The password field can't be blank!"
	} else {
		document.getElementById('passwordError').innerHTML = ""
		passwordField = true
	};
	//start checks for password check field
	var passwordCheckField = false;
	//if statements
	if (document.getElementById('passwordCheck').value=="") {
		document.getElementById('passwordCheckError').innerHTML = "The password check field can't be blank"
	} else if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = "";
	};
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = "";
		passwordCheckField = true
	};
	//Check for no errors (write to database)
	if (passwordCheckField==true && passwordField==true && emailField==true && lastNameField==true && firstNameField==true && userField==true) {
		var username=document.getElementById('username').value;
		var firstName=document.getElementById('firstName').value;
		var lastName=document.getElementById('lastName').value;
		var email=document.getElementById('email').value;
		var password=hash(document.getElementById('password').value);
		writeToDatabase('/usernames',username,username);
		writeToDatabase('/first names', username,firstName);
		writeToDatabase('/last names', username, lastName);
		writeToDatabase('/emails',username,email);
		writeToDatabase('/passwords',username,password);
		writeToDatabase('/profile images',username,'./newUserImg.png');
		firebase.database().ref('/UIDs').on('value', function(snapshot) {
			do {
				var newUid=getUid();
			} while (checkEntry(snapshot.val(), newUid))
			writeToDatabase('/UIDs',username,newUid);
			document.cookie = "user="+newUid+"; path=/";
		})
		window.location.href = "./commWebDashboard";
	};
}
function checkTimes() {
	var tokenTimeCheck = firebase.database().ref('/reset times')
	tokenTimeCheck.on('value', function(snapshot) {tokenTimeCheck=snapshot.val()
		Object.keys(tokenTimeCheck).forEach(function(key) {
			var currentTime = {'day':new Date().getUTCDate(), 'second':new Date().getUTCHours()*3600+new Date().getUTCMinutes()*60+new Date().getUTCSeconds()}
			var setTime = tokenTimeCheck[key]
			if (currentTime['day'] > setTime['day']) {
				var passedSeconds = 86400-setTime['second'] + currentTime['second']
			} else {
				var passedSeconds = currentTime['second']-setTime['second']
			}
			if (passedSeconds >= 86400) {
				firebase.database().ref('/reset times/'+key).remove()
				firebase.database().ref('/reset tokens/'+document.getElementById('username').value).remove()
			}
		})
	})
}
setInterval(checkTimes, 1000)


