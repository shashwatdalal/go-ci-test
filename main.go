package main

import (
	"net/http"
  "log"

  _ "github.com/lib/pq"
	"fmt"
)

const (
  DB_USER     = "postgres"
  DB_PASSWORD = "postgres"
  DB_NAME     = "postgres"
  DB_HOST     = "35.176.172.232"
  DB_PORT     = "5432"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build")))

	http.HandleFunc("/teammatches", getTeamMatches)
	http.HandleFunc("/getuserinfo", getUserInfo)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func checkErr(err error) {
  if err != nil {
    fmt.Println(err)
  }
}
