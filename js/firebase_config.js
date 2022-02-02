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

function Pretraga()
{
  var value = $('#search_field').val();
  var nema=1;
  value= value.replace(/([.^$|*+?()\[\]{}\\-])/g, "\\$1"); // Izbjegavanje pogrešakka pri upisu * i +
  var patt =new RegExp(value,"i");
  $('#pnanswer').find('tr').each(function() {
    if (!($(this).find('td').text().search(patt) >= 0)) {
      $(this).not('.thead').attr("hidden",true);
    }
    if (($(this).find('td').text().search(patt) >= 0)) {
      $(this).attr("hidden",false);
      nema=0;
    }
  });
  var btncheck1 = document.getElementById("btncheck1");
  if (nema == 1 && btncheck1.checked)
  {
      $("#tablicaputninalog").attr("hidden",true);
  }
  if (nema == 0 && btncheck1.checked)
  {
    $("#tablicaputninalog").attr("hidden",false);

  }
  nema=1;
  $('#ganswer').find('tr').each(function() {
    if (!($(this).find('td').text().search(patt) >= 0)) {
      $(this).not('.thead').attr("hidden",true);
    }
    if (($(this).find('td').text().search(patt) >= 0)) {
      $(this).attr("hidden",false);
      nema=0;
    }
  });
  var btncheck3 = document.getElementById("btncheck3");
  if (nema == 1 && btncheck3.checked)
  {
      $("#tablicagrad").attr("hidden",true);
  }
  if (nema == 0 && btncheck3.checked)
  {
    $("#tablicagrad").attr("hidden",false);
  }
  nema=1;
  $('#danswer').find('tr').each(function() {
    if (!($(this).find('td').text().search(patt) >= 0)) {
      $(this).not('.thead').attr("hidden",true);
    }
    if (($(this).find('td').text().search(patt) >= 0)) {
      $(this).attr("hidden",false);
      nema=0;
    }
  });
  var btncheck2 = document.getElementById("btncheck2");
  if (nema == 1 && btncheck2.checked)
  {
      $("#tablicadodatnitroskovi").attr("hidden",true);
  }
  if (nema == 0 && btncheck2.checked)
  {
    $("#tablicadodatnitroskovi").attr("hidden",false);
  }
  nema=1;
  $('#puanswer').find('tr').each(function() {
    if (!($(this).find('td').text().search(patt) >= 0)) {
      $(this).not('.thead').attr("hidden",true);
    }
    if (($(this).find('td').text().search(patt) >= 0)) {
      $(this).attr("hidden",false);
      nema=0;
    }
  });
  var btncheck4 = document.getElementById("btncheck4");
  if (nema == 1 && btncheck4.checked)
  {
    $("#tablicaputnika").attr("hidden",true);
  }
  if (nema == 0 && btncheck4.checked)
  {
    $("#tablicaputnika").attr("hidden",false);
  }
}
  $('#search_field').on('keyup',function() {
  Pretraga();
});


//klik na gumb odjava
$(document).ready(function() {
  $("#odjavise").click(function(){
    firebase.auth().signOut();
  });
});

//postavljanje datetime pickera na hrvatski jezik
$('#datumpolaska input').datepicker({
  language: "hr"
});
//postavljanje datetime pickera na hrvatski jezik
$('#datumpovratka input').datepicker({
  language: "hr"
});



  //učitavam korijena od baze
  var rootRef = firebase.database().ref();
  //kreiram reference na nodove
  var ref = rootRef.child('putninalog');
  var statuss = rootRef.child('status');
  var dodatnitroskovi = rootRef.child('dodatnitroskovi');
  var grad = rootRef.child('grad');
  var putnik = rootRef.child('putnik');

//////////////////////////////// Putnici
var putnici = new Array();
putnik.on('value',function(snap){
  document.getElementById("puanswer").innerHTML="";
  putnici.length=0;
snap.forEach(function(child)
{
var childData=child.val();
var oib = childData.putnik_oib;
var ime = childData.putnik_ime;
var prezime = childData.putnik_prezime;
var email = childData.putnik_email;
var indeksputnika= child.ref_.path.pieces_[1];
NapuniArrayPutnici(oib,ime,prezime,email,indeksputnika);
document.getElementById("puanswer").innerHTML+= "<tr><td scope='col'>" + oib + "</td><td scope='col'>" + ime + "</td><td scope='col'>" + prezime + "</td><td scope='col'>" + email + "</td>" +
"</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#putnikModal'><button class='btn btn-primary' id='btnurediputnika'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></a></td>" +
"</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#obrisiputnikaModal'><button class='btn btn-danger' id='btndelputnika'><i class='fa fa-trash' aria-hidden='true'></i></button></a></td></tr>";
});
Pretraga();
});

//funkcija koja puni array putnicima

function NapuniArrayPutnici(oib,ime,prezime,email,indeksputnika){
  putnici.push({putnikoib:oib,putnikime:ime, putnikprezime:prezime, putnikemail:email,indeksputnika:indeksputnika});
}
//////////////////////////////// Status
var statusi= new Array();
statuss.on('value',function(snap)
{
  statusi.length=0;
  snap.forEach(function(child)
{
  var childData = child.val();
  var idstatus= childData.status_id;
  var statusporuka = childData.status_poruka;
  NapuniArrayStatusi(idstatus,statusporuka);
});
Pretraga();
});

//funkcija koja puni array statusima

function NapuniArrayStatusi(idstatus, statusporuka){
  statusi.push({idstatus:idstatus,statusporuka:statusporuka});
}
//////////////////////////////// Grad
var gradovi = new Array();
grad.on('value',function(snap){
  document.getElementById("ganswer").innerHTML="";
  gradovi.length=0;
  snap.forEach(function(child)
{
  var childData = child.val();
  var indeksgrada = child.ref_.path.pieces_[1];
  var gradid=childData.grad_id;
  var gradlatituda=childData.grad_latituda;
  var gradlongituda=childData.grad_longituda;
  var gradnaziv = childData.grad_naziv;
  NapuniArrayGradovi(gradid,gradlatituda,gradlongituda,gradnaziv,indeksgrada);
  document.getElementById("ganswer").innerHTML +="<tr><td scope='col'>" + gradid + "<td scope='col'>"+ gradnaziv + "<td scope='col'>" + gradlatituda + "<td scope='col'>" + gradlongituda + "</td>" +
  "</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#gradModal'><button class='btn btn-primary' id='btnuredigrad'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></a></td>" +
  "</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#obrisigradModal'><button class='btn btn-danger' id='btngradprepobrisi'><i class='fa fa-trash' aria-hidden='true'></i></button></a></td></tr>";
});
Pretraga();
});

//funkcija koja puni array gradovima

function NapuniArrayGradovi(gradid,gradlatituda,gradlongituda,gradnaziv,indeksgrada){
  gradovi.push({gradid:gradid,gradlatituda:gradlatituda,gradlongituda:gradlongituda,gradnaziv:gradnaziv,indeksgrada:indeksgrada});
}

//ispis tablice dodatnitroskovi

