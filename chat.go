package main

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
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
	Sender		string
	Message		string
	Date      string
}

func getChatMessages(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  checkErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	team_name := (strings.Split(getquery, "=")[1])
	chat_name := team_name + "_chat"

	// Run query
  query := fmt.Sprintf("SELECT * FROM %s;", chat_name)
  rows, err := db.Query(query)
  checkErr(err)

	// Add the only database hit to the result
	rows.Next()
	data := UserInfo{}
	err = rows.Scan(
		&data.Sender,
		&data.Message,
		&data.Date)

	j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
}

func tallyUpvotesDownvotes(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  checkErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	params := strings.Split(strings.Split(getquery, "?")[1], "&")
	team_name := string.Split(params, "=")[1]
	fixture_id := string.Split(params, "=")[1]
	upvote_name := team_name + "_upvotes"
	downvote_name := team_name + "_downvotes"

	// Run query
  query := fmt.Sprintf("SELECT COUNT(*) FROM %s WHERE advert_id=%s;", upvote_name, fixture_id)
  upvotes, err := db.Query(query)
	checkErr(err)
	query := fmt.Sprintf("SELECT COUNT(*) FROM %s WHERE advert_id=%s;", downvote_name, fixture_id)
  downvotes, err := db.Query(query)
  checkErr(err)

	result := [2]int{strconv.ParseInt(upvotes), strconv.ParseInt(downvotes)}

	j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
}

func getTeamMatches(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  checkErr(err)

	team_name := "Toms Tanks"
	fields := "advertisements.advert_id, advertisements.name, advertisements.start_time, advertisements.end_time, advertisements.location, advertisements.sport";

	// Run query
  query := fmt.Sprintf("SELECT %s FROM advertisements JOIN promoted_fixtures ON advertisements.advert_id=promoted_fixtures.advert_id WHERE promoted_fixtures.name='%s';", fields, team_name)
  rows, err := db.Query(query)
  checkErr(err)

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
	fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
}
