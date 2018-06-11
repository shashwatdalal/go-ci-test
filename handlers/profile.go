package handlers

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
	"strconv"
	. "../utils"
)

/*
 * TODO: Refactor merging for GetUserFixtures
 * TODO: Refactor common database behaviour
 */

type UserInfo struct {
	LocLat  string
	LocLng  string
}

type Availability struct {
	Mon  int64
	Tues int64
	Wed  int64
	Thurs int64
	Fri  int64
	Sat  int64
	Sun  int64
}

type Fixture struct {
	Opposition    string
	ForTeam       string
	Sport         string
	LocLat        string
	LocLng        string
	Date          string
	ScoreHome     int
	ScoreAway     int
	IsHome        bool
}

// Query the database for a userID corresponding to a username
func getUserIDFromUsername(username string) (userID int) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain userID
	query := fmt.Sprintf("SELECT user_id FROM users WHERE username='%s'", username)
  row, err := db.Query(query)
  CheckErr(err)

  if (row.Next()) {
    row.Scan(&userID)
  } else {
		// Username error
		userID = -1; // Failure value TODO: make front end handle this
		fmt.Println("Unrecognised username (GetUserUpcoming), ", username)
	}

	return userID
}

// Get the user information for the user specified in the url
var GetUserInfo = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := (strings.Split(getquery, "=")[1])

	// Run query
  query := fmt.Sprintf("SELECT loc_lat, loc_lng FROM users WHERE username='%s';", username)
  rows, _ := db.Query(query)
  CheckErr(err)

	// Add the only database hit to the result
	if (rows.Next()) {
		data := UserInfo{}
		err = rows.Scan(&data.LocLat, &data.LocLng)

		j,_ := json.Marshal(data) // Convert the list of DB hits to a JSON
		// fmt.Println(string(j))
		fmt.Fprintln(writer, string(j)) // Write the result to the sender
	} else {
		fmt.Println("No user info DB hit for ", username)
	}
})


// Get the fixtures for the user specified in the url
var GetUserUpcoming = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain username (query is of the form ?username=name)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := strings.Split(getquery, "=")[1]

	// Obtain userID
  userID := getUserIDFromUsername(username)

  // Build queries
	ordering := "ORDER BY date DESC"
	commonQueryFields :=  "sport, loc_lat, loc_lng, date"
  tables := "upcoming_fixtures JOIN team_members"

	homeFields := fmt.Sprintf("away_id, home_id, %s", commonQueryFields)
	homeTableJoinCond := "home_id=team_id"

	awayFields := fmt.Sprintf("home_id, away_id, %s", commonQueryFields)
	awayTableJoinCond := "away_id=team_id"

	// Common text used in initialising JSON responses
	var jsonText = []byte(`[]`)

	homeQuery := fmt.Sprintf("SELECT %s FROM %s ON %s WHERE user_id=%d %s",
		                        homeFields, tables, homeTableJoinCond, userID, ordering)
	awayQuery := fmt.Sprintf("SELECT %s FROM %s ON %s WHERE user_id=%d %s",
		                        awayFields, tables, awayTableJoinCond, userID, ordering)

  // Run the query for home games
	rows, err := db.Query(homeQuery)
	CheckErr(err)

	// Initialise the json response for all home games
	var teamHome []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamHome)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.ForTeam,
			&data.Sport,
			&data.LocLat,
			&data.LocLng,
			&data.Date)

		data.IsHome = true

		teamHome = append(teamHome, data)
	}

	rows, err = db.Query(awayQuery)
	CheckErr(err)

	// Initialise the json response for all away games
	var teamAway []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamAway)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.ForTeam,
			&data.Sport,
			&data.LocLat,
			&data.LocLng,
			&data.Date)

		data.IsHome = false

		teamAway = append(teamAway, data)
	}

	// Initialise the json response for the end result
	var teamFixtures []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamFixtures)
	merge(&teamHome, &teamAway, &teamFixtures)

	j,_ := json.Marshal(teamFixtures)        // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))           // Write the result to the console
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})


