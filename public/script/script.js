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
let logout2 = document.getElementById('logout2');
if(logout2){
  logout2.addEventListener("click", function(){
    document.getElementById('myform').submit();
  })
}

let toggleDelete = document.getElementById('toggleDelete');
if(toggleDelete){
  toggleDelete.addEventListener("click",function(){ 
      let deleteButts = document.getElementsByClassName("deleteButt");
      for(let i=0; i<deleteButts.length; i++){
          if (deleteButts[i].style.display === "none") {
              deleteButts[i].style.display = "inline";
          } else {
              deleteButts[i].style.display = "none";
          }
      }
      if(deleteButts[deleteButts.length-1].style.display == "none"){
        toggleDelete.textContent="Deletion disabled";
        toggleDelete.classList.remove("active");
      }
      else if(deleteButts[deleteButts.length-1].style.display == "inline"){
        toggleDelete.textContent="Deletion enabled";
        toggleDelete.classList.add("active");
      }
  });
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
        },
        description: {
          identifier  : 'description',
          rules: [
            {
              type   : 'maxLength[100]',
              prompt : 'Please enter at most {ruleValue} characters'
            }
          ]
        },
        arranger: {
          identifier  : 'arranger',
          rules: [
            {
              type   : 'maxLength[20]',
              prompt : 'Please enter at most {ruleValue} characters'
            }
          ]
        },
        search: {
          identifier  : 'search',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a search query'
            }
          ]
        }
      },
      inline : true,
      on     : 'blur'
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

$('.viewLyrics')
  .modal('attach events', '#viewLyrics', 'show')
;
