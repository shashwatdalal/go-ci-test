package main

import (
	"fmt"
	"time"
	"net/http"
  "log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./one-page-app/build")))
	log.Fatal(http.ListenAndServe(":80", nil))
}

func printText(s string) {
	fmt.Println(s)
	time.Sleep(500)
}
