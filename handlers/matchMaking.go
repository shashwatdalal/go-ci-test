package handlers

import (
	"net/http"
	"fmt"
	"database/sql"
	"net/url"
	"strings"
	. "../utils"
	"strconv"
)

type TeamMap struct {
	TEAMID int     `json:"value"`
  TEAMNAME string  `json:"label"`
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

	fields := make([]string, len(query))
	for index, element:= range query{
		fields[index] = strings.Split(element, "=")[1]
	}

	// advertID   SERIAL      NOT NULL,
	// team_id     int         NOT NULL,
	// start_time  timestamp   NOT NULL,
	// end_time    timestamp   NOT NULL,
	// loc_lat     decimal     NOT NULL,
	// loc_lng     decimal     NOT NULL,
	// radius      decimal     NOT NULL,
	// sport       varchar(30) NOT NULL,
	// num_players int         NOT NULL,

	sqlStatement := `
	INSERT INTO advertisements (team_id, start_time, end_time, loc_lat, loc_lng, radius, sport, num_players)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	_,err = db.Query(sqlStatement,
	                        	fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7])
	CheckErr(err)

	// Get advertID of advert just added (is highest)
	rows, err := db.Query("SELECT advert_id FROM advertisements ORDER BY advert_id DESC LIMIT 1;")
	if (rows.Next()) {
		var advertID int
		rows.Scan(&advertID)
		updatePromoted(advertID, fields[0], fields[3], fields[4], fields[5])
	} else {
		fmt.Println("Error in matchmaking.go:59")
	}
})

func updatePromoted(advertID int, posterIDString string, latString string, longString string, radString string) {
	posterID, _ := strconv.ParseInt(posterIDString, 10, 64)

	loc_lat, _ := strconv.ParseFloat(latString, 64)
	loc_lng, _ := strconv.ParseFloat(longString, 64)
	radius, _  := strconv.ParseFloat(radString, 64)

	var minLng float64 = loc_lng - radius
	var minLat float64 = loc_lat - radius
	var maxLng float64 = loc_lng + radius
	var maxLat float64 = loc_lat + radius

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	defer db.Close()
	CheckErr(err)

	// Get the ad posting team's avail
	query := fmt.Sprintf("SELECT mon, tues, weds, thurs, fri, sat, sun FROM team_avail WHERE team_id=%d;",
					              posterID)
  rows, err := db.Query(query)
	CheckErr(err)

	var teamAvail [7]int64

	if (rows.Next()) {
		rows.Scan(
      &teamAvail[0],
      &teamAvail[1],
      &teamAvail[2],
      &teamAvail[3],
      &teamAvail[4],
			&teamAvail[5],
      &teamAvail[6])
	} else {
		fmt.Println("No DB hit for team_avail, teamID ",  posterID)
		return
	}

	// Get all teams whose location is within the bounds and times align
	locCond := fmt.Sprintf("WHERE loc_lat <= %f AND loc_lat >= %f AND loc_lng <= %f AND loc_lng >= %f AND team_id!=%d",
		                   maxLat, minLat, maxLng, minLng,  posterID) // I am aware this is a square
  timeCond :=
		fmt.Sprintf("AND (mon&%d!=0 OR tues&%d!=0 OR weds&%d!=0 OR thurs&%d!=0 OR fri&%d!=0 OR sat&%d!=0 OR sun&%d!=0)",
		teamAvail[0], teamAvail[1], teamAvail[2], teamAvail[3], teamAvail[4], teamAvail[5], teamAvail[6])

	query = fmt.Sprintf("SELECT team_id FROM team_locations NATURAL INNER JOIN team_avail %s %s;",
											 locCond, timeCond)

	rows, err = db.Query(query)
	CheckErr(err)

	for (rows.Next()) {
		var oppteamID int
		rows.Scan(&oppteamID)
		query = fmt.Sprintf("INSERT INTO promoted_fixtures VALUES (%d, %d);", advertID, oppteamID)
		_, err = db.Query(query)
		CheckErr(err)
	}
}
