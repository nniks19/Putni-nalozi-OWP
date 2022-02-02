// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig =
{
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
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
    user.providerData.forEach(function (profile) {
      document.getElementById("desniitem").innerHTML += profile.email;
    });

  } else {
    location.replace("index.html");
  }
});
//klik na gumb odjava
$(document).ready(function() {
  $("#odjavise").click(function(){
    firebase.auth().signOut();
  });
});
//establishes root of db
var rootRef = firebase.database().ref();
var grad = rootRef.child('grad');
grad.on('value',function(snap)
{
  document.getElementById("odabirgradruta").innerHTML="";
  snap.forEach(function(child)
{
  var childData = child.val();
  var gradid=childData.grad_id;
  var gradlatituda=childData.grad_latituda;
  var gradlongituda=childData.grad_longituda;
  var gradnaziv = childData.grad_naziv;
  document.getElementById("odabirgradruta").innerHTML += '<option value="' + gradnaziv + '" class="odabranigrad">';
});
});

$("input[name=mojigradovi]").on('change', function()
{
  var pronaden=0;
  var nazivgrada=$(this).val();
  var latitudagrada;
  var longitudagrada;
  grad.on('value',function(snap)
  {
    snap.forEach(function(child)
  {
    var childData = child.val();
    var gradid=childData.grad_id;
    var gradlatituda=childData.grad_latituda;
    var gradlongituda=childData.grad_longituda;
    var gradnaziv = childData.grad_naziv;
    if(nazivgrada == gradnaziv)
    {
      pronaden=1;
      latitudagrada=gradlatituda;
      longitudagrada=gradlongituda;
    }
  });
  });
  if (pronaden ==1)
  {
    var ruta= "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=45.83884665,17.3935425&destinations=" + latitudagrada + "," + longitudagrada +"&key=GGTwO9RkrhNXQknD6PeXW0Lmr6f4Q";
    $.getJSON(ruta, function(data)
    {

          var text = `<div class="infoodredista text-center"><h3>Odredište:</h3> ${data.destination_addresses}<br>
                      <h3>Polazište:</h3> ${data.origin_addresses}<br>
                      <h3>Udaljenost:</h3> ${data.rows[0].elements[0].distance.text}<br>
                      <h3>Cijena (2 kn po km):</h3> ${((parseFloat(data.rows[0].elements[0].distance.value)/1000)*2).toFixed(2) + " kn"}<br></div>`



          $(".tablicarute").html(text);
      });
    }
    if (pronaden==0)
    {
      alert("Unesenog grada nema u bazi podataka");
    }
  });

  function myFunction() {
    var x = document.getElementById("nekitest");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
