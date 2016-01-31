$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});
$('#login').click(function(e) {
  e.preventDefault();
  var ref = new Firebase("https://swiftassist.firebaseio.com");
  ref.authWithPassword({
    email    : document.getElementById('myForm').email.value,
    password : document.getElementById('myForm').password.value,
    }, authHandler);
});
function authHandler(error, authData) {
  if (error) {
    alert("Login Failed!"+ error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    window.open("main.html","_self");
  }
}
$('#register').click(function(e) {
  e.preventDefault();
  var ref = new Firebase("https://swiftassist.firebaseio.com");
  ref.createUser({
    email: ""+document.getElementById('secondForm').email.value,
    password: ""+document.getElementById('secondForm').password.value
  }, function(error, userData) {
    if (error) {
      switch (error.code) {
        case "EMAIL_TAKEN":
        console.log("The new user account cannot be created because the email is already in use.");
        break;
        case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        break;
        default:
        console.log("Error creating user:", error);
      }
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      window.open("main.html","_self");
    }
  });
});
