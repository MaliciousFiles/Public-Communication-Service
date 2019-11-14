//location.protocol="http"
require(['fs'], function (fs) {});
function checkForEntry() {
	/*fs.readFile('users.txt', (err, data) => {
		if (err) throw err;
		
		console.log(data.toString());
	});*/
	var rect=(document.getElementById('input').getBoundingClientRect());
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordNotSameError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordNotSameError').innerHTML = ""
	};
	//if (document.getElementById('username').value in readFile(./users.txt)
};