var adodatnitroskovi = new Array();
dodatnitroskovi.on('value',function(snap)
{
  adodatnitroskovi.length=0;
  document.getElementById("danswer").innerHTML="";
  snap.forEach(function(child)
{
  var childData=child.val();
  var opistroska= childData.opistroska;
  var putninalogid= childData.putni_nalog_id;
  var trosakid=childData.trosak_id;
  var cijena=childData.cijena
  var indeksdodatnitroskovi = child.ref_.path.pieces_[1];
  NapuniArraydodatnitroskovi(opistroska,putninalogid,trosakid,cijena,indeksdodatnitroskovi);
  document.getElementById("danswer").innerHTML +="<tr><td scope='col'>" +
   trosakid +
   "</td><td scope='col'>" +
    opistroska +
     "</td><td scope='col'>" +
      putninalogid +
      "</td><td scope='col'>" +
       cijena +
       " kn</td>" +
  "</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#ureditrosakModal'><button class='btn btn-primary' id='btnureditrosak'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></a></td>"
  + "</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#obrisitrosakModal'><button class='btn btn-danger' id='btnobrisitrosak'><i class='fa fa-trash' aria-hidden='true'></i></button></a></td></tr>";
});
Pretraga();
});

//funkcija koja puni array dodatnim troskovima

function NapuniArraydodatnitroskovi(opistroska,putninalogid,trosakid,cijena,indeksdodatnitroskovi)
{
  adodatnitroskovi.push({opistroska:opistroska,putninalogid:putninalogid,trosakid:trosakid,cijena:cijena,indeksdodatnitroskovi:indeksdodatnitroskovi});
}

//////////////////////////////// PutniNalog

var putninalozi = new Array();
  ref.on('value', function(snap){
  document.getElementById("pnanswer").innerHTML = "";
  putninalozi.length=0;

  snap.forEach(function(child)
  {
  var udaljenost;
  var indeksputnognaloga = child.ref_.path.pieces_[1];
  var childData = child.val();
  var putninalogaktivan = childData.putninalog_aktivan;
  var putninalogodrediste = childData.putninalog_odrediste;
  var putninalogdatumpolaska = childData.putninalog_datumpolaska;
  var putninalogdatumpovratka = childData.putninalog_datumpovratka;
  var putninalogcijena = childData.putninalog_cijena;
  var putninalogtrajanje = childData.putninalog_trajanje;
  var putninalogid=childData.putninalog_id;
  var putninalogputnik = childData.putninalog_putnik;
  NapuniArrayPutniNalozi(putninalogid,putninalogaktivan,putninalogodrediste,putninalogdatumpolaska,putninalogdatumpovratka,putninalogcijena,putninalogtrajanje,putninalogputnik,indeksputnognaloga);
for (var i=0;i<gradovi.length;i=i+1)
{
  if (putninalogodrediste==gradovi[i].gradid)
  {
    putninalogodrediste=gradovi[i].gradnaziv;
  }
}
for (var i=0;i<statusi.length;i=i+1)
{
  if (putninalogaktivan==statusi[i].idstatus)
  {
    putninalogaktivan=statusi[i].statusporuka;
  }
}
for (var i=0;i<putnici.length;i=i+1)
{
  if (putninalogputnik==putnici[i].putnikoib)
  {
    putninalogputnik = putnici[i].putnikime + " " + putnici[i].putnikprezime;
  }
}
  document.getElementById("pnanswer").innerHTML +=
  "<tr><td scope='col'>"
  + putninalogid
  + "</td><td scope='col'>"
   + putninalogaktivan
    + "</td><td scope='col'>"
     + putninalogodrediste
      + "</td><td scope='col'>"
       + putninalogdatumpolaska
        + "</td><td scope='col'>"
        + putninalogdatumpovratka
        + "</td><td scope='col'>"
         + putninalogcijena + " kn    <button id='novinalogtrosak' aria-hidden='true' data-bs-toggle='modal' data-bs-target='#putninalogtrosakModal'><i class='fa fa-plus'></i></button>"
         + "</td><td scope='col'>"
         + putninalogtrajanje
         + "</td><td scope='col'>"
         + putninalogputnik
         + "</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#putninalogModal'><button class='btn btn-primary' id='btnuredinalog'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></a></td>"
         + "</td><td scope='col'><a href='#' data-bs-toggle='modal' data-bs-target='#obrisiputninalogModal'><button class='btn btn-danger' id='btnprepoznajpnobrisi'><i class='fa fa-trash' aria-hidden='true'></i></button></a></td>"
         +"</tr>";
  });
  Pretraga();
});

//funkcija koja puni array putnim nalozima

function NapuniArrayPutniNalozi(putninalogid,putninalogaktivan,putninalogodrediste,putninalogdatumpolaska,putninalogdatumpovratka,putninalogcijena,putninalogtrajanje,putninalogputnik,indeksputnognaloga){
  putninalozi.push({putninalogid:putninalogid,putninalogaktivan:putninalogaktivan,putninalogodrediste:putninalogodrediste,putninalogdatumpolaska:putninalogdatumpolaska,putninalogdatumpovratka:putninalogdatumpovratka,putninalogcijena:putninalogcijena,putninalogtrajanje:putninalogtrajanje,putninalogputnik:putninalogputnik,indeksputnognaloga:indeksputnognaloga});
}

//Pritisak na tipku btngradprepobrisi

$(document).on('click', '#btngradprepobrisi', function() {
  var brojacobrisi=0;
  $(this).closest('tr').find('td').each(function()
  {
    brojacobrisi=brojacobrisi+1;
    if (brojacobrisi == 1)
    {
    document.getElementById("idgradadel").innerHTML=$(this).text();
    }
  });
});
//funkcija za pronalazak indeksa grada

function NadiiIndeksGrada(){
  var idgrada=document.getElementById("idgradadel").innerHTML;
  for (var i=0;i<gradovi.length;i=i+1)
  {
    if (idgrada==gradovi[i].gradid)
    {
      return gradovi[i].indeksgrada;
    }
  }
}

//forma dodaj grad

$(document).on('click','#btndodajgrad', function() {
  var spremiid;
  for (var i=0;i<gradovi.length;i=i+1)
  {
     spremiid=gradovi[i].gradid;
  }
  if (isNaN(spremiid)==true)
  {
     spremiid=-1;
  }
  spremiid=parseInt(spremiid)+1;
  $("#idnovoggrada:text").val(spremiid);
});

//Klik na tipku btnnovigraddodaj


