package handlers

import (
	"net/http"
	"fmt"
	"database/sql"
	"net/url"
	"strings"
	. "../utils"
)

var GetMatchmaking = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
	db, err := sql.Open("postgres", dbinfo)
	CheckErr(err)

	// url += "StartDate=" + StartDate.format() + "&";
	// url += "EndDate=" + EndDate.format();
	// url += "Location=(" + this.state.position.lat + "," + this.state.position.lng + ')&';
	// url += "Radius=" + this.state.Radius + "&";
	// url += "Sport=" + this.state.Sport.value + "&";

	getquery, err := url.QueryUnescape(request.URL.RawQuery)
	query := strings.Split(getquery, "&")

	fields := make([]string, len(query))
	for index, element:= range query{
		fields[index] = strings.Split(element, "=")[1]
	}

	// advert_id int NOT NULL,
	// name varchar(30) NOT NULL,
	// start_time timestamp NOT NULL,
	// end_time timestamp NOT NULL,
	// location point NOT NULL,
	// radius integer NOT NULL,
	// sport varchar(30) NOT NULL

	sqlStatement := `
	INSERT INTO advertisements (advert_id, name, start_time, end_time, location, radius, sport)
	VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_,err = db.Query(sqlStatement, 37, "andy_li",
		fields[0], fields[1], fields[2], fields[3], fields[4])
	CheckErr(err)
})
