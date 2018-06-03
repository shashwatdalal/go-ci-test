package main

import (
	"net/http"

	"database/sql"
  _ "github.com/lib/pq"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
)

type UserInfo struct {
	Username  string
	Name      string
	Age       int
	Location  string
	Score     int
}


// This is a hardcoded test to demostrate that the communication channels work
func getUserInfo(writer http.ResponseWriter, request *http.Request) {
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
}
