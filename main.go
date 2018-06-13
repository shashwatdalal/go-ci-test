package main

import (
	"net/http"
  "log"
  _ "github.com/lib/pq"
	"github.com/gorilla/mux"
	. "./handlers"
)
func main() {
	r := mux.NewRouter()

	// Profile page
	r.Handle("/getuserinfo", GetUserInfo).Methods("GET")
	r.Handle("/getuserfixtures", GetUserFixtures).Methods("GET")
	r.Handle("/getuseravail", GetUserAvailability).Methods("GET")
	r.Handle("/updateuseravail", UpdateUserAvailability).Methods("GET")
	r.Handle("/getuserupcoming", GetUserUpcoming).Methods("GET")
	r.Handle("/updateuserloc", UpdateUserLocation).Methods("GET")

	// Chat Page
	r.Handle("/getTeamMatches", GetTeamMatches).Methods("GET")
	r.Handle("/getChats",GetChats).Methods("GET")
	r.Handle("/getChatMessages", GetChatMessages).Methods("GET")
	r.Handle("/addMessage", AddMessage).Methods("POST")

	// Matchmaking
	r.HandleFunc("/matchmaking", GetMatchmaking).Methods("GET")
	r.HandleFunc("/getcaptainedteams", GetCaptainedTeams).Methods("GET")


	// Team Page
	r.Handle("/getTeams/{username}", GetTeams).Methods("GET")
	r.Handle("/getInvitations/{username}", GetInvitations).Methods("GET")
	//todo use userid and teamid
	r.Handle("/addUserToTeam/{username}/{teamname}",AddPlayerToTeam).Methods("POST")

	//Create Team Page
	r.Handle("/getUsernameMatches", GetUsernameMatches).Methods("GET")
	r.Handle("/createTeam", AddTeam).Methods("POST")

	// Login
	r.Handle("/addUserInfo", AddUserInfo).Methods("POST")
	r.Handle("/checkLogin", GetLoginSuccess).Methods("POST")
	r.Handle("/doesMatchingUserExist", DoesMatchingUserExist).Methods("GET")

	// Root
	http.Handle("/", r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