$(document).on('click','#btnnovigraddodaj', function() {
  if ($("#nazivnovoggrada:text").val().length > 0)
  {
    if ($("#latitudanovoggrada:text").val().length > 0)
    {
      if ($("#longitudanovoggrada:text").val().length > 0)
      {
        if (parseFloat($("#longitudanovoggrada:text").val()) >= -180 && parseFloat($("#longitudanovoggrada:text").val()) <= 180)
        {
          if (parseFloat($("#latitudanovoggrada:text").val()) >= -90 && parseFloat($("#latitudanovoggrada:text").val()) <= 90)
          {
            var spremigradid;
            for (var i=0;i<gradovi.length;i=i+1)
            {
              spremigradid=gradovi[i].gradid;
            }
            firebase.database().ref('grad/'+ NoviGradIndeks(spremigradid)).set({
              grad_id:$("#idnovoggrada:text").val(),
              grad_latituda:$("#latitudanovoggrada:text").val(),
              grad_longituda:$("#longitudanovoggrada:text").val(),
              grad_naziv:$("#nazivnovoggrada:text").val()
            });
	  alert("Uspješno ste dodali novi grad sa podatcima:\nID Grada: "+ $("#idnovoggrada:text").val()  +"\nLatituda grada: " + $("#latitudanovoggrada:text").val() +"\nLongituda grada: "+ $("#longitudanovoggrada:text").val() +"\nNaziv grada: "+ $("#nazivnovoggrada:text").val());
          }
          else {
            alert("Latituda nije u rasponu od -90 do 90");
          }
        }
        else {
          alert("Longituda nije u rasponu od -180 do 180");
        }
      }
      else {
        alert("Obavezan je unos longitude grada!");
      }
    }
    else {
      alert("Obavezan je unos latitude grada!");
    }
  }
  else {
    alert("Obavezan je unos naziva grada!");
  }
});

//Pronalazak prvog iduceg indeksa u bazi za novi grad

function NoviGradIndeks(idgrad){
  for (var i=0;i<gradovi.length;i=i+1)
  {
    if (idgrad==gradovi[i].gradid)
    {
      var noviid=parseInt(gradovi[i].indeksgrada)+1;
      return noviid;
    }
  }
}

// Klik na tipku btnobrisigrad

$(document).on('click', '#btnobrisigrad', function()
  {
    var pronaden=0;
    for (var i=0;i<gradovi.length;i=i+1)
    {
      if (document.getElementById("idgradadel").innerHTML == gradovi[i].gradid)
      {
          for (var j=0;j<putninalozi.length;j=j+1)
          {
            if (putninalozi[j].putninalogodrediste == gradovi[i].gradid)
            {
              pronaden=1;
            }
          }
      }
      }
      if (pronaden==0)
      {
        firebase.database().ref('grad/'+ NadiiIndeksGrada()).remove();
        alert("Grad uspješno izbrisan");
      }
      if (pronaden==1)
      {
        alert("Grad je povezan sa putnim nalogom, nije ga moguće obrisati!");
      }
    });

// Forma uredi tablice grad, pritisak na tipku #btnuredigrad

  $(document).on('click', '#btnuredigrad', function()
  {
      var brojacuredi=0;
      document.getElementById("idgrada").innerHTML = "";
      $(this).closest('tr').find('td').each(function()
      {
        brojacuredi=brojacuredi+1;
        if (brojacuredi==1)
        {
          var textval = $(this).text();
          document.getElementById("idgrada").innerHTML=textval;
        }
        if (brojacuredi==2)
        {
          var textval=$(this).text();
          $("#nazivgrada:text").val(textval);
        }
        if (brojacuredi==3)
        {
          var textval=$(this).text();
          $("#latituda:text").val(textval);
        }
        if (brojacuredi==4)
        {
          var textval=$(this).text();
          $("#longituda:text").val(textval);
        }
  });
});

//funkcija za pronalazak indeksa grada

function NadiIndeksGrada(){
  var idgrada=document.getElementById("idgrada").innerHTML;
  for (var i=0;i<gradovi.length;i=i+1)
  {
    if (idgrada==gradovi[i].gradid)
    {
      return gradovi[i].indeksgrada;
    }
  }
}

//Klik na #btngradspremi

  $(document).on('click', '#btngradspremi', function() {

    if ($("#longituda:text").val().length > 0)
    {
      if ($("#latituda:text").val().length > 0)
      {
        if ($("#nazivgrada:text").val().length > 0)
        {
          if (parseFloat($("#longituda:text").val()) >= -180 && parseFloat($("#longituda:text").val()) <= 180)
          {
            if (parseFloat($("#latituda:text").val()) >= -90 && parseFloat($("#latituda:text").val()) <= 90)
            {
                firebase.database().ref('grad/'+ NadiIndeksGrada() +'/grad_naziv').set($("#nazivgrada:text").val());
                firebase.database().ref('grad/'+ NadiIndeksGrada() +'/grad_latituda').set($("#latituda:text").val());
                firebase.database().ref('grad/'+ NadiIndeksGrada() +'/grad_longituda').set($("#longituda:text").val());
		alert("Grad uspješno uređen!");
            }
            else {
              alert("Latituda nije u rasponu od -90 do 90");
            }
          }
          else {
            alert("Longituda nije u rasponu od -180 do 180");
          }
        }
        else
        {
          alert("Obavezan je unos naziva grada");
        }
      }
      else
      {
        alert("Obavezan je unos latitude");
      }
    }
    else
    {
      alert("Obavezan je unos longitude");
    }
  });

  var UdaljenostGrada; // varijabla u koju spremam vrijednost udaljenosti, pa je kasnije koristim
  var UdaljenosttGrada; // varijabla u koju spremam vrijednost udaljenosti, pa je kasnije koristim

//funkcija koja vraca udaljenost

function DajUdaljenost(udaljenost){
  UdaljenostGrada=udaljenost;
}

//funkcija koja vraca udaljenost

function DajUdaljenostt(udaljenost){
  UdaljenosttGrada=udaljenost;
}

//Pozivanje na api koji izvlaci udaljenost između dvije točke

function UcitajUdaljenost(latitudagrada, longitudagrada){
  var udaljenost;
  var ruta= "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=45.83884665,17.3935425&destinations=" + latitudagrada + "," + longitudagrada +"&key=GGTwO9RkrhNXQknD6PeXW0Lmr6f4Q";
	$.ajax(
	{
		url: ruta,
		type: 'GET',
		datatype: 'json',
		success: function (sOdgovorPosluzitelja)
		{
      DajUdaljenost(sOdgovorPosluzitelja.rows[0].elements[0].distance.value);

		},
		error: function(XMLHttpRequest, textStatus, exception)
		{
			console.log('Došlo je do pogreške pri učitavanju tablice!!!!');
		},
		async:false
	})
}

//Pozivanje na api koji izvlaci udaljenost između dvije točke

function UcitajUdaljenostt(latitudagrada, longitudagrada){
  var udaljenost;
  var ruta= "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=45.83884665,17.3935425&destinations=" + latitudagrada + "," + longitudagrada +"&key=GGTwO9RkrhNXQknD6PeXW0Lmr6f4Q";
	$.ajax(
	{
		url: ruta,
		type: 'GET',
		datatype: 'json',
		success: function (sOdgovorPosluzitelja)
		{
      DajUdaljenostt(sOdgovorPosluzitelja.rows[0].elements[0].distance.value);

		},
		error: function(XMLHttpRequest, textStatus, exception)
		{
			console.log('Došlo je do pogreške pri učitavanju tablice!!!!');
		},
		async:false
	})
}

