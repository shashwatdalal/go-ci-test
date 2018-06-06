package main

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
)

type Advertisement struct {
	Name       string
	StartTime  string
	EndTime  	 string
	Location	 string
	Sport   	 string
}

// This is a hardcoded test to demostrate that the communication channels work
var GetTeamMatches = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
	// Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  checkErr(err)

	// Run query
  query := fmt.Sprintf("SELECT * FROM advertisements_example WHERE location='W6' AND start_time >= '2018-05-20 12:00:00' AND end_time <= '2018-05-20 16:00:00';")
  rows, err := db.Query(query)
  checkErr(err)

	// Initialise the json response
	var jsonText = []byte(`[]`)
	var result []Advertisement
	err = json.Unmarshal([]byte(jsonText), &result)

	// Add every database hit to the result
	for rows.Next() {
		data := Advertisement{}
		err = rows.Scan(
			&data.Name,
			&data.StartTime,
			&data.EndTime,
			&data.Location,
			&data.Sport)

		result = append(result, data)
	}

	j,_ := json.Marshal(result) // Convert the list of DB hits to a JSON
	fmt.Fprintln(writer, string(j)) // Write the result to the sender
})
