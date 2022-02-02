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
document.getElementById("pnanswer").innerHTML="";
document.getElementById("inptPutniNalozi").innerHTML="";
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
document.getElementById("inptPutniNalozi").innerHTML+= "<option>" + putninalogid + "</option>";
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
       + putninalogcijena + " kn"
       + "</td><td scope='col'>"
       + putninalogtrajanje
       + "</td><td scope='col'>"
       + putninalogputnik
       +"</tr>";
});
});

//funkcija koja puni array putnim nalozima

function NapuniArrayPutniNalozi(putninalogid,putninalogaktivan,putninalogodrediste,putninalogdatumpolaska,putninalogdatumpovratka,putninalogcijena,putninalogtrajanje,putninalogputnik,indeksputnognaloga){
putninalozi.push({putninalogid:putninalogid,putninalogaktivan:putninalogaktivan,putninalogodrediste:putninalogodrediste,putninalogdatumpolaska:putninalogdatumpolaska,putninalogdatumpovratka:putninalogdatumpovratka,putninalogcijena:putninalogcijena,putninalogtrajanje:putninalogtrajanje,putninalogputnik:putninalogputnik,indeksputnognaloga:indeksputnognaloga});
}

function createPDF() {
       var sTable = document.getElementById('tablicaputninalog').innerHTML;
       var ukupnacijena = 0;
       var brojacnaloga=0;
       for  (var i=0;i<putninalozi.length;i=i+1)
       {
          ukupnacijena= ukupnacijena + parseFloat(putninalozi[i].putninalogcijena);
          brojacnaloga=brojacnaloga+1;
       }
       var style = "<style>";
       style = style + "table {width: 100%;font: 17px Calibri;}";
       style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
       style = style + "padding: 2px 3px;text-align: center;}";
       style = style + "</style>";

       var win = window.open('', '', 'height=700,width=700');

       win.document.write('<html><head>');
       win.document.write('<title>Ispis putnih naloga</title>');
       win.document.write(style);
       win.document.write('</head>');
       win.document.write('<body>');
       win.document.write(sTable);
       win.document.write("<p><h4>Ukupna cijena: " + ukupnacijena + " kn</h4></p>");
       win.document.write("<p><h4>Ukupno naloga: " + brojacnaloga + "</h4></p>");
       win.document.write('</body></html>');

       win.document.close();

       win.print();
   }

   function createPDFdva() {
          for (var i=0;i<putninalozi.length;i=i+1)
          {
            if ( putninalozi[i].putninalogid == $("#inptPutniNalozi option:selected").text())
            {
              for (var j=0;j<putnici.length;j=j+1)
              {
                if (putnici[j].putnikoib == putninalozi[i].putninalogputnik)
                {
                  for(var k=0;k<gradovi.length;k=k+1)
                  {
                    if (gradovi[k].gradid == putninalozi[i].putninalogodrediste)
                    {
                      var sHTML=
                      '<p>Putni nalog broj: <b>' + $("#inptPutniNalozi option:selected").text() + '</b> izdan je u svrhu putovanja.</p>'
                      sHTML+= '<p>Dana <b>'+ putninalozi[i].putninalogdatumpolaska +'</b> predviđeno je da putnik <b>' + putnici[j].putnikime + ' ' + putnici[j].putnikprezime + '</b> krene iz mjesta <b>Virovitica</b> te datuma <b>'+ putninalozi[i].putninalogdatumpovratka +'</b> dođe na odredište <b>'+ gradovi[k].gradnaziv+'</b>.</p>'
                      sHTML+= '<p>Predviđeno vrijeme trajanja puta je: <b>'+ putninalozi[i].putninalogtrajanje + '</b> dan/a.</p>';
                      sHTML+= '<p>Ukupni trošak puta iznosi: <b>'+ putninalozi[i].putninalogcijena + '</b> kn</p>'
                      sHTML+= '<p>Troškovi prikazani u detalje: </p>';
                      for (var l=0;l<adodatnitroskovi.length;l=l+1)
                      {
                        if (adodatnitroskovi[l].putninalogid == putninalozi[i].putninalogid)
                        {
                          sHTML+= '<p><b>'+adodatnitroskovi[l].opistroska+': '+ adodatnitroskovi[l].cijena +'</b> kn</p>'
                        }
                      }
                      DajCijenuGoriva(gradovi[k].gradlatituda, gradovi[k].gradlongituda);
                      cijenaa = cijenaa +  parseInt(putninalozi[i].putninalogtrajanje)*150;
                      cijenaa = cijenaa.toFixed(2);
                      sHTML+='<p><b>Gorivo: '+ cijenaa +'</b> kn</p>';
                      sHTML+='<p>Cijena goriva se računa tako što se udaljenost između polazišta i odredišta pomnoži sa 2 + ukupno trajanje (u danima) * 150<p>';
                    }
                  }
                }
              }
            }
          }
          var style = "<style>";
          style = style + "padding: 2px 3px;text-align: center;}";
          style = style + "</style>";

          var win = window.open('', '', 'height=700,width=700');

          win.document.write('<html><head>');
          win.document.write('<title>' + $("#inptPutniNalozi option:selected").text() + '</title>')
          win.document.write(style);
          win.document.write('</head>');
          win.document.write('<body>');
          win.document.write(sHTML);
          win.document.write("<br>");
          win.document.write("<p><b>NAPOMENA!</b></p>");
          var day=moment().toDate();
          day = moment(day).format('MM/DD/YYYY, h:mm:ss a');
          win.document.write("<p>Ispis je kreiran datuma:<b>"+ day +"</b> te su stvarne informacije o tom putnom nalogu podložne promjenama!</p>");
          win.document.write('</body></html>');

          win.document.close();

          win.print();
      }

function cijenareturn(cijenik)
{
  cijenaa=(cijenik/1000)*2;
}
    var cijenaa;
function DajCijenuGoriva(latitudagrada, longitudagrada)
{
  var udaljenost;
  var ruta= "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=45.83884665,17.3935425&destinations=" + latitudagrada + "," + longitudagrada +"&key=GGTwO9RkrhNXQknD6PeXW0Lmr6f4Q";
  $.ajax(
  {
    url: ruta,
    type: 'GET',
    datatype: 'json',
    success: function (sOdgovorPosluzitelja)
    {
      cijenareturn(parseFloat(sOdgovorPosluzitelja.rows[0].elements[0].distance.value));

    },
    error: function(XMLHttpRequest, textStatus, exception)
    {
      console.log('Došlo je do pogreške pri učitavanju tablice!!!!');
    },
    async:false
  })
}