//Klik na btnprepoznajpnobrisi

$(document).on('click', '#btnprepoznajpnobrisi', function() {
  var brojacobrisi=0;
  $(this).closest('tr').find('td').each(function()
  {
    brojacobrisi=brojacobrisi+1;
    if (brojacobrisi == 1)
    {
    document.getElementById("idnalogadel").innerHTML=$(this).text();
    }
  });
});

  var indeksi=new Array();
function ObrisiDodatneTroskove(putninalogajd)
{
  indeksi.length=0;
  for (var j=0;j<adodatnitroskovi.length;j=j+1)
  {
    if(adodatnitroskovi[j].putninalogid == putninalogajd)
    {
      indeksi.push(adodatnitroskovi[j].indeksdodatnitroskovi);
    }
  }
  for (var i=0;i<indeksi.length;i=i+1)
  {
      firebase.database().ref('dodatnitroskovi/' + indeksi[i]).remove();
  }
}
//Klik na btnobrisinalog

$(document).on('click', '#btnobrisinalog', function() {
      for (var i=0;i<putninalozi.length;i=i+1)
      {
        if (document.getElementById("idnalogadel").innerHTML == putninalozi[i].putninalogid)
        {
          if (putninalozi[i].putninalogaktivan==1)
          {
            alert("Nije moguće obrisati ovaj putni nalog jer je još uvijek aktivan");
          }
          if (putninalozi[i].putninalogaktivan==0)
          {
            ObrisiDodatneTroskove(putninalozi[i].putninalogid);
            firebase.database().ref('putninalog/'+ putninalozi[i].indeksputnognaloga).remove();
            alert("Putni nalog uspješno izbrisan i svi dodatni troškovi vezani za taj nalog!");
          }
        }
      }
  });

//Klik na btndodajputninalog

$(document).on('click','#btndodajputninalog', function() {
  document.getElementById("statusnovognaloga").innerHTML="";
  document.getElementById("odredistenovognaloga").innerHTML="";
  document.getElementById("putnicinovognaloga").innerHTML="";
  for (var i=0;i<statusi.length;i=i+1)
  {
    document.getElementById("statusnovognaloga").innerHTML += "<option value='"+ statusi[i].idstatus +"'>"+ statusi[i].statusporuka +"</option>";
  }
  for (var i=0;i<gradovi.length;i=i+1)
  {
    document.getElementById("odredistenovognaloga").innerHTML += "<option value='"+ gradovi[i].gradid +"'>"+ gradovi[i].gradnaziv +"</option>";
  }
  for (var i=0;i<putnici.length;i=i+1)
  {
    document.getElementById("putnicinovognaloga").innerHTML+="<option value='" + putnici[i].putnikoib  +"'>"+ putnici[i].putnikime + " " + putnici[i].putnikprezime + "</option>";
  }
  var razdvojeni=new Array();
  var zadnjagodina = 1;
  var pronadenagodina=0;
  var noviid=1;
  for (var i=0;i<putninalozi.length;i=i+1)
  {
    razdvojeni.push(putninalozi[i].putninalogid.split("-"));
    proslijediidnaloga=putninalozi[i].putninalogid;
  }
  for (var i=0;i<razdvojeni.length;i=i+1)
  {
    if (razdvojeni[i][0] == new Date().getFullYear())
    {
      pronadenagodina=1;
      zadnjagodina=razdvojeni[i][1];
    }
  }
  if (pronadenagodina==1)
  {
    noviid=parseInt(zadnjagodina)+1;
  }
  var novidgodina= new Date().getFullYear() + "-" + noviid;
  $("#idnovogputnognaloga:text").val(novidgodina);
});

//Klik na btnnovinalogdodaj
$(document).on('click','#btnnovinalogdodaj', function() {
  var putninalogtrajanje = moment(document.getElementById("datumpovnovognaloga").value).diff(moment(document.getElementById("datumpolnovognaloga").value), 'days');
  var datumprovjera=false;
  for (var i=0;i<putnici.length;i=i+1)
  {
    if ($("#putnicinovognaloga option:selected").val() == putnici[i].putnikoib)
    {
      for (var j=0;j<putninalozi.length;j=j+1)
      {
        if (putnici[i].putnikoib == putninalozi[j].putninalogputnik)
        {
          if (moment(document.getElementById("datumpovnovognaloga").value).isSameOrAfter(putninalozi[j].putninalogdatumpolaska) == true && moment(document.getElementById("datumpovnovognaloga").value).isSameOrBefore(putninalozi[j].putninalogdatumpovratka) == true)
          {
            datumprovjera=true;
          }
        }
      }
    }
  }
  if (document.getElementById("datumpolnovognaloga").value.length>0)
  {
    if (document.getElementById("datumpovnovognaloga").value.length>0)
    {
      if (putninalogtrajanje>=0)
      {
        if (datumprovjera==false)
        {
          var proslijediidnaloga;
          for (var i=0;i<putninalozi.length;i=i+1)
          {
            proslijediidnaloga=putninalozi[i].putninalogid;
          }
          for (var i=0;i<gradovi.length;i=i+1)
          {
            if ($("#odredistenovognaloga option:selected").val() == gradovi[i].gradid)
            {
              UcitajUdaljenostt(gradovi[i].gradlatituda, gradovi[i].gradlongituda);
            }
          }
          var pputninalogtrajanje = moment(document.getElementById("datumpovnovognaloga").value).diff(moment(document.getElementById("datumpolnovognaloga").value), 'days');
          var putninalogcijena = (UdaljenosttGrada/1000)*2;
          putninalogcijena = putninalogcijena + putninalogtrajanje*150;
          putninalogcijena = putninalogcijena.toFixed(2);
          firebase.database().ref('putninalog/'+ NoviNalogIndeks(proslijediidnaloga)).set({
            putninalog_id:$("#idnovogputnognaloga:text").val(),
            putninalog_trajanje:pputninalogtrajanje,
            putninalog_datumpolaska:document.getElementById("datumpolnovognaloga").value,
            putninalog_datumpovratka:document.getElementById("datumpovnovognaloga").value,
            putninalog_aktivan:$( "#statusnovognaloga option:selected" ).val(),
            putninalog_odrediste:$("#odredistenovognaloga option:selected").val(),
            putninalog_putnik:$("#putnicinovognaloga option:selected").val(),
            putninalog_cijena:putninalogcijena
          });
	alert("Uspješno ste dodali novi putni nalog!\nID putnog naloga: "+ $("#idnovogputnognaloga:text").val() +"\nTrajanje putnog naloga (u danima): "+ pputninalogtrajanje +"\nDatum polaska: "+ document.getElementById("datumpolnovognaloga").value +"\nDatum povratka: "+ document.getElementById("datumpovnovognaloga").value  +"\nStatus novog naloga: "+ $( "#statusnovognaloga option:selected" ).text()+"\nOdredište: "+ $("#odredistenovognaloga option:selected").text() +"\nPutnik: "+ $("#putnicinovognaloga option:selected").text() +"\nCijena: " + putninalogcijena+ " kn");
        }
        else {
          alert("Taj putnik je zauzet između tog vremenskog intervala!");
        }
      }
      else {
        alert("Datum polaska je postavljen na kasnije vrijeme od datuma povratka, vaš putni nalog nije kreiran!")
      }
    }
    else {
      alert("Obavezan je unos datuma povratka!");
    }
  }
  else {
    alert("Obavezan je unos datuma polaska!");
  }
});

