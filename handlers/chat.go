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
	Location	 string
	Sport   	 string
}

type Message struct {
	Team 			string
	Sender		string
	Message		string
	Date      string
}

var GetChatMessages = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	team_name := (strings.Split(getquery, "=")[1])
	chat_name := team_name + "_messages"

	// Run query
  query := fmt.Sprintf("SELECT * FROM %s;", chat_name)
  rows, err := db.Query(query)
  CheckErr(err)

	var result []Message

	for rows.Next() {
		data := Message{}
		err = rows.Scan(
			&data.Sender,
			&data.Message,
			&data.Date)

		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var AddMessage = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  CheckErr(err)

	decoder := json.NewDecoder(request.Body)
  var message Message
  err = decoder.Decode(&message)
  if err != nil {
      panic(err)
			defer request.Body.Close()
  }
	chat_name := message.Team + "_messages"

	// Run query
  query := fmt.Sprintf("INSERT INTO %s VALUES('%s', '%s', LOCALTIMESTAMP);",
							chat_name, message.Sender, message.Message)
	fmt.Println(query)
  _, err = db.Query(query)
  CheckErr(err)
})

func tallyUpvotesDownvotes(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
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

var GetTeamMatches = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  CheckErr(err)


	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	team_name := strings.Split(getquery, "=")[1]

	fields := "advertisements.advert_id, advertisements.name, advertisements.start_time, advertisements.end_time, advertisements.location, advertisements.sport";

	// Run query
  query := fmt.Sprintf("SELECT %s FROM advertisements JOIN promoted_fixtures ON advertisements.advert_id=promoted_fixtures.advert_id WHERE promoted_fixtures.name='%s';", fields, team_name)
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
			&data.Location,
			&data.Sport)

		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})
