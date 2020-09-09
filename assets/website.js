var oldlog = "";

/* Game Logic/Client */
var addnumber = 1;
var money = 100;
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
// setInterval(requestlog, 2000);
// setTimeout(updateos, 1000);
// $(document).ready(updateos);
