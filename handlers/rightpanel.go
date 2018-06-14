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

type UpcomingFixture struct {
	HomeTeam string
	AwayTeam string
	Sport    string
	LocLat   float64
	LocLng   float64
	Date     string
}

type SubmittedScore struct {
	HomeScore   int
	AwayScore   int
	SubmitterID int
}

var GetFixtureDetails = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain username (query is of the form ?fixture_id=x)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	fixtureID := (strings.Split(getquery, "=")[1])

	fields := "t1.team_name, t2.team_name, sport, loc_lat, loc_lng, date"
	tables := "upcoming_fixtures JOIN team_names AS t1 ON home_id=t1.team_id JOIN team_names AS t2 ON away_id=t2.team_id"

	query := fmt.Sprintf("SELECT %s FROM %s WHERE fixture_id=%s;", fields, tables, fixtureID)

	rows, err := db.Query(query)
	CheckErr(err)

	// Add the only database hit to the result
	if (rows.Next()) {
		data := UpcomingFixture{}
		err = rows.Scan(
		&data.HomeTeam,
		&data.AwayTeam,
		&data.Sport,
		&data.LocLat,
		&data.LocLng,
		&data.Date)

		j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
		fmt.Println(">", string(j))
		fmt.Fprintln(writer, string(j)) // Write the result to the sender
	} else {
		fmt.Fprintln(writer, "fail")
	}
})

var GetSubmittedScore = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain username (query is of the form ?fixture_id=x)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	fixtureID := (strings.Split(getquery, "=")[1])

	query := fmt.Sprintf("SELECT submitting_team_id, home_score, away_score FROM submitted_results WHERE fixture_id=%s;", fixtureID)

	rows, err := db.Query(query)
	CheckErr(err)

	// Add the only database hit to the result
	data := SubmittedScore{}

	if (rows.Next()) {
		err = rows.Scan(
			&data.SubmitterID,
			&data.HomeScore,
			&data.AwayScore)
	} else {
		// No DB hit so set defaults
		data.SubmitterID = -1
		data.HomeScore = -1
		data.AwayScore = -1
	}

	j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
	fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

var AcceptSubmittedScore = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain username (query is of the form ?fixture_id=x)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	fixtureID := (strings.Split(getquery, "=")[1])

	// Get the score from the submitted results
	query := fmt.Sprintf("SELECT home_score, away_score FROM submitted_results WHERE fixture_id=%s;", fixtureID)
	rows, err := db.Query(query)
	CheckErr(err)

	var home_score int
	var away_score int

	if (rows.Next()) {
		rows.Scan(&home_score, &away_score)
	} else {
		//Something has gone very wrong
		fmt.Println("chat.go cant find submitted result, ", fixtureID)
		return
	}

	// Remove entry from submitted results
	query = fmt.Sprintf("DELETE FROM submitted_results WHERE fixture_id=%s;", fixtureID)
	_, err = db.Query(query)
	CheckErr(err)

	// Get details of fixture from upcoming_fixtures
	query = fmt.Sprintf("SELECT * FROM upcoming_fixtures WHERE fixture_id=%s;", fixtureID)
	rows, err = db.Query(query)
	CheckErr(err)

	if (rows.Next()) {
		var home_id int
		var away_id int
		var sport string
		var loc_lat float64
		var loc_lng float64
		var date string

		rows.Scan(
			&home_id,
			&away_id,
			&sport,
			&loc_lat,
			&loc_lng,
			&date)

		value := fmt.Sprintf("%d, %d, %d, %d, %d, %d, %d, %d, %d",
			                    fixtureID, home_id, away_id, sport, date, home_score, away_score, loc_lat, loc_lng)
		query = fmt.Sprintf("INSERT INTO previous_fixtures VALUES (%s);", value)
		fmt.Println(query)
		_, err = db.Query(query)
		CheckErr(err)
	} else {
		//Something has gone very wrong
		fmt.Println("chat.go cant find fixture, ", fixtureID)
		return
	}
})

var RejectSubmittedScore = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain username (query is of the form ?fixture_id=x)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	fixtureID := (strings.Split(getquery, "=")[1])

	// Remove entry from submitted results
	query := fmt.Sprintf("DELETE FROM submitted_results WHERE fixture_id=%s;", fixtureID)
	_, err = db.Query(query)
	CheckErr(err)
})
