package main

import (
	"net/http"
  "log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build")))
	http.Handle("/matchmaking", http.FileServer(http.Dir("./build")))
	http.Handle("/profile", http.FileServer(http.Dir("./build")))
	http.Handle("/leaderboards", http.FileServer(http.Dir("./build")))
	http.Handle("/teams", http.FileServer(http.Dir("./build")))
	http.Handle("/chat", http.FileServer(http.Dir("./build")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}