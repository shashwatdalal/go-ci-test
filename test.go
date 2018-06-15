package main

import (
  "strings"
  "fmt"
)

func main() {
  getquery := "?curr=x&opp=y"
  splitAtEq       := strings.Split(getquery, "=")
  currTeamString := strings.Split(splitAtEq[1], "&")[0]
	oppoTeamString := splitAtEq[2]

  fmt.Println("curr ", currTeamString)
  fmt.Println("oppo ", oppoTeamString)
}
