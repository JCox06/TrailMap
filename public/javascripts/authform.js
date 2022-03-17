console.log("Authform working....");

const logonForm = document.querySelector("#logon");
const signupForm = document.querySelector("#signup");
const switchSignUp = document.querySelector("#switchSignup");
const switchLogon = document.querySelector("#switchLogon");

switchLogon.addEventListener("click", function(event) {
  console.log("Hiding sign up form, showing logon form");
  signupForm.style.display = "none";
  logonForm.style.display = "block";
  event.preventDefault();
});

switchSignUp.addEventListener("click", function (event) {
  console.log("Hiding sign up form, showing logon form");
  logonForm.style.display = "none";
  signupForm.style.display = "block";
  event.preventDefault();
});