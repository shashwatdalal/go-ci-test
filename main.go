package main

import (
	"net/http"
  "log"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
)

const (
  DB_USER     = "postgres"
  DB_PASSWORD = "postgres"
  DB_NAME     = "postgres"
  DB_HOST     = "35.176.172.232"
  DB_PORT     = "5432"
)

type Advertisement struct {
	Name      string
	StartTime  string
	EndTime  	string
	Location	string
	Sport   	string
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build")))

	// Bring up matches in chat mode
	http.HandleFunc("/teammatches", getTeamMatches)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func matchmaking(writer http.ResponseWriter, request *http.Request) {
	writer.Write([]byte("hello"))
}

// This is a hardcoded test to demostrate that the communication channels work
func getTeamMatches(writer http.ResponseWriter, request *http.Request) {
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
}

func checkErr(err error) {
    if err != nil {
        fmt.Println(err)
    }
}
