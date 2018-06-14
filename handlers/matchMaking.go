package handlers

import (
	"net/http"
	"fmt"
	"database/sql"
	"net/url"
	"strings"
	. "../utils"
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

	// advert_id   SERIAL      NOT NULL,
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
	VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_,err = db.Query(sqlStatement,
		fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7])
	CheckErr(err)
})
