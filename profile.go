package main

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
	"strconv"
)

/*
 * TODO: Refactor merging for GetUserFixtures
 * TODO: Refactor common database behaviour
 */

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
	ScoreAway     int
	IsHome        bool
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
	username := strings.Split(getquery, "=")[1]

	ordering := "ORDER BY date DESC"
	commonQueryFields :=  "sport, location, date, home_score, away_score"
	var jsonText = []byte(`[]`)

	// ------------------------- QUERY ALL SINGLE GAMES --------------------------
	homeQuery := fmt.Sprintf("SELECT away_name AS opp, %s FROM fixtures WHERE home_name='%s'",
	 												commonQueryFields, username)
	awayQuery := fmt.Sprintf("SELECT home_name AS opp, %s FROM fixtures WHERE away_name='%s'",
	 												commonQueryFields, username)

	query := fmt.Sprintf("%s %s;", homeQuery, ordering)
	rows, err := db.Query(query)
	checkErr(err)

	// Initialise the json response
	var singleHome []Fixture
	err = json.Unmarshal([]byte(jsonText), &singleHome)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.Sport,
			&data.Location,
			&data.Date,
			&data.ScoreHome,
			&data.ScoreAway)

		data.IsHome = true
		singleHome = append(singleHome, data)
	}

	query = fmt.Sprintf("%s %s;", awayQuery, ordering)
	rows, err = db.Query(query)
	checkErr(err)

	// Initialise the json response
	var singleAway []Fixture
	err = json.Unmarshal([]byte(jsonText), &singleAway)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.Sport,
			&data.Location,
			&data.Date,
			&data.ScoreHome,
			&data.ScoreAway)

		data.IsHome = false
		singleAway = append(singleAway, data)
	}

	var singleFixtures []Fixture
	err = json.Unmarshal([]byte(jsonText), &singleFixtures)

	merge(&singleHome, &singleAway, &singleFixtures)

	// j,_ := json.Marshal(singleFixtures) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))             // Write the result to the console


	// -------------------------- QEURY ALL TEAM GAMES --------------------------
	homeQuery = fmt.Sprintf("SELECT away_name AS opp, home_name AS for, %s FROM fixtures JOIN team_members ON home_name=team_name WHERE username='%s'",
													commonQueryFields, username)
	awayQuery = fmt.Sprintf("SELECT home_name AS opp, away_name AS for, %s FROM fixtures JOIN team_members ON away_name=team_name WHERE username='%s'",
													commonQueryFields, username)

	query = fmt.Sprintf("%s %s;\n", homeQuery, ordering)
	rows, err = db.Query(query)
	checkErr(err)

	// Initialise the json response for all team games
	var teamHome []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamHome)

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
			&data.ScoreAway)

		data.IsHome = true

		teamHome = append(teamHome, data)
	}

	query = fmt.Sprintf("%s %s;\n", awayQuery, ordering)
	rows, err = db.Query(query)
	checkErr(err)

	// Initialise the json response for all team games
	var teamAway []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamAway)

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
			&data.ScoreAway)

		data.IsHome = false

		teamAway = append(teamAway, data)
	}

	// Initialise the json response for the result
	var teamFixtures []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamFixtures)
	merge(&teamHome, &teamAway, &teamFixtures)


	// Initialise the json response for the result
	var result []Fixture
	err = json.Unmarshal([]byte(jsonText), &result)

	merge(&singleFixtures, &teamFixtures, &result)

	j,_ := json.Marshal(result)        // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))           // Write the result to the console
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

func merge(list1 *[]Fixture, list2 *[]Fixture, result *[]Fixture) {
	var i, k int // Track positions in arrays

	for (i < len(*list1) || k < len(*list2)) {
		if (i >= len(*list1)) {
			*result = append(*result, (*list2)[k])
			k++
		} else if (k >= len(*list1)) {
			*result = append(*result, (*list1)[i])
			i++
		} else {
			if (strings.Compare((*list1)[i].Date, (*list2)[k].Date) >= 0) {
				*result = append(*result, (*list1)[i])
				i++
			} else {
				*result = append(*result, (*list2)[k])
				k++
			}
		}
	}
}

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
	query := fmt.Sprintf("SELECT fst_half, snd_half FROM availabilities WHERE username='%s';", username)
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

// Update the user availability for the user and values specified in the url
var UpdateUserAvailability = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)

	// Obtain the bitmaps (query is of the form ?username=name&fst=x&snd=y)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	fmt.Println(getquery);

	username := strings.Split((strings.Split(getquery, "=")[1]), "&")[0]

	fstString := strings.Split((strings.Split(getquery, "=")[2]), "&")[0]
	fstBitmap, _ := strconv.ParseInt(fstString, 10, 64)

	sndString := (strings.Split(getquery, "=")[3])
	sndBitmap, _ := strconv.ParseInt(sndString, 10, 64)

	// Run query
	query := fmt.Sprintf("UPDATE availabilities SET fst_half=%d, snd_half=%d WHERE username='%s'",
											 fstBitmap, sndBitmap, username)
	rows, err := db.Query(query)
	rows.Next()
	fmt.Println(query)
	checkErr(err)

	if err == nil {
		fmt.Fprintln(writer, "success") // Write the result to the sender
	} else {
		fmt.Fprintln(writer, "fail") // Write the result to the sender
	}
})
