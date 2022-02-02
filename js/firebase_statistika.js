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
});
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
});

//funkcija koja puni array statusima

function NapuniArrayStatusi(idstatus, statusporuka){
statusi.push({idstatus:idstatus,statusporuka:statusporuka});
}
//////////////////////////////// Grad
var gradovi = new Array();
grad.on('value',function(snap){
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
});
});

//funkcija koja puni array gradovima

function NapuniArrayGradovi(gradid,gradlatituda,gradlongituda,gradnaziv,indeksgrada){
gradovi.push({gradid:gradid,gradlatituda:gradlatituda,gradlongituda:gradlongituda,gradnaziv:gradnaziv,indeksgrada:indeksgrada});
}

//ispis tablice dodatnitroskovi

var adodatnitroskovi = new Array();
dodatnitroskovi.on('value',function(snap)
{
snap.forEach(function(child)
{
var childData=child.val();
var opistroska= childData.opistroska;
var putninalogid= childData.putni_nalog_id;
var trosakid=childData.trosak_id;
var cijena=childData.cijena
var indeksdodatnitroskovi = child.ref_.path.pieces_[1];
NapuniArraydodatnitroskovi(opistroska,putninalogid,trosakid,cijena,indeksdodatnitroskovi);
});
});

//funkcija koja puni array dodatnim troskovima

function NapuniArraydodatnitroskovi(opistroska,putninalogid,trosakid,cijena,indeksdodatnitroskovi)
{
adodatnitroskovi.push({opistroska:opistroska,putninalogid:putninalogid,trosakid:trosakid,cijena:cijena,indeksdodatnitroskovi:indeksdodatnitroskovi});
}

//////////////////////////////// PutniNalog

var putninalozi = new Array();
ref.on('value', function(snap){
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
});
});

//funkcija koja puni array putnim nalozima

function NapuniArrayPutniNalozi(putninalogid,putninalogaktivan,putninalogodrediste,putninalogdatumpolaska,putninalogdatumpovratka,putninalogcijena,putninalogtrajanje,putninalogputnik,indeksputnognaloga){
putninalozi.push({putninalogid:putninalogid,putninalogaktivan:putninalogaktivan,putninalogodrediste:putninalogodrediste,putninalogdatumpolaska:putninalogdatumpolaska,putninalogdatumpovratka:putninalogdatumpovratka,putninalogcijena:putninalogcijena,putninalogtrajanje:putninalogtrajanje,putninalogputnik:putninalogputnik,indeksputnognaloga:indeksputnognaloga});
}




var statgradova = new Array();

$(document).on('click', '#prikazgradova', function() {
  document.getElementById("ganswer").innerHTML="";
  var brojacgradova=0;
  statgradova.length=0;
  for (var i=0;i<gradovi.length;i=i+1)
  {
    brojacgradova=0;
    for (var j=0;j<putninalozi.length;j=j+1)
    {
      if (putninalozi[j].putninalogodrediste == gradovi[i].gradid)
      {
        brojacgradova=brojacgradova+1;
      }
    }
    statgradova.push({gradnaziv:gradovi[i].gradnaziv,brojgradova:brojacgradova});
  }
  for (var i=0;i<statgradova.length;i=i+1)
  {
    document.getElementById("ganswer").innerHTML+="<tr><td scope='col'>" + statgradova[i].gradnaziv + "</td><td scope='col'>"+ statgradova[i].brojgradova + "</td></tr>";
  }
        google.charts.load('current', {callback: drawChart,'packages':['corechart'],'language': 'hr'});

       function drawChart()
       {
         var data = new google.visualization.DataTable();
         x=[]
         data.addColumn('string', 'Ime grada');
         data.addColumn('number', 'Broj ponavljanja');
         for (var i=0;i<statgradova.length;i=i+1)
         {
           x.push( [statgradova[i].gradnaziv, statgradova[i].brojgradova])
         }
         data.addRows(x);
         var options = {
           title: 'Statistika gradova',
           is3D: true,
         };
         var chart = new google.visualization.PieChart(document.getElementById('piechart'));
         chart.draw(data, options);
       }


});


