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
	"github.com/gorilla/mux"
)

type Team struct {
	NAME    string   `json:"name"`
	IMAGE   string   `json:"image"`
	PLAYERS []Player `json:"players"`
}

type Player struct {
	NAME     string   `json:"name"`
	IMAGE    string   `json:"image"`
	LOCATION Location `json:"location"`
}

type Location struct {
	LAT string `json:"lat"`
	LNG string `json:"lng"`
}

/**
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

var invitations = []Team{sexyPandas,MarcelFC,andyri}
**/

var GetTeams = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//setup database connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)
	//get username
	teams := []Team{}
	username := mux.Vars(r)["username"]
	query := fmt.Sprintf(
		"SELECT team_name "+
			"FROM users "+
			"JOIN team_members on team_members.user_id=users.user_id "+
			"JOIN team_names on team_members.team_id=team_names.team_id "+
			"WHERE username='%s';", username)
	rows, err := db.Query(query)
	for rows.Next() {
		team := Team{}
		err := rows.Scan(&team.NAME)
		CheckErr(err)
		query = fmt.Sprintf("SELECT username,users.loc_lat,users.loc_lng "+
			"from team_members "+
			"JOIN team_names on team_members.team_id = team_names.team_id "+
			"JOIN users on team_members.user_id=users.user_id "+
			"where team_name='%s';", team.NAME)
		users, err := db.Query(query)
		players := []Player{}
		//for each player retrieve location
		for users.Next() {
			player := Player{}
			loc := Location{}
			err := users.Scan(&player.NAME, &loc.LAT, &loc.LNG)
			CheckErr(err)
			player.LOCATION = loc
			players = append(players, player)
		}
		team.PLAYERS = players
		teams = append(teams, team)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(teams)
})

var GetInvitations = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//setup database connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)
	//get username
	teams := []Team{}
	username := mux.Vars(r)["username"]
	query := fmt.Sprintf("SELECT team_name "+
		"FROM users "+
		"JOIN team_invitations on users.user_id=team_invitations.player_id "+
		"JOIN team_names on team_names.team_id=team_invitations.team_id "+
		"WHERE username='%s'", username)
	rows, err := db.Query(query)
	for rows.Next() {
		team := Team{}
		err := rows.Scan(&team.NAME)
		CheckErr(err)
		query = fmt.Sprintf("SELECT username,users.loc_lat,users.loc_lng "+
			"FROM team_members "+
			"JOIN team_names on team_members.team_id = team_names.team_id "+
			"JOIN users on team_members.user_id=users.user_id "+
			"WHERE team_name='%s';", team.NAME)
		users, err := db.Query(query)
		players := []Player{}
		//for each player retrieve location
		for users.Next() {
			player := Player{}
			loc := Location{}
			err := users.Scan(&player.NAME, &loc.LAT, &loc.LNG)
			CheckErr(err)
			player.LOCATION = loc
			players = append(players, player)
		}
		team.PLAYERS = players
		teams = append(teams, team)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(teams)
})

type QueryMatch struct {
	Username string
	FullName string
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
	rows, err := db.Query(query)
	CheckErr(err)

	var result []QueryMatch
	for rows.Next() {
		data := QueryMatch{}
		err = rows.Scan(&data.Username, &data.FullName)
		CheckErr(err)
		result = append(result, data)
	}

	j, _ := json.Marshal(result) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

type TeamInfo struct {
	TeamName string
	Captain  string
	Invitees []string
}

//todo set up MUX router to take url of user and team to add to database.
var AddTeam = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
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

var AddPlayerToTeam = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)
	vars := mux.Vars(request)

	//get user-id and team-id
	var userId, teamId int
	query := fmt.Sprintf("select user_id " +
		"FROM users where username='%s'",vars["username"])
	err = db.QueryRow(query).Scan(&userId)
	CheckErr(err)
	query = fmt.Sprintf("select team_id " +
		"FROM team_names where team_name='%s'",vars["teamname"])
	err = db.QueryRow(query).Scan(&teamId)
	CheckErr(err)
	//insert into team_members
	query = fmt.Sprintf("INSERT INTO team_members VALUES('%d', '%d');",
		teamId, userId)
	_,err = db.Query(query)
	CheckErr(err)

	//remove team from team_invitations
	query = fmt.Sprintf(
		"DELETE FROM team_invitations " +
		"WHERE team_id=%d AND player_id=%d",
		teamId, userId)
	_,err = db.Query(query)
	CheckErr(err)

	//send updated team
	team := Team{}
	query = fmt.Sprintf("SELECT username,users.loc_lat,users.loc_lng "+
		"FROM team_members "+
		"JOIN team_names on team_members.team_id = team_names.team_id "+
		"JOIN users on team_members.user_id=users.user_id "+
		"WHERE team_name='%s';", vars["teamname"])
	users, err := db.Query(query)
	players := []Player{}
	//for each player retrieve location
	for users.Next() {
		player := Player{}
		loc := Location{}
		err := users.Scan(&player.NAME, &loc.LAT, &loc.LNG)
		CheckErr(err)
		player.LOCATION = loc
		players = append(players, player)
	}
	team.PLAYERS = players
	team.NAME = vars["teamname"]
	json.NewEncoder(writer).Encode(team)
})
