package main

import (
	"fmt"
	"time"
	"net/http"
  "log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func printText(s string) {
	fmt.Println(s)
	time.Sleep(500)
}
