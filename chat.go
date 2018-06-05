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
