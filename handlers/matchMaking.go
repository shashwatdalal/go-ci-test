package handlers

import (
	"net/http"
	"fmt"
	"database/sql"
	"net/url"
	"strings"
	. "../utils"
)

type TeamInfo struct {
	value int // teamID
  label int // teamName
}

// Query the database for teamIDs corresponding to a username
var GetCaptainedTeams = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	username := (strings.Split(getquery, "=")[1])

	// Obtain userID
	query := fmt.Sprintf("SELECT user_id FROM users WHERE username='%s'", username)
  row, err = db.Query(query)
  CheckErr(err)

	var userID int

  if (row.Next()) {
    row.Scan(&userID)
  } else {
		// Username error
		userID = -1; // Failure value TODO: make front end handle this
		fmt.Println("Unrecognised username (GetUserUpcoming), ", username)
	}

	query := fmt.Sprintf("SELECT team_id, team_name FROM
		team_captains NATURAL INNER JOIN team_names where user_id='%s'", userID)

	var jsonText = []byte(`[]`)
	var teamInfos []TeamInfo
	err = json.Unmarshal([]byte(jsonText), &teamInfos)
	CheckErr(err)

	for rows.Next() {
		data := TeamInfo{}
		err = rows.Scan(
			&data.value,
			&data.label)
		teamInfos = append(teamInfos, data)
	}

	j,_ := json.Marshal(teamInfos)  // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j))	// Write the result to the sender
}

var GetMatchmaking = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	CheckErr(err)

	// url += "teamid=" + this.state.team + "&";
	// url += "startdate=" + StartDate.format() + "&";
	// url += "enddate=" + EndDate.format() + "&";
	// url += "lat=" + this.state.position.lat + "&";
	// url += "lng=" + this.state.position.lng + "&";
	// url += "radius=" + this.state.Radius + "&";
	// url += "sport=" + this.state.Sport.value ;

	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	query := strings.Split(getquery, "&")

	fields := {}
	for index, element:= range query{
		fields[index] = strings.Split(element, "=")[1]
	}

	// advert_id  SERIAL      NOT NULL,
	// team_id    int         NOT NULL,
	// start_time timestamp   NOT NULL,
	// end_time   timestamp   NOT NULL,
	// loc_lat    decimal     NOT NULL,
	// loc_lng    decimal     NOT NULL,
	// radius     decimal     NOT NULL,
	// sport      varchar(30) NOT NULL,


	sqlStatement := `
	INSERT INTO advertisements (team_id, start_time, end_time, loc_lat, loc_lng, radius, sport)
	VALUES ($1, $2, $3, $4, $5, $6)`
	_,err = db.Query(sqlStatement,
		fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6])
	CheckErr(err)
})
