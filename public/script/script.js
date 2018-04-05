let showPassword = document.getElementById('showPassword')
if(showPassword){
	document.getElementById('showPassword').addEventListener("click", function(){
		let status = document.getElementById('password');
		if (status.type === "password") {
	        status.type = "text";
	    } else {
	        status.type = "password";
	    }
	})
}

let logout = document.getElementById('logout');
if(logout){
	logout.addEventListener("click", function(){
		document.getElementById('myform').submit();
	})
}

$(document).ready(function() {
	let myTable = document.getElementById("myTable");
	if(myTable){
		$('#myTable').DataTable();
	}
});