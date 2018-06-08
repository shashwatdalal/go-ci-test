package handlers

import (
    "fmt"
    "log"
    "golang.org/x/crypto/bcrypt"

    "net/url"
    "strings"
    "net/http"
    "database/sql"
    _ "github.com/lib/pq"
    "encoding/json"
    . "../utils"
)

type UserInfoInput struct {
	Username  string
  Email     string
	Name      string
	Dob       string
	Location  string
	Score     int
  Pwd       string
}

var AddUserInfo = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
  // Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  CheckErr(err)

	decoder := json.NewDecoder(request.Body)
  var userInfo UserInfoInput
  err = decoder.Decode(&userInfo)
  if err != nil {
      panic(err)
			defer request.Body.Close()
  }
  var hashed_pwd = HashPassword(userInfo.Pwd)

	// Run query
  query := fmt.Sprintf("INSERT INTO user VALUES('%s', '%s', '%s', '%s', '%s', '%s');",
							userInfo.Username, userInfo.Name, userInfo.Email, userInfo.Dob,
              userInfo.Location, userInfo.Score, hashed_pwd)
	fmt.Println(query)
  _, err = db.Query(query)
  CheckErr(err)
})

var GetLoginSuccess = http.HandlerFunc(func (writer http.ResponseWriter, request *http.Request) {
  // Set up connection
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT)
  db, err := sql.Open("postgres", dbinfo)
  CheckErr(err)

	// Obtain username (query is of the form ?username)
	getquery, err := url.QueryUnescape(request.URL.RawQuery)

  params := strings.Split((strings.Split(getquery, "?"))[1], "&")
	username := strings.Split(params[0], "=")[1]
	pwd := strings.Split(params[1], "=")[1]

	// Run query
  query := fmt.Sprintf("SELECT pwd_hash FROM users WHERE username='%s';", username)
  rows, err := db.Query(query)
  CheckErr(err)

	// Add the only database hit to the result
	rows.Next()
	var pwd_hash string
	err = rows.Scan(
		&pwd_hash)

  if (err != nil) {
    // If error then no entry was found in the database for the username given
    fmt.Fprintln(writer, "User Not Found")
  } else if (!ComparePasswords(pwd_hash, []byte(pwd))) {
    // If compare passwords returns false then we have an incorrect password attempt
    fmt.Fprintln(writer, "Incorrect Password")
  } else {
    // ComparePasswords returned true, username and password therefore valid
    fmt.Fprintln(writer, "SUCCESS")
  }
})


func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
  CheckErr(err)
	return string(bytes)
}

func ComparePasswords(hashedPwd string, plainPwd []byte) bool {
  byteHash := []byte(hashedPwd)
  err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
  if (err != nil) {
      log.Println(err)
      return false
  }
  return true
}