//Pronalazak indeksa putnog naloga

function NoviNalogIndeks(idnalog){
  for (var i=0;i<putninalozi.length;i=i+1)
  {
    if (idnalog==putninalozi[i].putninalogid)
    {
      var noviid=parseInt(putninalozi[i].indeksputnognaloga)+1;
      return noviid;
    }
  }
}

// Forma uredi tablice putninalog (klik na btnuredinalog)

  $(document).on('click', '#btnuredinalog', function() {
      var brojacuredi=0;
      document.getElementById("idnaloga").innerHTML = "";
      document.getElementById("statuss").innerHTML = "";
      document.getElementById("odrediste").innerHTML ="";
      document.getElementById("putnici").innerHTML="";
      $(this).closest('tr').find('td').each(function()
      {
        brojacuredi=brojacuredi+1;
        if (brojacuredi==1)
        {
          var textval = $(this).text(); // ovo sadržava tekst svakog <td> elementa
          document.getElementById("idnaloga").innerHTML = textval;
        }
        if (brojacuredi==4)
        {
          var textval = $(this).text();
          var $datepicker = $('#datumpol');
          $datepicker.datepicker();
          $datepicker.datepicker('setDate', new Date(textval));
        }
        if (brojacuredi==5)
        {
          var textval = $(this).text();
          var $datepicker = $('#datumpov');
          $datepicker.datepicker();
          $datepicker.datepicker('setDate', new Date(textval));
        }
      });
      for (var i=0;i<putninalozi.length;i=i+1)
      {
        if (document.getElementById("idnaloga").innerHTML == putninalozi[i].putninalogid)
        {
          for (var j=0;j<statusi.length;j=j+1)
          {
            if (putninalozi[i].putninalogaktivan == statusi[j].idstatus)
            {
              document.getElementById("statuss").innerHTML += "<option selected value='"+ statusi[j].idstatus + "'>"+ statusi[j].statusporuka +"</option>";
            }
            else
            {
              document.getElementById("statuss").innerHTML += "<option value='"+ statusi[j].idstatus + "'>"+ statusi[j].statusporuka +"</option>";
            }
          }
          for (var j=0;j<gradovi.length;j=j+1)
          {
            if (putninalozi[i].putninalogodrediste == gradovi[j].gradid)
            {
              document.getElementById("odrediste").innerHTML += "<option selected value='"+ gradovi[j].gradid +"'>"+ gradovi[j].gradnaziv +"</option>";
            }
            else
            {
              document.getElementById("odrediste").innerHTML += "<option value='"+ gradovi[j].gradid +"'>"+ gradovi[j].gradnaziv +"</option>";
            }
          }
          for (var j=0;j<putnici.length;j=j+1)
          {
            if (putninalozi[i].putninalogputnik== putnici[j].putnikoib)
            {
              document.getElementById("putnici").innerHTML+="<option selected value='"+ putnici[j].putnikoib +"'>"+ putnici[j].putnikime + " " + putnici[j].putnikprezime + "</option>";
            }
            else {
              document.getElementById("putnici").innerHTML+="<option value='"+ putnici[j].putnikoib +"'>"+ putnici[j].putnikime + " " + putnici[j].putnikprezime + "</option>";
            }
          }
        }
      }
  });

//Pronalazak indeksa putnog naloga

function NadiIndeksNaloga(){
  var idnaloga=document.getElementById("idnaloga").innerHTML;
  for (var i=0;i<putninalozi.length;i=i+1)
  {
    if (idnaloga==putninalozi[i].putninalogid)
    {
      return putninalozi[i].indeksputnognaloga;
    }
  }
}

// Klik na btnspremi

$(document).on('click', '#btnspremi', function()
{
  putninalogtrajanje = moment(document.getElementById("datumpov").value).diff(moment(document.getElementById("datumpol").value), 'days');
  var datumprovjera=false;
  for (var i=0;i<putnici.length;i=i+1)
  {
    if ($("#putnici option:selected").val() == putnici[i].putnikoib)
    {
      for (var j=0;j<putninalozi.length;j=j+1)
      {
        if (putnici[i].putnikoib == putninalozi[j].putninalogputnik && putninalozi[j].putninalogid != document.getElementById("idnaloga").innerHTML)
        {
          if (moment(document.getElementById("datumpov").value).isSameOrAfter(putninalozi[j].putninalogdatumpolaska) == true && moment(document.getElementById("datumpov").value).isSameOrBefore(putninalozi[j].putninalogdatumpovratka) == true)
          {
            datumprovjera=true;
          }
        }
      }
    }
  }
  if (putninalogtrajanje >=0)
  {
    if (datumprovjera==false)
    {
    firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_datumpolaska').set(document.getElementById("datumpol").value);
    firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_datumpovratka').set(document.getElementById("datumpov").value);
    for (var i=0;i<statusi.length;i=i+1)
    {
      if ($( "#statuss option:selected" ).val() == statusi[i].idstatus)
      {
        firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_aktivan').set(statusi[i].idstatus);
      }
    }
    for (var i=0;i<gradovi.length;i=i+1)
    {
      if ($("#odrediste option:selected").val() == gradovi[i].gradid)
      {
        firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_odrediste').set(gradovi[i].gradid);
        firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_trajanje').set(putninalogtrajanje);
        UcitajUdaljenost(gradovi[i].gradlatituda, gradovi[i].gradlongituda);
      }
    }
    var putninalogcijena = (UdaljenostGrada/1000)*2;
    putninalogcijena = putninalogcijena + putninalogtrajanje*150;
    for(var i=0;i<adodatnitroskovi.length;i=i+1)
    {
      if (adodatnitroskovi[i].putninalogid==document.getElementById("idnaloga").innerHTML)
      {
        putninalogcijena=putninalogcijena + parseFloat(adodatnitroskovi[i].cijena);
      }
    }
    putninalogcijena = putninalogcijena.toFixed(2);
    firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_cijena').set(putninalogcijena);
    alert("Putni nalog je uspješno uređen!");
    for (var i=0;i<putnici.length;i=i+1)
    {
      if ($("#putnici option:selected").val() == putnici[i].putnikoib)
      {
        firebase.database().ref('putninalog/'+ NadiIndeksNaloga() +'/putninalog_putnik').set(putnici[i].putnikoib);
      }
    }
  }
  else {
    alert("Taj putnik je već zauzet između tog vremenskog intervala!");
  }
  }
  else
  {
    alert("Datum polaska je postavljen kasnije od datuma povratka i promjene nisu zapamćene");
  }
});

//klik na button uredi kod tablice putnik

