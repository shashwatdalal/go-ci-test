package main

import (
	"fmt"
	"time"
	"net/http"
	"go-ci-test/handlers"
	"log"
)

func main() {
	http.HandleFunc("/", handlers.HealthCheckHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func printText(s string) {
	fmt.Println(s)
	time.Sleep(500)
}
