package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
    "log"
    "os"
    "path/filepath"
    "strings"
    "time"
)

// User Variables
var logfile = "/log.txt"
var dir = "/";

// System Variables
var gamestarted = false;
var availablecards = []string{};

func check(e error) {
    if e != nil {
        log.Fatal(e);
        panic(e)
    }
}

func logtofile(text string) {
    f, _ := os.OpenFile(dir + logfile, os.O_APPEND | os.O_WRONLY, 0600)
    defer f.Close()
    logtime := time.Now().Format("[01-02-2006 15:04:05.0000]: ");
    f.WriteString(logtime + text+"<br>");
}

func truncatelogfile(){
  f, _ := os.OpenFile(dir + logfile, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
  f.Truncate(0)
  fmt.Fprintf(f, "")
  f.Close()
}

func page(w http.ResponseWriter, req * http.Request) {
    dat, _:= ioutil.ReadFile(dir + "/index.html")
    fmt.Fprintf(w, string(dat));
    logtofile("Served main page to X.X.X." + strings.Split(string(req.RemoteAddr), ".")[3]);
}

func start(w http.ResponseWriter, req * http.Request) {
    if (!gamestarted){
      logtofile("Game starting!");
      gamestarted = true;
      fmt.Fprintf(w, "Game started!");
      logtofile("Game started!");
    } else{
      fmt.Fprintf(w, "Game already started.");
    }


}

func main() {
    dir, _ = filepath.Abs(filepath.Dir(os.Args[0]));
    truncatelogfile()
    logtofile("Server starting...");
    assets:= http.FileServer(http.Dir(dir + "/assets/"));
    http.Handle("/assets/", http.StripPrefix("/assets/", assets));
    http.HandleFunc("/", page);
    http.HandleFunc("/start/", start);
    logtofile("Server started...");
    http.ListenAndServe(":6941", nil);
}
