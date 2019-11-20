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
				var False=false
			} else {
				var False=true;
				var True=false
			}
			if (True==true) {
				return true
			} else {
				return false
			}
		}
	}
  //check username field
  var usernameExistCheck = firebase.database().ref('/usernames').on("values", function(snapshot) {
    usernameExistCheck = snapshot.val();
    usernameExistCheck = checkEntry(usernameExistCheck, document.getElementById('username').value);
  });
  //check password field
  var passwordExistCheck = firebase.database().ref('/usernames').on("values", function(snapshot) {
    passwordExistCheck = snapshot.val();
    if (passwordExistCheck[document.getElementById('username').value]==hash(document.getElementById('password').value) {
        passwordExistCheck=true;
    }
  });
  if (passwordExistCheck==true && usernameExistCheck==true) {
    window.location.href = "./dashboard.html";
  }
}