$(document).on('click', '#btnurediputnika', function()
{
  var brojacuredi=0;
  document.getElementById("oibputnika").innerHTML="";
  $(this).closest('tr').find('td').each(function()
  {
    brojacuredi=brojacuredi+1;

    if (brojacuredi == 1)
    {
      var textval = $(this).text();
      document.getElementById("oibputnika").innerHTML+=textval;
    }
    if (brojacuredi==2)
    {
      var textval = $(this).text();
      $("#imeputnika:text").val(textval);
    }
    if (brojacuredi==3)
    {
      var textval = $(this).text();
      $("#prezimeputnika:text").val(textval);
    }
    if (brojacuredi==4)
    {
      var textval = $(this).text();
      $("#emailputnika:text").val(textval);
    }
  });
});

//Klik na button obrisi u formi

$(document).on('click','#btndelputnik',function()
{
  var pronaden=0;
  for (var i=0;i<putnici.length;i=i+1)
  {
    if (document.getElementById("idputnikadel").innerHTML == putnici[i].putnikoib)
    {
        for (var j=0;j<putninalozi.length;j=j+1)
        {
          if (putninalozi[j].putninalogputnik == putnici[i].putnikoib)
          {
            pronaden=1;
          }
        }
    }
    }
    if (pronaden==0)
    {
      firebase.database().ref('putnik/'+ NadiiIndeksPutnika()).remove();
      alert("Putnik uspješno izbrisan");
    }
    if (pronaden==1)
    {
      alert("Putnik je povezan sa putnim nalogom, nije ga moguće obrisati!");
    }
});

// funkcija za trazenje ida Putnika

function NadiiIndeksPutnika(){
  var idputnika=document.getElementById("idputnikadel").innerHTML;
  for (var i=0;i<putnici.length;i=i+1)
  {
    if (idputnika==putnici[i].putnikoib)
    {
      return putnici[i].indeksputnika;
    }
  }
}

//Klik na button obrisi u tablici putnik

$(document).on('click','#btndelputnika',function()
{
  var brojacputdel=0;
  $(this).closest('tr').find('td').each(function()
  {
    brojacputdel=brojacputdel+1;
    if (brojacputdel==1)
    {
      document.getElementById("idputnikadel").innerHTML=$(this).text();
    }
  });
});

// klik na button za spremanje uredenih vrijednosti za pojedinog Putnika

$(document).on('click','#btnputnikspremi', function()
{
  if($("#imeputnika:text").val().length>0)
  {
    if($("#prezimeputnika:text").val().length>0)
    {
      if($("#emailputnika:text").val().length>0)
      {
        if (validateEmail($("#emailputnika:text").val()) == true)
        {
          firebase.database().ref('putnik/'+ NadiIndeksPutnika(document.getElementById("oibputnika").innerHTML) +'/putnik_ime').set($("#imeputnika:text").val());
          firebase.database().ref('putnik/'+ NadiIndeksPutnika(document.getElementById("oibputnika").innerHTML) +'/putnik_prezime').set($("#prezimeputnika:text").val());
          firebase.database().ref('putnik/'+ NadiIndeksPutnika(document.getElementById("oibputnika").innerHTML) +'/putnik_email').set($("#emailputnika:text").val());
          alert("Uspješno su promijenjene informacije o putniku!");
        }
        else {
          alert("Email je krivoga formata!");
        }
      }
      else {
        alert("Obavezan je unos emaila putnika!");
      }
    }
    else {
      alert("Obavezan je unos prezimena putnika!");
    }
  }
  else
  {
    alert("Obavezan je unos imena putnika!");
  }
});

// pronlazanje iz firebasea indeksa Putnika

function NadiIndeksPutnika(oibputnika){
  for (var i=0;i<putnici.length;i=i+1)
  {
    if(oibputnika== putnici[i].putnikoib)
    {
      return putnici[i].indeksputnika;
    }
  }
}

