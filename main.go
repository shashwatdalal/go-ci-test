package main

import (
	"fmt"
	"time"
	"net/http"
  "log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./one-page-app/build")))
	http.Handle("/addmatch", addMatch)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func printText(s string) {
	fmt.Println(s)
	time.Sleep(500)
}

func addMatch(writer http.ResponseWriter, request *http.Request) {
    data, err := url.QueryUnescape(r.URL.RawQuery)

}