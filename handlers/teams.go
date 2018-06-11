package handlers

import (
	"net/http"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
	"database/sql"
	. "../utils"
	_ "github.com/lib/pq"
	"strconv"
)


type Team struct {
	NAME    string   `json:"name"`
	IMAGE   string   `json:"image"`
	PLAYERS []Player `json:"players"`
}

type Player struct {
	NAME     string `json:"name"`
	IMAGE    string `json:"image"`
	LOCATION string `json:"location"`
}

var greaterKudu = Team{
	NAME:  "Greater kudu",
	IMAGE: "https://robohash.org/estrepellendusdoloremque.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Cloe Plover",
			IMAGE:    "https://robohash.org/blanditiisquibeatae.png?size=100x100&set=set1",
			LOCATION: "Canary Wharf"},
		{
			NAME:     "Celinka Pidgeley",
			IMAGE:    "https://robohash.org/temporaestnesciunt.png?size=100x100&set=set1",
			LOCATION: "South Kensington"},
		{
			NAME:     "Marven Clive",
			IMAGE:    "https://robohash.org/voluptatumminimaeum.png?size=100x100&set=set1",
			LOCATION: "Putney"},
		{
			NAME:     "Julienne Micheli",
			IMAGE:    "https://robohash.org/mollitiavoluptatibusoptio.png?size=100x100&set=set1",
			LOCATION: "Camden"},
		{
			NAME:     "Garvey Coiley",
			IMAGE:    "https://robohash.org/eacommodinatus.png?size=100x100&set=set1",
			LOCATION: "Dulwich"}},
}

var blackKangaroo = Team{
	NAME:  "Black-faced kangaroo",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Alençon"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Ulricehamn"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "María la Baja"}},
}

var sexyPandas = Team{
	NAME:  "Sexy Pandas",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Motomachi"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Yamate"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "Honmoku"}},
}

var MarcelFC = Team{
	NAME:  "MarcelFC",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Alençon"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Ulricehamn"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "María la Baja"}},
}

var andyri = Team{
	NAME:  "Andy Ris",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Alençon"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Ulricehamn"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "María la Baja"}},
}

var teams = []Team{greaterKudu,blackKangaroo}
var invitations = []Team{sexyPandas,MarcelFC,andyri}


var GetTeams = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(teams)
})

var GetInvitations = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(invitations)
})


type QueryMatch struct {
	Username	string
	FullName	string
}

var GetUsernameMatches = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain pattern to match (query is of the form ?pattern=)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	pattern := strings.Split(getquery, "=")[1]

	query := fmt.Sprintf("SELECT username, name FROM users WHERE UPPER(username) LIKE '%s%s'", strings.ToUpper(pattern), "%")
	fmt.Println(query)
	rows, err := db.Query(query)
  CheckErr(err)

	var result []QueryMatch
	for rows.Next() {
		data := QueryMatch{}
		err = rows.Scan(&data.Username, &data.FullName)
		CheckErr(err)
		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})


type TeamInfo struct {
	TeamName  string
	Captain		string
	Invitees	[]string
}

var AddTeam = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {

	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	decoder := json.NewDecoder(request.Body)
  var teamInfo TeamInfo
  err = decoder.Decode(&teamInfo)
  if err != nil {
      panic(err)
			defer request.Body.Close()
  }

	// Check that team name is unique
	query := fmt.Sprintf("SELECT COUNT(*) FROM team_captains WHERE UPPER(team_name)='%s';",
									strings.ToUpper(teamInfo.TeamName))
  fmt.Println(query)
  rows, err := db.Query(query)
  CheckErr(err)

	// Parse count
	rows.Next()
	var count string
	err = rows.Scan(
		&count)
  num, err := strconv.Atoi(count)
  if (num > 0) {
		fmt.Fprintln(writer, false) // Write whether successful to the sender
		return
	}

	// Add Team Captain
  query = fmt.Sprintf("INSERT INTO team_captains VALUES('%s', '%s');",
							teamInfo.TeamName, teamInfo.Captain)
	_, err = db.Query(query)
	CheckErr(err)

	// Add captain as team member
  query = fmt.Sprintf("INSERT INTO team_members VALUES('%s', '%s');",
							teamInfo.TeamName, teamInfo.Captain)
	_, err = db.Query(query)
	CheckErr(err)

	//Add invitations
	for _, invitee := range teamInfo.Invitees {
	  query = fmt.Sprintf("INSERT INTO team_invites VALUES('%s', '%s');",
								teamInfo.TeamName, invitee)
		fmt.Println(query)
		_, err = db.Query(query)
		CheckErr(err)
	}

	//Create message table for team
	// query = fmt.Sprintf("CREATE TABLE ", teamInfo.TeamName, "_messages (",
	// 	"sender varchar(30) NOT NULL, message varchar(200) NOT NULL,",
	// 	"Time_sent timestamp without time zone NOT NULL);")
	// _, err = db.Query(query)
	// CheckErr(err)

	fmt.Fprintln(writer, "true") // Write whethersuccessful to the sender
})