// provjera je li unos email
function validateEmail(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

//tipka dodaj kod novog Putnika

$(document).on('click','#btnputnikdodaj', function()
{
  var pronaden=0;
  var zadnji;
  for (var i=0;i<putnici.length;i=i+1)
  {
    if ($("#oibnovogputnika:text").val() == putnici[i].putnikoib)
    {
      pronaden=1;
    }
    zadnji=putnici[i].indeksputnika;
  }
  if (isNaN(zadnji) == true)
  {
     zadnji=-1;
  }
  if($("#oibnovogputnika:text").val().length>0)
  {
    if($("#oibnovogputnika:text").val().length==11)
    {
      if($("#imenovogputnika:text").val().length>0)
      {
        if($("#prezimenovogputnika:text").val().length>0)
        {
          if($("#emailnovogputnika:text").val().length>0)
          {
            if(pronaden==0)
            {
              if (validateEmail($("#emailnovogputnika:text").val()) == true)
              {
              firebase.database().ref('putnik/'+ parseInt(zadnji+1)).set({
                putnik_email:$("#emailnovogputnika:text").val(),
                putnik_ime:$("#imenovogputnika:text").val(),
                putnik_prezime:$("#prezimenovogputnika:text").val(),
                putnik_oib:$("#oibnovogputnika:text").val()
              });
                alert("Putnik uspješno dodan!\nEmail: " + $("#emailnovogputnika:text").val() + "\nIme: " + $("#imenovogputnika:text").val() + "\nPrezime:" + $("#prezimenovogputnika:text").val() +"\nOIB: " + $("#oibnovogputnika:text").val());
                }
              else {
                alert("Email je krivoga formata");
              }
            }
            else {
              alert("Putnik sa ovim identifikacijskim brojem već postoji!");
            }
          }
          else {
            alert("Obavezan je unos email-a putnika!");
          }
        }
        else {
          alert("Obavezan je unos prezimena putnika!");
        }
      }
      else {
        alert("Obavezan je unos imena putnika");
      }
    }
    else {
      alert("Oib treba sadržavati 11 znamenki!");
    }
  }
  else {
    alert("Obavezan je unos OIB-a!");
  }
});

$(document).on('click','#novinalogtrosak', function() {
   var brojacpnt=0;
  var idputnognaloga="";
  document.getElementById("dosadasnjitroskovi").innerHTML="";
  $(this).closest('tr').find('td').each(function()
  {
    brojacpnt=brojacpnt+1;
    if (brojacpnt==1)
    {
      document.getElementById("trosakpnid").innerHTML= $(this).text();
      idputnognaloga=$(this).text();
    }
  });
  for (var i=0;i<putninalozi.length;i=i+1)
  {
    if (putninalozi[i].putninalogid == idputnognaloga )
    {
      for (var j=0;j<adodatnitroskovi.length;j=j+1)
      {
        if (adodatnitroskovi[j].putninalogid == idputnognaloga)
        {
          document.getElementById("dosadasnjitroskovi").innerHTML+= "<p>"+ adodatnitroskovi[j].opistroska + " - " + adodatnitroskovi[j].cijena + "kn</p>"
        }
      }
    }
  }
});

$(document).on('click','#btndodajtrosak', function() {
  var opis = $("#opisnovogtroska:text").val();
  var cijena = $("#cijenanovogtroska:text").val();
  var pnid = $("#trosakpnid").text();
  var zadnjiid,zadnjiindeks,novacijenapn,indekspn;
  for (var i=0;i<adodatnitroskovi.length;i=i+1)
  {
    zadnjiindeks= adodatnitroskovi[i].indeksdodatnitroskovi;
    zadnjiid= adodatnitroskovi[i].trosakid;
  }
  if (isNaN(zadnjiindeks) == true)
  {
     zadnjiindeks=-1;
  }
  if (isNaN(zadnjiid) == true)
  {
     zadnjiid=-1;
  }
  zadnjiindeks=parseInt(zadnjiindeks) + 1;
  zadnjiid=parseInt(zadnjiid)+1;
  if (cijena.slice(-1) != ".")
  {
    if (opis.length>0)
    {
      if (cijena.length>0)
      {
        cijena=parseFloat(cijena).toFixed(2);
        firebase.database().ref('dodatnitroskovi/'+ zadnjiindeks).set({
          trosak_id:zadnjiid,
          putni_nalog_id:pnid,
          opistroska:opis,
          cijena:cijena
         });
         for (var i=0;i<putninalozi.length;i=i+1)
         {
           if (putninalozi[i].putninalogid== pnid)
           {
            novacijenapn=parseFloat(cijena)+parseFloat(putninalozi[i].putninalogcijena);
            indekspn=putninalozi[i].indeksputnognaloga;
           }
         }
         novacijenapn=novacijenapn.toFixed(2);
         firebase.database().ref('putninalog/'+ indekspn +'/putninalog_cijena').set(novacijenapn);
      }
      else
      {
       alert("Obavezan je unos cijene!");
      }
   }
   else
   {
     alert("Obavezan je unos opisa troška!");
   }
  }
  else
  {
    alert("Nemoguće spremanje cijene kada je na zadnjem mjestu točka");
  }
});

function isNumberKey(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if ($("#cijenanovogtroska:text").val() == "-" && charCode == 46)
     {
       alert("Nije moguće postaviti - pa .");
       return false;
     }
     if (charCode == 46)
     {
       if ($("#cijenanovogtroska:text").val().includes("."))
       {
         alert("Cijena već sadrži decimalnu točku");
        return false;
       }
       if ($("#cijenanovogtroska:text").val() == "")
       {
        alert("Na prvo mjesto ne može ići točka!");
        return false;
       }
     }
     if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje cijene nešto što nije broj/decimalna točka");
        return false;
      }
    else
     {
     return true;
     }
}
function isNumberKeyd(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if ( $("#cijenaureditrosak:text").val() == "-" && charCode == 46)
     {
        alert("Nije moguće postaviti - pa .");
        return false;
     }
     if (charCode == 46)
     {
       if ($("#cijenaureditrosak:text").val().includes("."))
       {
         alert("Cijena već sadrži decimalnu točku");
        return false;
       }
       if ($("#cijenaureditrosak:text").val() == "")
       {
        alert("Na prvo mjesto ne može ići točka!");
        return false;
       }
     }
     if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje cijene nešto što nije broj/decimalna točka");
        return false;
      }
    else
     {
     return true;
     }
}
function isNumberKeyLatt(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if ($("#latituda:text").val() == "-" && charCode == 46)
     {
       alert("Nije moguće postaviti - pa .");
       return false;
     }
     if (charCode == 46)
     {
       if ($("#latituda:text").val().includes("."))
       {
         alert("Latituda već sadrži decimalnu točku");
        return false;
       }
       if ($("#latituda:text").val() == "")
       {
        alert("Na prvo mjesto ne može ići točka!");
        return false;
       }
     }
     if (charCode == 45)
     {
       if ($("#latituda:text").val().includes("-"))
       {
         alert("Latituda već sadrži minus");
        return false;
       }
       if ($("#latituda:text").val().length > 0)
       {
         alert("Minus može ići samo na prvo mjesto");
        return false;
       }
     }
     if (charCode != 46 &&  charCode!=45 && charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje latitude nešto što nije broj/decimalna točka");
        return false;
      }
    else
     {
     return true;
     }
}
function isNumberKeyLat(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if ($("#latitudanovoggrada:text").val() == "-" && charCode==46)
     {
        alert("Nije moguće postaviti - pa .");
        return false;
     }
     if (charCode == 46)
     {
       if ($("#latitudanovoggrada:text").val().includes("."))
       {
         alert("Latituda već sadrži decimalnu točku");
        return false;
       }
       if ($("#latitudanovoggrada:text").val() == "")
       {
        alert("Na prvo mjesto ne može ići točka!");
        return false;
       }
     }
     if (charCode == 45)
     {
       if ($("#latitudanovoggrada:text").val().includes("-"))
       {
         alert("Latituda već sadrži minus");
        return false;
       }
       if ($("#latitudanovoggrada:text").val().length > 0)
       {
         alert("Minus može ići samo na prvo mjesto");
        return false;
       }
     }
     if (charCode != 46 &&  charCode!=45 && charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje latitude nešto što nije broj/decimalna točka");
        return false;
      }
    else
     {
     return true;
     }
}
function isNumberKeyLng(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if ($("#longitudanovoggrada:text").val() == "-" && charCode == 46)
     {
       alert("Nije moguće postaviti - pa .");
       return false;
     }
     if (charCode == 46)
     {
       if ($("#longitudanovoggrada:text").val().includes("."))
       {
         alert("Longituda već sadrži decimalnu točku");
        return false;
       }
       if ($("#longitudanovoggrada:text").val() == "")
       {
        alert("Na prvo mjesto ne može ići točka!");
        return false;
       }
     }
     if (charCode == 45)
     {
       if ($("#longitudanovoggrada:text").val().includes("-"))
       {
         alert("Longituda već sadrži minus");
        return false;
       }
       if ($("#longitudanovoggrada:text").val().length > 0)
       {
         alert("Minus može ići samo na prvo mjesto");
        return false;
       }
     }
     if (charCode != 46 && charCode!=45 && charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje longitude nešto što nije broj/decimalna točka");
        return false;
      }
    else
     {
     return true;
     }
}
function isNumberKeyLngg(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if ($("#longituda:text").val() == "-" && charCode == 46)
     {
       alert("Nije moguće postaviti - pa .");
       return false;
     }
     if (charCode == 46)
     {
       if ($("#longituda:text").val().includes("."))
       {
         alert("Longituda već sadrži decimalnu točku");
        return false;
       }
       if ($("#longituda:text").val() == "")
       {
        alert("Na prvo mjesto ne može ići točka!");
        return false;
       }
     }
     if (charCode == 45)
     {
       if ($("#longituda:text").val().includes("-"))
       {
         alert("Longituda već sadrži minus");
        return false;
       }
       if ($("#longituda:text").val().length > 0)
       {
         alert("Minus može ići samo na prvo mjesto");
        return false;
       }
     }
     if (charCode != 46 && charCode!=45 && charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje longitude nešto što nije broj/minus/decimalna točka");
        return false;
      }
    else
     {
     return true;
     }
}
$(document).on('click','#btnureditrosak', function() {
  var brojacuredi=0;
  var spremitrenutniputninalog;
  document.getElementById("trosakpnodaberi").innerHTML="";
  $(this).closest('tr').find('td').each(function()
  {
    brojacuredi=brojacuredi+1;

    if (brojacuredi == 1)
    {
      var textval = $(this).text();
      document.getElementById("idureditrosaka").innerHTML=textval;
    }
    if (brojacuredi==2)
    {
      var textval = $(this).text();
      $("#opisureditrosak:text").val(textval);
    }
    if (brojacuredi==3)
    {
      var textval = $(this).text();
      spremitrenutniputninalog=textval;
    }
    if (brojacuredi==4)
    {
      var textval = $(this).text();
      textval = textval.slice(0,-3);
      $("#cijenaureditrosak:text").val(textval);
    }
  });
  for (var i=0;i<putninalozi.length;i=i+1)
  {
    if (putninalozi[i].putninalogid == spremitrenutniputninalog)
    {
      document.getElementById("trosakpnodaberi").innerHTML+="<option selected value='"+ putninalozi[i].putninalogid +"'>" + putninalozi[i].putninalogid +"</option>";
    }
    else
    {
      document.getElementById("trosakpnodaberi").innerHTML+="<option value='"+ putninalozi[i].putninalogid +"'>" + putninalozi[i].putninalogid +"</option>";
    }
  }
});
$(document).on('click','#btnureditrosaksave', function() {
  var idtroska=document.getElementById("idureditrosaka").innerHTML;
  var opistroska=$("#opisureditrosak:text").val();
  var putninalogid=$("#trosakpnodaberi option:selected").val();
  var cijenatroska=$("#cijenaureditrosak:text").val();
  var staracijena,stariid;
  for (var i=0;i<adodatnitroskovi.length;i=i+1)
  {
      if(adodatnitroskovi[i].trosakid==idtroska)
      {
	  staracijena=adodatnitroskovi[i].cijena;
	  stariid=adodatnitroskovi[i].putninalogid;
      }
  }
  cijenatroska=parseFloat(cijenatroska);
  cijenatroska = cijenatroska.toFixed(2);
  for (var i=0;i<adodatnitroskovi.length;i=i+1)
  {
    if (adodatnitroskovi[i].trosakid==idtroska)
    {
      if ($("#cijenaureditrosak:text").val().slice(-1)!=".")
      {
      firebase.database().ref('dodatnitroskovi/'+ adodatnitroskovi[i].indeksdodatnitroskovi +'/cijena').set(cijenatroska);
      firebase.database().ref('dodatnitroskovi/'+ adodatnitroskovi[i].indeksdodatnitroskovi +'/opistroska').set(opistroska);
      firebase.database().ref('dodatnitroskovi/'+ adodatnitroskovi[i].indeksdodatnitroskovi +'/putni_nalog_id').set(putninalogid);
      firebase.database().ref('dodatnitroskovi/'+ adodatnitroskovi[i].indeksdodatnitroskovi +'/trosak_id').set(idtroska);
      alert("Trošak uspješno uređen!");
     }
     else
     {
	alert("Nemoguće spremanje cijene kada je na zadnjem mjestu točka");
     }
    }
  }
  for (var i=0;i<putninalozi.length;i=i+1)
  {
      if (putninalozi[i].putninalogid == stariid)
      {
          firebase.database().ref('putninalog/'+ putninalozi[i].indeksputnognaloga +'/putninalog_cijena').set(parseFloat(putninalozi[i].putninalogcijena) - parseFloat(staracijena));
      }
      if (putninalogid == putninalozi[i].putninalogid)
      {
          firebase.database().ref('putninalog/'+ putninalozi[i].indeksputnognaloga +'/putninalog_cijena').set(parseFloat(cijenatroska) + parseFloat(putninalozi[i].putninalogcijena));
      }
  }
})
$(document).on('click','#btnobrisitrosak', function() {
  var brojacuredi=0;
  $(this).closest('tr').find('td').each(function()
  {
    brojacuredi=brojacuredi+1;
    if (brojacuredi == 1)
    {
      var textval = $(this).text();
      document.getElementById("obrisitrosakidd").innerHTML=textval;
    }
  });
});
$(document).on('click','#btnobrisitrosakk', function() {
  for (var i=0;i<adodatnitroskovi.length;i=i+1)
  {
    if (document.getElementById("obrisitrosakidd").innerHTML == adodatnitroskovi[i].trosakid)
    {
      for (var j=0;j<putninalozi.length;j=j+1)
      {
        if (adodatnitroskovi[i].putninalogid == putninalozi[j].putninalogid)
        {
          var novacijena= parseFloat(putninalozi[j].putninalogcijena) - parseFloat(adodatnitroskovi[i].cijena)
          novacijena= novacijena.toFixed(2);
          firebase.database().ref('putninalog/'+ putninalozi[j].indeksputnognaloga +'/putninalog_cijena').set(novacijena);
        }
      }
      firebase.database().ref('dodatnitroskovi/'+ adodatnitroskovi[i].indeksdodatnitroskovi).remove();
      alert("Trošak uspješno izbrisan");
    }
  }

});
function isNumberOib(evt)
   {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode > 31 && (charCode < 48 || charCode > 57))
     {
       alert("Pokušali ste unesti u polje cijene nešto što nije broj");
        return false;
      }
    if($("#oibnovogputnika:text").val().length==11)
    {
      alert("Oib može maksimalno sadržavati 11 znamenki!");
      return false;
    }
    else
     {
     return true;
     }
}