// Get the fixtures for the user specified in the url
var GetUserFixtures = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain username (query is of the form ?username=name)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := strings.Split(getquery, "=")[1]

	// Obtain userID
	userID := getUserIDFromUsername(username)

	// Build queries
	ordering := "ORDER BY date DESC"
	commonQueryFields := "sport, loc_lat, loc_lng, date, score_home, score_away"
	tables := "previous_fixtures JOIN team_members"

	homeFields := fmt.Sprintf("away_id, home_id, %s", commonQueryFields)
	homeTableJoinCond := "home_id=team_id"

	awayFields := fmt.Sprintf("home_id, away_id, %s", commonQueryFields)
	awayTableJoinCond := "away_id=team_id"

	// Common text used in initialising JSON responses
	var jsonText = []byte(`[]`)

	homeQuery := fmt.Sprintf("SELECT %s FROM %s ON %s WHERE user_id=%d %s",
														homeFields, tables, homeTableJoinCond, userID, ordering)
	awayQuery := fmt.Sprintf("SELECT %s FROM %s ON %s WHERE user_id=%d %s",
														awayFields, tables, awayTableJoinCond, userID, ordering)

	// Run the query for home games
	rows, err := db.Query(homeQuery)
	CheckErr(err)

	// Initialise the json response for all home games
	var teamHome []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamHome)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.ForTeam,
			&data.Sport,
			&data.LocLat,
			&data.LocLng,
			&data.Date,
			&data.ScoreHome,
			&data.ScoreAway)

		data.IsHome = true

		teamHome = append(teamHome, data)
	}

	rows, err = db.Query(awayQuery)
	CheckErr(err)

	// Initialise the json response for all away games
	var teamAway []Fixture
	err = json.Unmarshal([]byte(jsonText), &teamAway)

	// Add every database hit to the result
	for rows.Next() {
		data := Fixture{}
		err = rows.Scan(
			&data.Opposition,
			&data.ForTeam,
			&data.Sport,
			&data.LocLat,
			&data.LocLng,
			&data.Date,
			&data.ScoreHome,
			&data.ScoreAway)

		data.IsHome = false

		teamAway = append(teamAway, data)
}

// Initialise the json response for the end result
var teamFixtures []Fixture
err = json.Unmarshal([]byte(jsonText), &teamFixtures)
merge(&teamHome, &teamAway, &teamFixtures)

j,_ := json.Marshal(teamFixtures)        // Convert the list of DB hits to a JSON
// fmt.Println(string(j))           // Write the result to the console
fmt.Fprintln(writer, string(j)) // Write the result to the sender})
})


func merge(list1 *[]Fixture, list2 *[]Fixture, result *[]Fixture) {
	var i, k int // Track positions in arrays

	for (i < len(*list1) || k < len(*list2)) {
		if (i >= len(*list1)) {
			*result = append(*result, (*list2)[k])
			k++
		} else if (k >= len(*list2)) {
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
	defer db.Close()
  CheckErr(err)
	var jsonText = []byte(`[]`)

	// Obtain username (query is of the form ?username=name)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := (strings.Split(getquery, "=")[1])

	// Obtain userID
	userID := getUserIDFromUsername(username)

  // Run query
	daysFields := "mon, tues, weds, thurs, fri, sat, sun"
	query := fmt.Sprintf("SELECT %s FROM user_avail WHERE user_id=%d;",
		                    daysFields, userID)
	rows, err := db.Query(query)
	CheckErr(err)

	// Initialise the json response for the result
	var result [7]int
	err = json.Unmarshal([]byte(jsonText), &result)

	// Add the *only* database hit to the result
	if (rows.Next()) {
		err = rows.Scan(
			&result[0],
			&result[1],
			&result[2],
			&result[3],
			&result[4],
			&result[5],
			&result[6])
	} else {
		fmt.Println("Error no avail DB hit for ", username)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	// fmt.Println(string(j))
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})

// Update the user availability for the user and values specified in the url
var UpdateUserAvailability = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Obtain the bitmaps (query is of the form ?username=name&fst=x&snd=y)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := strings.Split((strings.Split(getquery, "=")[1]), "&")[0]

	monString := strings.Split((strings.Split(getquery, "=")[2]), "&")[0]
	monBitmap, _ := strconv.ParseInt(monString, 10, 64)

	tuesString := strings.Split((strings.Split(getquery, "=")[3]), "&")[0]
	tuesBitmap, _ := strconv.ParseInt(tuesString, 10, 64)

	wedsString := strings.Split((strings.Split(getquery, "=")[4]), "&")[0]
	wedsBitmap, _ := strconv.ParseInt(wedsString, 10, 64)

	thursString := strings.Split((strings.Split(getquery, "=")[5]), "&")[0]
	thursBitmap, _ := strconv.ParseInt(thursString, 10, 64)

	friString := strings.Split((strings.Split(getquery, "=")[6]), "&")[0]
	friBitmap, _ := strconv.ParseInt(friString, 10, 64)

	satString := strings.Split((strings.Split(getquery, "=")[7]), "&")[0]
	satBitmap, _ := strconv.ParseInt(satString, 10, 64)

	sunString := (strings.Split(getquery, "=")[8])
	sunBitmap, _ := strconv.ParseInt(sunString, 10, 64)

	// Obtain userID
	userID := getUserIDFromUsername(username)

	// Run query
	fields := fmt.Sprintf("mon=%d, tues=%d, weds=%d, thurs=%d, fri=%d, sat=%d, sun=%d",
												 monBitmap, tuesBitmap, wedsBitmap, thursBitmap, friBitmap, satBitmap, sunBitmap)
	query := fmt.Sprintf("UPDATE user_avail SET %s WHERE user_id=%d",
												fields, userID)

	_, err = db.Query(query)
	CheckErr(err)

	if err == nil {
		fmt.Fprintln(writer, "success") // Write the result to the sender
	} else {
		fmt.Fprintln(writer, "fail") // Write the result to the sender
	}
})
