package main

import (
	"fmt"
	"time"
	"net/http"
	"go-ci-test/handlers"
	"log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./web/splash.html")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func printText(s string) {
	fmt.Println(s)
	time.Sleep(500)
}
