function checkForEntry() {
	alert(firebase.database().ref('/' + document.getElementById('username').value).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
    }));
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordNotSameError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordNotSameError').innerHTML = ""
	};
};
