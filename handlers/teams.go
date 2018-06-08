package handlers

import (
	"net/http"
	"encoding/json"
)


type Team struct {
	NAME    string   `json:"name"`
	IMAGE   string   `json:"image"`
	PLAYERS []Player `json:"players"`
}

type Player struct {
	NAME     string `json:"name"`
	IMAGE    string `json:"image"`
	LOCATION string `json:"location"`
}

var greaterKudu = Team{
	NAME:  "Greater kudu",
	IMAGE: "https://robohash.org/estrepellendusdoloremque.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Cloe Plover",
			IMAGE:    "https://robohash.org/blanditiisquibeatae.png?size=100x100&set=set1",
			LOCATION: "Canary Wharf"},
		{
			NAME:     "Celinka Pidgeley",
			IMAGE:    "https://robohash.org/temporaestnesciunt.png?size=100x100&set=set1",
			LOCATION: "South Kensington"},
		{
			NAME:     "Marven Clive",
			IMAGE:    "https://robohash.org/voluptatumminimaeum.png?size=100x100&set=set1",
			LOCATION: "Putney"},
		{
			NAME:     "Julienne Micheli",
			IMAGE:    "https://robohash.org/mollitiavoluptatibusoptio.png?size=100x100&set=set1",
			LOCATION: "Camden"},
		{
			NAME:     "Garvey Coiley",
			IMAGE:    "https://robohash.org/eacommodinatus.png?size=100x100&set=set1",
			LOCATION: "Dulwich"}},
}

var blackKangaroo = Team{
	NAME:  "Black-faced kangaroo",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Alençon"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Ulricehamn"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "María la Baja"}},
}

var sexyPandas = Team{
	NAME:  "Sexy Pandas",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Motomachi"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Yamate"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "Honmoku"}},
}

var MarcelFC = Team{
	NAME:  "MarcelFC",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Alençon"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Ulricehamn"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "María la Baja"}},
}

var andyri = Team{
	NAME:  "Andy Ris",
	IMAGE: "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
	PLAYERS: []Player{
		{
			NAME:     "Doe Wimmer",
			IMAGE:    "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
			LOCATION: "Guozhai"},
		{
			NAME:     "Debby Overpool",
			IMAGE:    "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
			LOCATION: "Novo Hamburgo"},
		{
			NAME:     "Allissa Flemyng",
			IMAGE:    "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
			LOCATION: "Alençon"},
		{
			NAME:     "Nona Langforth",
			IMAGE:    "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
			LOCATION: "Ulricehamn"},
		{
			NAME:     "Prescott Mathevon",
			IMAGE:    "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
			LOCATION: "María la Baja"}},
}

var teams = []Team{greaterKudu,blackKangaroo}
var invitations = []Team{sexyPandas,MarcelFC,andyri}


var GetTeams = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(teams)
})

var GetInvitations = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(invitations)
})
