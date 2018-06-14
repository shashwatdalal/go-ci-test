package handlers

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
	. "../utils"
)

type PromotedAdvertisement struct {
	AdID			 string
	Name       string
	StartTime  string
	EndTime  	 string
	LocLat	 	 string
	LocLng	 	 string
	Sport   	 string
}

type Message struct {
	Chat 			 string
	SenderID	 int
	SenderName string
	Message		 string
	TimeSent   string
}

type ChatInfo struct {
	FixtureID			int
	UserTeamID		int
	OppID					int
	UserTeamName	string
	OppName				string
}

var GetChats = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain user id (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	user_id := (strings.Split(getquery, "=")[1])

	// Define struct to hold info on all chats to be returned
	var chats []ChatInfo
	// Define struct to hold info on all teams user belongs to
	var team_ids []int

	// Obtain team information
	columns := "team_names.team_id, team_names.team_name"
	join := "team_members INNER JOIN team_names ON team_names.team_id=team_members.team_id"
  query := fmt.Sprintf("SELECT %s FROM %s where user_id=%s;", columns, join, user_id)
  rows, err := db.Query(query)
  CheckErr(err)
	for rows.Next() {
		data := ChatInfo{}
		data.FixtureID = -1
		err = rows.Scan(
			&data.UserTeamID,
			&data.UserTeamName)
		chats = append(chats, data)
		team_ids = append(team_ids, data.UserTeamID)
	}

	// Obtain fixture information
	for _, team_id := range team_ids {
		// Obtain fixtures for team
		columns := "f.fixture_id, f.home_id, f.away_id, h.team_name, a.team_name"
		fix_table := "upcoming_fixtures f"
		first_join := "INNER JOIN team_names h ON f.home_id=h.team_id"
		second_join := "INNER JOIN team_names a ON f.away_id=a.team_id"
  	query := fmt.Sprintf("SELECT %s FROM %s %s %s WHERE home_id=%d OR away_id=%d;",
			 									columns, fix_table, first_join, second_join, team_id, team_id)
		fmt.Println(query)
  	rows, err := db.Query(query)
  	CheckErr(err)
		var home_id int
		var away_id int
		var home_name string
		var away_name string
		for rows.Next() {
			data := ChatInfo{}
			err = rows.Scan(
				&data.FixtureID,
				&home_id,
				&away_id,
				&home_name,
				&away_name)
			if (home_id == team_id) {
				data.UserTeamID = home_id;
				data.OppID = away_id;
				data.UserTeamName = home_name;
				data.OppName = away_name;
			} else {
				data.UserTeamID = away_id;
				data.OppID = home_id;
				data.UserTeamName = away_name;
				data.OppName = home_name;
			}
			chats = append(chats, data)
		}

	}

	j,_ := json.Marshal(chats) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var GetChatMessages = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	chat_id := (strings.Split(getquery, "=")[1])
	chat_db_name := chat_id + "_messages"

	// Run query
	columns := "m.sender_id, u.name, m.message, m.time_sent"
	join := "INNER JOIN users AS u ON m.sender_id=u.user_id"
	order:= "ORDER BY m.time_sent ASC"

  query := fmt.Sprintf("SELECT %s FROM %s AS m %s %s",
		 						columns, chat_db_name, join, order)
	fmt.Println(query)
  rows, err := db.Query(query)
  CheckErr(err)

	var result []Message

	for rows.Next() {
		data := Message{}
		err = rows.Scan(
			&data.SenderID,
			&data.SenderName,
			&data.Message,
			&data.TimeSent)

		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var AddMessage = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	decoder := json.NewDecoder(request.Body)
  var message Message
  err = decoder.Decode(&message)
  if err != nil {
      panic(err)
			defer request.Body.Close()
  }
	chat_name := message.Chat + "_messages"

	columns := "sender_id, message, time_sent"
	// Run query
  query := fmt.Sprintf("INSERT INTO %s (%s) VALUES('%d', '%s', LOCALTIMESTAMP);",
							chat_name, columns, message.SenderID, message.Message)
	fmt.Println(query)
  _, err = db.Query(query)
  CheckErr(err)
})

func tallyUpvotesDownvotes(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	params := strings.Split((strings.Split(getquery, "?"))[1], "&")
	team_name := strings.Split(params[0], "=")[1]
	fixture_id := strings.Split(params[1], "=")[1]
	upvote_name := team_name + "_upvotes"
	downvote_name := team_name + "_downvotes"

	// Run query
  query := fmt.Sprintf("SELECT COUNT(*) FROM %s WHERE advert_id=%s;", upvote_name, fixture_id)
  upvotes, err := db.Query(query)
	CheckErr(err)
	query = fmt.Sprintf("SELECT COUNT(*) FROM %s WHERE advert_id=%s;", downvote_name, fixture_id)
  downvotes, err := db.Query(query)
  CheckErr(err)
	num_upvotes := 0
	num_downvotes := 0

	for upvotes.Next() {
		err = upvotes.Scan(
			&num_upvotes)
	}
	for downvotes.Next() {
		err = downvotes.Scan(
			&num_downvotes)
	}
	result := [2]int{num_upvotes, num_downvotes}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
}

var GetPromotedFixtures = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)


	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	team_id := strings.Split(getquery, "=")[1]

	fields := "a.advert_id, a.team_id, a.start_time, a.end_time, a.loc_lat, a.loc_lng, a.sport";
	advertisements := "advertisements AS a"
	first_join := "INNER JOIN promoted_fixtures AS pf ON a.advert_id=pf.advert_id"
	second_join := "INNER JOIN team_names AS tn ON a.team_id=tn.team_id"

	// Run query
  query := fmt.Sprintf("SELECT %s FROM %s %s %s WHERE pf.team_id=%s;",
												fields, advertisements, first_join, second_join, team_id)
  rows, err := db.Query(query)
  CheckErr(err)

	// Initialise the json response
	var jsonText = []byte(`[]`)
	var result []PromotedAdvertisement
	err = json.Unmarshal([]byte(jsonText), &result)

	// Add every database hit to the result
	for rows.Next() {
		data := PromotedAdvertisement{}
		err = rows.Scan(
			&data.AdID,
			&data.Name,
			&data.StartTime,
			&data.EndTime,
			&data.LocLat,
			&data.LocLng,
			&data.Sport)

		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var GetTeamMembers = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)


	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	team_id := strings.Split(getquery, "=")[1]

	// Run query
  query := fmt.Sprintf("SELECT team_members.user_id FROM team_members WHERE team_members.team_id=%s;", team_id)
  rows, err := db.Query(query)
  CheckErr(err)

	var result []int
	// Add every database hit to the result
	for rows.Next() {
		var member int
		err = rows.Scan(&member)
		result = append(result, member)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})