$(document).on('click', '#aktivnostputnihnaloga', function() {
  document.getElementById("apnanswer").innerHTML="";
  var brojacaktivnih=0;
  var brojacneaktivnih=0;
  for (var i=0;i<putninalozi.length;i=i+1)
  {
    if(putninalozi[i].putninalogaktivan== 1)
    {
      brojacaktivnih=brojacaktivnih+1;
    }
    if (putninalozi[i].putninalogaktivan==0)
    {
      brojacneaktivnih=brojacneaktivnih+1;
    }
  }
  document.getElementById("apnanswer").innerHTML+="<tr><td scope='col'>" + brojacaktivnih + "</td><td scope='col'>"+ brojacneaktivnih + "</td></tr>";
});
    var razdvojeni=new Array();
    var pngodine=new Array();
$(document).on('click', '#godputnihnaloga', function() {
    document.getElementById("gpnanswer").innerHTML="";
    var brojacsadasnjagodina=0;
    var brojacjedan=0;
    var brojacdva=0;
    var brojactri=0;
    var brojaccetiri=0;
    var d = new Date();
    var sadasnjagodina= d.getFullYear();
    var jedan=sadasnjagodina-1;
    var dva=sadasnjagodina-2;
    var tri=sadasnjagodina-3;
    var cetiri=sadasnjagodina-4;
    razdvojeni.length=0;
    pngodine.length=0;
    for (var i=0;i<putninalozi.length;i=i+1)
    {
        razdvojeni.push(putninalozi[i].putninalogid.split("-"));
    }
    for (var i=0;i<razdvojeni.length;i=i+1)
    {
      if (razdvojeni[i][0] == sadasnjagodina)
      {
        brojacsadasnjagodina=brojacsadasnjagodina+1;
      }
      if (razdvojeni[i][0] == jedan)
      {
        brojacjedan=brojacjedan+1;
      }
      if (razdvojeni[i][0] == dva)
      {
        brojacdva=brojacdva+1;
      }
      if (razdvojeni[i][0] == tri)
      {
        brojactri=brojactri+1;
      }
      if (razdvojeni[i][0] == cetiri)
      {
        brojaccetiri=brojaccetiri+1;
      }
    }
    document.getElementById("gpnanswer").innerHTML+= "<tr><td scope='col'>" + sadasnjagodina + "</td><td scope='col'>" + brojacsadasnjagodina + "</td></tr>";
    document.getElementById("gpnanswer").innerHTML+= "<tr><td scope='col'>" + jedan + "</td><td scope='col'>" + brojacjedan + "</td></tr>";
    document.getElementById("gpnanswer").innerHTML+= "<tr><td scope='col'>" + dva + "</td><td scope='col'>" + brojacdva + "</td></tr>";
    document.getElementById("gpnanswer").innerHTML+= "<tr><td scope='col'>" + tri + "</td><td scope='col'>" + brojactri + "</td></tr>";
    document.getElementById("gpnanswer").innerHTML+= "<tr><td scope='col'>" + cetiri + "</td><td scope='col'>" + brojaccetiri + "</td></tr>";
});



$(document).on('click', '#vremenskacrta', function() {

  google.charts.load('current', {callback:drawChart,'packages':['timeline'], 'language': 'hr'});
      function drawChart() {
        var containerr = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(containerr);
        var dataTable = new google.visualization.DataTable();
        x=[];
        dataTable.addColumn({ type: 'string', id: 'Putni nalog' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        for (var i=0;i<putninalozi.length;i=i+1)
        {
          var datumpocetak = putninalozi[i].putninalogdatumpolaska.split("/");
          var datumpdan = datumpocetak[1];
          var datumpmjesec=datumpocetak[0];
          var datumpgodina=datumpocetak[2];
          var datumkraj= putninalozi[i].putninalogdatumpovratka.split("/");
          var datumppdan=datumkraj[1];
          var datumppmjesec=datumkraj[0];
          var datumppgodina=datumkraj[2];
          x.push([putninalozi[i].putninalogid,new Date(datumpgodina, parseInt(datumpmjesec)-1,datumpdan), new Date(datumppgodina,parseInt(datumppmjesec)-1 ,datumppdan)]);
        }
        dataTable.addRows(x);

        chart.draw(dataTable);
      }
});
