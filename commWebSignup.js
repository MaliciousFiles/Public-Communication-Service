function checkForEntry() {
	var ref = firebase.database().ref('/'+document.getElementById('username').value);
    ref.on("value", function(snapshot) {
        console.log(snapshot.val());
    });
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordNotSameError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordNotSameError').innerHTML = ""
	};
};
