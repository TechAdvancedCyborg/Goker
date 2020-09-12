var oldlog = "";

/* Game Logic/Client */
var addnumber = 1;
var money = 100;
var hasjoined = false;
var handdata = "";

function addmore(){
  if (money > addnumber){
    addnumber++;
    document.getElementById("moneytoadd").innerHTML=addnumber;
  }
}
function addless(){
  if (1 < addnumber){
    addnumber--;
    document.getElementById("moneytoadd").innerHTML=addnumber;
  }
}



/* Networking */

function requestgamestart() {
    responseax = axios.get(window.location + "/start").then((response) => {
        console.log(response.data);
        alert(response.data);
    });
}

function joingame(){
  responseax = axios.get(window.location + "/join").then((response) => {
      if (response.data == "Joined"){
        hasjoined = true;
        clearInterval(joingameinterval);
        console.log("Joined Game!");
      } else{
        console.log("Error Joining Game!");
      }
  });
}

function getstatus(){
  responseax = axios.get(window.location + "/status").then((response) => {
      document.getElementById("game-status").innerHTML=response.data;
  });
}

function getrole(){
  responseax = axios.get(window.location + "/role").then((response) => {
      document.getElementById("role").innerHTML=response.data;
  });
}

function getmoneyontable(){
  responseax = axios.get(window.location + "/moneyontable").then((response) => {
      document.getElementById("table-money").innerHTML=response.data;
  });
}

function getplayercount(){
  responseax = axios.get(window.location + "/players").then((response) => {
      document.getElementById("player-count").innerHTML=response.data;
  });
}

function getmoney(){
  responseax = axios.get(window.location + "/money").then((response) => {
      document.getElementById("money").innerHTML=response.data;
  });
}

function gethand(){
  responseax = axios.get(window.location + "/hand").then((response) => {
      document.getElementById("hand").innerHTML=response.data["cards"];
      handdata = response.data;
  });
}

function requestlog() {
    log = document.getElementById('log');
    responseax = axios.get(window.location + "/log").then((response) => {
        log.innerHTML = response.data;
        if (oldlog != response.data) {
            log.scrollTo(0, log.scrollHeight);
            log.style.height = "55vh";
            oldlog = response.data;
        }
    });

}
var joingameinterval = setInterval(joingame, 1000);
setInterval(getstatus, 1000);
setInterval(gethand, 1000);
setInterval(getrole, 1000);
setInterval(getmoney, 1000);
setInterval(getplayercount, 1000);
setInterval(getmoneyontable, 1000);
// setInterval(requestlog, 2000);
// setTimeout(updateos, 1000);
// $(document).ready(updateos);