$(document).on('click','#btncheck1', function() {
  var btncheck1 = document.getElementById("btncheck1");
  if (btncheck1.checked)
  {
  $("#tablicaputninalog").attr("hidden",false);
    Pretraga();
}
else {
    $("#tablicaputninalog").attr("hidden",true);
      Pretraga();
}
});
$(document).on('click','#btncheck2', function() {
  var btncheck2 = document.getElementById("btncheck2");
  if (btncheck2.checked)
{
  $("#tablicadodatnitroskovi").attr("hidden",false);
    Pretraga();
}
else {
    $("#tablicadodatnitroskovi").attr("hidden",true);
      Pretraga();
}
});
$(document).on('click','#btncheck3', function() {
  var btncheck3 = document.getElementById("btncheck3");
  if (btncheck3.checked)
{
  $("#tablicagrad").attr("hidden",false);
    Pretraga();
}
else {
    $("#tablicagrad").attr("hidden",true);
      Pretraga();
}
});
$(document).on('click','#btncheck4', function() {
  var btncheck4 = document.getElementById("btncheck4");
  if (btncheck4.checked)
{
  $("#tablicaputnika").attr("hidden",false);
    Pretraga();
}
else {
    $("#tablicaputnika").attr("hidden",true);
      Pretraga();
}
});
