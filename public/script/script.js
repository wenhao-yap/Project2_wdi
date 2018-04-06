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

/**
 * ===========================================
 * Semantic UI
 * ===========================================
 */

$('.ui.dropdown')
  .dropdown()
;

$(document).ready(function() {
  $('.ui.form')
    .form({
      fields: {
        username: {
          identifier  : 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your username'
            }
          ]
        },
        email: {
          identifier  : 'email',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your email'
            },
            {
              type   : 'email',
              prompt : 'Please enter a valid e-mail'
            }
          ]
        },
        password: {
          identifier  : 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your password'
            },
            {
	          type   : 'minLength[5]',
	          prompt : 'Your password must be at least {ruleValue} characters'
	        }
          ]
        },
        password2: {
          identifier  : 'password2',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please confirm your password'
            },
            {
			  type   : 'match[password]',
	          prompt : 'Passwords does not match'
            }
          ]
        }
      }
    })
  ;
});

$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;

