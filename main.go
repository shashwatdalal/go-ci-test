package main

import (
	"net/http"
  "log"
  _ "github.com/lib/pq"
	"fmt"
	"github.com/gorilla/mux"
)

const (
  DB_USER     = "postgres"
  DB_PASSWORD = "postgres"
  DB_NAME     = "postgres"
  DB_HOST     = "35.176.172.232"
  DB_PORT     = "5432"
)

func main() {
	r := mux.NewRouter()
	r.Handle("/teammatches", GetTeamMatches).Methods("GET")


	// Profile page
	r.Handle("/getuserinfo", GetUserInfo).Methods("GET")
	r.Handle("/getuserfixtures", GetUserFixtures).Methods("GET")
	r.Handle("/getuseravail", GetUserAvailability).Methods("GET")
	r.Handle("/updateuseravail", UpdateUserAvailability).Methods("GET")

	r.Handle("/teammatches", GetTeamMatches).Methods("GET")
	r.Handle("/getChatMessages", GetChatMessages).Methods("GET")
	r.Handle("/addMessage", AddMessage).Methods("POST")


	r.Handle("/getTeams", GetTeams).Methods("GET")
	r.Handle("/getInvitations", GetInvitations).Methods("GET")
	http.Handle("/", r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func checkErr(err error) {
  if err != nil {
    fmt.Println(err)
  }
}
