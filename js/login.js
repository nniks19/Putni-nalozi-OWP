  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDtduPtqkMwfiHDw4XvteQG1fR2olUnzys",
    authDomain: "putni-nalozi-b48b0.firebaseapp.com",
    databaseURL: "https://putni-nalozi-b48b0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "putni-nalozi-b48b0",
    storageBucket: "putni-nalozi-b48b0.appspot.com",
    messagingSenderId: "779178589603",
    appId: "1:779178589603:web:51475d1f7dca63dd53ae16",
    measurementId: "G-89EGPVD5T2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//invokes firebase authentication.

const auth = firebase.auth();
 document.querySelector("#show-register").addEventListener("click", () =>
 {
showRegistration();
});
firebase.auth().useDeviceLanguage();
const showRegistration = () =>
{
document.querySelector("#registration-page").classList.remove("hide");
document.querySelector("#login-page").classList.add("hide");
document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#show-login").addEventListener("click", () =>
{
showLogin();
});

const showLogin = () =>
{
document.querySelector("#registration-page").classList.add("hide");
document.querySelector("#login-page").classList.remove("hide");
document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#signout").addEventListener("click", () =>
{
signOut();
});

const register = () =>
{
const email = document.querySelector("#registration-email").value;
const reemail = document.querySelector("#registration-reemail").value;
const password = document.querySelector("#registration-password").value;

if (email.trim() == "")
{
    alert("Upišite email!");
}
else if (password.trim().length < 7)
 {
    alert("Lozinka mora sadržavati barem 7 slova/znamenki/znakova");
}
else if (email != reemail)
{
    alert("Nije dobro ponovno upisan e-mail");
}
else
{
    auth
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error)
{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/invalid-email")
        {
          errorMessage = "Email adresa je krivog formata!";
        }
        if (errorCode == "auth/email-already-in-use")
        {
          errorMessage ="Email je već zauzet!";
        }
        alert(errorMessage);
        // ...
    });
}
};

document.querySelector("#register").addEventListener("click", () =>
{
register();
});

//register when you hit the enter key
document
.querySelector("#registration-password")
.addEventListener("keyup", (e) =>
 {
    if (event.keyCode === 13)
     {
    e.preventDefault();

    register();
    }
});

const login = () =>
{
const email = document.querySelector("#login-email").value;
const password = document.querySelector("#login-password").value;

if (email.trim() == "")
{
    alert("Upišite Email");
}
 else if (password.trim() == "")
{
    alert("Upišite Lozinku");
} else
{
    authenticate(email, password);
}
};

document.querySelector("#login").addEventListener("click", () =>
{
login();
});

//sign in when you hit enter
document
.querySelector("#login-password")
.addEventListener("keyup", (e) =>
{
    if (event.keyCode === 13)
    {
    e.preventDefault();

    login();
    }
});

const authenticate = (email, password) =>
{
const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, password);
firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage;
    if (errorCode == "auth/invalid-email")
    {
      errorMessage = "Email adresa je krivog formata!";
    }
    if (errorCode=="auth/user-not-found")
    {
      errorMessage="Ne postoji korisnik sa tom e-mail adresom!";
    }
    if (errorCode=="auth/wrong-password")
    {
      errorMessage="Unešena je kriva lozinka!";
    }
    if (errorCode=="auth/too-many-requests")
    {
      errorMessage="Previše puta ste se pokušali prijaviti. Probajte kasnije ili resetirajte lozinku pritiskom na Zaboravili ste lozinku?";
    }
    if (errorCode=="auth/network-request-failed")
    {
      errorMessage="Nemate interneta!";
    }
    alert(errorMessage);
    });
};

const showHomepage = () =>
 {
  document.querySelector("#registration-page").classList.add("hide");
  document.querySelector("#login-page").classList.add("hide");
  document.querySelector("#homepage").classList.remove("hide");
};

const signOut = () =>
{
firebase
    .auth()
    .signOut()
    .then(function () {
    location.reload();
    })
    .catch(function (error) {
    alert("Pogreška pri odjavi, provjerite vašu internetsku vezu!");
    });
};

auth.onAuthStateChanged((firebaseUser) => {
if (firebaseUser) {
    showHomepage();
    var delay = 3000;
    setTimeout(function(){ window.location = "nadzornaploca"; }, delay);
}
});

document.querySelector("#forgot-password").addEventListener("click", () =>
{
    const email = document.querySelector("#login-email").value;
    if (email.trim() == "")
    {
    alert("Upišite Email");
    }
    else
    {
    forgotPassword(email);
    }
});

const forgotPassword = (email) =>
{
auth
    .sendPasswordResetEmail(email)
    .then(function ()
    {
    alert("Email je uspješno poslan!");
    })
    .catch(function (error)
    {
    alert("E-mail koji ste upisali nije točan ili vam je internetska veza slaba");
    });
};
