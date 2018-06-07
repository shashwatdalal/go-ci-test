package main

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
)

type UserInfo struct {
	Username  string
	Name      string
	Age       int
	Location  string
	Score     int
}

type Availability struct {
	FstHalf int64
	SndHalf int64
}

type Fixture struct {
	Opposition    string
	ForTeam       string
	Sport         string
	Location      string
	Date          string
	ScoreHome     int
	ScoreAgainst  int
}

// Get the user information for the user specified in the url
var GetUserInfo = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  checkErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := (strings.Split(getquery, "=")[1])

	// Run query
  query := fmt.Sprintf("SELECT * FROM users WHERE username='%s';", username)
  rows, err := db.Query(query)
  checkErr(err)

	// Add the only database hit to the result
	rows.Next()
	data := UserInfo{}
	err = rows.Scan(
		&data.Username,
		&data.Name,
		&data.Age,
		&data.Location,
		&data.Score)

	j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

// Get the fixtures for the user specified in the url
var GetUserFixtures = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)

	// Obtain username (query is of the form ?username=name)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := (strings.Split(getquery, "=")[1])

	// ------------------------- QUERY ALL SINGLES GAMES -------------------------
	ordering := "ORDER BY date DESC"
	commonQueryFields :=  "sport, location, date, home_score, away_score"
	homeQuery := fmt.Sprintf("SELECT away_name AS opp, %s FROM fixtures WHERE home_name='%s'",
	 												commonQueryFields, username)
	awayQuery := fmt.Sprintf("SELECT home_name AS opp, %s FROM fixtures WHERE away_name='%s'",
	 												commonQueryFields, username)

	query := fmt.Sprintf("%s UNION ALL %s %s;", homeQuery, awayQuery, ordering)
	fmt.Println(query)
	rows, err := db.Query(query)
	checkErr(err)

	// Initialise the json response
	var jsonText = []byte(`[]`)
	var singleFixtures []Fixture
	err = json.Unmarshal([]byte(jsonText), &singleFixtures)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.Sport,
			&data.Location,
			&data.Date,
			&data.ScoreHome,
			&data.ScoreAgainst)

		singleFixtures = append(singleFixtures, data)
	}

	// j,_ := json.Marshal(singleFixtures) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))             // Write the result to the console


	// -------------------------- QEURY ALL TEAM GAMES --------------------------
	ordering = "ORDER BY date DESC"
	commonQueryFields =  "sport, location, date, home_score, away_score"
	homeQuery = fmt.Sprintf("SELECT away_name AS opp, home_name AS for, %s FROM fixtures JOIN team_members ON home_name=team_name WHERE username='%s'",
													commonQueryFields, username)
	awayQuery = fmt.Sprintf("SELECT home_name AS opp, away_name AS for, %s FROM fixtures JOIN team_members ON away_name=team_name WHERE username='%s'",
													commonQueryFields, username)

	query = fmt.Sprintf("%s UNION ALL %s %s;\n", homeQuery, awayQuery, ordering)
	rows, err = db.Query(query)
	checkErr(err)

	// Initialise the json response for all team games
	jsonText = []byte(`[]`)
	var teamFixtures []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamFixtures)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.ForTeam,
			&data.Sport,
			&data.Location,
			&data.Date,
			&data.ScoreHome,
			&data.ScoreAgainst)

		teamFixtures = append(teamFixtures, data)
	}

	// j,_ = json.Marshal(teamFixtures) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))          // Write the result to the console


	// Initialise the json response for the result
	jsonText = []byte(`[]`)
	var result []Fixture
	err = json.Unmarshal([]byte(jsonText), &result)

	// ---------------------------------- MERGE ----------------------------------
	// TODO: Factor out merging
	var i, k int // Track positions in arrays

	for (i < len(singleFixtures) || k < len(teamFixtures)) {
		if (i >= len(singleFixtures)) {
			result = append(result, teamFixtures[k])
			k++
		} else if (k >= len(teamFixtures)) {
			result = append(result, singleFixtures[i])
			i++
		} else {
			if (strings.Compare(singleFixtures[i].Date, teamFixtures[k].Date) >= 0) {
				result = append(result, singleFixtures[i])
				i++
			} else {
				result = append(result, teamFixtures[k])
				k++
			}
		}
	}

	j,_ = json.Marshal(result)        // Convert the list of DB hits to a JSON
	fmt.Println(string(j))           // Write the result to the console
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

// Get the availability for the user specified in the url
var GetUserAvailability = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  checkErr(err)

	// Obtain username (query is of the form ?username=name)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := (strings.Split(getquery, "=")[1])

  // Run query
	query := fmt.Sprintf("SELECT * FROM availabilities WHERE username='%s';", username)
	rows, err := db.Query(query)
	checkErr(err)

	// Add the *only* database hit to the result
	rows.Next()
	data := Availability{}
	err = rows.Scan(
		&data.FstHalf,
		&data.SndHalf)


	j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})
