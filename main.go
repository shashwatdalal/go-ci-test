package main

import (
	"net/http"
  "log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build/index.html")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
