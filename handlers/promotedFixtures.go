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
	AdID			 int
	Name       string
	StartTime  string
	EndTime  	 string
	LocLat	 	 float64
	LocLng	 	 float64
	Sport   	 string
	NumPlayers int
}

var GetUpvoteTally = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	params := strings.Split( strings.Split(getquery, "?")[1], "&" )
	team_id := strings.Split(params[0], "=")
	fixture_id := strings.Split(params[1], "=")

	query := fmt.Sprintf("SELECT COUNT(*) FROM upvotes WHERE team_id=%s AND fixture_id=%s",
		 						team_id, fixture_id)
	// fmt.Println(query)
  rows, err := db.Query(query)
  CheckErr(err)

	// Add the only database hit to the result
	rows.Next()
	var count string
	err = rows.Scan(&count)

	j,_ := json.Marshal(count) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var GetDownvoteTally = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	params := strings.Split( strings.Split(getquery, "?")[1], "&" )
	team_id := strings.Split(params[0], "=")
	fixture_id := strings.Split(params[1], "=")

	query := fmt.Sprintf("SELECT COUNT(*) FROM downvotes WHERE team_id=%s AND fixture_id=%s",
		 						team_id, fixture_id)
	// fmt.Println(query)
  rows, err := db.Query(query)
  CheckErr(err)

	// Add the only database hit to the result
	rows.Next()
	var count int
	err = rows.Scan(&count)

	j,_ := json.Marshal(count) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var GetVoteStatus = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	params := strings.Split( strings.Split(getquery, "?")[1], "&" )
	user_id := strings.Split(params[0], "=")
	team_id := strings.Split(params[1], "=")
	fixture_id := strings.Split(params[2], "=")

  // Check for instance of an upvote
	query := fmt.Sprintf("SELECT COUNT(*) FROM upvotes WHERE user_id=%s team_id=%s AND fixture_id",
		 						user_id, team_id, fixture_id)
	// fmt.Println(query)
  rows, err := db.Query(query)
  CheckErr(err)

	// Add the only database hit to the result
	rows.Next()
	var count int
	err = rows.Scan(&count)

  if (count > 0) {
    fmt.Fprintln(writer, "upvote") // Write the result to the sender
    return
  }

  // Check for instance of a downvote
  query = fmt.Sprintf("SELECT COUNT(*) FROM downvotes WHERE user_id=%s team_id=%s AND fixture_id",
		 						team_id, fixture_id)
	// fmt.Println(query)
  rows, err = db.Query(query)
  CheckErr(err)

	// Add the only database hit to the result
	rows.Next()
	err = rows.Scan(&count)

  if (count > 0) {
    fmt.Fprint(writer, "upvote") // Write the result to the sender
    return
  }

  fmt.Fprint(writer, "novote")

})

type Vote struct {
  UserID    int
  TeamID    int
	FixtureID	int
}

//todo set up MUX router to take url of user and team to add to database.
var AddUpvote = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	decoder := json.NewDecoder(request.Body)
	var vote Vote
	err = decoder.Decode(&vote)
	if err != nil {
		panic(err)
		defer request.Body.Close()
	}

  // Insert into the upvote table
  query := fmt.Sprintf("INSERT INTO upvotes (user_id, team_id, fixture_id) VALUES(%d, %d, %d);",
              vote.UserID, vote.TeamID, vote.FixtureID)
  _, err = db.Query(query)
  CheckErr(err)
})


//todo set up MUX router to take url of user and team to add to database.
var AddDownvote = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	decoder := json.NewDecoder(request.Body)
	var vote Vote
	err = decoder.Decode(&vote)
	if err != nil {
		panic(err)
		defer request.Body.Close()
	}

  // Insert into the upvote table
  query := fmt.Sprintf("INSERT INTO downvotes (user_id, team_id, fixture_id) VALUES(%d, %d, %d);",
              vote.UserID, vote.TeamID, vote.FixtureID)
  _, err = db.Query(query)
  CheckErr(err)

})


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

	fields := "a.advert_id, a.team_id, a.start_time, a.end_time, a.loc_lat, a.loc_lng, a.sport, a.num_players";
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
			&data.Sport,
      &data.NumPlayers)

		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})
