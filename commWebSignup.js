var file=fopen('./fs.js', 0)
var str=fread(file, flength(file))
function checkForEntry() {
	fs.readFile('users.txt', (err, data) => {
		if (err) throw err;
		
		alert(data.toString());
	});
	var rect=(document.getElementById('input').getBoundingClientRect());
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordNotSameError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordNotSameError').innerHTML = ""
	};
	//if (document.getElementById('username').value in readFile(./users.txt)
};
