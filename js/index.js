let users = JSON.parse(localStorage.getItem("users")) || [];
let user = null;

// redirect to home page if user is already logged in
if (localStorage.getItem("user") !== null) {
  user = JSON.parse(localStorage.getItem("user"));
  showHome(user.name);
} else {
  showLogIn();
}

function ShowSignUp() {
  document.getElementById("signUpSection").style.display = "block";
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("homSection").style.display = "none";
}

function showLogIn() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("signUpSection").style.display = "none";
  document.getElementById("homSection").style.display = "none";
}

function showHome(name) {
  document.getElementById("homSection").style.display = "block";
  document.getElementById("signUpSection").style.display = "none";
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("username").innerHTML = `Welcome ${name}!!`;
}

function handleSignUp() {
  let name = document.getElementById("signUpName");
  let password = document.getElementById("signUpPassword");
  let email = document.getElementById("signUpEmail");
  let userInfo = {
    name: name.value,
    password: password.value,
    email: email.value,
  };
  let userExists = users.find((user) => user.email === userInfo.email);

  if (
    userInfo.name.length > 3 &&
    userInfo.password.length > 8 &&
    userInfo.email.endsWith(".com") &&
    !userExists
  ) {
    users.push(userInfo);
    user = userInfo;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("users", JSON.stringify(users));
    showHome(user.name);
  } else if (userExists) {
    document.getElementById("warning-userExists").style.visibility = "visible";
  } else {
    document.getElementById("warning-required").style.visibility = "visible";
  }
  clearForm()
}
function clearForm(){
  console.log("tote");
  name.value=" "
   password.value= " "
   email.value=" "

}

function handleLogIn() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let userInfo = {
    email: email.value,
    password: password.value,
  };
  let userExists = users.find(
    (user) =>
      user.email === userInfo.email && user.password === userInfo.password
  );

  if (userExists) {
    user = userExists;
    localStorage.setItem("user", JSON.stringify(userExists));
    showHome(userExists.name);
  } else {
    document.getElementById("warning").style.visibility = "visible";
  }
}

function handleLogout() {
  user = null;
  localStorage.removeItem("user");
  showLogIn();
}

// Event Listeners
document.getElementById("signupBtn").addEventListener("click", function () {
  ShowSignUp();
});
document.getElementById("log-btn").addEventListener("click", function () {
  showLogIn();
});

document.getElementById("sign-btn").addEventListener("click", function () {
  handleSignUp();
});

document.getElementById("login-btn").addEventListener("click", function () {
  handleLogIn();
});

document.getElementById("logout-btn").addEventListener("click", function () {
  handleLogout();
});
