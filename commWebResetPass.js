firebase.database().ref('/').on("value", function(snapshot) {
	Object.keys(snapshot.val()).forEach(function(item){
		var temp=snapshot.val()[item]
	})
});
function wait() {}
setInterval(wait, 2500)
function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
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
firebase.database().ref('/usernames/""').set("")
firebase.database().ref('/first names/""').set("")
firebase.database().ref('/last names/""').set("")
firebase.database().ref('/emails/""').set("")
firebase.database().ref('/passwords/""').set("")
firebase.database().ref('/profile images/""').set("")
firebase.database().ref('/reset tokens/""').set("")
firebase.database().ref('/reset times/""').set("")
function validateToken() {
	tokenCheck = firebase.database().ref('/reset tokens')
	tokenCheck.on('value', function(snapshot) {
		tokenCheck=snapshot.val();
	})
	console.log(tokenCheck);
	if (checkEntry(tokenDict, getUrlVars()['token'])==false) {
		document.getElementById('input').setAttribute('class', '')
		document.getElementById('input').setAttribute('style', 'top: 5vh;left: 13%;position: fixed;padding: 20px;')
		document.getElementById('input').innerHTML = '<center><h2 style="font-size: 150px;">Invalid code!</h2></center>'
		document.getElementById('input').setAttribute('id', '');
	}
}

validateToken()

function resetPass() {
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
    function getKeyByValue(object, value) {
	    for( var prop in object ) {
		if( object.hasOwnProperty( prop ) ) {
		     if( object[ prop ] === value )
			 return prop;
		}
	    }
	}
    function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	function writeToDatabase(path,username,value) {
		firebase.database().ref(path+'/'+username).set(value);
	}
	//get token
	var token = getUrlVars()['token']
	//password field
	var passwordField = false
	if (document.getElementById('password').value=="") {
		document.getElementById('passwordError').innerHTML = "The password field can't be blank!"
	} else {
		document.getElementById('passwordError').innerHTML = ""
		passwordField = true
	};
	//start checks for password check field
	var passwordCheckField = false
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
	if (passwordField==true && passwordCheckField==true) {
		var username = firebase.database().ref('/reset tokens')
		username.on('value', function(snapshot) {username=snapshot.val()})
		username = getKeyByValue(username, token)
		var password=hash(document.getElementById('password').value);
		writeToDatabase('/passwords',username,password);
		firebase.database().ref('/reset tokens/'+username).remove()
		window.location.href = "./commWebLogin.html"
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
